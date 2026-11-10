#!/usr/bin/env bash
# Sourced by /usr/local/bin/steam-headless-init as root on every container
# start, before Sunshine and the session targets.
#
# Two jobs:
#   1. Publish whether dynamic client-driven display modes are enabled, so the
#      unprivileged Sunshine prep command can no-op when they are not.
#   2. Keep exactly one managed entry in Sunshine's global_prep_cmd without
#      touching any other prep commands the user added.
#
# The entry is only registered here; upstream auto-config stays disabled so it
# cannot rewrite our software encoder or Sunshine application catalogue.
set -euo pipefail

manage_dynamic_display() {
    local runtime_dir=/run/steam-headless
    local home=/home/steamheadless
    local conf="${home}/.config/sunshine/sunshine.conf"
    local do_cmd=/usr/local/bin/steam-display-request
    local enabled_raw="${STEAM_HEADLESS_DYNAMIC_DISPLAY:-true}"
    local enabled existing updated temporary

    case "${enabled_raw,,}" in
    true | 1 | yes | on) enabled=true ;;
    *) enabled=false ;;
    esac

    install -d -m 0755 "${runtime_dir}"
    printf '%s\n' "$([[ "${enabled}" == true ]] && echo enabled || echo disabled)" \
        >"${runtime_dir}/dynamic-display"
    chown "${PUID:-1000}:${PGID:-1000}" "${runtime_dir}/dynamic-display" 2>/dev/null || true
    chmod 0644 "${runtime_dir}/dynamic-display"

    [[ -f "${conf}" ]] || return 0

    # Sunshine stores this option as a single JSON line. Keep the exact text so
    # an unchanged file is not rewritten on every boot.
    existing="$(awk '
        /^[[:space:]]*global_prep_cmd[[:space:]]*=/ {
            sub(/^[[:space:]]*global_prep_cmd[[:space:]]*=[[:space:]]*/, "")
            print
            exit
        }
    ' "${conf}")"

    if ! updated="$(printf '%s' "${existing:-[]}" | jq -c \
        --arg do_cmd "${do_cmd}" \
        --argjson enabled "${enabled}" '
        (if type == "string" then (fromjson? // []) else . end)
        | (if type == "array" then . else [] end)
        | map(select(
            (((.["do"] // "") | sub("/+$"; "") | split("/") | last) == "steam-display-request") | not
        ))
        | (if $enabled then [{"do": $do_cmd, "undo": ""}] + . else . end)
    ' 2>/dev/null)"; then
        echo "dynamic display: invalid global_prep_cmd in ${conf}; leaving it untouched" >&2
        return 0
    fi

    if [[ "${existing:-[]}" == "${updated}" ]] ||
        [[ -z "${existing}" && "${enabled}" == false ]]; then
        return 0
    fi

    temporary="$(mktemp "${conf}.XXXXXX")"
    if [[ -n "${existing}" ]]; then
        LINE="global_prep_cmd = ${updated}" awk '
            /^[[:space:]]*global_prep_cmd[[:space:]]*=/ {
                if (!replaced) {
                    print ENVIRON["LINE"]
                    replaced = 1
                }
                next
            }
            { print }
        ' "${conf}" >"${temporary}"
    else
        cat "${conf}" >"${temporary}"
        printf 'global_prep_cmd = %s\n' "${updated}" >>"${temporary}"
    fi

    chown "${PUID:-1000}:${PGID:-1000}" "${temporary}"
    chmod 0644 "${temporary}"
    mv -f "${temporary}" "${conf}"

    echo "dynamic display: ${enabled}; Sunshine global_prep_cmd updated"
}

# Never abort the container init because of a display-integration problem.
manage_dynamic_display || echo "dynamic display: setup failed; continuing" >&2
