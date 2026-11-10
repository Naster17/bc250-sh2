use std::default::Default;
use std::fmt::Display;

use serde::{Serialize, Deserialize};

//use super::datastructs::{Settings, GraphPoint};

#[derive(Serialize, Deserialize)]
pub struct SettingsJson {
    pub version: u64,
    pub enable: bool,
    pub interpolate: bool,
    pub curve: Vec<GraphPointJson>,
    pub fan_bounds: Option<BoundsJson>,
    pub temperature_bounds: Option<BoundsJson>,
}

#[derive(Serialize, Deserialize)]
pub struct GraphPointJson {
    pub x: f64,
    pub y: f64,
}

#[derive(Serialize, Deserialize)]
pub struct BoundsJson {
    pub min: f64,
    pub max: f64,
}

impl Default for SettingsJson {
    fn default() -> Self {
        Self {
            version: 1,
            enable: false,
            interpolate: true,
            curve: vec![
                GraphPointJson { x: 0.0, y: 0.25 },
                GraphPointJson { x: 0.4, y: 0.35 },
                GraphPointJson { x: 0.5, y: 0.43 },
                GraphPointJson { x: 0.6, y: 0.55 },
                GraphPointJson { x: 0.7, y: 0.69 },
                GraphPointJson { x: 0.8, y: 0.84 },
                GraphPointJson { x: 1.0, y: 1.0 },
            ],
            fan_bounds: Some(BoundsJson {
                min: 0.0,
                max: 255.0,
            }),
            temperature_bounds: Some(BoundsJson {
                min: 0.0,
                max: 100.0,
            })
        }
    }
}

impl SettingsJson {
    pub fn save<P: AsRef<std::path::Path>>(&self, path: P) -> Result<(), JsonError> {
        let path = path.as_ref();
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent).map_err(JsonError::Io)?;
        }
        let mut file = std::fs::File::create(path).map_err(JsonError::Io)?;
        serde_json::to_writer_pretty(&mut file, &self).map_err(JsonError::Serde)
    }

    pub fn open<P: AsRef<std::path::Path>>(path: P) -> Result<Self, JsonError> {
        let mut file = std::fs::File::open(path).map_err(JsonError::Io)?;
        serde_json::from_reader(&mut file).map_err(JsonError::Serde)
    }
}

#[derive(Debug)]
pub enum JsonError {
    Serde(serde_json::Error),
    Io(std::io::Error),
}

impl Display for JsonError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Self::Serde(e) => (e as &dyn Display).fmt(f),
            Self::Io(e) => (e as &dyn Display).fmt(f),
        }
    }
}
