import { getMarkerComponent } from "./getMarkerComponent";
import { setMarkerSizeProps } from "./setMarkerSizeProps";

export default function getFrameMeasurements(
  frame: SceneNode,
  rootElementSize: number,
  units: string,
  sizeMarker: ComponentSetNode,
  spacingMarker: ComponentSetNode
) {
  const rightMarker = getMarkerComponent(
    sizeMarker,
    spacingMarker,
    "right",
    "size"
  );
  const bottomMarker = getMarkerComponent(
    sizeMarker,
    spacingMarker,
    "bottom",
    "size"
  );
  if (rightMarker) {
    setMarkerSizeProps(
      rootElementSize,
      frame.height,
      rightMarker,
      units,
      "VERTICAL",
      frame
    );
    rightMarker.resize(rightMarker.width, frame.height);
    rightMarker.x = frame.x + frame.width;
    rightMarker.y = frame.y;
    rightMarker.name = ".frame-size_left";
  }
  if (bottomMarker) {
    setMarkerSizeProps(
      rootElementSize,
      frame.width,
      bottomMarker,
      units,
      "HORIZONTAL",
      frame
    );
    bottomMarker.resize(frame.width, bottomMarker.height);
    bottomMarker.x = frame.x;
    bottomMarker.y = frame.y + frame.height;
    bottomMarker.name = ".frame-size_bottom";
  }
  return [rightMarker, bottomMarker];
}
