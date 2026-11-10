#!/usr/bin/env bash
# Install or verify the host-side BC-250 fan arbiter (bc250fc).
#
# The container never writes sysfs: bc250-fan-curve owns pwm2 and exposes
# /run/bc250-fan/control to the Decky plugin and the fan CLI.  A BC-250 host
# without this daemon can still run Steam, but the Fantastic fan controls have
# no effect and `make verify` reports the fan arbiter missing.
set -euo pipefail

readonly repo="${BC250FC_REPO:-https://github.com/Naster17/bc250fc.git}"
readonly ref="${BC250FC_REF:-v0.2.0}"

run_root() {
    if [[ "$(id -u)" -eq 0 ]]; then
        "$@"
    elif command -v doas >/dev/null 2>&1; then
        doas "$@"
    elif command -v sudo >/dev/null 2>&1; then
        sudo "$@"
    else
        echo "error: root access is required to install ${repo}; install doas or sudo" >&2
        return 1
    fi
}

service_active() {
    if command -v rc-service >/dev/null 2>&1; then
        rc-service bc250-fan-curve status >/dev/null 2>&1
    elif command -v systemctl >/dev/null 2>&1; then
        systemctl is-active --quiet bc250-fan-curve
    else
        return 1
    fi
}

start_service() {
    if command -v rc-service >/dev/null 2>&1; then
        run_root rc-service bc250-fan-curve start
    elif command -v systemctl >/dev/null 2>&1; then
        run_root systemctl start bc250-fan-curve
    else
        echo "error: neither OpenRC nor systemd found" >&2
        return 1
    fi
}

if command -v bc250-fan-curve >/dev/null 2>&1 && service_active; then
    echo "bc250-fan-curve already installed and running"
    exit 0
fi

if ! command -v git >/dev/null 2>&1; then
    echo "error: git is required to install bc250fc ${ref}" >&2
    exit 1
fi

tmp="$(mktemp -d)"
trap 'rm -rf "${tmp}"' EXIT

echo "installing bc250fc ${ref} from ${repo}"
git clone --depth 1 --branch "${ref}" "${repo}" "${tmp}/bc250fc"
run_root sh "${tmp}/bc250fc/install.sh"

if ! service_active; then
    start_service
fi
if ! service_active; then
    echo "error: bc250-fan-curve did not start; check the installer output" >&2
    exit 1
fi
[[ -d /run/bc250-fan ]] || {
    echo "error: /run/bc250-fan was not created by bc250-fan-curve" >&2
    exit 1
}
echo "bc250-fan-curve installed and running"
