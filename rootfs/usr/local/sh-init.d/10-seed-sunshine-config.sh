#!/usr/bin/env bash
# Steam Headless runs /usr/local/sh-init.d/*.sh on every container start, as
# root, before the session targets come up.
#
# Seed the Sunshine config we own (the compose file disables auto-config, so
# nothing else writes these files). Existing files are never touched: pairings,
# encoder tuning and manual app edits survive container recreates.
set -euo pipefail

home=/home/steamheadless
conf_dir="${home}/.config/sunshine"
defaults=/usr/share/steam-headless-custom
puid="${PUID:-1000}"
pgid="${PGID:-1000}"

[[ -d "${defaults}" ]] || exit 0
[[ -d "${home}" ]] || exit 0

install -d -o "${puid}" -g "${pgid}" -m 0755 "${conf_dir}"

for file in sunshine.conf apps.json; do
    if [[ ! -e "${conf_dir}/${file}" ]]; then
        install -o "${puid}" -g "${pgid}" -m 0644 "${defaults}/${file}" "${conf_dir}/${file}"
        echo "seeded ${conf_dir}/${file} from ${defaults}/${file}"
    fi
done
