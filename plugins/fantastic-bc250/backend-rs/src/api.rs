use crate::services::fantastic::*;

use usdpl_back::nrpc::_helpers::futures::{StreamExt, FutureExt};

use super::control::ControlRuntime;

pub const VERSION: &'static str = env!("CARGO_PKG_VERSION");
pub const NAME: &'static str = env!("CARGO_PKG_NAME");

const FAN_READ_PERIOD: std::time::Duration = std::time::Duration::from_millis(1000);
const TEMPERATURE_READ_PERIOD: std::time::Duration = std::time::Duration::from_millis(2000);

pub struct FanService {
    ctrl: ControlRuntime,
}

impl FanService {
    pub fn new(runtime: ControlRuntime) -> Self {
        runtime.run();
        Self {
            ctrl: runtime,
        }
    }
}

fn once_true() -> impl std::iter::Iterator<Item = bool> {
    // iters over [true, false, false, ...]
    std::iter::once(true).chain(std::iter::repeat(false))
}

#[usdpl_back::nrpc::_helpers::async_trait::async_trait]
impl<'a> IFan<'a> for FanService {
    async fn echo(
            &mut self,
            input: EchoMessage,
        ) -> Result<EchoMessage, Box<dyn std::error::Error + Send>> {
            Ok(input)
        }
        async fn hello(
            &mut self,
            input: NameMessage,
        ) -> Result<HelloResponse, Box<dyn std::error::Error + Send>> {
            Ok(HelloResponse {
                phrase: format!("Hello {}", input.name)
            })
        }
        async fn version(
            &mut self,
            _input: Empty,
        ) -> Result<VersionMessage, Box<dyn std::error::Error + Send>> {
            Ok(
                VersionMessage {
                    major: 0,
                    minor: 0,
                    patch: 0,
                    //display: VERSION.to_string(),
                }
            )
        }
        async fn version_str(
            &mut self,
            _input: Empty,
        ) -> Result<VersionDisplayMessage, Box<dyn std::error::Error + Send>> {
            Ok(
                VersionDisplayMessage {
                    display: VERSION.to_owned(),
                }
            )
        }
        async fn name(
            &mut self,
            _input: Empty,
        ) -> Result<NameMessage, Box<dyn std::error::Error + Send>> {
            Ok(
                NameMessage {
                    name: NAME.to_string(),
                }
            )
        }
        async fn get_fan_rpm<'b: 'a>(
            &mut self,
            _input: Empty,
        ) -> Result<
            usdpl_back::nrpc::ServiceServerStream<'b, RpmMessage>,
            Box<dyn std::error::Error + Send>,
        > {
            let hwmon = self.ctrl.fan_hwmon_clone();
            let stream = usdpl_back::nrpc::_helpers::futures::stream::iter(once_true()).then(move |is_first| {
                let hwmon = hwmon.clone();
                tokio::task::spawn_blocking(
                    /* tokio::time::sleep(..) is not Unpin (but this is)... *grumble grumble* */
                    move || if !is_first { std::thread::sleep(FAN_READ_PERIOD); })
                .map(move |_| {
                        if let Some(rpm) = crate::sys::read_fan(&hwmon) {
                            log::debug!("get_fan_rpm() success: {}", rpm);
                            Ok(RpmMessage { rpm: rpm as u32 })
                        } else {
                            Err(usdpl_back::nrpc::ServiceError::Method(Box::<dyn std::error::Error + Send + Sync>::from("Failed to read fan speed")))
                        }
                    })
            });
            Ok(Box::new(stream))
        }

        async fn get_temperature<'b: 'a>(
            &mut self,
            _input: Empty,
        ) -> Result<
            usdpl_back::nrpc::ServiceServerStream<'b, TemperatureMessage>,
            Box<dyn std::error::Error + Send>,
        > {
            let thermal_zone = self.ctrl.temperature_source_clone();
            let stream = usdpl_back::nrpc::_helpers::futures::stream::iter(once_true()).then(move |is_first| {
                let thermal_zone = thermal_zone.clone();
                tokio::task::spawn_blocking(
                    /* tokio::time::sleep(..) is not Unpin (but this is)... *grumble grumble* */
                    move || if !is_first { std::thread::sleep(TEMPERATURE_READ_PERIOD); })
                .map(move |_| {
                        if let Some(temperature) = crate::sys::read_temperature(&thermal_zone) {
                            let real_temp = temperature as f64 / 1000.0;
                            log::debug!("get_temperature() success: {}", real_temp);
                            Ok(TemperatureMessage { temperature: real_temp })
                        } else {
                            Err(usdpl_back::nrpc::ServiceError::Method(Box::<dyn std::error::Error + Send + Sync>::from("get_temperature failed to read BC-250 temperature source")))
                        }
                    })
            });
            Ok(Box::new(stream))
        }

        async fn set_enable(
            &mut self,
            input: EnablementMessage,
        ) -> Result<EnablementMessage, Box<dyn std::error::Error + Send>>{
            let mut settings = self.ctrl.settings().write().await;
            if settings.enable != input.is_enabled {
                let mut state = self.ctrl.state().write().await;
                settings.enable = input.is_enabled;
                state.dirty = true;
            }
            log::debug!("set_enable({}) success", input.is_enabled);
            Ok(input)
        }
        async fn get_enable(
            &mut self,
            _input: Empty,
        ) -> Result<EnablementMessage, Box<dyn std::error::Error + Send>>{
            let is_enabled = self.ctrl.settings().read().await.enable;
            log::debug!("get_enable() success");
            Ok(EnablementMessage { is_enabled })
        }
        async fn set_interpolate(
            &mut self,
            input: EnablementMessage,
        ) -> Result<EnablementMessage, Box<dyn std::error::Error + Send>>{
            let mut settings = self.ctrl.settings().write().await;
            if settings.interpolate != input.is_enabled {
                let mut state = self.ctrl.state().write().await;
                settings.interpolate = input.is_enabled;
                state.dirty = true;
            }
            log::debug!("set_interpolate({}) success", input.is_enabled);
            Ok(input)
        }
        async fn get_interpolate(
            &mut self,
            _input: Empty,
        ) -> Result<EnablementMessage, Box<dyn std::error::Error + Send>>{
            let is_enabled = self.ctrl.settings().read().await.interpolate;
            log::debug!("get_interpolate() success");
            Ok(EnablementMessage { is_enabled })
        }
        async fn get_curve_x(
            &mut self,
            _input: Empty,
        ) -> Result<CurveMessageX, Box<dyn std::error::Error + Send>>{
            let settings = self.ctrl.settings().read().await;
            let x = settings.curve.iter().map(|p| p.x).collect();
            log::debug!("get_curve_x() success");
            Ok(CurveMessageX { x })
        }
        async fn get_curve_y(
            &mut self,
            _input: Empty,
        ) -> Result<CurveMessageY, Box<dyn std::error::Error + Send>>{
            let settings = self.ctrl.settings().read().await;
            let y = settings.curve.iter().map(|p| p.y).collect();
            log::debug!("get_curve_x() success");
            Ok(CurveMessageY { y })
        }
        async fn add_curve_point(
            &mut self,
            point: GraphPoint,
        ) -> Result<Empty, Box<dyn std::error::Error + Send>>{
            let mut settings = self.ctrl.settings().write().await;
            settings.curve.push(super::datastructs::GraphPoint {
                x: point.x,
                y: point.y
            });
            settings.sort_curve();
            let mut state = self.ctrl.state().write().await;
            state.dirty = true;
            log::debug!("add_curve_point(point: {:?}) success", point);
            Ok(Empty { ok: true })
        }
        async fn remove_curve_point(
            &mut self,
            input: IndexMessage,
        ) -> Result<Empty, Box<dyn std::error::Error + Send>>{
            let mut settings = self.ctrl.settings().write().await;
            let i = input.index as usize;
            if settings.curve.len() > i {
                settings.curve.swap_remove(i);
                settings.sort_curve();
                let mut state = self.ctrl.state().write().await;
                state.dirty = true;
                log::debug!("remove_curve_point(point: {}) success", input.index);
                Ok(Empty { ok: true })
            } else {
                log::debug!("remove_curve_point(index: {}) failed", input.index);
                Ok(Empty { ok: false })
            }
        }
}
