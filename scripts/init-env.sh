#!/usr/bin/env bash
# Create .env with safe, host-specific defaults.
#
# Existing .env files are never rewritten: they may contain a site's SH2_DIR,
# PUID/PGID, TZ or deploy target.  A fresh checkout gets a writable data root
# under $HOME (or /opt when run as root) and the current host identity.
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -f .env ]]; then
    echo ".env already exists; keeping it"
    exit 0
fi

if [[ ! -f .env.example ]]; then
    echo "error: .env.example is missing" >&2
    exit 1
fi

uid="$(id -u)"
gid="$(id -g)"
if [[ "${uid}" -eq 0 ]]; then
    sh2_dir="${SH2_DIR:-/opt/steam-headless}"
else
    sh2_dir="${SH2_DIR:-${HOME}/steam-headless}"
fi

tz=""
if [[ -r /etc/timezone ]]; then
    tz="$(head -n1 /etc/timezone | tr -d '[:space:]')"
fi
if [[ -z "${tz}" && -L /etc/localtime ]]; then
    target="$(readlink -f /etc/localtime 2>/dev/null || true)"
    case "${target}" in
        */zoneinfo/*) tz="${target##*/zoneinfo/}" ;;
    esac
fi
if [[ -z "${tz}" ]] && command -v timedatectl >/dev/null 2>&1; then
    tz="$(timedatectl show -p Timezone --value 2>/dev/null || true)"
fi
[[ -n "${tz}" ]] || tz="UTC"

cp .env.example .env
sed -i \
    -e "s|^SH2_DIR=.*|SH2_DIR=${sh2_dir}|" \
    -e "s|^PUID=.*|PUID=${uid}|" \
    -e "s|^PGID=.*|PGID=${gid}|" \
    -e "s|^TZ=.*|TZ=${tz}|" \
    .env

echo "created .env: SH2_DIR=${sh2_dir} PUID=${uid} PGID=${gid} TZ=${tz}"
echo "edit .env only if you need a different data root or deploy target"
