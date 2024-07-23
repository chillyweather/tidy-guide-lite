/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneFrame } from "../figma_functions/utilityFunctions";
import { researchNodes } from "./getElementsSizes";
import { buildMarksForHorizontal } from "./buldMarksForHorizontal";
import { buildMarksForVertical } from "./buildMarksForVertical";
import buildMarksForPaddings from "./buildMarksForPaddings";
import getFrameMeasurements from "./getFrameMeasurements";

const elementsCoordinatesAndDimensionsX: any = [];
const elementsCoordinatesAndDimensionsY: any = [];

function buildSpacingMarks(
  frame: InstanceNode,
  selectedCheckboxes: any,
  sizeMarker: ComponentSetNode,
  spacingMarker: ComponentSetNode
) {
  try {
    const spacingMarkers = [];
    const workingFrame = cloneFrame(frame);
    workingFrame.effects = [];
    elementsCoordinatesAndDimensionsX.length = 0;
    elementsCoordinatesAndDimensionsY.length = 0;
    researchNodes(
      workingFrame,
      elementsCoordinatesAndDimensionsX,
      elementsCoordinatesAndDimensionsY,
      selectedCheckboxes.isShallow
    );

    if (selectedCheckboxes.paddings) {
      const paddingMarkers = buildMarksForPaddings(
        workingFrame,
        selectedCheckboxes.rootElementSize,
        selectedCheckboxes.units,
        sizeMarker,
        spacingMarker
      );
      if (paddingMarkers) spacingMarkers.push(...paddingMarkers);
    }

    if (selectedCheckboxes.itemspacings) {
      if (
        workingFrame.layoutMode === "VERTICAL" &&
        workingFrame.absoluteBoundingBox
      ) {
        const verticalMarkers = buildMarksForVertical(
          workingFrame,
          elementsCoordinatesAndDimensionsY,
          workingFrame.absoluteBoundingBox.x,
          selectedCheckboxes.rootElementSize,
          selectedCheckboxes.units,
          sizeMarker,
          spacingMarker
        );
        spacingMarkers.push(...verticalMarkers);
      } else if (workingFrame.absoluteBoundingBox) {
        const horizontalMarkers = buildMarksForHorizontal(
          workingFrame,
          elementsCoordinatesAndDimensionsX,
          workingFrame.absoluteBoundingBox.y,
          selectedCheckboxes.rootElementSize,
          selectedCheckboxes.units,
          sizeMarker,
          spacingMarker
        );
        spacingMarkers.push(...horizontalMarkers);
      }
    }

    if (selectedCheckboxes.size) {
      const sizeMarkers = getFrameMeasurements(
        workingFrame,
        selectedCheckboxes.rootElementSize,
        selectedCheckboxes.units,
        sizeMarker,
        spacingMarker
      );
      spacingMarkers.push(...sizeMarkers);
    }

    workingFrame.remove();
    return spacingMarkers;
  } catch (err) {
    console.log(err);
  }
}

export default buildSpacingMarks;
