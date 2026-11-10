#!/bin/sh
# Readiness check for the BC-250 Steam Headless stack. Read-only.
# Exit code 0 = everything that must be up is up.
set -u

CONTAINER="${CONTAINER:-steam-headless}"
BASE_UNITS="steam-headless-authd steam-headless-shinputd steam-headless-compositor \
steam-headless-steam steam-headless-sunshine steam-headless-shui \
decky-loader-seed plugin_loader"

fail=0
row() { printf '%-34s %s\n' "$1" "$2"; }
ok() { row "$1" "$2"; }
bad() {
	row "$1" "$2"
	fail=1
}

printf '== container ==\n'
status=$(docker inspect -f '{{.State.Status}}' "$CONTAINER" 2>/dev/null || echo missing)
image=$(docker inspect -f '{{.Config.Image}}' "$CONTAINER" 2>/dev/null || echo missing)
if [ "$status" = "running" ]; then ok container "running ($image)"; else bad container "$status"; fi

printf '\n== systemd units ==\n'
for unit in $BASE_UNITS; do
	state=$(docker exec "$CONTAINER" systemctl is-active "$unit" 2>/dev/null || echo unknown)
	if [ "$state" = "active" ]; then ok "$unit" "$state"; else bad "$unit" "$state"; fi
done

printf '\n== session mode ==\n'
mode=$(docker exec "$CONTAINER" systemctl is-active steam-headless-gaming.target 2>/dev/null || echo unknown)
if [ "$mode" = "active" ]; then
	ok "session" gaming
	frontend=steam-headless-gamescope
else
	ok "session" desktop
	frontend=steam-headless-plasma
fi
state=$(docker exec "$CONTAINER" systemctl is-active "$frontend" 2>/dev/null || echo unknown)
if [ "$state" = "active" ]; then ok "$frontend" "$state"; else bad "$frontend" "$state"; fi

if [ "$mode" = "active" ]; then
	# gamescope renames its process to gamescope-wl, so match the argv instead.
	pid=$(docker exec "$CONTAINER" pgrep -f '^/usr/bin/gamescope' 2>/dev/null | head -n1)
	argv=$(docker exec "$CONTAINER" sh -c "cat /proc/${pid:-0}/cmdline" 2>/dev/null | tr '\0' '\n')
	case "$argv" in
	*--force-grab-cursor*) bad "cursor fix" "--force-grab-cursor present" ;;
	*--steam*) ok "cursor fix" "--force-grab-cursor absent" ;;
	*) bad "cursor fix" "gamescope argv unreadable" ;;
	esac
fi

printf '\n== dynamic display ==\n'
daemon=$(docker exec "$CONTAINER" systemctl is-active steam-display-syncd 2>/dev/null || true)
daemon=${daemon:-unknown}
if [ "$daemon" = "active" ]; then ok "steam-display-syncd" "$daemon"; else bad "steam-display-syncd" "$daemon"; fi
enabled=$(docker exec "$CONTAINER" cat /run/steam-headless/dynamic-display 2>/dev/null || true)
enabled=${enabled:-unknown}
case "$enabled" in
enabled)
	if docker exec "$CONTAINER" grep -q 'steam-display-request' /home/steamheadless/.config/sunshine/sunshine.conf 2>/dev/null; then
		ok "client display modes" enabled
	else
		bad "client display modes" "prep command missing"
	fi
	;;
disabled) ok "client display modes" disabled ;;
*) bad "client display modes" "state unreadable" ;;
esac

printf '\n== health ==\n'
summary=$(docker exec "$CONTAINER" /usr/local/bin/steam-headless-healthcheck 2>/dev/null | tail -n1)
case "$summary" in
health=healthy*) ok healthcheck "$summary" ;;
*) bad healthcheck "${summary:-no output}" ;;
esac

printf '\n== portal ==\n'
code=$(docker exec "$CONTAINER" curl -sk -o /dev/null -w '%{http_code}' https://127.0.0.1:8483/ 2>/dev/null || echo 000)
case "$code" in
200 | 302 | 401) ok "SHUI https://127.0.0.1:8483" "HTTP $code" ;;
*) bad "SHUI https://127.0.0.1:8483" "HTTP $code (crash loop?)" ;;
esac

printf '\n== GameStream ==\n'
listeners=$(docker exec "$CONTAINER" ss -lnt 2>/dev/null | grep -cE '47984|47989|47990|48010')
if [ "${listeners:-0}" -eq 4 ]; then ok "sunshine tcp listeners" 4; else bad "sunshine tcp listeners" "$listeners/4"; fi
sockets=$(docker exec "$CONTAINER" ss -lun 2>/dev/null | grep -cE '4799[0-9]|4800[0-9]')
case "${sockets:-0}" in
0) ok "sunshine stream ports" idle ;;
*) ok "sunshine stream ports" "session active ($sockets sockets)" ;;
esac

printf '\n'
if [ "$fail" -eq 0 ]; then
	echo "RESULT: OK"
	exit 0
fi
echo "RESULT: FAILED - see docs/troubleshooting.md"
exit 1
