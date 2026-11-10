# BC-250 fan control

The BC-250 fan header is driven by the Nuvoton NCT6686D Super I/O. The
out-of-tree `nct6687` kernel module exposes it as the `nct6686` hwmon device:

| Node | Meaning |
|---|---|
| `pwm2` | CPU_FAN1 duty cycle, 0–255 |
| `pwm2_enable` | `1` = manual, `2` = BIOS/auto |
| `fan2_input` | CPU_FAN1 RPM |
| `pwm1`, `pwm3`–`pwm5` | J4003 fan pins (optional chassis fans) |

The host-side project is
[`Naster17/bc250fc`](https://github.com/Naster17/bc250fc). Its
`bc250-fan-curve` daemon is the **only writer of `pwm2`**. The container never
writes sysfs.

## Architecture

```mermaid
flowchart LR
    P[Fantastic BC250<br/>Decky plugin] -->|heartbeat| C[/run/bc250-fan/control]
    F[doas fan 50 / fan auto] -->|sticky request| C
    C --> D[host bc250-fan-curve]
    D -->|pwm2| H[NCT6686 CPU_FAN1]
    P -. reads .-> S[/sys nct6686 + amdgpu/]
```

The control file is a small key/value record:

```text
mode=manual
pwm=128
source=decky
updated=1762770000
```

- `source=cli` is sticky until `fan auto`.
- `source=decky` is a heartbeat; the host daemon accepts it only while
  `updated` is at most 5 seconds old (`BC250_FAN_CONTROL_TTL` overrides).
- Missing, malformed, stale, or `mode=auto` records fall back to the host
  GPU-edge curve. If the temperature sensor disappears, both sides force 100%.

## Default Decky plugin

The image bakes `plugins/fantastic-bc250` into
`/opt/decky-loader/plugins/fantastic-bc250`. `decky-loader-seed` copies it to
`~/homebrew/plugins/fantastic-bc250` only when that directory does not exist.
It is a GPL-3.0 fork of [NGnius/Fantastic](https://github.com/NGnius/Fantastic)
with the Steam Deck `jupiter` backend replaced by the BC-250 bridge.

It is installed but **disabled by default**: the host curve keeps running until
you enable the custom curve in the Quick Access Menu. Disabling it, closing the
plugin, or stopping the container returns control to the host daemon within
five seconds.

## Host setup

On the host (Alpine/OpenRC here):

```sh
git clone https://github.com/Naster17/bc250fc.git
cd bc250fc
doas sh install.sh
doas rc-service bc250-fan-curve restart
```

The unit creates `/run/bc250-fan`. Compose bind-mounts it read-write:

```yaml
- /run/bc250-fan:/run/bc250-fan
```

The container's `/sys` remains read-only. The plugin only needs to read
`nct6686/fan2_input` and `amdgpu/temp1_input`; all writes go through the
control file.

## Use

Quick Access Menu → Decky → Fantastic BC250. The graph edits the GPU-edge
curve; the toggle enables/disables the plugin. The host CLI remains usable:

```sh
doas fan 50
doas fan auto
doas fan status
doas fan 3 60          # J4003 channel, direct sysfs
```

`fan 50` and `fan auto` no longer stop the daemon; they write the shared
control file, so the daemon stays alive and can take over immediately.

## Verification

```sh
# host daemon
doas rc-service bc250-fan-curve status
cat /run/bc250-fan/control

# container plugin installed
docker exec steam-headless test -f \
  /home/steamheadless/homebrew/plugins/fantastic-bc250/plugin.json

# plugin backend started
docker exec steam-headless journalctl -u plugin_loader -n 80 --no-pager

# manual heartbeat (as root in the container) — host pwm2 follows
docker exec steam-headless sh -c \
  'printf "mode=manual\npwm=128\nsource=decky\nupdated=$(date +%s)\n" > /run/bc250-fan/control'
```

Remove the record or wait five seconds to return to the host curve.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Plugin says fan speed error | `nct6686` missing or the container cannot see `/sys/class/hwmon`; check `lsmod` on the host and `/sys/class/hwmon/*/name` in the container |
| Plugin changes are overwritten | Host `bc250-fan-curve` is not running the arbiter version, or the heartbeat is stale. Reinstall `bc250fc` and check `/run/bc250-fan/control` |
| `fan 50` works but plugin does not | Plugin is disabled, or `source=decky` heartbeat is older than 5 s; check the control file |
| Container stops and fan stays loud | The host daemon should take over within 5 s. Check `rc-service bc250-fan-curve status` and host logs |
| `fan auto` does nothing | The plugin is enabled and immediately writes a new manual heartbeat; disable the plugin first |
