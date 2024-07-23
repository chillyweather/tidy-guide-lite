import { setTextProps } from "./utilityFunctions";

type direction = "VERTICAL" | "HORIZONTAL";

export function setMarkerSizeProps(
  rootSize: number,
  markerSize: number,
  marker: InstanceNode,
  units: string,
  direction: direction,
  frame: SceneNode
) {
  if (units === "rem") {
    const remSize = Math.round((+markerSize / rootSize) * 1000) / 1000;
    setTextProps(marker, "text", `${remSize}`);
  }
  if (units === "percent") {
    if (direction === "VERTICAL") {
      const percentSize = Math.ceil((+markerSize / frame.height) * 100);
      setTextProps(marker, "text", `${percentSize}%`);
    }
    if (direction === "HORIZONTAL") {
      const percentSize = Math.ceil((+markerSize / frame.width) * 100);
      setTextProps(marker, "text", `${percentSize}%`);
    }
  }
  if (units === "px") {
    setTextProps(marker, "text", `${markerSize}`);
  }
}
