# Changelog

All notable changes to this deployment. Versioning: `MAJOR` = breaking host
layout or network change, `MINOR` = image/feature change, `PATCH` = config fix.

## [1.4.4] - 2026-11-08

GPU clock in the overlay flickered through nonsense (`7 / 30 / 20 / 41 MHz`) while
amdgpu_top reported a locked 2000 MHz.

### Fixed

- **`hwmon3/freq1_input` is unreliable on this board.** 200 rapid reads returned
  values between 2 and 100 MHz with 2000 only occasionally, and both overlays read
  exactly that attribute. `gpu_metrics.current_gfxclk` (offset 76) is correct at
  the same moment.
- `steam-gpu-load` now bind-mounts its own file over `freq1_input` inside the
  container (namespace-local, idempotent) and publishes `current_gfxclk` there in
  Hz each cycle. Verified: ten consecutive reads return `2000000000` after a
  container restart, matching amdgpu_top.

## [1.4.3] - 2026-11-08

### Added

- `docs/operations.md` §17: cold boot / fresh deploy contract — every mount source
  and why it exists, plus what `restart: unless-stopped` does on reboot.

### Changed

- `make dirs` generates the `gpu_metrics` seed without needing `python3` on the
  host (`printf` + `head`/`tr`, activity field zeroed so a stopped publisher can
  never render `655%`).
- `steam-cpu-freq` exits early when the kernel already provides a cpufreq driver,
  so the shadow view never overrides real per-core frequencies on other boards.

## [1.4.2] - 2026-11-08

### Added

- `make dirs` provisions every host path compose mounts — `data/home`, `games`,
  `state`, `journal`, `metrics` — and seeds the two metric files
  (`gpu_busy_percent`, `gpu_metrics`) that must exist as *files* before the
  container starts. Without them Docker creates directories at those paths and
  the bind mounts fail. `make up` now depends on it, so the documented path
  cannot miss the step.

## [1.4.1] - 2026-11-08

Cold boot left the container unstartable:

```text
error while creating mount source path '/sys/devices/virtual/input':
mkdir /sys/devices/virtual/input: operation not permitted
```

### Fixed

- **Dropped the `/sys/devices/virtual/input` bind mount.** That sysfs tree only
  appears once a virtual input device is registered, so on a fresh boot Docker
  tried to create the source path inside sysfs and failed, aborting the whole
  container. The container registers its own uinput devices (Steam's virtual
  gamepad) and sees them through the regular `/sys` mount plus its private
  `/dev/input` tmpfs, so the bind was redundant as well as fragile. Verified
  after removal: `/dev/input` gets `event*`/`js0`, `/sys/devices/virtual/input`
  appears once uinput registers, health `33/0`.

## [1.4.0] - 2026-11-08

Release hygiene and the last two overlay metrics.

### Changed

- **Base image pinned by digest** (`josh5/steam-headless:2@sha256:c60f4d72…`). The
  tag is mutable and the deltas assume an exact filesystem layout; bump tag and
  digest together.
- README and `docs/operations.md` describe the metric publishers, the 500 ms
  controller long press, and the custom animation directory (§16).
- `docs/operations.md` gained the black-gamepad-UI recovery note (restart
  `steam-headless-steam` after a container recreate).

### Added

- Documentation for custom boot/suspend animations: Steam reads
  `~/.local/share/Steam/config/uioverrides/movies/*.webm`, with
  `deck-suspend-animation.webm` and
  `deck-suspend-animation-from-throbber.webm` for the sleep clips. The media
  itself is personal and stays out of the repository.

## [1.3.2] - 2026-11-08

GPU usage now moved, but read far too high: the overlay showed `75-85%` while
amdgpu_top reported `20-25%`.

### Fixed

- **Per-descriptor double counting.** `drm-engine-gfx` is a cumulative per-client
  counter, and every descriptor of a client repeats it (a process with four DRM
  descriptors produced four identical entries). Summing per `(pid, fd)` inflated
  the percentage roughly by the number of descriptors — measured 29 descriptors
  against 18 real clients. Counters are now de-duplicated by `drm-client-id`, the
  same key amdgpu_top aggregates by.
- **Prefer the driver's own number.** `average_gfx_activity` is centipercent
  (`5470` == `54.70%`), exactly what amdgpu_top displays. It is used whenever the
  SMU reports a valid sample (`0xFFFF` means "no sample"); the fdinfo path is now
  only a fallback, and it re-baselines before it is used again so the first
  delta after a gap cannot spike.

## [1.3.1] - 2026-11-08

GPU usage still read `655%` after 1.3.0. The 1.3.0 fix was correct but incomplete:
the overlay in gaming mode is MangoHud, not Steam's own overlay.

### Fixed

- **MangoHud prefers `gpu_metrics` over `gpu_busy_percent`.** `mangoapp` polls the
  binary `/sys/class/drm/card0/device/gpu_metrics` table and overwrites
  `metrics.load` from it on every refresh, so the sysfs percentage was ignored.
  The table's `average_gfx_activity` (offset 28 of the 128-byte v2.x layout) is
  `0xFFFF` on this APU, and MangoHud's centipercent heuristic divides anything
  above 100 by 100: `65535 / 100 = 655`.
- `steam-gpu-load` now rewrites that table each cycle: real table from the
  read-only device-directory bind mount, activity bytes patched with the measured
  percentage, everything else (temperature, clocks, power) passed through.
- The sysfs percentage shim stays — Steam's own overlay reads it, and MangoHud
  still uses it when the metrics table is unreadable.

Verified in the container: `gpu_metrics` activity tracks `gpu_busy_percent`
(`63` vs `63`) while `temperature_gfx` matches the live driver value.

## [1.3.0] - 2026-11-07

Steam's performance overlay reported impossible hardware numbers on the BC-250:
GPU usage stuck around `655%`, CPU clock frozen at `1397 MHz`.

### Added

- `steam-gpu-load.service` — publishes GPU utilisation for Steam's overlay.
  `gameoverlayui.so` reads `/sys/class/drm/card0/device/gpu_busy_percent`, and the
  amdgpu driver answers that read with `EOPNOTSUPP` on GFX1013, so the overlay
  showed garbage. The daemon computes the number the way `amdgpu_top` does: sum
  of the `drm-engine-gfx` deltas from `/proc/<pid>/fdinfo/<fd>` over a 500 ms
  window, written in place into a file bind-mounted over the sysfs path.
  Measured: `0` for an idle desktop, `~63` for the animating gamepad UI, `100`
  under `glmark2`.
- `steam-cpu-freq.service` — publishes the CPU clock. The BC-250 kernel registers
  no cpufreq driver, so `cpu*/cpufreq/scaling_cur_freq` does not exist and the
  overlay showed a constant. The service shadows each existing
  `/sys/devices/system/cpu/cpu<N>` inside the container with a view that symlinks
  every real entry through `/run/cpu-real` and adds a real `cpufreq/` directory,
  fed from `/proc/cpuinfo` (the same fallback btop uses). Container namespace
  only; the host is untouched.

### Notes

- The GPU metrics file lives at `${SH2_DIR}/metrics/gpu_busy_percent` and must
  exist before the container starts; see `docs/operations.md` §10.

## [1.2.3] - 2026-11-07

Long press felt sluggish; the Quick Access Menu needed a full second.

### Changed

- `long_press_time` is now `500` ms (was `1000`). The value lives in the
  `LONG_PRESS_MS` constant of `steam-controller-patch`, so changing it again is a
  one-line edit plus rebuild.
- Stale blocks are removed when their timing differs from `LONG_PRESS_MS`, and the
  freed bytes are returned as trailing spaces, so files keep their exact depot
  size and a second run still reports `nothing to do`.

## [1.2.2] - 2026-11-07

The Quick Access Menu opened on **Start** instead of **Select**.

### Fixed

- **Wrong input targeted.** The patch bound `Long_Press` to `"button_escape"`,
  but the shipped layouts map `"button_escape"` to `game_action Default START`
  and `"button_menu"` to `Default SELECT`. `TARGET_INPUT` is now
  `"button_menu"`, so holding Select opens the panel and Start is untouched
  again.
- **Retargeting instead of skip.** Blocks are now removed from wherever they
  already are before insertion, so pointing the patcher at a different input
  moves an existing patch in place; the byte size stays identical and a second
  run reports `nothing to do`.

## [1.2.1] - 2026-11-07

Fix for a regression introduced by 1.2.0: the gamepad stopped working in the
gamepad UI (`CPrepareConfigWorker failed for AppID 769`,
`No config for controller found locally`).

### Fixed

- **Dropped `{` in the layouts.** The inserter copied only the `"activators"`
  line and the brace after it, silently skipping the brace that opens the
  `"button_escape"` input block. The result was invalid KeyValues, so Steam could
  not prepare *any* controller config and every button was dead.
- **Duplicate activator guard.** Some stock inputs already carry a `Long_Press`
  binding; adding a second one is equally fatal. Those inputs are now skipped.
- **Validation before writing.** The patcher now contains a KeyValues parser and
  refuses to write a file that does not parse, that ends up with duplicate
  activators, or whose byte size changed. Balancing is re-validated after the
  whitespace strip.
- Repair path used on the live box: strip the inserted blocks, restore the
  missing braces, pad to the depot size, re-parse, then restart Steam — verified
  with `0` `CPrepareConfigWorker` lines and a working pad.

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
