# Operations manual — `bc250-sh2`

Deployment notes for the BC-250 host. This deployment's host, paths, portal URL,
timezone and SteamID are recorded in [site.md](site.md). The image is built from
this repository; the upstream `josh5/steam-headless:2` filesystem is untouched
apart from the files listed in the top-level README.

| Item | Value |
|---|---|
| Image | `steam-headless-bc250:2` (built here from `josh5/steam-headless:2`) |
| Data root | `${SH2_DIR}` |
| Container / hostname | `steam-headless` / `steam-headless` |
| Network | `host` |
| Session mode | `gaming` (gamescope + Steam gamepad UI) |
| Encoder | software (`libx264` / `openh264`) |

Topic pages: [controller](controller.md), [metrics](metrics.md), [troubleshooting](troubleshooting.md). See the [documentation index](README.md).

## 1. Host requirements

Alpine host, kernel `7.2.10-bc250rocm-r3`, Docker `29.8.2`, cgroup v2, compose
plugin installed per user (`~/.docker/cli-plugins/docker-compose`, v5.7.0).

```bash
uname -r
docker info --format '{{.ServerVersion}} {{.CgroupVersion}}'   # -> 29.8.2 2
ls -l /dev/uhid /dev/uinput /dev/fuse /dev/dri/renderD128
lsmod | grep -E '^(uhid|uinput)'                                # uhid, uinput loaded
```

GPU: single AMD APU `1002:13fe` (Cyan Skillfish / BC-250), RADV `GFX1013`, one
render node, no monitor attached. The host user is in the `docker` group, so
no root is needed anywhere below.


## 2. Directory layout on the host

```bash
mkdir -p "${SH2_DIR:-/opt/steam-headless}"/{data/home,games,state,journal}
```

| Host path | Container path | Purpose |
|---|---|---|
| `${SH2_DIR}/data/home` | `/home/steamheadless` | Steam, Proton prefixes, saves, Flatpaks, Sunshine config/pairings |
| `${SH2_DIR}/state` | `/var/lib/steam-headless` | auth state, TLS certificates, installation marker |
| `${SH2_DIR}/journal` | `/var/log/journal` | persistent systemd journal |
| `${SH2_DIR}/games` | `/mnt/games` | game library (`GameLibrary/Steam` created on first boot) |


## 3. Deploy / update

```bash
cd "${REPO_DIR:-$HOME/bc250-sh2}"
make bootstrap                  # .env, host fan, dirs, build, up, health
docker compose logs -f
```

`make bootstrap` is the fresh-host path. It installs the pinned `bc250fc`
host fan daemon with `doas`/`sudo` if it is missing, creates a user-writable
`SH2_DIR` and the host directories, builds the image, starts the container and
waits for the healthcheck. Existing `.env` values are preserved.

From a workstation with push access, `make deploy` pushes HEAD and runs
`git pull --ff-only && make bootstrap` on the host. Set `DEPLOY_HOST` and
`DEPLOY_DIR` in `.env`, or pass them to make. The working tree must be clean and
the host checkout must be on the same branch.

First boot prints the SHUI bootstrap password:

```
 Username:            steamheadless
 Temporary password: <temporary-password>
```

Open `https://<host>:8483` (this deployment: [site.md](site.md)), accept the
self-signed certificate, sign in, complete the setup form (temporary password +
new permanent password ≥ 12 chars, no `:`), which also sets the Linux desktop
and Sunshine password. Never run `passwd` inside the container — it desyncs
web/desktop/Sunshine.

Update the base image:

```bash
docker pull josh5/steam-headless:2
docker compose build --no-cache
docker tag steam-headless-bc250:2 steam-headless-bc250:1.7.3
make up
```


## 4. Verification

```bash
docker exec steam-headless /usr/local/bin/steam-headless-healthcheck
#   health=healthy checks=33 failures=0   (33 in gaming mode, 32 in desktop mode)

docker exec steam-headless cat /run/steam-headless/session/state.json
#   {"configuredMode":"gaming","currentMode":"gaming","state":"ready"}

docker exec steam-headless systemctl is-active \
  steam-headless-gamescope steam-headless-steam steam-headless-sunshine \
  steam-headless-shui steam-headless-plasma
#   active active active active inactive

# gamescope renames its process to gamescope-wl, so match the argv:
docker exec steam-headless sh -c 'cat /proc/$(pgrep -f "^/usr/bin/gamescope")/cmdline' \
  | tr '\0' '\n' | grep -c -- '--force-grab-cursor'      # 0 — the cursor fix is in effect

docker exec steam-headless ss -lnt | grep -E '47984|47989|47990|48010'
curl -sk -o /dev/null -w '%{http_code}\n' https://127.0.0.1:8483/     # 401 = portal up

docker exec steam-headless systemctl is-active decky-loader-seed plugin_loader
docker exec steam-headless ss -lnt | grep -E ':(1337|8080)\b'         # Decky + CEF
docker exec steam-headless sh -c 'curl -s http://127.0.0.1:8080/json/version | jq -r .Browser'

docker exec steam-headless bash -lc 'P=$(cat /run/steam-headless/credentials/sunshine-proxy-password);
  curl -sk -u steamheadless:$P https://127.0.0.1:47990/api/apps'
```

Expected processes in gaming mode:

```
kwin_wayland --virtual --xwayland --socket wayland-0 --width 1920 --height 1080 ...
gamescope    --backend wayland --rt --fullscreen --grab --steam --expose-wayland ...
steam        -gamepadui -pipewire -pipewire-dmabuf -steamos3 -steampal
```


## 5. Ports

| Port | Protocol | Service |
|---|---|---|
| 8483 | TCP + UDP | SHUI: sign-in, WebSocket/WebRTC video |
| 1337 | TCP | Decky Loader API (`127.0.0.1` only) |
| 8080 | TCP | Steam CEF remote debugging (`127.0.0.1` only; Decky requirement) |
| 47984–47990 | TCP | Sunshine web/API (proxied through SHUI) |
| 47998, 47999, 48000, 48010 | UDP/TCP | Moonlight video / control / audio / RTSP |
| 27031, 27036 | UDP | Steam Remote Play discovery + media |
| 27036, 27037 | TCP | Steam Remote Play control |

Host networking = one container per machine; a second desktop needs macvlan and
its own LAN IP.


## 6. Sunshine session model

Sunshine is single-session and keeps its state in memory only.

| Client message | Meaning |
|---|---|
| `Starting control stream establishment failed: Error 2 … UDP 47999` | RTSP/app start happened, the UDP control handshake never completed |
| `An app is already running on this host (Error 400)` | "app running" flag from the aborted session is still set |
| `Failed to start RTSP … error 111` | ECONNREFUSED: Sunshine stops listening on 48010 while it believes an app is running |

All three share one failure mode: a session that starts and then aborts leaves
Sunshine half-open, and every later attempt fails — on every device.

```bash
docker exec steam-headless journalctl -u steam-headless-sunshine --no-pager -n 200 \
  | grep -E 'New streaming session|CLIENT (CONNECTED|DISCONNECTED)|Trying encoder|Executing (Do|Undo)|Spawning'
docker exec steam-headless ss -lunp | grep -E '4799[0-9]|4800[0-9]'   # bound only during a session
```

| Journal | Meaning |
|---|---|
| session started, app commands, **no `CLIENT CONNECTED`**, `Executing Undo Cmd` after 10–15 s | UDP 47999 never arrived — client aborted |
| `CLIENT CONNECTED` → `CLIENT DISCONNECTED` | a real session ran and ended |
| launch refused before any session | stuck "app running" flag |

### Reset a stuck session

```bash
docker exec steam-headless systemctl restart steam-headless-sunshine      # ~2 s
docker exec steam-headless systemctl is-active steam-headless-sunshine    # active
docker exec steam-headless ss -lnt | grep -E '47984|47989|47990|48010'    # four listeners
docker exec steam-headless /usr/local/bin/steam-headless-healthcheck     # health=healthy
```

Then reconnect **once**, from a fresh tab/page, with no other GameStream client
active. Rules: one client at a time; never retry in the tab that just failed;
several viewers → SHUI Desktop Portal (single encode, fan-out); one stream ≈ one
CPU core on this box.


## 7. Session modes

```
KWin (wayland-0, virtual output 1920x1080@120)   <- Sunshine capture=kwin, SHUI portal
└── gamescope 3.16.29 --backend wayland --steam --fullscreen --grab --xwayland-count 2
    └── Steam -gamepadui                          (SteamOS-like gamepad UI)
```

| Piece | Path |
|---|---|
| `steam-headless-gaming.target` / `steam-headless-desktop.target` | `/usr/lib/systemd/system/` (`Conflicts=` each other) |
| `steam-headless-gamescope.service` (`BindsTo=steam-headless-compositor.service`) | same |
| stock launcher (waits for `compositor-ready`, exports `ENABLE_GAMESCOPE_WSI`, `STEAM_USE_MANGOAPP`, writes `/run/steam-headless/gamescope-environment`) | `/usr/local/bin/steam-headless-gamescope` |
| Steam args per mode (`gaming` → `-gamepadui … -steamos3 -steampal`) | `/usr/local/bin/steam-headless-steam-arguments` |
| switcher / selector / state | `steam-headless-session-mode`, `steam-headless-select-session`, `/run/steam-headless/session/state.json` |
| auto-fallback: 4 failures in 60 s → desktop | `steam-headless-gaming-fallback.service` |
| Decky seed: homebrew + CEF marker before the session | `decky-loader-seed.service`, `/usr/local/bin/decky-loader-seed` |
| Decky backend: `127.0.0.1:1337` → CEF `127.0.0.1:8080` | `plugin_loader.service` |

```bash
docker exec steam-headless steam-headless-session-mode gaming|desktop   # 150 s timeout
docker exec steam-headless cat /run/steam-headless/session/state.json
```

`/run` is tmpfs: a runtime switch lasts until the container is recreated, then
the compose env (`STEAM_HEADLESS_SESSION_MODE`) wins. Switching stops Steam and
swaps the frontend, so an active stream drops and Steam needs 20–40 s.

There is no SHUI toggle, and a Sunshine app cannot trigger the switch: app
commands run as `steamheadless` (uid 1000) while the switch needs root (`sudo`
requires a password, no polkit rule for that user).

### 7.1 Cursor fix (`--force-grab-cursor`)

`gamescope --help` documents `--force-grab-cursor` as *"always use relative mouse
mode instead of flipping dependent on cursor visibility"*. In that mode gamescope
keeps the real pointer warped at the screen centre and only accumulates deltas,
while Steam (Xwayland client, `QT_QPA_PLATFORM=xcb`, `DISPLAY=:1`) paints its own
cursor at the delta position: a second cursor blinks in the middle and clicks are
delivered to the centre.

The image removes exactly that flag:

| Path in image | Role |
|---|---|
| `/usr/local/bin/gamescope-no-force-grab` | copies the stock launcher without the flag into `$HOME/.local/state/steam-headless/gamescope-launch.sh` and execs it |
| `/etc/systemd/system/steam-headless-gamescope.service.d/50-no-force-grab-cursor.conf` | `ExecStart=` cleared, pointed at the wrapper; every other directive comes from the upstream unit |

The patched copy must not live in `/run` or `/tmp` — those tmpfs mounts are
`noexec` and systemd fails with `status=126/n/a` + `Permission denied`, after
which the gaming fallback returns the container to KDE.

If one cursor is still not enough, next knobs are `--hide-cursor-delay 3000`
(gamescope's own cursor reappears on each event) and hiding the
`libvirtualhid Touchscreen` / `Pen Tablet` devices so KWin does not switch its
pointer source between absolute and relative virtual mice.


## 8. Encoders

GFX1013 exposes no working VAAPI encoder:

```
libva error: /usr/lib64/dri-freeworld/radeonsi_drv_video.so init failed
Error: Couldn't initialize va display: resource allocation failed
Encoder [vaapi] failed -> [nvenc] failed -> [vulkan] "Device does not support encoding h264" -> [software]
gst-inspect-1.0 va  ->  0 features        # SHUI's side of the same problem
```

| Where | Setting | Why |
|---|---|---|
| image default `sunshine.conf` | `encoder = software` | otherwise every session spends ~1 s probing vaapi/nvenc/vulkan |
| compose env | `SHUI_ENCODER=software` | otherwise SHUI crash-loops on `no element "vah264enc"` |
| compose env | `SUNSHINE_ENABLE_AUTO_CONFIG=false` | auto-config would rewrite `encoder = vaapi` and re-add the prep command. Side effect, logged by SHUI: `SUNSHINE_ENABLE_AUTO_CONFIG is false; automatic launcher synchronisation disabled` |
| compose env | `SUNSHINE_ENABLE_AUTO_DISPLAY_MODE=false` | drops the `set-display-mode` prep/undo from session start |

```bash
docker exec steam-headless vainfo
docker exec steam-headless gst-inspect-1.0 va | tail -3
```


## 9. Controller: long-press Select → Quick Access Menu

Moved to [docs/controller.md](controller.md).

## 10. Performance overlay metrics (GPU %, CPU MHz)

Moved to [docs/metrics.md](metrics.md).

## 11. Managed Sunshine config

Seeded on first boot by `/usr/local/sh-init.d/10-seed-sunshine-config.sh` from
`/usr/share/steam-headless-custom/`; existing files are never overwritten.

`~/.config/sunshine/sunshine.conf`:

```ini
sunshine_name = steam-headless
upnp = disabled
capture = kwin
encoder = software
gamepad = x360
adapter_name = /dev/dri/renderD128
system_tray = disabled
origin_web_ui_allowed = pc
credentials_file = sunshine_state.json
file_state = sunshine_state.json
```

`~/.config/sunshine/apps.json` — both tiles only stream the current screen; in
gaming mode the gamepad UI is already running, so nothing may be spawned (the
stock `detached` + `steam://open/bigpicture` definition started a second Steam
client inside the same session):

```json
{
  "env": { "PATH": "$(PATH):$(HOME)/.local/bin" },
  "apps": [
    { "name": "Desktop", "image-path": "desktop.png" },
    { "name": "Steam | Game Mode", "image-path": "steam.png" }
  ]
}
```


## 12. Apps and launchers in gaming mode

Only Steam and the processes it spawns inherit
`/run/steam-headless/gamescope-environment`. Anything started by Sunshine or by
SHUI lands on KWin (invisible under the fullscreen gamescope), so:

- install launchers (Prism, Sober, RetroDECK, ES-DE, …) and add them as
  **non-Steam shortcuts** inside Steam;
- `steam-headless-app-install` installs the Flatpak/AppImage, e.g.
  `docker exec steam-headless steam-headless-app-install --id prism-launcher --flatpak org.prismlauncher.PrismLauncher --filesystem /mnt/games`;
- adding a non-Steam shortcut needs desktop-mode Steam UI (gamepad UI has no such
  button) or a generated `shortcuts.vdf`.


## 13. Daily operations

```bash
cd "${REPO_DIR:-$HOME/bc250-sh2}"
docker compose up -d                 # start / apply compose changes
docker compose restart
docker compose stop
docker compose down                  # removes container, data persists
docker compose logs -f --tail 100
docker exec -it steam-headless bash
docker exec steam-headless journalctl -u steam-headless-gamescope -n 50 --no-pager
docker exec steam-headless journalctl -u steam-headless-steam -n 50 --no-pager
docker exec steam-headless journalctl -u steam-headless-sunshine -n 50 --no-pager
```


## 14. Backup / restore

```bash
cd "${SH2_DIR:-/opt/steam-headless}"
docker compose stop 2>/dev/null || docker stop steam-headless
tar -czf "${SH2_DIR:-/opt/steam-headless}-backup-$(date +%F).tar.gz" data/home state journal
docker start steam-headless
```

Forgot the password (keeps games, saves, settings, pairings):

```bash
docker exec steam-headless rm -f /var/lib/steam-headless/auth/state.json
docker compose restart
docker logs steam-headless 2>&1 | head -n 55
```

Never delete `/var/lib/steam-headless/installation.json` or `/home/steamheadless`.


## 15. Troubleshooting

Moved to [docs/troubleshooting.md](troubleshooting.md).

## 16. Custom boot / suspend animations

Steam scans one directory for local startup movies and lists every `.webm` in it
under *Settings → Customization → Startup movie*:

```text
/home/steamheadless/.local/share/Steam/config/uioverrides/movies/
# host side: ${SH2_DIR}/data/home/.local/share/Steam/config/uioverrides/movies/
```

Files must be readable by the `steamheadless` account (uid 1000 on the host side
as well). A Steam restart is the reliable way to refresh the list and the
generated thumbnails; opening the customization page usually rescans on its own.

Naming conventions used by SteamOS for the sleep clips:

| File | Played |
|---|---|
| any `*.webm` | selectable startup movie |
| `deck-suspend-animation.webm` | suspend animation when no game is running |
| `deck-suspend-animation-from-throbber.webm` | suspend animation while a game is running |

These are personal media and are deliberately kept out of the repository — only
code, units and documentation are versioned here.


## 17. Cold boot and fresh deploy

Every bind-mount source must exist *before* the container is created; Docker
creates missing sources, and inside sysfs that fails with
`operation not permitted`, which aborts the whole container. The current set:

| Source | Exists because |
|---|---|
| `/etc/localtime` | host configuration |
| `${SH2_DIR}/{data/home,games,state,journal}` | `make dirs` (`make up` depends on it) |
| `${SH2_DIR}/metrics/gpu_busy_percent` | `make dirs`, 3-byte seed |
| `${SH2_DIR}/metrics/gpu_metrics` | `make dirs`, 128-byte seed copied from the live table |
| `/sys/class/drm/card0/device` | amdgpu probes during kernel init, long before Docker starts |

Verified by removing the container completely and running `make up`: it creates,
starts, both metric units come up, `health=healthy checks=33`, `/dev/input` has
Steam's virtual gamepad.

`restart: unless-stopped` makes a reboot even simpler — Docker restarts the
existing container and does not re-resolve the mounts.

### Portability

This compose targets an AMD GPU with the BC-250 kernel:

- the GPU publisher expects an amdgpu `gpu_metrics` v2 table
  (`/sys/class/drm/card0/device/gpu_metrics`) and MangoHud as the overlay;
- on a system with a working cpufreq driver, `steam-cpu-freq` exits immediately
  and leaves the real files alone;
- on a system without `/sys/class/drm/card0/device/gpu_metrics` (e.g. NVIDIA),
  Docker would try to create that path inside sysfs and fail — remove the two
  metric mounts from `docker-compose.yml` there.
