import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  Field,
  ServerAPI,
  ToggleField,
  SliderField,
  staticClasses,
  Navigation,
} from "decky-frontend-lib";
import { VFC, useState } from "react";
import { FaFan } from "react-icons/fa";
import { SiOnlyfans } from "react-icons/si";

import { version_usdpl } from "fantastic-wasm";

import * as backend from "./backend";
import {Canvas} from "./canvas";

const POINT_SIZE = 32;

var periodicHook: any = null;
var usdplReady: boolean = false;

var name: string = "";
var version: string = "";

var curve_backup: {x: number, y: number}[] = [];

const DEFAULT_TEMPERATURE_CURVE: {x: number, y: number}[] = [
  {x: 0.0, y: 0.25},
  {x: 0.4, y: 0.35},
  {x: 0.5, y: 0.43},
  {x: 0.6, y: 0.55},
  {x: 0.7, y: 0.69},
  {x: 0.8, y: 0.84},
  {x: 1.0, y: 1.0},
];
const TEMPERATURE_CURVE_KEY = "fantastic-bc250.temperature-curve";

function isFlatCurve(value: {x: number, y: number}[]): boolean {
  return value.length > 0
    && value.every((point) => Math.abs(point.y - value[0].y) < 0.005);
}

function loadTemperatureCurve(): {x: number, y: number}[] {
  try {
    const raw = window.localStorage.getItem(TEMPERATURE_CURVE_KEY);
    if (raw != null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const points = parsed.filter((point: any) =>
          typeof point?.x === "number" && typeof point?.y === "number");
        if (points.length > 0) {
          return points;
        }
      }
    }
  } catch (err) {
    console.warn("Fantastic: could not read saved temperature curve", err);
  }
  return [];
}

var temperatureCurve: {x: number, y: number}[] = loadTemperatureCurve();
var manualSpeedTimer: any = null;
var manualSpeedSeq: number = 0;

function rememberTemperatureCurve(value: {x: number, y: number}[]): void {
  if (value.length === 0 || isFlatCurve(value)) {
    return;
  }
  temperatureCurve = value;
  try {
    window.localStorage.setItem(TEMPERATURE_CURVE_KEY, JSON.stringify(value));
  } catch (err) {
    console.warn("Fantastic: could not save temperature curve", err);
  }
}

var tempCache: number = -1337;
var setTemperature_display = (_: number) => {};

var fanRpmCache: number = -273;
var setFanRpm_display = (_: number) => {};

const Content: VFC<{ serverAPI: ServerAPI }> = ({serverAPI}) => {
  // const [result, setResult] = useState<number | undefined>();

  // const onClick = async () => {
  //   const result = await serverAPI.callPluginMethod<AddMethodArgs, number>(
  //     "add",
  //     {
  //       left: 2,
  //       right: 2,
  //     }
  //   );
  //   if (result.success) {
  //     setResult(result.result);
  //   }
  // };

  const [enabledGlobal, setEnableInternal] = useState<boolean>(false);
  const [interpolGlobal, setInterpol] = useState<boolean>(false);
  const [_serverApiGlobal, setServerApi] = useState<ServerAPI>(serverAPI);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [curveGlobal, setCurve_internal] = useState<{x: number, y: number}[]>(curve_backup);
  const [manualSpeedGlobal, setManualSpeedState] = useState<number>(0);
  const [manualMode, setManualMode] = useState<boolean>(false);

  const setCurve = (value: {x: number, y: number}[]) => {
    setCurve_internal(value);
    curve_backup = value;
    if (value.length > 0) {
      const flat = isFlatCurve(value);
      if (!flat) {
        rememberTemperatureCurve(value);
      }
      const speed = flat
        ? value[0].y
        : value.reduce((sum, point) => sum + point.y, 0) / value.length;
      setManualSpeedState(Math.round(speed * 100));
    }
  };

  const setManualSpeed = (value: number) => {
    setManualSpeedState(value);
    if (!manualMode && curveGlobal.length > 0 && !isFlatCurve(curveGlobal)) {
      rememberTemperatureCurve(curveGlobal);
    }
    setManualMode(true);
    if (!enabledGlobal) {
      setEnable(true);
      backend.resolve(backend.setEnabled(true), setEnable);
    }

    const seq = ++manualSpeedSeq;
    if (manualSpeedTimer != null) {
      clearTimeout(manualSpeedTimer);
    }
    manualSpeedTimer = setTimeout(async () => {
      if (seq !== manualSpeedSeq) {
        return;
      }
      let current = await backend.getCurve();
      while (current.length > 0) {
        current = await backend.removeCurvePoint(0);
        if (seq !== manualSpeedSeq) {
          return;
        }
      }
      current = await backend.addCurvePoint({x: 0, y: value / 100});
      if (seq !== manualSpeedSeq) {
        return;
      }
      current = await backend.addCurvePoint({x: 1, y: value / 100});
      if (seq !== manualSpeedSeq) {
        return;
      }
      setCurve(current);
    }, 150);
  };

  const setTemperatureMode = (value: boolean) => {
    const seq = ++manualSpeedSeq;
    if (manualSpeedTimer != null) {
      clearTimeout(manualSpeedTimer);
      manualSpeedTimer = null;
    }
    if (!value) {
      setManualMode(false);
      backend.resolve(backend.setEnabled(false), setEnable);
      return;
    }

    setManualMode(false);
    const target = temperatureCurve.length > 0
      ? temperatureCurve
      : DEFAULT_TEMPERATURE_CURVE;
    (async () => {
      let current = await backend.getCurve();
      while (current.length > 0) {
        if (seq !== manualSpeedSeq) {
          return;
        }
        current = await backend.removeCurvePoint(0);
      }
      for (const point of target) {
        if (seq !== manualSpeedSeq) {
          return;
        }
        current = await backend.addCurvePoint(point);
      }
      if (seq !== manualSpeedSeq) {
        return;
      }
      setCurve(current);
      backend.resolve(backend.setEnabled(true), setEnable);
    })();
  };

  const [temperatureGlobal, setTemperature] = useState<number>(tempCache);
  const [fanRpmGlobal, setFanRpm] = useState<number>(fanRpmCache);
  setTemperature_display = (x) => {
    setTemperature(x);
    tempCache = x;
  };
  setFanRpm_display = (x) => {
    setFanRpm(x);
    fanRpmCache = x;
  };

  function setEnable(enable: boolean) {
    setEnableInternal(enable);
  }

  function onClickCanvas(e: any) {
    //console.log("[FANTASTIC] canvas click", e);
    const realEvent: any = e.nativeEvent;
    //console.log("Canvas click @ (" + realEvent.layerX.toString() + ", " + realEvent.layerY.toString() + ")");
    const target: any = e.currentTarget;
    //console.log("[FANTASTIC] Target dimensions " + target.width.toString() + "x" + target.height.toString());
    var clickX = realEvent.offsetX;
    var clickY = realEvent.offsetY;
    //console.debug("[FANTASTIC] curve click:", clickX, clickY);
    for (let i = 0; i < curveGlobal.length; i++) {
      const curvePoint = curveGlobal[i];
      const pointX = curvePoint.x * target.width;
      const pointY = (1 - curvePoint.y) * target.height;
      if (
        pointX + POINT_SIZE > clickX
        && pointX - POINT_SIZE < clickX
        && pointY + POINT_SIZE > clickY
        && pointY - POINT_SIZE < clickY
        ) {
          //console.log("Clicked on point " + i.toString());
          backend.resolve(backend.removeCurvePoint(i), setCurve);
          return;
        }
    }
    //console.log("Adding new point");
    const curvePoint = {x: clickX / target.width, y: 1 - (clickY / target.height)};
    backend.resolve(backend.addCurvePoint(curvePoint), setCurve);
  }

  function drawCanvas(ctx: any, frameCount: number): void {
    if (frameCount % 100 > 1) {
      return;
    }
    const width: number = ctx.canvas.width;
    const height: number = ctx.canvas.height;
    ctx.strokeStyle = "#1a9fff";
    ctx.fillStyle = "#1a9fff";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    //ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    /*ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye*/
    //ctx.beginPath();
    //ctx.moveTo(0, height);

    // graph helper lines
    ctx.beginPath();
    ctx.strokeStyle = "#093455";
    //ctx.fillStyle = "#093455";
    const totalLines = 7;
    const lineDistance = 1 / (totalLines + 1);
    for (let i = 1; i <= totalLines; i++) {
      ctx.moveTo(lineDistance * i * width, 0);
      ctx.lineTo(lineDistance * i * width, height);
      ctx.moveTo(0, lineDistance * i * height);
      ctx.lineTo(width, lineDistance * i * height);
    }
    ctx.stroke();
    //ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#1a9fff";
    ctx.fillStyle = "#1a9fff";

    // axis labels
    ctx.textAlign = "center";
    ctx.rotate(- Math.PI / 2);
    ctx.fillText("Fan RPM", - height / 2, 12); // Y axis is rotated 90 degrees
    ctx.rotate(Math.PI / 2);
    ctx.fillText("Temperature", width / 2, height - 4);
    // graph data labels
    ctx.textAlign = "start"; // default
    ctx.fillText("0", 2, height - 2);
    ctx.fillText("100%", 2, 9);
    ctx.textAlign = "right";
    ctx.fillText("100°C", width - 2, height - 2);

    ctx.moveTo(0, height);
    if (interpolGlobal) {
      //ctx.beginPath();
      for (let i = 0; i < curveGlobal.length; i++) {
        const canvasHeight = (1 - curveGlobal[i].y) * height;
        const canvasWidth = curveGlobal[i].x * width;
        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.moveTo(canvasWidth, canvasHeight);
        ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
        ctx.moveTo(canvasWidth, canvasHeight);
      }
      ctx.lineTo(width, 0);
      //ctx.moveTo(width, 0);
    } else {
      //ctx.beginPath();
      for (let i = 0; i < curveGlobal.length - 1; i++) {
        const canvasHeight = (1 - curveGlobal[i].y) * height;
        const canvasWidth = curveGlobal[i].x * width;
        const canvasHeight2 = (1 - curveGlobal[i+1].y) * height;
        const canvasWidth2 = curveGlobal[i+1].x * width;
        //ctx.lineTo(canvasWidth, canvasHeight);
        ctx.moveTo(canvasWidth, canvasHeight);
        ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
        ctx.moveTo(canvasWidth, canvasHeight);
        ctx.lineTo(canvasWidth2, canvasHeight);
        ctx.moveTo(canvasWidth2, canvasHeight);
        ctx.lineTo(canvasWidth2, canvasHeight2);
      }
      if (curveGlobal.length != 0) {
        const i = curveGlobal.length - 1;
        const canvasHeight = (1 - curveGlobal[i].y) * height;
        const canvasWidth = curveGlobal[i].x * width;
        //ctx.lineTo(width, 0);
        ctx.moveTo(canvasWidth, canvasHeight);
        ctx.arc(canvasWidth, canvasHeight, 8, 0, Math.PI * 2);
        ctx.moveTo(canvasWidth, canvasHeight);
        ctx.lineTo(width, canvasHeight);
        //ctx.moveTo(width, canvasHeight);
        //ctx.lineTo(width, 0);
        const canvasHeight2 = (1 - curveGlobal[0].y) * height;
        const canvasWidth2 = curveGlobal[0].x * width;
        ctx.moveTo(canvasWidth2, canvasHeight2);
        ctx.lineTo(canvasWidth2, height);
      }
      //ctx.moveTo(width, 0);
    }
    ctx.stroke();
    ctx.fill();
    console.debug("Rendered fan graph canvas frame", frameCount);
    //console.debug("Drew canvas with " + curveGlobal.length.toString() + " points; " + width.toString() + "x" + height.toString());
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.fillStyle = '#000000';
    //ctx.beginPath();
    //ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
    //ctx.fill();

  }

  if (firstTime) {
    setFirstTime(false);
    setServerApi(serverAPI);
    backend.resolve(backend.getEnabled(), setEnable);
    backend.resolve(backend.getInterpolate(), setInterpol);
    backend.resolve(backend.getCurve(), (value: {x: number, y: number}[]) => {
      setCurve(value);
      if (isFlatCurve(value)) {
        setManualMode(true);
      }
    });
    backend.resolve(backend.getTemperature(setTemperature_display), (_: any) => {});
    backend.resolve(backend.getFanRpm(setFanRpm_display), (_: any) => {});

    if (periodicHook != null) {
      clearInterval(periodicHook);
    }

    /*periodicHook = setInterval(function() {
        backend.resolve(backend.getTemperature(), setTemperature);
        backend.resolve(backend.getFanRpm(), setFanRpm);
    }, 1000);*/
  }

  if (!usdplReady) {
    return (
      <PanelSectionRow>
        <Field
          label="Loading...">
          If you can read this, something probably went wrong :(
        </Field>
      </PanelSectionRow>
    );
  }

  // TODO handle clicking on fan curve nodes

  return (
    <PanelSection>
      <PanelSectionRow>
        <Field
          label="Current Fan Speed">
          {fanRpmGlobal.toFixed(0) + " RPM"}
        </Field>
      </PanelSectionRow>
      <PanelSectionRow>
        <Field
          label="Current Temperature">
          {temperatureGlobal.toFixed(1) + " °C"}
        </Field>
      </PanelSectionRow>
      <PanelSectionRow>
        <SliderField
          label="Manual Fan Speed"
          description="Overrides the temperature curve; moving it turns the curve off"
          value={manualSpeedGlobal}
          min={0}
          max={100}
          step={1}
          showValue={true}
          onChange={setManualSpeed}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <ToggleField
          label="Temperature Fan Curve"
          description="On: saved temperature curve. Off: host auto curve."
          checked={enabledGlobal && !manualMode}
          onChange={setTemperatureMode}
        />
      </PanelSectionRow>
      { enabledGlobal && manualMode &&
      <PanelSectionRow>
        <Field
          label="Return to host auto curve"
          onClick={() => {
            setManualMode(false);
            backend.resolve(backend.setEnabled(false), setEnable);
          }}>
          Software control
        </Field>
      </PanelSectionRow>
      }
      { enabledGlobal && !manualMode &&
      <div className={staticClasses.PanelSectionTitle}>
        Fan
      </div>
      }
      { enabledGlobal && !manualMode &&
      <PanelSectionRow>
        <Canvas draw={drawCanvas} width={268} height={200} style={{
          "width": "268px",
          "height": "200px",
          "padding":"0px",
          "border":"1px solid #1a9fff",
          //"position":"relative",
          "background-color":"#1a1f2c",
          "border-radius":"4px",
          //"margin":"auto",
        }} onClick={(e: any) => onClickCanvas(e)}/>
      </PanelSectionRow>
      }
      { enabledGlobal && !manualMode &&
      <PanelSectionRow>
        <ToggleField
          label="Linear Interpolation"
          description="Pretends a straight line connects points"
          checked={interpolGlobal}
          onChange={(value: boolean) => {
            backend.resolve(backend.setInterpolate(value), setInterpol);
          }}
        />
      </PanelSectionRow>
      }
      <PanelSectionRow>
        <Field
          label={name}
          onClick={()=> { Navigation.NavigateToExternalWeb("https://github.com/Naster17/bc250-sh2/releases"); }}>
          {"v" + version}
        </Field>
      </PanelSectionRow>
      { (version?.includes("alpha") || version?.includes("beta")) && <PanelSectionRow>
        <Field
          label="USDPL"
          onClick={()=> { Navigation.NavigateToExternalWeb("https://git.ngni.us/NG-SD-Plugins/usdpl-rs"); }}>
          v{version_usdpl()}
        </Field>
      </PanelSectionRow>}
    </PanelSection>
  );
};

(async function(){
  if (!usdplReady) {
    await backend.initBackend();
    usdplReady = true;
    backend.getEnabled();
    name = await backend.getName();
    version = await backend.getVersion();
  }
})();

export default definePlugin((serverApi: ServerAPI) => {

  let ico = <FaFan />;
  let now = new Date();
  if (now.getDate() == 1 && now.getMonth() == 3) {
    ico = <SiOnlyfans/>;
  }

  return {
    title: <div className={staticClasses.Title}>Fantastic</div>,
    content: <Content serverAPI={serverApi} />,
    icon: ico,
    onDismount() {
      clearInterval(periodicHook!);
      clearTimeout(manualSpeedTimer!);
    },
  };
});
