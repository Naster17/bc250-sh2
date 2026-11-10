# Troubleshooting

> Moved from the [operations manual](operations.md). Section references `§N`
> point to that manual.

| Symptom | Cause / fix |
|---|---|
| `docker: unknown command: docker compose` | compose plugin missing → install per user (§1) |
| SHUI `000`, unit `activating (auto-restart)` | encoder selection failed → `SHUI_ENCODER=software` (§8) |
| `Failed to start RTSP … error 111` | 48010 closed because an app is still flagged as running → reset (§6) |
| `An app is already running on this host (Error 400)` | same stuck flag → reset (§6) |
| `Starting control stream establishment failed: Error 2 … UDP 47999` | control handshake never completed — competing client, half-open session, reused tab → reset (§6) |
| second cursor blinking in the centre, clicks do nothing | `--force-grab-cursor` → baked drop-in removes it (§7.1) |
| stream dies 10–15 s after the app launches | client abort after failed handshake (`Executing Undo Cmd`, no `CLIENT CONNECTED`) |
| container silently back in KDE after boot | `steam-headless-gaming-fallback` fired (4 failures / 60 s) → `journalctl -u steam-headless-gamescope -u steam-headless-steam` |
| `gamescope` exits `status=126/n/a`, `Permission denied` | launcher script on a `noexec` tmpfs (`/run`, `/tmp`) → keep it under `$HOME` (§7.1) |
| `docker compose up -d` fails: `mkdir /sys/devices/virtual/input: operation not permitted` | a sysfs bind mount whose source only exists after uinput registers; removed in 1.4.1 — the container's own uinput devices show up through `/sys` and its private `/dev/input` |
| black screen with only the cursor after `docker compose up -d` (UI never draws, `steam-ready` exists) | Steam's gamepad UI occasionally fails to come up on a fresh container; the session itself is healthy → `docker exec steam-headless systemctl restart steam-headless-steam` and wait ~20 s |
| `KWin did not become ready for Gamescope` | `steam-headless-compositor.service` failed; gamescope exits by design |
| gamepad UI shows a login screen | `loginusers.vdf` has no `AccountName` → log in once in desktop mode |
| `Configuration file ... is marked world-writable` | cosmetic systemd warnings shipped by the image |
| SHUI `401` on `curl` | normal: portal up, sign-in required |
| `http: TLS handshake error … unknown certificate` in SHUI log | browser has not accepted the self-signed cert for that URL form |
| Moonlight cannot discover the host | needs `network_mode: host`; UDP 47984-48010 open |
| `Couldn't set default-sink [auto_null]: No such entity` | harmless, logged when a session ends |
| container exits immediately | `docker logs steam-headless`: missing `/dev/uhid`, dropped `cgroup: private` / `writable-cgroups=true`, wrong `stop_signal` |
| wrong file ownership inside container | `PUID`/`PGID` must equal `id -u` / `id -g` of the host owner of `SH2_DIR` |
| no Decky icon in the Quick Access Menu | `plugin_loader` inactive, CEF `8080` closed, or the `.cef-enable-remote-debugging` marker was missing when Steam started → [decky-loader.md](decky-loader.md) |
| `plugin_loader` restarts continuously | `~/homebrew/services/PluginLoader` missing or port `1337` taken → `systemctl restart decky-loader-seed`; check `journalctl -u plugin_loader` |
| Decky's CEF socket-close utility logs `lsof`/`gdb` errors | optional utility; this image does not install `lsof`/`gdb`, normal injection is unaffected |
