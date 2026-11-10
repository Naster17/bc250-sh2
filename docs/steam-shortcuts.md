# Steam non-Steam shortcuts

Steam stores non-Steam shortcuts in a binary VDF file:

```text
<Steam home>/.local/share/Steam/userdata/<SteamID3>/config/shortcuts.vdf
```

In this deployment the Steam home is the container home, which is the host
directory `$SH2_DIR/data/home` mounted at `/home/steamheadless`:

```text
$SH2_DIR/data/home/.local/share/Steam/userdata/950207934/config/shortcuts.vdf
```

The `950207934` directory is the SteamID3 of the only Steam account in this
deployment. On another account, use the directory that contains
`config/shortcuts.vdf`.

There are two correct ways to add a shortcut:

1. **Steam UI** — safest when the library already has shortcuts; Steam preserves
   them and computes the appid.
2. **Binary VDF file** — reproducible and scriptable; required when there is no
   desktop Steam UI. The script below replaces the whole file, so back it up
   first.

Do not edit `shortcuts.vdf` while Steam is running: Steam rewrites the file on
exit and can discard the change.

## 1. Add through the Steam UI

The UI method is the normal one for a desktop session:

1. Open Steam in Desktop Mode.
2. *Games → Add a Non-Steam Game…* (or the library's `+` button).
3. *Browse…*, select the executable, and confirm.
4. Set the name, icon, and launch options in the shortcut's properties.
5. Restart Steam if the entry does not appear immediately.

In this container, Desktop Mode is a runtime switch:

```bash
docker exec steam-headless steam-headless-session-mode desktop
# add the shortcut in Steam, then switch back:
docker exec steam-headless steam-headless-session-mode gaming
```

The session switch restarts Steam, so an active stream drops.

After the UI creates the entry, read `appid` from `config/shortcuts.vdf` if you
need to refer to it elsewhere. The UI preserves any existing shortcuts.

## 2. Write the binary VDF directly

### File structure

`shortcuts.vdf` is a nested binary VDF:

| Byte | Meaning |
|---|---|
| `0x00` | start of an object; followed by a NUL-terminated key |
| `0x01` | string; followed by a NUL-terminated key and a NUL-terminated value |
| `0x02` | 32-bit unsigned integer; key + four little-endian bytes |
| `0x08` | end of the current object |

The root object is `shortcuts`; each shortcut is an object keyed by `0`, `1`, ….
The file ends with four `0x08` bytes.

The shortcut fields used by Steam:

| Field | Type | Notes |
|---|---|---|
| `appid` | uint32 | `crc32(quoted_exe + AppName) | 0x80000000` |
| `AppName` | string | display name |
| `Exe` | string | executable path **with quotes included in the value** |
| `StartDir` | string | working directory inside the Steam session |
| `icon` | string | icon theme name or absolute PNG path; empty for default |
| `ShortcutPath` | string | `.desktop` file path; may be empty |
| `LaunchOptions` | string | arguments, without the executable |
| `IsHidden` | uint32 | `0` to show |
| `AllowDesktopConfig` | uint32 | normally `1` |
| `AllowOverlay` | uint32 | normally `1` |
| `OpenVR` | uint32 | `0` unless it is a VR app |
| `Devkit` | uint32 | `0` |
| `DevkitGameID` | string | empty |
| `DevkitOverrideAppID` | uint32 | `0` |
| `LastPlayTime` | uint32 | `0` for a new shortcut; Steam updates it after a launch |
| `FlatpakAppID` | string | empty for a native executable |
| `sortas` | string | empty; Steam sorts by `AppName` |
| `tags` | object | empty object in the common layout |

The `Exe` value is a path **as seen by Steam**, not by the host shell. In this
container that means `/home/steamheadless/...`, not
`$SH2_DIR/data/home/...`.

### appid

```text
appid = crc32(Exe + AppName) | 0x80000000
```

`Exe` here includes the quote characters. For example:

```text
Exe      = "/home/steamheadless/Applications/prism-launcher.AppImage"
AppName  = Prism Launcher
appid    = 3102825927  (0xB8F15DC7)
```

The same quoted executable and name always produce the same appid. If you change
the executable path or the name, recompute the appid.

### Single-shortcut writer

This script writes a file containing **one** shortcut. It is the reproducible
form used for the Prism deployment. If the library already has shortcuts, back
up the file and use the UI unless you extend the script to preserve the existing
root.

```python
#!/usr/bin/env python3
import argparse
import os
import struct
import zlib


def s(value):
    return value.encode("utf-8") + b"\0"


def kv_str(key, value):
    return b"\x01" + s(key) + s(value)


def kv_uint(key, value):
    return b"\x02" + s(key) + struct.pack("<I", value)


def kv_obj(key, body):
    return b"\x00" + s(key) + body + b"\x08"


parser = argparse.ArgumentParser()
parser.add_argument("--exe", required=True,
                    help="executable path as Steam sees it")
parser.add_argument("--name", required=True)
parser.add_argument("--start-dir", default=None)
parser.add_argument("--icon", default="")
parser.add_argument("--shortcut-path", default="")
parser.add_argument("--launch-options", default="")
parser.add_argument("--out", default="shortcuts.vdf")
args = parser.parse_args()

exe = '"' + args.exe.strip('"') + '"'
start_dir = args.start_dir or os.path.dirname(args.exe.strip('"'))
appid = (zlib.crc32((exe + args.name).encode()) | 0x80000000) & 0xFFFFFFFF

body = b"".join([
    kv_uint("appid", appid),
    kv_str("AppName", args.name),
    kv_str("Exe", exe),
    kv_str("StartDir", start_dir),
    kv_str("icon", args.icon),
    kv_str("ShortcutPath", args.shortcut_path),
    kv_str("LaunchOptions", args.launch_options),
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
])

data = b"\x00" + s("shortcuts") + kv_obj("0", body) + b"\x08\x08"
with open(args.out, "wb") as f:
    f.write(data)

print(f"wrote {args.out} ({len(data)} bytes), appid={appid}")
```

Example for Prism:

```bash
python3 /tmp/steam-shortcut.py \
  --exe "/home/steamheadless/Applications/prism-launcher.AppImage" \
  --name "Prism Launcher" \
  --start-dir "/home/steamheadless/Applications/" \
  --icon "prism-launcher" \
  --shortcut-path "/home/steamheadless/.local/share/applications/prism-launcher.desktop" \
  --out /tmp/shortcuts.vdf
# wrote /tmp/shortcuts.vdf (449 bytes), appid=3102825927
```

Install it with Steam stopped:

```bash
SH2_DIR="${SH2_DIR:-$HOME/sh2}"
STEAM_UD="$SH2_DIR/data/home/.local/share/Steam/userdata"
CONFIG=$(dirname "$(find "$STEAM_UD" -path '*/config/shortcuts.vdf' -print -quit)")
test -n "$CONFIG" || { echo "no Steam userdata"; exit 1; }

docker stop steam-headless
cp -p "$CONFIG/shortcuts.vdf" "$CONFIG/shortcuts.vdf.bak"
install -m 600 /tmp/shortcuts.vdf "$CONFIG/shortcuts.vdf"
docker start steam-headless
```

The file must end with four `0x08` bytes:

```bash
xxd "$CONFIG/shortcuts.vdf" | tail -1
# ... 0808 0808
```

## 3. Inspect an existing file

This parser prints the nested structure and the trailing bytes. It is read-only.

```python
#!/usr/bin/env python3
import struct
import sys

data = open(sys.argv[1], "rb").read()


def read_str(i):
    j = data.index(b"\0", i)
    return data[i:j].decode("utf-8", "replace"), j + 1


def parse_obj(i):
    assert data[i] == 0x00, hex(data[i])
    i += 1
    name, i = read_str(i)
    out = {}
    while True:
        kind = data[i]
        if kind == 0x08:
            return name, out, i + 1
        if kind == 0x00:
            key, value, i = parse_obj(i)
        elif kind == 0x01:
            i += 1
            key, i = read_str(i)
            value, i = read_str(i)
        elif kind == 0x02:
            i += 1
            key, i = read_str(i)
            value = struct.unpack_from("<I", data, i)[0]
            i += 4
        else:
            raise SystemExit(f"bad type {kind:#x} at {i}")
        out[key] = value


name, root, i = parse_obj(0)
print(name, root)
print("trailing", data[i:].hex())
```

For the Prism file the useful values are:

```text
appid       3102825927
AppName     Prism Launcher
Exe         "/home/steamheadless/Applications/prism-launcher.AppImage"
icon        prism-launcher
```

If the parser leaves a single `08` after the root, that is expected: it is the
last of the four terminators. `xxd | tail -1` must still show four `0x08`
bytes in the file.

## 4. Launching and verification

Start the container if it is stopped:

```bash
docker start steam-headless
```

The shortcut should appear in the Steam library. Check the Steam journal for a
`LoadShortcuts` error:

```bash
docker exec steam-headless journalctl -u steam-headless-steam -n 300 --no-pager \
  | grep -i -E 'LoadShortcuts|shortcut|Failed to read' || true
```

**Launch from the library UI.** On this image,
`steam -applaunch <appid>` returns `AppError_9` for non-Steam shortcuts even
when the entry is valid, so it is not a valid test. To test the executable and
the gamescope environment without the UI:

```bash
docker exec -u steamheadless steam-headless bash -lc '
  set -a; . /run/steam-headless/gamescope-environment; set +a
  "$HOME/Applications/prism-launcher.AppImage" --version
'
```

Only Steam and its children inherit the gamescope environment. A non-Steam
shortcut launched from Steam is a child; an app started by Sunshine or SHUI is
not, and will be invisible in gaming mode.

## 5. Common failures

| Symptom | Cause |
|---|---|
| Shortcut missing after restart | `shortcuts.vdf` was written while Steam was running and got overwritten |
| `LoadShortcuts` error or no shortcuts | file does not end with four `0x08`; malformed VDF |
| Shortcut present but cannot launch | `Exe` is not quoted inside the value, or the path is a host path instead of the container path |
| Wrong or duplicate appid | appid was copied; recompute from the quoted `Exe` + `AppName` |
| Shortcut under another account | wrote to the wrong `userdata/<SteamID3>` |
| App starts but cannot find files | `StartDir` is missing or wrong |
| No icon | `icon` is empty or names an icon not installed in the theme |
| `steam -applaunch` fails with `AppError_9` | expected for non-Steam shortcuts on this client; launch from the UI |
| Other shortcuts disappeared | the script replaced the whole file instead of merging; restore the backup |

## 6. Backup and rollback

With `CONFIG` from section 2, before any write:

```bash
docker stop steam-headless
cp -p "$CONFIG/shortcuts.vdf" "$CONFIG/shortcuts.vdf.bak"
```

Rollback:

```bash
docker stop steam-headless
cp -p "$CONFIG/shortcuts.vdf.bak" "$CONFIG/shortcuts.vdf"
docker start steam-headless
```

The live Prism shortcut is the original 449-byte file with
`icon=prism-launcher`; it is a concrete example of the single-shortcut layout.

## Related

- [Prism Launcher 9.x and offline accounts](prism-launcher.md) — the Prism
  AppImage, offline `accounts.json`, and the live shortcut values.
- [Operations manual](operations.md) — container modes, Sunshine, and ports.
