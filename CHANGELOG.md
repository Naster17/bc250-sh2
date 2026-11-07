# Changelog

All notable changes to this deployment. Versioning: `MAJOR` = breaking host
layout or network change, `MINOR` = image/feature change, `PATCH` = config fix.

## [1.2.0] - 2026-11-07

Long-press Select opens the Quick Access Menu, so a worn Guide button no longer
blocks Performance/Friends/notifications.

### Added

- `rootfs/usr/local/bin/steam-controller-patch`: inserts a `Long_Press` activator
  (1000 ms) on Select bound to `controller_action system_key_1` into Steam's
  `controller_base/basicui.vdf`, `basicui_gamepad.vdf`, `desktop_xboxone.vdf` and
  `templates/controller_xboxone_gamepad_joystick.vdf` — i.e. gamepad UI, desktop
  and default per-game layouts.
- `rootfs/usr/local/sh-init.d/20-patch-steam-controller-base.sh`: re-applies the
  patch on every container start (Steam client updates restore the stock files).

### Fixed

- **Patch reverted by Steam's integrity check**: `BVerifyInstalledFiles` compares
  `controller_base` sizes with the depot manifest and re-extracts mismatches. The
  patcher now keeps every file byte-identical in length by removing exactly the
  number of leading indentation characters it inserts (KeyValues ignores
  whitespace), so verification passes and the binding survives restarts.
- **CRLF handling**: the shipped VDFs use `\r\n`; reading them in text mode
  silently shrank every file by one byte per line and triggered the repair path.
  The patcher now reads and writes bytes and preserves the file's newline style.

## [1.1.0] - 2026-11-07

SteamOS-like gaming mode, our own image, cursor fix.

### Added

- `Dockerfile` derived from `josh5/steam-headless:2`: copies the wrapper, the
  systemd drop-in and the Sunshine defaults over the stock filesystem. Upstream
  files are otherwise untouched, so `docker compose build` is the whole diff.
- Permanent gaming session mode via `STEAM_HEADLESS_SESSION_MODE=gaming`:
  gamescope 3.16.29 nested in KWin, Steam `-gamepadui -steamos3 -steampal`,
  mangoapp overlay, FPS limiter, NIS/fancy scaling.
- `rootfs/usr/local/sh-init.d/10-seed-sunshine-config.sh`: first-boot seeding of
  `~/.config/sunshine/{sunshine.conf,apps.json}`; never overwrites existing files.
- `Makefile` targets `build`, `mode-gaming`, `mode-desktop`, `verify`;
  `scripts/health.sh` readiness check (container, units, session mode, cursor
  flag, healthcheck, SHUI portal, GameStream listeners).
- `docs/operations.md`: full operations manual (ports, Sunshine session model,
  session switching, encoders, backups, troubleshooting).

### Fixed

- **Double cursor and dead clicks in gamepad UI** (`Error 2 … UDP 47999` was a
  different problem): the stock launcher passes `--force-grab-cursor`, which
  `gamescope --help` documents as *"always use relative mouse mode"*. Gamescope
  then keeps the real pointer warped at the screen centre while Steam paints its
  own cursor at the delta position, so clicks land in the middle. The image drops
  that one flag and keeps `--grab` (keyboard only).
- **Gamescope exiting with `status=126/n/a`, `Permission denied`**: the patched
  launcher was written to `/run`, which is a `noexec` tmpfs in this container.
  It now lives in `$HOME/.local/state/steam-headless/`.
- **Steam tile spawned a second client**: the stock app used `detached` plus
  `steam://open/bigpicture`, which started Steam *and* the Desktop app in the same
  session. Tiles now only stream the current screen (`Steam | Game Mode`).
- **Per-session encoder probing**: `encoder = software` is pinned in
  `sunshine.conf`, removing the ~1 s `vaapi → nvenc → vulkan → software` probe and
  the accompanying error spam on every session start.

### Changed

- Deployment moved from a host-mounted drop-in and a wrapper inside the data
  volume to the built image; `~/sh2` now holds data only and `SH2_DIR` is
  parameterised in `.env`.

## [1.0.0] - 2026-11-07

Initial release: Steam Headless 2 deployed on the BC-250 host (`nik@192.168.1.105`).

### Added

- `docker-compose.yml` for `josh5/steam-headless:2` (Fedora 44, Wayland/KWin,
  systemd, SHUI v3) with host networking and the full set of required
  capabilities, security options, tmpfs mounts and device nodes.
- `.env` / `.env.example` parameterisation: `PUID`/`PGID`, `TZ`, render device,
  `SHUI_ENCODER`, `SH2_DIR`.
- Persistent storage split into `data/home` (Steam, Proton, saves, Flatpaks),
  `state` (appliance auth, TLS), `journal`, `games` (mounted at `/mnt/games`).

### Fixed

- **SHUI crash loop on this GPU**: with `SHUI_ENCODER=auto` the server exits with
  `no usable hardware encoder: amd-vaapi: gst_parse_error: no element
  "vah264enc"`. The BC-250 APU (AMD Cyan Skillfish, GFX1013) has no working VAAPI
  encoder — `radeonsi_drv_video.so` fails to initialise and the GStreamer `va`
  plugin registers zero features. Deployment pins `SHUI_ENCODER=software`.
- **Compose plugin missing** on the Alpine host: installed per-user at
  `~/.docker/cli-plugins/docker-compose` (v5.7.0), no root required.
- **Card node mismatch**: the upstream example maps `/dev/dri/card1`; this host
  has a single GPU exposing `card0` + `renderD128`, so the render node is used for
  both compositor and encoder.
- **Stuck Sunshine sessions**: a client that aborts the UDP 47999 handshake leaves
  Sunshine believing an app is running, so every later launch returns `Error 400`
  or `RTSP error 111` (`make reset-sunshine`).

### Removed

- Legacy Steam Headless v1 deployment (`steam-headless:local` built from
  `Dockerfile.debian`, noVNC on 8083): superseded by v2, which needs neither the
  Mesa upgrade nor the Xorg workarounds.

### Known limitations

- No hardware video encoding: SHUI portal and Sunshine encode on the CPU
  (~1 core per stream).
- Sunshine serves one GameStream session at a time; multiple viewers must use the
  SHUI Desktop Portal.
- Only Steam and its children inherit the gamescope environment: launchers must be
  added as non-Steam shortcuts, not as Sunshine apps.
