# Decky Loader

Decky Loader adds a plugin menu to Steam's gamepad UI: themes, controller
tweaks, performance tools and a plugin store. This image carries a pinned
release so a fresh container does not download it at boot.

| Item | Value |
|---|---|
| Loader | Decky Loader `v3.3.1` (stable) |
| Binary in image | `/opt/decky-loader/PluginLoader` |
| Pinned checksum | `7bb73b0502c49e7194f34f9ce4ddb6777764e9277d7a5e54665f66460d50c315` |
| User state | `/home/steamheadless/homebrew/` (`services`, `plugins`, `settings`, `data`, `logs`) |
| Systemd units | `decky-loader-seed.service`, `plugin_loader.service` |
| Local ports | `1337` (plugin loader API), `8080` (Steam CEF remote debugging) |
| Upstream | <https://github.com/SteamDeckHomebrew/decky-loader> |

## Boot sequence

1. `decky-loader-seed.service` runs before the session target. It creates
   `~/homebrew`, copies `PluginLoader` only when no executable is present,
   writes `~/homebrew/services/.loader.version`, and creates Steam's
   `.cef-enable-remote-debugging` marker with the `steamheadless` owner.
2. `plugin_loader.service` starts as root, binds `127.0.0.1:1337`, and waits for
   Steam's CEF debug endpoint on `127.0.0.1:8080`. A drop-in sets
   `TMPDIR=~/homebrew/tmp`: `/tmp` and `/run` are mounted `noexec`, and
   PyInstaller must extract its shared objects somewhere executable. The
   drop-in survives Decky's self-updater replacing the main service file.
3. Steam starts gamepad UI with the CEF marker present. Decky injects its
   frontend into the Quick Access Menu.

The seed never overwrites an existing `PluginLoader`: Decky's own updater owns
`~/homebrew` after the first start. Updating the image therefore does not
downgrade a loader the user has updated from the UI.

## Use

1. Connect a controller (or use SHUI's desktop input).
2. Long-press **Select** for the Quick Access Menu. The stock Steam Guide chord
   also works; the Select binding is the one this image patches in.
3. Open the Decky icon (a plug) in the QAM. The store icon opens the plugin
   browser. Installing plugins needs internet access.
4. Steam updates can temporarily hide Decky until the next injection. Restart
   `plugin_loader` or the container if it does not come back.

## Verify

```bash
docker exec steam-headless systemctl is-active decky-loader-seed plugin_loader
docker exec steam-headless journalctl -u plugin_loader -n 100 --no-pager
docker exec steam-headless ss -lntp | grep -E ':(1337|8080)\b'
docker exec steam-headless sh -c 'curl -s http://127.0.0.1:8080/json/version | jq -r .Browser'
docker exec steam-headless curl -fsS http://127.0.0.1:1337/frontend/index.js -o /dev/null
docker exec steam-headless ls -l \
  /home/steamheadless/homebrew/services/PluginLoader \
  /home/steamheadless/.local/share/Steam/.cef-enable-remote-debugging
```

Expected: both units active, listeners on `127.0.0.1:1337` and `127.0.0.1:8080`,
a CEF browser version, and a 200/204 from the frontend asset. `plugin_loader`
logs `Starting Decky version v3.3.1` and injection messages once Steam is up.

## Update

Preferred: **Decky settings → update**. The loader replaces its own binary and
service file under `~/homebrew/services`; the state persists across container
recreates.

To move the image pin instead, bump both `DECKY_LOADER_VERSION` and
`DECKY_LOADER_SHA256` in the `Dockerfile`, rebuild, and recreate the container.
The existing homebrew directory is preserved. To force the image copy over it:

```bash
docker exec steam-headless systemctl stop plugin_loader
docker exec steam-headless rm -rf /home/steamheadless/homebrew/services
docker exec steam-headless systemctl restart decky-loader-seed
docker exec steam-headless systemctl start plugin_loader
```

The last step is only needed when the loader service was stopped; it is enabled
at boot.

## Disable or remove

For the current container only:

```bash
docker exec steam-headless systemctl disable --now plugin_loader
```

This leaves the seed unit enabled and the binary on disk. A container recreate
restores the image's enablement. For a persistent change, remove the unit
symlinks from a custom image or add a compose override; the image always ships
Decky enabled.

To remove the user state as well:

```bash
docker exec steam-headless systemctl disable --now plugin_loader decky-loader-seed
docker exec steam-headless rm -rf /home/steamheadless/homebrew
docker exec steam-headless rm -f \
  /home/steamheadless/.local/share/Steam/.cef-enable-remote-debugging
```

`decky-loader-seed.service` recreates the state on the next boot unless it is
also disabled.

## Troubleshooting

| Symptom | Check / fix |
|---|---|
| No Decky icon in the QAM | `systemctl status plugin_loader`; `ss -lnt \| grep 8080`; the CEF marker must exist **before** Steam starts. Recreate the container or restart `steam-headless-steam`. |
| `plugin_loader` restart loop | `journalctl -u plugin_loader`; usually the binary is missing (`~/homebrew/services/PluginLoader`) or port `1337` is taken. `systemctl restart decky-loader-seed` restores the binary. |
| CEF `8080` not listening | Steam did not start with `.cef-enable-remote-debugging`. Check the marker path and Steam's log; restart Steam after the seed unit has run. |
| Port conflict on the host | The container uses host networking. `1337`/`8080` must be free on the host; CEF's port is fixed. Stop the conflicting service. |
| `lsof call failed in close_cef_socket` | Decky's optional CEF socket-close workaround needs `lsof`/`gdb`, which this image does not install. It is only used by that utility; normal injection and plugins still work. Restarting Steam/container clears a stale socket. |
| Plugins fail to install | Check internet/DNS from the container; the plugin store is an external GitHub/CDN download. |

Decky Loader is licensed under GPL-2.0; the license is installed at
`/opt/decky-loader/LICENSE`. The pinned binary is fetched from the upstream
release at build time.
