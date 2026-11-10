//! BC-250 fan/temperature sysfs and host-daemon control bridge.
//!
//! The host owns pwm2 (CPU_FAN1).  The plugin never writes sysfs directly;
//! it sends a short-lived manual target to the host arbiter through
//! `/run/bc250-fan/control`, which is bind-mounted into the container.

use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::time::{SystemTime, UNIX_EPOCH};

pub const CONTROL_PATH: &str = "/run/bc250-fan/control";
pub const CLI_PATH: &str = "/run/bc250-fan/cli";

fn hwmon_named(name: &str) -> Option<PathBuf> {
    let entries = fs::read_dir("/sys/class/hwmon").ok()?;
    for entry in entries.flatten() {
        let path = entry.path();
        let candidate = fs::read_to_string(path.join("name"))
            .unwrap_or_default()
            .trim()
            .to_owned();
        if candidate == name {
            return Some(path);
        }
    }
    None
}

/// NCT6686D exposes CPU_FAN1 as pwm2 / fan2_input.
pub fn find_fan_hwmon() -> PathBuf {
    hwmon_named("nct6686").unwrap_or_else(|| PathBuf::from("/sys/class/hwmon/hwmon2"))
}

/// Prefer the GPU edge sensor, which is the hottest and most load-sensitive
/// sensor on this board.  Fall back to k10temp, then to a thermal zone.
pub fn find_temperature_source() -> PathBuf {
    hwmon_named("amdgpu")
        .or_else(|| hwmon_named("k10temp"))
        .unwrap_or_else(|| PathBuf::from("/sys/class/thermal/thermal_zone0"))
}

fn read_u64(path: impl AsRef<Path>) -> Option<u64> {
    fs::read_to_string(path)
        .ok()?
        .trim()
        .parse::<u64>()
        .ok()
}

pub fn read_fan(hwmon: &Path) -> Option<u64> {
    read_u64(hwmon.join("fan2_input"))
}

pub fn read_temperature(source: &Path) -> Option<u64> {
    read_u64(source.join("temp1_input")).or_else(|| read_u64(source.join("temp")))
}

/// True while the host `fan` CLI has a sticky request.  The plugin must not
/// overwrite it with its 1 s heartbeat; the UI re-enables the plugin through
/// `claim_decky`, which removes the CLI record.
pub fn cli_override_present() -> bool {
    fs::metadata(CLI_PATH).is_ok()
}

fn write_body(path: &Path, body: &str) -> Result<(), std::io::Error> {
    let parent = path
        .parent()
        .ok_or_else(|| std::io::Error::other("control path has no parent"))?;
    fs::create_dir_all(parent)?;
    // Atomic replace so the host daemon never reads a half-written file.
    let tmp = parent.join(format!(
        ".{}.{}",
        path.file_name().and_then(|name| name.to_str()).unwrap_or("control"),
        std::process::id()
    ));
    {
        let mut file = fs::File::create(&tmp)?;
        file.write_all(body.as_bytes())?;
        file.sync_all()?;
    }
    fs::rename(&tmp, path)?;
    Ok(())
}

/// A manual target is valid for a few seconds.  The host daemon falls back to
/// its own curve if the plugin dies, the container stops, or Steam is closed.
fn write_control(mode: &str, pwm: Option<u64>) -> Result<(), std::io::Error> {
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs();
    let mut body = format!("mode={mode}\nsource=decky\nupdated={now}\n");
    if let Some(pwm) = pwm {
        body.push_str(&format!("pwm={}\n", pwm.min(255)));
    }
    write_body(Path::new(CONTROL_PATH), &body)
}

/// Copy the host CLI record into the shared control file.  This closes the
/// race where a plugin heartbeat lands just after `fan 100`; the CLI record
/// itself remains the authority for the host daemon.
pub fn mirror_cli_control() -> Result<(), std::io::Error> {
    let body = fs::read_to_string(CLI_PATH)?;
    write_body(Path::new(CONTROL_PATH), &body)
}

/// Called when the UI explicitly enables the plugin.  Drop the sticky CLI
/// override so the plugin's own curve can take over.
pub fn claim_decky() -> Result<(), std::io::Error> {
    match fs::remove_file(CLI_PATH) {
        Ok(()) => {}
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => {}
        Err(e) => return Err(e),
    }
    write_control("auto", None)
}

/// Called when the UI toggle changes.  Disabling hands control back to the
/// host curve immediately instead of waiting for the heartbeat to expire.
/// Never erase a CLI request: the host CLI owns the fan until it is released.
pub fn write_fan_recalc(enabled: bool) -> Result<(), std::io::Error> {
    if enabled || cli_override_present() {
        Ok(())
    } else {
        write_control("auto", None)
    }
}

/// `pwm` is the 0..255 CPU_FAN1 duty cycle.
pub fn write_fan_target(pwm: u64) -> Result<(), std::io::Error> {
    write_control("manual", Some(pwm))
}
