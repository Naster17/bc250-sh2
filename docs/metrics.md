# Performance overlay metrics (GPU %, CPU MHz)

> Moved from the [operations manual](operations.md).

The BC-250 exposes less telemetry than a normal desktop GPU, and Steam's overlay
(`gameoverlayui.so`) reads plain sysfs, so two numbers come out wrong out of the
box. Both are fixed by publishing the values the overlay expects, inside the
container only.

## GPU utilisation

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

The overlay in gaming mode is **MangoHud** (`mangoapp`, spawned by gamescope), not
Steam's own overlay. MangoHud reads two sources and prefers the second:

1. `/sys/class/drm/card0/device/gpu_busy_percent` (`AMDGPU::get_sysfs_metrics`)
2. the binary `/sys/class/drm/card0/device/gpu_metrics` table
   (`AMDGPU::get_samples_and_copy`, which overwrites `metrics.load` on every poll)

In that 128-byte table (header `structure_size=128 format_revision=2
content_revision=2`) the field `average_gfx_activity` sits at **offset 28**. The
SMU reports `0xFFFF` there on this APU, and MangoHud's centipercent heuristic
(`if (load > 100) load /= 100`) turns `65535` into `655` — that is the 655% in the
overlay. `gpu_busy_percent` cannot help because it is overwritten by the metrics
poll.

So the same daemon rewrites the table every cycle: it reads the real table through
`/run/gpu-device/gpu_metrics` (the PCI device directory bind-mounted read-only),
patches the two bytes at offset 28 with the measured percentage, and writes the
result into the file shadowing the sysfs path. Every other field (temperatures,
clocks, power) is passed through untouched, so those keep tracking the hardware.
The activity field is written as a plain percentage, not the driver's
centipercent, because values ≤ 100 are exactly what MangoHud renders.

Where the percentage comes from, in order:

1. `average_gfx_activity` of the real table, rounded from centipercent. This is
   the driver's own number and what amdgpu_top shows, so the overlay matches it.
   `0xFFFF` means the SMU has no sample for that cycle.
2. Only then, the per-client `drm-engine-gfx` counters from
   `/proc/<pid>/fdinfo/<fd>` (`libamdgpu_top/src/stat/fdinfo/proc_info.rs` does
   the same). They must be aggregated **by `drm-client-id`**, never per
   descriptor: every fd of a client repeats the client's cumulative counter, and
   summing per fd multiplies the load (29 descriptors vs 18 clients on this box
   gave the `75-85%` readings). The baseline is re-taken whenever the fallback
   resumes, so the first delta after a gap cannot spike.

The host files must exist before the container starts:

```bash
mkdir -p "${SH2_DIR:-/opt/steam-headless}/metrics"
printf '00\n' > "${SH2_DIR:-/opt/steam-headless}/metrics/gpu_busy_percent"
cp /sys/class/drm/card0/device/gpu_metrics \
   "${SH2_DIR:-/opt/steam-headless}/metrics/gpu_metrics"   # 128-byte seed
```

## GPU clock

The BC-250 8-core unlock corrupts the clock reporting of the driver: with a
locked 350 MHz the raw `hwmon/hwmon<N>/freq1_input` reads `100 MHz` forever, and
`gpu_metrics.current_gfxclk` carries the same nonsense, so the overlay showed
`100 MHz` (or flickering `7 / 30 / 20 / 41`) while amdgpu_top reported the real
value. The userspace SMU governor (`cyan-skillfish-governor-smu`, which also
drives the power plans) reads the clock over SMU and republishes it as bind
overlays on the host's `freq1_input`, `pp_dpm_sclk` and the clock fields of
`gpu_metrics`. That is the number to trust.

Two traps:

- A bind of `/sys/class/drm/card0/device` into the container is a snapshot of
  the host's mount tree. The governor re-creates its overlays every time it
  restarts, which is exactly what a power-plan change does, so the container
  kept reading the raw (corrupted) file after each switch.
- `mangoapp` opens `freq1_input` once at startup and keeps the descriptor, so a
  shadow mounted after the compositor started never reaches the overlay.

`steam-gpu-load` therefore reads the governor's value through
`/host-proc/1/root/sys/class/hwmon/*/freq1_input` (the host's PID 1 root, so the
lookup always follows the host's current mounts), then republishes it at the
paths the overlays read: its own file bind-mounted over `freq1_input` in Hz, and
the `average_gfxclk_frequency`/`current_gfxclk` fields of the shadowed
`gpu_metrics`. `systemd` starts the service before
`steam-headless-gamescope.service` so the mount exists before `mangoapp` opens
the attribute. Verified with a locked 350 MHz plan: the host attribute, the
published file and the container's `freq1_input` all read `350000000`, and the
overlay shows 350 MHz.

The raw table remains the fallback when the governor is not running. Values
below 200 MHz are treated as corruption: the unlock reports 2..100 MHz, and the
attribute reads a bare `100` for a moment while the governor re-creates its
overlay during a plan change, which is what made the overlay flash 100 MHz.

The published clock is the live one, not the plan value. Sampled every 200 ms
while `vkmark` loaded the GPU on the 1000 MHz plan:

```text
1000 1000 1200 1200 1200 1200 1200 1000 1000 1000 1200 1200 1400 1400 1400 1200 1000
```

Intermediate steps appear because the governor ramps in 200 MHz increments
(`frequency-thresholds.adjust`, ramp-rates); the display lags at most one
governor sample plus one publish cycle, so about 1 s.

## Starting on demand

The container has `restart: "no"` and the docker daemon is not enabled in a
runlevel, so a host boot leaves the machine idle. Start it explicitly:

```shell
doas rc-service docker start          # only after a boot
docker start steam-headless           # plain start, keeps the existing container
# or, after changing compose/Dockerfile:
cd ~/steam-headless-bc250 && docker compose up -d
```

`docker start` re-runs the container with its configured mounts, so the host's
sysfs overlays are re-resolved and the GPU clock path stays correct.

## CPU clock

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

## Verify

```bash
docker exec steam-headless cat /sys/class/drm/card0/device/gpu_busy_percent   # live %
docker exec steam-headless cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq
docker exec steam-headless systemctl is-active steam-gpu-load steam-cpu-freq
```

Idle desktop UI sits near `0`, the Steam gamepad UI during animations around
`60`, and a 3D load (`glmark2`) pins `100` — that range was measured on this box.
