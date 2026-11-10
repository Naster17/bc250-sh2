#!/usr/bin/env bash
# One-command BC-250 host bootstrap.
#
# Creates a user-specific .env, verifies Docker/device prerequisites, installs
# the pinned host fan arbiter when needed, builds the image and starts the
# container.  Run as the normal host user (not root); it uses doas/sudo only for
# kernel modules and the host fan service.
set -euo pipefail

cd "$(dirname "$0")/.."

run_root() {
    if [[ "$(id -u)" -eq 0 ]]; then
        "$@"
    elif command -v doas >/dev/null 2>&1; then
        doas "$@"
    elif command -v sudo >/dev/null 2>&1; then
        sudo "$@"
    else
        echo "error: root access is required for the host fan daemon and modules" >&2
        return 1
    fi
}

require_command() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "error: $1 is required; install it first" >&2
        exit 1
    }
}

require_command docker
docker compose version >/dev/null 2>&1 || {
    echo "error: Docker Compose v2 is required (docker compose)" >&2
    exit 1
}
docker info >/dev/null 2>&1 || {
    echo "error: cannot talk to Docker; start it and ensure ${USER:-this user} is in the docker group" >&2
    exit 1
}

cgroup="$(docker info --format '{{.CgroupVersion}}' 2>/dev/null || true)"
if [[ "${cgroup}" != "2" ]]; then
    echo "error: Docker is using cgroup v1; this stack requires cgroup v2" >&2
    exit 1
fi

# Input and uhid are normally modules; fuse is used by the Proton/Steam stack.
for module in uinput uhid fuse; do
    if [[ ! -e "/dev/${module}" ]]; then
        run_root modprobe "${module}" 2>/dev/null || true
    fi
done

for device in /dev/dri/renderD128 /dev/uinput /dev/uhid /dev/fuse; do
    if [[ ! -e "${device}" ]]; then
        echo "error: missing ${device}" >&2
        echo "check the BC-250 kernel modules and the Docker device permissions" >&2
        exit 1
    fi
done

./scripts/init-env.sh

if [[ "${SKIP_FAN:-0}" != "1" ]]; then
    ./scripts/install-fan-daemon.sh
else
    echo "SKIP_FAN=1: leaving the host fan daemon unchanged"
fi

make dirs
make build
make up

echo "waiting for the container healthcheck..."
healthy=0
for _ in $(seq 1 90); do
    summary="$(docker exec steam-headless /usr/local/bin/steam-headless-healthcheck 2>/dev/null | tail -n1 || true)"
    case "${summary}" in
        health=healthy*)
            healthy=1
            break
            ;;
    esac
    sleep 2
done

if [[ "${healthy}" -ne 1 ]]; then
    echo "warning: container started but did not become healthy in 180 s" >&2
    echo "run: make logs && make verify" >&2
    exit 1
fi

make verify
echo
echo "ready: https://$(hostname -f 2>/dev/null || hostname):8483"
echo "first boot: read the SHUI bootstrap password in 'docker compose logs'"
