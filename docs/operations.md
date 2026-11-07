# Operations manual — `steam-headless-bc250`

Deployment-specific notes for the BC-250 host (`nik@192.168.1.105`, hostname
`bc500`). The image is built from this repository; the upstream
`josh5/steam-headless:2` filesystem is untouched apart from the files listed in
the top-level README.

| Item | Value |
|---|---|
| Image | `steam-headless-bc250:2` (built here from `josh5/steam-headless:2`) |
| Repo checkout on the host | `~/steam-headless-bc250` |
| Data root (`SH2_DIR`) | `~/sh2` |
| Container / hostname | `steam-headless` / `steam-headless` |
| Network | `host` |
| SHUI | `https://192.168.1.105:8483` |
| Session mode | `gaming` (gamescope + Steam gamepad UI) |
| Encoder | software (`libx264` / `openh264`) |

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
render node, no monitor attached. Docker user `nik` is in the `docker` group, so
no root is needed anywhere below.

## 2. Directory layout on the host

```bash
mkdir -p ~/sh2/{data/home,games,state,journal}
```

| Host path | Container path | Purpose |
|---|---|---|
| `~/sh2/data/home` | `/home/steamheadless` | Steam, Proton prefixes, saves, Flatpaks, Sunshine config/pairings |
| `~/sh2/state` | `/var/lib/steam-headless` | auth state, TLS certificates, installation marker |
| `~/sh2/journal` | `/var/log/journal` | persistent systemd journal |
| `~/sh2/games` | `/mnt/games` | game library (`GameLibrary/Steam` created on first boot) |

## 3. Deploy / update

```bash
cd ~/steam-headless-bc250
cp .env.example .env            # SH2_DIR=/home/nik/sh2, PUID/PGID=1000, TZ
docker compose build            # ~40 s on top of the pulled base image
docker compose up -d
docker compose logs -f
```

First boot prints the SHUI bootstrap password:

```
 Username:            steamheadless
 Temporary password: <temporary-password>
```

Open `https://192.168.1.105:8483`, accept the self-signed certificate, sign in,
complete the setup form (temporary password + new permanent password ≥ 12 chars,
no `:`), which also sets the Linux desktop and Sunshine password. Never run
`passwd` inside the container — it desyncs web/desktop/Sunshine.

Update the base image:

```bash
docker pull josh5/steam-headless:2
docker compose build --no-cache && docker compose up -d
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

Steam's system chords are hardcoded to the Guide button (`chord_xboxone.vdf`:
Guide+A = `system_key_1`, Guide+B hold = `quit_application`), which is useless
when that button is worn out. The image therefore adds one extra activator to
Steam's shipped default layouts, with Valve's (inverted) input names:

```text
"button_menu"  ->  game_action Default SELECT   # the physical Select/Back button
  Long_Press (500 ms) -> controller_action system_key_1   # Quick Access Menu

"button_escape" ->  game_action Default START   # the physical Start/Menu button
  (left alone)
```

`system_key_1` is exactly what Guide+A opens: the right-hand panel with
Performance, Friends and notifications. Short presses are untouched, so Select
still reaches the game.

The naming trap: `button_escape` sounds like Back/Select but the shipped gamepad
layout binds it to `Default START`, while `button_menu` is `Default SELECT`.
Binding the long press to `button_escape` opens the panel on Start instead of
Select. `TARGET_INPUT` in the patcher is therefore `"button_menu"`; changing it
retargets already patched files in place (the block is removed from wherever it
was and re-inserted, keeping the byte size identical).

| File in the image | Role |
|---|---|
| `/usr/local/bin/steam-controller-patch` | inserts the activator into `basicui.vdf`, `basicui_gamepad.vdf`, `desktop_xboxone.vdf` and `templates/controller_xboxone_gamepad_joystick.vdf` (Big Picture, Desktop and default per-game layouts) |
| `/usr/local/sh-init.d/20-patch-steam-controller-base.sh` | re-runs it on every container start |

Two constraints shaped the implementation:

1. **Steam verifies file sizes.** At startup it logs
   `BVerifyInstalledFiles: controller_base/desktop_xboxone.vdf is N bytes, expected 7924`
   and later re-extracts mismatching files from the depot, silently reverting the
   patch. KeyValues ignores whitespace, so the patcher removes exactly as many
   leading indentation characters as it inserts and every file keeps its original
   byte length — no mismatch line, no repair.
2. **Files are CRLF.** They must be read and written as bytes; a text-mode
   round-trip converts `\r\n` to `\n` and breaks the size (and the repair).

Verify:

```bash
C=/home/steamheadless/.local/share/Steam/controller_base
docker exec steam-headless grep -c system_key_1 \
  $C/basicui.vdf $C/basicui_gamepad.vdf $C/desktop_xboxone.vdf \
  $C/templates/controller_xboxone_gamepad_joystick.vdf      # 4 4 1 1
docker exec steam-headless stat -c '%s %n' $C/desktop_xboxone.vdf   # 7924
docker exec steam-headless journalctl -u steam-headless-steam -n 300 | grep -c BVerifyInstalledFiles
```

The patcher validates every file with an embedded KeyValues parser before writing
and refuses to write a result that does not parse, that contains duplicate
activators, or whose byte size changed. This matters: an invalid layout makes
Steam log `CPrepareConfigWorker failed for AppID 769` /
`No config for controller found locally` and **the whole pad stops working** in
the gamepad UI, not just the new binding. Two traps that produced exactly that:

- dropping the `{` that opens an input block while inserting;
- adding a second `"Long_Press"` to an input that already has one.

If the pad is dead after an edit, check those log lines first, then restore the
files to their depot size (Steam re-extracts them on its next client update) and
restart `steam-headless-steam`.

Changing the timing: edit `LONG_PRESS_MS` in
`rootfs/usr/local/bin/steam-controller-patch` and rebuild. The patcher treats a
block with a different timing as stale, removes it and re-inserts the new one,
returning the freed bytes as trailing spaces so the depot size stays exact — no
need to reset the files to stock first.

Caveats: a Steam client update restores the stock files, and the patch is only
re-applied at the next container start (`docker compose restart` is enough); if
Steam's UI keeps a cached copy, restart `steam-headless-steam` after patching.

## 10. Performance overlay metrics (GPU %, CPU MHz)

The BC-250 exposes less telemetry than a normal desktop GPU, and Steam's overlay
(`gameoverlayui.so`) reads plain sysfs, so two numbers come out wrong out of the
box. Both are fixed by publishing the values the overlay expects, inside the
container only.

### GPU utilisation

Steam reads exactly one file for GPU %:

```text
/sys/class/drm/card0/device/gpu_busy_percent
```

The amdgpu driver answers that read with `EOPNOTSUPP` on GFX1013 (there is no
per-ASIC switch), which is why the overlay showed values like `655%`.
`amdgpu_top` is correct because it never asks the driver: it parses the per-client
engine counters in `/proc/<pid>/fdinfo/<fd>`

```text
drm-engine-gfx:	123456789 ns
```

and divides the delta by the sampling interval
(`libamdgpu_top/src/stat/fdinfo/proc_info.rs::diff_usage`).

`/usr/local/bin/steam-gpu-load` (unit `steam-gpu-load.service`) does the same:
sums the delta across every DRM client in the container every 500 ms and writes an
integer percentage into `/run/gpu-metrics/gpu_busy_percent`, which
`docker-compose.yml` bind-mounts over the sysfs path. The file is written in
place at a fixed width, so a concurrent reader never sees a truncated value.

The host file must exist before the container starts:

```bash
mkdir -p "${SH2_DIR:-/opt/steam-headless}/metrics"
printf '00\n' > "${SH2_DIR:-/opt/steam-headless}/metrics/gpu_busy_percent"
```

### CPU clock

Steam reads:

```text
/sys/devices/system/cpu/cpu<N>/cpufreq/scaling_cur_freq   (kHz)
/sys/devices/system/cpu/cpu<N>/cpufreq/cpuinfo_min_freq
```

The BC-250 runs a fixed-clock kernel: no cpufreq driver is registered, so
`/sys/devices/system/cpu/cpufreq/` is empty and the per-CPU directories do not
exist. The overlay then shows a constant. btop still reports the real clock
because it falls back to `/proc/cpuinfo`.

`/usr/local/bin/steam-cpu-freq` (unit `steam-cpu-freq.service`) cannot create
those directories — sysfs is read-only — so it shadows each existing
`/sys/devices/system/cpu/cpu<N>` inside the container with a view that symlinks
every real entry through `/run/cpu-real` (topology, cache, driver, power keep
working) and adds a real `cpufreq/` directory. The files are then kept in sync
with `/proc/cpuinfo` every second. The mounts live in the container's mount
namespace only.

### Verify

```bash
docker exec steam-headless cat /sys/class/drm/card0/device/gpu_busy_percent   # live %
docker exec steam-headless cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq
docker exec steam-headless systemctl is-active steam-gpu-load steam-cpu-freq
```

Idle desktop UI sits near `0`, the Steam gamepad UI during animations around
`60`, and a 3D load (`glmark2`) pins `100` — that range was measured on this box.

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
cd ~/steam-headless-bc250
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
cd ~/sh2
docker compose stop 2>/dev/null || docker stop steam-headless
tar -czf ~/sh2-backup-$(date +%F).tar.gz data/home state journal
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

| Symptom | Cause / fix |
|---|---|
| `docker: unknown command: docker compose` | compose plugin missing → install per user (§1) |
| SHUI `000`, unit `activating (auto-restart)` | encoder selection failed → `SHUI_ENCODER=software` (§8) |
| `Failed to start RTSP … error 111` | 48010 closed because an app is still flagged as running → reset (§6) |
| `An app is already running on this host (Error 400)` | same stuck flag → reset (§6) |
| `Starting control stream establishment failed: Error 2 … UDP 47999` | control handshake never completed — competing client, half-open session, reused tab → reset (§6) |
| second cursor blinking in the centre, clicks do nothing | `--force-grab-cursor` → baked drop-in removes it (§7.1) |
| stream dies 10–15 s after the app launches | client abort after failed handshake (`Executing Undo Cmd`, no `CLIENT CONNECTED`) |
| container silently back in KDE after boot | `steam-headless-gaming-fallback` fired (4 failures / 60 s) → `journalctl -u steam-headless-gamescope -u steam-headless-steam` |
| `gamescope` exits `status=126/n/a`, `Permission denied` | launcher script on a `noexec` tmpfs (`/run`, `/tmp`) → keep it under `$HOME` (§7.1) |
| `KWin did not become ready for Gamescope` | `steam-headless-compositor.service` failed; gamescope exits by design |
| gamepad UI shows a login screen | `loginusers.vdf` has no `AccountName` → log in once in desktop mode |
| `Configuration file ... is marked world-writable` | cosmetic systemd warnings shipped by the image |
| SHUI `401` on `curl` | normal: portal up, sign-in required |
| `http: TLS handshake error … unknown certificate` in SHUI log | browser has not accepted the self-signed cert for that URL form |
| Moonlight cannot discover the host | needs `network_mode: host`; UDP 47984-48010 open |
| `Couldn't set default-sink [auto_null]: No such entity` | harmless, logged when a session ends |
| container exits immediately | `docker logs steam-headless`: missing `/dev/uhid`, dropped `cgroup: private` / `writable-cgroups=true`, wrong `stop_signal` |
| wrong file ownership inside container | `PUID`/`PGID` must equal `id -u` / `id -g` of the host owner of `SH2_DIR` |
