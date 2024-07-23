/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMarkerShift } from "./tagPlacementFunctions";
import { getMarkerComponent } from "./getMarkerComponent";
import { setMarkerSizeProps } from "./setMarkerSizeProps";

function buildMarksForVertical(
  frame: InstanceNode | FrameNode,
  elementsDimensions: any[],
  xPos: number,
  rootElementSize: number,
  units: any,
  sizeMarker: ComponentSetNode,
  spacingMarker: ComponentSetNode
) {
  const spacings: InstanceNode[] = [];
  elementsDimensions.forEach((element, index, array) => {
    if (index < array.length - 1) {
      const space = array[index + 1][0] - array[index][1];
      if (space > 0) {
        const marker = getMarkerComponent(sizeMarker, spacingMarker, "right");
        if (!marker) return;
        marker.x = xPos;
        marker.y = array[index][1];
        setMarkerSizeProps(
          rootElementSize,
          space,
          marker,
          units,
          "VERTICAL",
          frame
        );
        const shift = getMarkerShift(marker);
        marker.resize(frame.width + shift, space);
        marker.name = `.spacing-marker-${index + 1}_vertical`;
        spacings.push(marker);
      }
    }
  });
  if (spacings.length > 0 && frame.parent) {
    const spacingGroup = figma.group(spacings, frame.parent);
    spacingGroup.name = "spacings";
  }
  return spacings;
}

export { buildMarksForVertical };
