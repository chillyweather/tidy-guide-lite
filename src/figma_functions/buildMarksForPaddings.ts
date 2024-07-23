/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMarkerShift } from "./tagPlacementFunctions";
import { getMarkerComponent } from "./getMarkerComponent";
import { setMarkerSizeProps } from "./setMarkerSizeProps";

//TODO refactoring needed
function findPaddings(frame: InstanceNode | FrameNode) {
  interface PaddingData {
    y?: number;
    x?: number;
    size?: number;
  }

  const elementPaddings = {
    topPadding: {} as PaddingData,
    rightPadding: {} as PaddingData,
    bottomPadding: {} as PaddingData,
    leftPadding: {} as PaddingData,
  };

  interface FrameParameters {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
  }

  const frameParameters: FrameParameters = {};
  frameParameters.paddingLeft = frame.paddingLeft;
  frameParameters.paddingRight = frame.paddingRight;
  frameParameters.paddingTop = frame.paddingTop;
  frameParameters.paddingBottom = frame.paddingBottom;
  frameParameters.width = frame.width;
  frameParameters.height = frame.height;
  frameParameters.x = frame.absoluteBoundingBox?.x;
  frameParameters.y = frame.absoluteBoundingBox?.y;

  if (frame.children) {
    const children = figma.group(frame.children, frame);
    if (!frame.absoluteBoundingBox || !children.absoluteBoundingBox) return;

    elementPaddings.topPadding.y = frame.absoluteBoundingBox.y;
    elementPaddings.topPadding.size =
      frameParameters.paddingTop ||
      children.absoluteBoundingBox.y - frame.absoluteBoundingBox.y;

    elementPaddings.bottomPadding.y = frameParameters.paddingBottom
      ? frame.absoluteBoundingBox.y +
        frameParameters.height -
        frameParameters.paddingBottom
      : children.absoluteBoundingBox.y + children.absoluteBoundingBox.height;

    elementPaddings.bottomPadding.size =
      frameParameters.paddingBottom ||
      frame.absoluteBoundingBox.y +
        frameParameters.height -
        (children.absoluteBoundingBox.y + children.absoluteBoundingBox.height);

    elementPaddings.leftPadding.x = frame.absoluteBoundingBox.x;

    elementPaddings.leftPadding.size =
      frameParameters.paddingLeft ||
      children.absoluteBoundingBox.x - frame.absoluteBoundingBox.x;

    elementPaddings.rightPadding.x = frameParameters.paddingRight
      ? frame.absoluteBoundingBox.x +
        frameParameters.width -
        frameParameters.paddingRight
      : children.absoluteBoundingBox.x + children.absoluteBoundingBox.width;

    elementPaddings.rightPadding.size =
      frameParameters.paddingRight ||
      frame.absoluteBoundingBox.x +
        frameParameters.width -
        (children.absoluteBoundingBox.x + children.absoluteBoundingBox.width);
    figma.ungroup(children);
  }

  return elementPaddings;
}

function buildMarksForPaddings(
  node: InstanceNode | FrameNode,
  rootSize: number,
  units: any,
  sizeMarker: ComponentSetNode,
  spacingMarker: ComponentSetNode
) {
  const elementPaddings = findPaddings(node);

  const paddingMarkers = [];

  if (!elementPaddings) return;
  if (
    elementPaddings.leftPadding.size &&
    elementPaddings.leftPadding.size > 0.01
  ) {
    const leftPaddingMarker = getMarkerComponent(
      sizeMarker,
      spacingMarker,
      "top"
    );
    if (!leftPaddingMarker) return;
    const markerHandLength = leftPaddingMarker.children[1].width;
    if (elementPaddings.leftPadding.x)
      leftPaddingMarker.x = elementPaddings.leftPadding.x;
    if (node.absoluteBoundingBox)
      leftPaddingMarker.y = node.absoluteBoundingBox.y - markerHandLength - 21;
    leftPaddingMarker.resize(
      elementPaddings.leftPadding.size,
      node.height + markerHandLength + 21
    );
    setMarkerSizeProps(
      rootSize,
      elementPaddings.leftPadding.size,
      leftPaddingMarker,
      units,
      "HORIZONTAL",
      node
    );

    leftPaddingMarker.name = ".padding-marker_left";
    paddingMarkers.push(leftPaddingMarker);
  }

  if (
    elementPaddings.rightPadding.size &&
    elementPaddings.rightPadding.size > 0.01
  ) {
    const rightPaddingMarker = getMarkerComponent(
      sizeMarker,
      spacingMarker,
      "top"
    );
    if (!rightPaddingMarker) return;
    const markerHandLength = rightPaddingMarker.children[1].width;
    rightPaddingMarker.x = elementPaddings.rightPadding.x ?? 0;
    rightPaddingMarker.y = node.absoluteBoundingBox
      ? node.absoluteBoundingBox.y - markerHandLength - 21
      : 0;
    rightPaddingMarker.resize(
      elementPaddings.rightPadding.size,
      node.height + markerHandLength + 21
    );
    setMarkerSizeProps(
      rootSize,
      elementPaddings.rightPadding.size,
      rightPaddingMarker,
      units,
      "HORIZONTAL",
      node
    );
    rightPaddingMarker.name = ".padding-marker_right";
    paddingMarkers.push(rightPaddingMarker);
  }

  if (
    elementPaddings.topPadding.size &&
    elementPaddings.topPadding.size > 0.01
  ) {
    const topPaddingMarker = getMarkerComponent(
      sizeMarker,
      spacingMarker,
      "right"
    );
    if (!topPaddingMarker) return;
    topPaddingMarker.y = elementPaddings.topPadding.y ?? 0;
    if (node.absoluteBoundingBox)
      topPaddingMarker.x = node.absoluteBoundingBox.x;

    setMarkerSizeProps(
      rootSize,
      elementPaddings.topPadding.size,
      topPaddingMarker,
      units,
      "VERTICAL",
      node
    );

    const shift = getMarkerShift(topPaddingMarker);
    topPaddingMarker.resize(
      node.width + shift,
      elementPaddings.topPadding.size
    );
    topPaddingMarker.name = ".padding-marker_top";
    paddingMarkers.push(topPaddingMarker);
  }

  if (
    elementPaddings.bottomPadding.size &&
    elementPaddings.bottomPadding.size > 0.01
  ) {
    const bottomPaddingMarker = getMarkerComponent(
      sizeMarker,
      spacingMarker,
      "right"
    );
    if (!bottomPaddingMarker) return;
    bottomPaddingMarker.y = elementPaddings.bottomPadding.y ?? 0;
    if (node.absoluteBoundingBox)
      bottomPaddingMarker.x = node.absoluteBoundingBox.x;
    setMarkerSizeProps(
      rootSize,
      elementPaddings.bottomPadding.size,
      bottomPaddingMarker,
      units,
      "VERTICAL",
      node
    );
    const shift = getMarkerShift(bottomPaddingMarker);
    bottomPaddingMarker.resize(
      node.width + shift,
      elementPaddings.bottomPadding.size
    );
    bottomPaddingMarker.name = ".padding-marker_bottom";
    paddingMarkers.push(bottomPaddingMarker);
  }

  return paddingMarkers;
}

export default buildMarksForPaddings;
