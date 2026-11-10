#!/usr/bin/env bash
# Create the host directories and metric seed files that docker-compose mounts.
# SH2_DIR may be exported, or read from .env when run from the repository root.
set -euo pipefail

base="${SH2_DIR:-}"
if [[ -z "${base}" && -f .env ]]; then
    base="$(grep -m1 '^SH2_DIR=' .env | cut -d= -f2- || true)"
fi
base="${base:-/opt/steam-headless}"

mkdir -p "${base}/data/home" "${base}/games" "${base}/state" "${base}/journal" "${base}/metrics"
[ -f "${base}/metrics/gpu_busy_percent" ] || printf '00\n' >"${base}/metrics/gpu_busy_percent"
if [[ ! -s "${base}/metrics/gpu_metrics" ]]; then
    if [[ -r /sys/class/drm/card0/device/gpu_metrics ]]; then
        cp /sys/class/drm/card0/device/gpu_metrics "${base}/metrics/gpu_metrics"
    else
        { printf '\200\000\002\002'; head -c 124 /dev/zero | tr '\0' '\377'; } \
            >"${base}/metrics/gpu_metrics"
        printf '\000\000' | dd of="${base}/metrics/gpu_metrics" bs=1 seek=28 conv=notrunc 2>/dev/null
    fi
fi
echo "host paths ready under ${base}"
