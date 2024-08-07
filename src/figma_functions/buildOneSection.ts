/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { buildSpacingSection } from "src/figma_doc_sections/buildSpacingSection";
import { buildVarSection } from "src/figma_doc_sections/buildVarSection";
import { buildPropSection } from "src/figma_doc_sections/buildPropSection";
import { buildAutoLayoutFrame, getDefaultElement } from "./utilityFunctions";
import { buildTitle } from "src/figma_doc_sections/elementBuildingFunctions";
import { getNode } from "./getNode";
import { computeMaximumBounds } from "@create-figma-plugin/utilities";
import { buildAnatomySpacings } from "./buildAnatomySpacings";

export async function buildOneSection(
  loadFonts: () => Promise<void>,
  nodeId: any,
  nodeKey: any,
  type: string,
  indexPosition?: string,
  indexSpacing?: string,
  pluginSettings?: any
) {
  await loadFonts();
  const foundNode = await getNodeAndDefaultElement(nodeId, nodeKey);
  const instance = foundNode.createInstance();

  if (!foundNode || foundNode.type !== "COMPONENT") return;

  const result = await buildSectionContent(
    type,
    instance,
    indexPosition,
    indexSpacing,
    pluginSettings
  );

  instance.remove();
  return result;
}

async function buildSectionContent(
  type: string,
  node: InstanceNode,
  indexPosition?: string,
  indexSpacing?: string,
  pluginSettings?: any
) {
  const frame = buildResultFrame();

  if (type === "anatomy") {
    const title = buildTitle("Anatomy");
    frame.appendChild(title);
    await buildAnatomySection(
      node,
      frame,
      indexPosition,
      indexSpacing,
      pluginSettings
    );
  } else if (type === "variants") {
    const title = buildTitle("Variants");
    frame.appendChild(title);
    await buildVarSection(node, frame);
  } else if (type === "spacing") {
    const title = buildTitle("Spacing");
    frame.appendChild(title);
    await buildSpacingSection(node, frame, pluginSettings);
    adjustSpacingFrame(frame);
    //! here be anatomy spacing
    await buildAnatomySpacings(node, frame);
  } else if (type === "property") {
    const title = buildTitle("Property");
    frame.appendChild(title);
    const propSection = await buildPropSection(node, frame);
    if (propSection) adjustPropFrame(propSection);
    //? how to indicate that there are no properties???
  } else {
    frame.remove();
    return;
  }
  return frame;
}

function adjustPropFrame(frame: FrameNode) {
  const allElementsFrame = frame.findOne(
    (node) => node.name === "allElementsFrame"
  );
  if (!(allElementsFrame && allElementsFrame.type === "FRAME")) return;
  allElementsFrame.layoutSizingHorizontal = "HUG";
}

function adjustSpacingFrame(frame: FrameNode) {
  let childWidth = 0;
  const spacingElements = frame.findOne(
    (node) => node.name === "spacing-element"
  );
  if (!(spacingElements && spacingElements.type === "FRAME")) return;
  const spacingElementsChildren = spacingElements.children;

  spacingElementsChildren.forEach((element) => {
    if (element.type !== "FRAME") return;
    element.layoutSizingHorizontal = "HUG";
    if (element.width > childWidth) childWidth = element.width;
  });

  spacingElements.resize(childWidth, spacingElements.height);

  spacingElements.layoutSizingHorizontal = "FIXED";
  spacingElementsChildren.forEach((element) => {
    if (element.type !== "FRAME") return;
    element.layoutSizingHorizontal = "FILL";
  });
}

function buildResultFrame() {
  const resultFrame = buildAutoLayoutFrame(
    "resultFrame",
    "VERTICAL",
    40,
    40,
    40
  );

  const radiusValue = 8;

  resultFrame.topLeftRadius = radiusValue;
  resultFrame.topRightRadius = radiusValue;
  resultFrame.bottomLeftRadius = radiusValue;
  resultFrame.bottomRightRadius = radiusValue;

  placeResultTopRight(resultFrame);
  return resultFrame;
}

async function getNodeAndDefaultElement(
  nodeId: string,
  nodeKey: string
): Promise<any> {
  const node = await getNode(nodeId, nodeKey);
  if (!node) return;

  const defaultElement = await getDefaultElement(node);
  if (defaultElement) return defaultElement;
}

function placeResultTopRight(resultFrame: FrameNode) {
  const bounds = computeMaximumBounds(Array.from(figma.currentPage.children));
  figma.currentPage.appendChild(resultFrame);
  resultFrame.x = bounds[1].x + 100;
  resultFrame.y = bounds[0].y;

  figma.viewport.scrollAndZoomIntoView([resultFrame]);
}
