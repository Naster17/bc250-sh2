# Fantastic BC250

A BC-250 port of [NGnius/Fantastic](https://github.com/NGnius/Fantastic), the
Decky Loader fan-control plugin. The upstream plugin targets the Steam Deck's
`jupiter` hwmon (`hwmon5`, `fan1_target`, `recalculate`,
`jupiter-fan-control.service`). None of those exist on the BC-250.

This fork keeps the upstream Decky UI and nRPC/USDPL backend API, and replaces
the fan backend with a BC-250 adapter:

| Upstream Steam Deck | BC-250 |
|---|---|
| `hwmon5/fan1_target` (RPM) | `/run/bc250-fan/control` (`pwm` 0-255) |
| `hwmon5/recalculate` | `mode=auto` control record |
| `hwmon5/fan1_input` | `nct6686/fan2_input` (CPU_FAN1 RPM) |
| `thermal_zone0/temp` | `amdgpu/temp1_input` (GPU edge), `k10temp` fallback |
| `jupiter-fan-control.service` | host `bc250-fan-curve` daemon |

The plugin never writes sysfs. It sends a heartbeat to the host daemon:

```text
mode=manual
pwm=128
source=decky
updated=1762770000
```

The host daemon (`bc250fc`) applies the target and is the only writer of
`pwm2`. If the plugin is disabled, the container stops, or the heartbeat is
older than 5 seconds, the host daemon returns to its own GPU-edge curve. The
host CLI uses the same file with `source=cli`, so `doas fan 50` and
`doas fan auto` continue to work while the daemon stays alive.

## Files

| Path | Purpose |
|---|---|
| `dist/index.js` | Upstream Fantastic 0.5.1 frontend, unmodified |
| `bin/backend` | Patched Rust backend (BC-250 control bridge) |
| `backend-rs/` | Patched backend source, GPL-3.0-only |
| `frontend-src/` | Upstream frontend source, for reference |
| `main.py` | Upstream Decky plugin entry point |

## Build

```sh
cd backend-rs
cargo build --release
install -m 0755 target/release/fantastic-rs ../bin/backend
```

The published crates `usdpl-back 0.11`, `nrpc 0.10` and `usdpl-build 0.11` are
used instead of upstream's sibling git checkouts. `sysfuss` was removed; this
fork uses plain `std::fs` paths because it needs only a handful of sysfs files.

## Install

The Steam Headless BC-250 image bakes this directory into
`/opt/decky-loader/plugins/fantastic-bc250` and `decky-loader-seed` copies it
into `~/homebrew/plugins/fantastic-bc250` on first boot. It is installed by
default but disabled: the host curve remains authoritative until the user
enables the custom fan curve in the Decky Quick Access Menu.

## License

GPL-3.0-only, inherited from Fantastic. See `LICENSE` and the upstream project.
