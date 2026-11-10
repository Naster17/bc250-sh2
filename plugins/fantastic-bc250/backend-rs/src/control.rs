//! Fan control

use std::path::PathBuf;
use std::sync::Arc;
use std::thread;
use std::time::{Duration, Instant};

use tokio::sync::RwLock;

use super::datastructs::{GraphPoint, Settings, State};
use super::json::SettingsJson;

pub struct ControlRuntime {
    settings: Arc<RwLock<Settings>>,
    state: Arc<RwLock<State>>,
    fan_hwmon: Arc<PathBuf>,
    temperature_source: Arc<PathBuf>,
}

impl ControlRuntime {
    pub fn new() -> Self {
        let new_state = State::new();
        let settings_p = settings_path(&new_state.home);
        Self {
            settings: Arc::new(RwLock::new(
                super::json::SettingsJson::open(settings_p)
                    .unwrap_or_default()
                    .into(),
            )),
            state: Arc::new(RwLock::new(new_state)),
            fan_hwmon: Arc::new(crate::sys::find_fan_hwmon()),
            temperature_source: Arc::new(crate::sys::find_temperature_source()),
        }
    }

    pub(crate) fn settings_clone(&self) -> Arc<RwLock<Settings>> {
        self.settings.clone()
    }

    pub(crate) fn state_clone(&self) -> Arc<RwLock<State>> {
        self.state.clone()
    }

    pub(crate) fn settings(&self) -> &'_ RwLock<Settings> {
        &self.settings
    }

    pub(crate) fn state(&self) -> &'_ RwLock<State> {
        &self.state
    }

    pub(crate) fn fan_hwmon_clone(&self) -> Arc<PathBuf> {
        self.fan_hwmon.clone()
    }

    pub(crate) fn temperature_source_clone(&self) -> Arc<PathBuf> {
        self.temperature_source.clone()
    }

    pub fn run(&self) -> thread::JoinHandle<()> {
        let runtime_settings = self.settings_clone();
        let runtime_state = self.state_clone();
        let runtime_temperature = self.temperature_source.clone();
        thread::spawn(move || {
            let sleep_duration = Duration::from_millis(1000);
            let mut start_time = Instant::now();
            loop {
                if Instant::now().duration_since(start_time).as_secs_f64() * 0.95
                    > sleep_duration.as_secs_f64()
                {
                    log::debug!("Detected resume from sleep, re-applying fan control");
                    let settings = runtime_settings.blocking_read();
                    if settings.enable {
                        Self::on_set_enable(&settings);
                    }
                }
                start_time = Instant::now();

                // A `doas fan ...` request is sticky and outranks the Decky
                // heartbeat.  Disable our output and mirror the CLI record so
                // the host daemon's status/control file remain coherent.
                {
                    let cli_owned = {
                        let settings = runtime_settings.blocking_read();
                        settings.enable && crate::sys::cli_override_present()
                    };
                    if cli_owned {
                        log::info!("host CLI fan override active; disabling Decky output");
                        {
                            let mut settings = runtime_settings.blocking_write();
                            settings.enable = false;
                        }
                        if let Err(e) = crate::sys::mirror_cli_control() {
                            log::error!("failed to mirror CLI fan control: {}", e);
                        }
                        let mut state = runtime_state.blocking_write();
                        state.dirty = true;
                    }
                }

                {
                    let state = runtime_state.blocking_read();
                    if state.dirty {
                        let settings = runtime_settings.blocking_read();
                        let settings_json: SettingsJson = settings.clone().into();
                        if let Err(e) = settings_json.save(settings_path(&state.home)) {
                            log::error!(
                                "SettingsJson.save({}) error: {}",
                                settings_path(&state.home).display(),
                                e
                            );
                        }
                        Self::on_set_enable(&settings);
                        drop(state);
                        let mut state = runtime_state.blocking_write();
                        state.dirty = false;
                    }
                }

                {
                    let settings = runtime_settings.blocking_read();
                    if settings.enable {
                        Self::do_fan_control(&settings, &runtime_temperature);
                    }
                }

                thread::sleep(sleep_duration);
            }
        })
    }

    fn on_set_enable(settings: &Settings) {
        if let Err(e) = crate::sys::write_fan_recalc(settings.enable) {
            log::error!("failed to write host fan control state: {}", e);
        }
    }

    fn do_fan_control(settings: &Settings, temperature_source: &PathBuf) {
        let fan_ratio: f64 = if let Some(temperature) =
            crate::sys::read_temperature(temperature_source)
        {
            let temperature_ratio = (((temperature as f64) / 1000.0)
                - settings.temperature_bounds.min)
                / (settings.temperature_bounds.max - settings.temperature_bounds.min);
            let mut index = None;
            for i in (0..settings.curve.len()).rev() {
                if settings.curve[i].x < temperature_ratio {
                    index = Some(i);
                    break;
                }
            }
            if settings.interpolate {
                Self::interpolate_fan(settings, index, temperature_ratio)
            } else {
                Self::step_fan(settings, index)
            }
        } else {
            // Never leave the fan at an unknown low value if the sensor
            // disappears; the host daemon has the same fail-safe.
            1.0
        };

        // BC-250 CPU_FAN1 is a 0..255 PWM duty, not a Steam Deck RPM target.
        let fan_speed = (fan_ratio * 255.0).round().clamp(0.0, 255.0) as u64;
        if let Err(e) = crate::sys::write_fan_target(fan_speed) {
            log::error!("failed to write BC-250 fan target: {}", e);
        }
    }

    fn interpolate_fan(settings: &Settings, index: Option<usize>, t_ratio: f64) -> f64 {
        let (upper, lower) = if let Some(i) = index {
            (
                if i != settings.curve.len() - 1 {
                    settings.curve[i + 1].clone()
                } else {
                    GraphPoint { x: 1.0, y: 1.0 }
                },
                settings.curve[i].clone(),
            )
        } else {
            (
                if settings.curve.is_empty() {
                    GraphPoint { x: 1.0, y: 1.0 }
                } else {
                    settings.curve[0].clone()
                },
                GraphPoint { x: 0.0, y: 0.0 },
            )
        };
        let slope_m = (upper.y - lower.y) / (upper.x - lower.x);
        let y_intercept_b = lower.y - (slope_m * lower.x);
        log::debug!(
            "interpolation: y = {}x + {} (between {:?} and {:?})",
            slope_m,
            y_intercept_b,
            upper,
            lower
        );
        (slope_m * t_ratio) + y_intercept_b
    }

    fn step_fan(settings: &Settings, index: Option<usize>) -> f64 {
        if let Some(index) = index {
            settings.curve[index].y
        } else if settings.curve.is_empty() {
            1.0
        } else {
            0.5
        }
    }
}

fn settings_path<P: AsRef<std::path::Path>>(home: P) -> std::path::PathBuf {
    home.as_ref().join(".config/fantastic/fantastic.json")
}
