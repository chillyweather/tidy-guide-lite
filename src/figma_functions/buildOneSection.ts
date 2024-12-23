/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAnatomySection } from "src/figma_doc_sections/buildAnatomySection";
import { buildSpacingSection } from "src/figma_doc_sections/buildSpacingSection";
import { buildVarSection } from "src/figma_doc_sections/buildVarSection";
import { buildPropSection } from "src/figma_doc_sections/buildPropSection";
import { buildAutoLayoutFrame, getDefaultElement } from "./utilityFunctions";
import { buildTitle } from "src/figma_doc_sections/elementBuildingFunctions";
import { getNode } from "./getNode";
import { buildAnatomySpacings } from "./AnatomySpacing/buildAnatomySpacings";
import { placeResultTopRight } from "./utilityFunctions";

export async function buildOneSection(
  loadFonts: (font?: any) => Promise<void>,
  nodeId: any,
  nodeKey: any,
  type: string,
  indexPosition?: string,
  indexSpacing?: string,
  appSettings?: any,
  isInternalSpacing?: boolean,
  template?: any
) {
  console.log("template", template);
  await loadFonts(appSettings.documentationFonts.title);
  const foundNode = await getNodeAndDefaultElement(nodeId, nodeKey);
  const instance = foundNode.createInstance();

  if (!foundNode || foundNode.type !== "COMPONENT") return;

  const result = await buildSectionContent(
    type,
    instance,
    indexPosition,
    indexSpacing,
    appSettings,
    isInternalSpacing,
    template
  );

  instance.remove();
  return result;
}

// const sectionBuilders = {
//   anatomy: buildAnatomySection,
//   variants: buildVarSection,
//   spacing: buildSpacingSection,
//   property: buildPropSection,
// };

async function buildSectionContent(
  type: string,
  node: InstanceNode,
  indexPosition?: string,
  indexSpacing?: string,
  appSettings?: any,
  isInternalSpacing?: boolean,
  template?: any
) {
  const frame = buildResultFrame();

  if (type === "anatomy") {
    const title = buildTitle("Anatomy", appSettings.documentationFont);
    frame.appendChild(title);
    await buildAnatomySection(
      node,
      frame,
      indexPosition,
      indexSpacing,
      appSettings,
      template
    );
  } else if (type === "variants") {
    const title = buildTitle("Variants");
    frame.appendChild(title);
    await buildVarSection(node, frame);
  } else if (type === "spacing") {
    const title = buildTitle("Size & spacing");
    frame.appendChild(title);
    await buildSpacingSection(node, frame, appSettings);
    adjustSpacingFrame(frame);
    //! here be anatomy spacing
    if (isInternalSpacing) await buildAnatomySpacings(node, frame);
  } else if (type === "property") {
    const title = buildTitle("Property");
    frame.appendChild(title);
    const propSection = await buildPropSection(node, frame);
    if (propSection) adjustPropFrame(propSection);
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
