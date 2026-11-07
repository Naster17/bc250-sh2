#!/usr/bin/env bash
# Steam ships controller_base/*.vdf as defaults; Steam updates replace them, so
# re-apply our "long press Select -> Quick Access Menu" activator on every boot.
#
# Idempotent: the patcher skips files that already contain the binding.
set -euo pipefail

steam_home=/home/steamheadless/.local/share/Steam

# Steam may not have unpacked controller_base yet on a very first boot.
if [[ ! -d "${steam_home}/controller_base" ]]; then
    exit 0
fi

/usr/local/bin/steam-controller-patch --steam-home "${steam_home}"
