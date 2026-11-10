# Controller: long-press Select → Quick Access Menu

> Moved from the [operations manual](operations.md).

Steam's system chords are hardcoded to the Guide button (`chord_xboxone.vdf`:
Guide+A = `system_key_1`, Guide+B hold = `quit_application`), which is useless
when that button is worn out. The image therefore adds one extra activator to
Steam's shipped default layouts, with Valve's (inverted) input names:

```text
"button_menu"  ->  game_action Default SELECT   # the physical Select/Back button
  Long_Press (500 ms) -> controller_action system_key_1   # Quick Access Menu

"button_escape" ->  game_action Default START   # the physical Start/Menu button
  (left alone)
```

`system_key_1` is exactly what Guide+A opens: the right-hand panel with
Performance, Friends and notifications. Short presses are untouched, so Select
still reaches the game.

The naming trap: `button_escape` sounds like Back/Select but the shipped gamepad
layout binds it to `Default START`, while `button_menu` is `Default SELECT`.
Binding the long press to `button_escape` opens the panel on Start instead of
Select. `TARGET_INPUT` in the patcher is therefore `"button_menu"`; changing it
retargets already patched files in place (the block is removed from wherever it
was and re-inserted, keeping the byte size identical).

| File in the image | Role |
|---|---|
| `/usr/local/bin/steam-controller-patch` | inserts the activator into `basicui.vdf`, `basicui_gamepad.vdf`, `desktop_xboxone.vdf`, `templates/controller_xboxone_gamepad_joystick.vdf` and `templates/controller_xbox360_gamepad_joystick.vdf` (Big Picture, Desktop and default per-game layouts) |
| `/usr/local/sh-init.d/20-patch-steam-controller-base.sh` | re-runs it on every container start |

Two constraints shaped the implementation:

1. **Steam verifies file sizes.** At startup it logs
   `BVerifyInstalledFiles: controller_base/desktop_xboxone.vdf is N bytes, expected 7924`
   and later re-extracts mismatching files from the depot, silently reverting the
   patch. KeyValues ignores whitespace, so the patcher removes exactly as many
   leading indentation characters as it inserts and every file keeps its original
   byte length — no mismatch line, no repair.
2. **Files are CRLF.** They must be read and written as bytes; a text-mode
   round-trip converts `\r\n` to `\n` and breaks the size (and the repair).

Verify:

```bash
C=/home/steamheadless/.local/share/Steam/controller_base
docker exec steam-headless grep -c system_key_1 \
  $C/basicui.vdf $C/basicui_gamepad.vdf $C/desktop_xboxone.vdf \
  $C/templates/controller_xboxone_gamepad_joystick.vdf      # 4 4 1 1
docker exec steam-headless stat -c '%s %n' $C/desktop_xboxone.vdf   # 7924
docker exec steam-headless journalctl -u steam-headless-steam -n 300 | grep -c BVerifyInstalledFiles
```

The patcher validates every file with an embedded KeyValues parser before writing
and refuses to write a result that does not parse, that contains duplicate
activators, or whose byte size changed. This matters: an invalid layout makes
Steam log `CPrepareConfigWorker failed for AppID 769` /
`No config for controller found locally` and **the whole pad stops working** in
the gamepad UI, not just the new binding. Two traps that produced exactly that:

- dropping the `{` that opens an input block while inserting;
- adding a second `"Long_Press"` to an input that already has one.

If the pad is dead after an edit, check those log lines first, then restore the
files to their depot size (Steam re-extracts them on its next client update) and
restart `steam-headless-steam`.

Changing the timing: edit `LONG_PRESS_MS` in
`rootfs/usr/local/bin/steam-controller-patch` and rebuild. The patcher treats a
block with a different timing as stale, removes it and re-inserts the new one,
returning the freed bytes as trailing spaces so the depot size stays exact — no
need to reset the files to stock first.

Caveats: a Steam client update restores the stock files, and the patch is only
re-applied at the next container start (`docker compose restart` is enough); if
Steam's UI keeps a cached copy, restart `steam-headless-steam` after patching.
