# Prism Launcher 9.x and offline accounts

This is the procedure used for the BC-250 deployment. It covers:

- replacing Prism Launcher 11.x with **9.4** (the last 9.x release);
- creating an **offline** account for the native AppImage;
- writing the canonical Steam **non-Steam shortcut** (binary VDF).

The commands are written for the host. The container home is the host directory
`$SH2_DIR/data/home` mounted at `/home/steamheadless`, so both users see the same
files.

| Item | Value |
|---|---|
| Container user / host uid | `steamheadless` / `1000` |
| Container home | `/home/steamheadless` |
| Host data root (`SH2_DIR`) | `${SH2_DIR}` |
| Prism AppImage | `Applications/prism-launcher.AppImage` |
| Steam userdata | `<SteamID3>` (see [site.md](site.md)) |
| Steam shortcut appid | `<appid>` (see [site.md](site.md)) |
| Offline nickname / UUID | `<nickname>` / `<uuid>` (see [site.md](site.md)) |

`$SH2_DIR` is the host data root; this deployment's value is in
[site.md](site.md). Everything below stays inside that data root; recreating the
container does not remove it. The literals in the commands below are this
deployment's values; site.md is authoritative.

## 1. Replace the AppImage with 9.4

Stop Steam and Prism first. Prism rewrites `accounts.json` on exit, and Steam
rewrites `shortcuts.vdf`; making changes while either is running can lose them.

```bash
SH2_DIR="${SH2_DIR:-$HOME/sh2}"
HDATA="$SH2_DIR/data/home"
APP="$HDATA/Applications/prism-launcher.AppImage"
PRISM_DATA="$HDATA/.local/share/PrismLauncher"

# Back up the old client and its data (the data directory can be large).
test -e "$APP" && cp -a "$APP" "$APP.11.x.bak"
test -d "$PRISM_DATA" && cp -a "$PRISM_DATA" "$PRISM_DATA.11.x.bak"

mkdir -p "$HDATA/Applications"
curl -fL --retry 3 -o "$APP" \
  https://github.com/PrismLauncher/PrismLauncher/releases/download/9.4/PrismLauncher-Linux-x86_64.AppImage
chmod 755 "$APP"

# 9.4 asset, 91,437,560 bytes.
echo "dee0a756462203ce59d2de377583ba0c2c4310d0853707c434a4701bb3fe823c  $APP" \
  | sha256sum -c -
```

`9.4` is the last 9.x release. The 11.x data directory is reused; back it up
before downgrading in case an instance needs a newer format.

Create the desktop entry (optional for Steam, but it gives Steam a stable
`ShortcutPath` and an icon name):

```bash
mkdir -p "$HDATA/.local/share/applications"
cat > "$HDATA/.local/share/applications/prism-launcher.desktop" <<'EOF'
[Desktop Entry]
Name=Prism Launcher
Comment=Launch Prism Launcher
Exec="/home/steamheadless/Applications/prism-launcher.AppImage"
TryExec=/home/steamheadless/Applications/prism-launcher.AppImage
Icon=prism-launcher
Terminal=false
Type=Application
Categories=Game;
EOF
```

Check the binary inside the gaming session (the display is owned by gamescope):

```bash
docker exec -u steamheadless steam-headless bash -lc '
  set -a; . /run/steam-headless/gamescope-environment; set +a
  "$HOME/Applications/prism-launcher.AppImage" --version
'
# -> PrismLauncher 9.4
```

The live AppImage runs without `APPIMAGE_SKIP_SIGNATURE`. If a particular
runtime rejects the embedded signature, prefix the command with
`APPIMAGE_SKIP_SIGNATURE=1`; that is a runtime workaround, not a Prism setting.

## 2. Offline account

Prism uses **two different paths** depending on the package:

| Install | `accounts.json` |
|---|---|
| Native AppImage | `~/.local/share/PrismLauncher/accounts.json` |
| Flatpak | `~/.var/app/org.prismlauncher.PrismLauncher/data/PrismLauncher/accounts.json` |

This deployment is the native AppImage, so the container path is
`/home/steamheadless/.local/share/PrismLauncher/accounts.json`.

The offline UUID is **derived from the nickname**, not arbitrary. Compute it
before writing the file:

```bash
python3 - <<'PY'
import hashlib, uuid
nick = "nik"
b = bytearray(hashlib.md5(f"OfflinePlayer:{nick}".encode()).digest())
b[6] = (b[6] & 0x0f) | 0x30   # UUID version 3
b[8] = (b[8] & 0x3f) | 0x80   # RFC 4122 variant
print(uuid.UUID(bytes=bytes(b)).hex)
PY
# -> 0749cb21fe1d3cd78fe4babbe5fee5fe
```

Do not copy an `id` from a guide and change only the name. A mismatched UUID
still loads, but servers see a UUID that does not correspond to the nickname.
(The template value `0c79d88a112537a0a302f01afa6bc94a` is not the offline UUID
for `nik`.)

Write a minimal offline account:

```bash
SH2_DIR="${SH2_DIR:-$HOME/sh2}"
PRISM_DIR="$SH2_DIR/data/home/.local/share/PrismLauncher"
mkdir -p "$PRISM_DIR"

PRISM_NICK=nik python3 - "$PRISM_DIR/accounts.json" <<'PY'
import hashlib, json, os, secrets, sys, time, uuid

nick = os.environ["PRISM_NICK"]
out = sys.argv[1]

b = bytearray(hashlib.md5(f"OfflinePlayer:{nick}".encode()).digest())
b[6] = (b[6] & 0x0f) | 0x30
b[8] = (b[8] & 0x3f) | 0x80
profile_id = uuid.UUID(bytes=bytes(b)).hex

data = {
    "accounts": [
        {
            "active": True,
            "entitlement": {"canPlayMinecraft": True, "ownsMinecraft": True},
            "profile": {
                "capes": [],
                "id": profile_id,
                "name": nick,
                "skin": {"id": "", "url": "", "variant": ""},
            },
            "type": "Offline",
            "ygg": {
                "extra": {
                    "clientToken": secrets.token_hex(16),
                    "userName": nick,
                },
                "iat": int(time.time()),
                "token": "0",
            },
        }
    ],
    "formatVersion": 3,
}

with open(out, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
os.chmod(out, 0o600)
print(f"{nick} -> {profile_id}")
PY
```

The template used by the live deployment also contains an inert `MSA` entry
with an empty `msa-client-id`. Prism preserves it and ignores it; the `Offline`
entry is the active one. Remove the `MSA` object if you want a clean account
list.

Verify:

```bash
python3 -m json.tool "$PRISM_DIR/accounts.json" >/dev/null && echo valid
```

Start Prism once and check its log
`~/.local/share/PrismLauncher/logs/PrismLauncher-0.log`:

```text
Loading accounts...
Writing account list to "accounts.json"
Saved account list to "accounts.json"
<> Accounts loaded.
```

There must be no `Failed to read the account list file`. Prism may add an
`entitlement` object to the offline account on first save; that is normal.

The live `accounts.json` is mode `0600`. The host user and the container user
share uid `1000`, so this remains readable inside the container.

## 3. Steam non-Steam shortcut

The general binary VDF rules, a parameterised writer, and a parser are in
[steam-shortcuts.md](steam-shortcuts.md). This section records the
Prism-specific values.

Steam stores custom shortcuts in
`~/.local/share/Steam/userdata/<SteamID3>/config/shortcuts.vdf`. It is a
binary VDF file. The common failures are an unquoted `Exe`, missing trailing
`0x08` bytes, or an appid that does not match the quoted executable.

Stop Steam before writing:

```bash
docker stop steam-headless
```

Back up the file and find the config directory:

```bash
SH2_DIR="${SH2_DIR:-$HOME/sh2}"
STEAM_UD="$SH2_DIR/data/home/.local/share/Steam/userdata"
CONFIG=$(dirname "$(find "$STEAM_UD" -maxdepth 3 -name shortcuts.vdf -print -quit)")
test -n "$CONFIG" || { echo "no Steam userdata"; exit 1; }
cp -p "$CONFIG/shortcuts.vdf" "$CONFIG/shortcuts.vdf.bak"
```

Write a canonical shortcut with this script. Run it on the host; the paths are
the paths **inside the container**, because Steam launches the shortcut there.

```python
#!/usr/bin/env python3
import struct
import sys
import zlib

EXE = '"/home/steamheadless/Applications/prism-launcher.AppImage"'
NAME = "Prism Launcher"
START_DIR = "/home/steamheadless/Applications/"
ICON = "prism-launcher"
SHORTCUT_PATH = "/home/steamheadless/.local/share/applications/prism-launcher.desktop"
OUT = sys.argv[1]

appid = (zlib.crc32((EXE + NAME).encode()) | 0x80000000) & 0xFFFFFFFF


def s(value):
    return value.encode("utf-8") + b"\0"


def kv_str(key, value):
    return b"\x01" + s(key) + s(value)


def kv_uint(key, value):
    return b"\x02" + s(key) + struct.pack("<I", value)


def kv_obj(key, body):
    return b"\x00" + s(key) + body + b"\x08"


body = b"".join(
    [
        kv_uint("appid", appid),
        kv_str("AppName", NAME),
        kv_str("Exe", EXE),
        kv_str("StartDir", START_DIR),
        kv_str("icon", ICON),
        kv_str("ShortcutPath", SHORTCUT_PATH),
        kv_str("LaunchOptions", ""),
        kv_uint("IsHidden", 0),
        kv_uint("AllowDesktopConfig", 1),
        kv_uint("AllowOverlay", 1),
        kv_uint("OpenVR", 0),
        kv_uint("Devkit", 0),
        kv_str("DevkitGameID", ""),
        kv_uint("DevkitOverrideAppID", 0),
        kv_uint("LastPlayTime", 0),
        kv_str("FlatpakAppID", ""),
        kv_str("sortas", ""),
        kv_obj("tags", b""),
    ]
)

data = b"\x00" + s("shortcuts") + kv_obj("0", body) + b"\x08\x08"
with open(OUT, "wb") as f:
    f.write(data)

print(f"appid={appid}")
```

```bash
python3 /tmp/prism-shortcut.py /tmp/shortcuts.vdf
# -> appid=3102825927

install -m 600 /tmp/shortcuts.vdf "$CONFIG/shortcuts.vdf"
```

The file must end with four `0x08` bytes:

```bash
xxd "$CONFIG/shortcuts.vdf" | tail -1
# ... 0808 0808
```

The live shortcut is 449 bytes. Its important fields are:

```text
appid       3102825927
AppName     Prism Launcher
Exe         "/home/steamheadless/Applications/prism-launcher.AppImage"
icon        prism-launcher
ShortcutPath /home/steamheadless/.local/share/applications/prism-launcher.desktop
```

`appid` is `crc32(quoted_exe + AppName) | 0x80000000`. The same executable and
name give the same appid, which is why the shortcut can be written reproducibly.

**Launch from the Steam library UI.** On this image,
`steam -applaunch 3102825927` returns `AppError_9` for non-Steam shortcuts even
when the shortcut is valid. It is not a valid test. To check the executable and
the gamescope environment without the UI, run the AppImage directly (see
section 1); the library Play button uses the same executable.

You can also use Steam's *Add a Non-Steam Game* dialog, but read the resulting
`appid` from `shortcuts.vdf` if you need to reproduce the entry. The manual
script above is what this deployment uses.

## 4. Verification and rollback

Start the container and check that Steam parsed the shortcut:

```bash
docker start steam-headless
docker exec steam-headless journalctl -u steam-headless-steam -n 300 --no-pager \
  | grep -i -E 'LoadShortcuts|shortcut|Failed to read' || true
```

No `LoadShortcuts` error means the binary VDF is accepted. The entry should be
in the library. The offline account is verified from the Prism log as described
in section 2.

Rollback:

```bash
docker stop steam-headless
cp -p "$CONFIG/shortcuts.vdf.bak" "$CONFIG/shortcuts.vdf"
# Optionally restore the old client and data:
# mv "$APP" "$APP.9.4.bak" && mv "$APP.11.x.bak" "$APP"
# mv "$PRISM_DATA" "$PRISM_DATA.9.4.bak" && mv "$PRISM_DATA.11.x.bak" "$PRISM_DATA"
```

The live shortcut is the original 449-byte file with `icon=prism-launcher`.
Keep a copy as `shortcuts.vdf.bak` before editing.

## Related

- [Minecraft controller support](minecraft-controller.md)
- [Steam non-Steam shortcuts](steam-shortcuts.md)
- [Operations manual](operations.md)
