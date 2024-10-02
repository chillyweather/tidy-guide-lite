/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildTitle } from "../figma_doc_sections/elementBuildingFunctions";
import buildSectionContent from "./sectionBuilder";
import {
  buildAutoLayoutFrame,
  getDefaultElement,
  positionDocumentationOnCanvas,
} from "./utilityFunctions";
import { getNode } from "./getNode";
import { emit } from "@create-figma-plugin/utilities";

import {
  documentationWidth,
  documentationCornerRadius,
  sectionCornerRadius,
  documentationFrameFills,
  predefinedSections,
} from "./constants";

export default async function documentationBuilder(
  data: any,
  loadFonts: (font?: any) => Promise<void>,
  appSettings: any,
  template: any
) {
  //may be changed depending on our decisions on design
  await loadFonts(appSettings.documentationFonts.title);
  await loadFonts(appSettings.documentationFonts.sectionTitle);

  const documentationFrame = buildDocumentationFrame(
    template.name,
    template.direction
  );

  positionDocumentationOnCanvas(documentationFrame, 100, 0);

  const { name, direction } = template.elements.header;
  const headerSectionFrame = buildSectionFrame(name, direction);

  documentationFrame.appendChild(headerSectionFrame);
  headerSectionFrame.layoutSizingHorizontal = "FILL";

  const title = buildTitle(data.title, appSettings.documentationFonts.title);
  const divider = buildDivider();

  const defaultElement = await getNodeAndDefaultElement(data);

  let currentNode = null;
  if (defaultElement) {
    currentNode = defaultElement.createInstance();
    headerSectionFrame.appendChild(title);
    headerSectionFrame.appendChild(currentNode);
  } else {
    headerSectionFrame.appendChild(title);
  }

  const allSectonsData = template.elements;
  for (const element of data.docs) {
    const sectionData = allSectonsData[element.datatype];
    if (element.hidden) continue;

    const isPredefined = predefinedSections.includes(element.datatype);
    if (isPredefined && !currentNode) continue;

    const sectionFrame = buildSectionFrame(
      sectionData.name,
      sectionData.direction
    );

    addSectionToDocFrame(sectionFrame, element, appSettings);

    buildSectionContent(
      element,
      sectionFrame,
      currentNode,
      appSettings,
      sectionData
    );

    documentationFrame.layoutSizingHorizontal = "HUG";
  }

  adjustTitle();
  adjustDividers();

  function addSectionToDocFrame(
    sectionFrame: FrameNode,
    element: any,
    appSettings: any
  ) {
    documentationFrame.appendChild(sectionFrame);
    sectionFrame.layoutSizingHorizontal = "FILL";
    documentationFrame.appendChild(divider.clone());
    const title = element.title;
    if (title) {
      const titleFrame = buildTitle(
        title,
        appSettings.documentationFonts.sectionTitle
      );
      sectionFrame.appendChild(titleFrame);
    }
  }

  async function getNodeAndDefaultElement(data: any): Promise<any> {
    const node = await getNode(data.nodeId, data.componentKey);
    if (!node) return;

    emit("FOUND_ELEMENT", node, node.name, node.key);
    const defaultElement = await getDefaultElement(node);
    if (defaultElement) return defaultElement;
  }

  function buildDocumentationFrame(
    name: string,
    direction: "NONE" | "HORIZONTAL" | "VERTICAL" = "VERTICAL"
  ): FrameNode {
    const documentationFrame = buildAutoLayoutFrame(
      name,
      direction,
      50,
      60,
      40
    );

    documentationFrame.resize(documentationWidth, documentationFrame.height);
    documentationFrame.fills = documentationFrameFills;
    setSectionCornerRadius(documentationFrame, documentationCornerRadius);
    return documentationFrame;
  }

  function buildSectionFrame(
    name: string,
    direction: "NONE" | "HORIZONTAL" | "VERTICAL" = "VERTICAL"
  ): FrameNode {
    const sectionFrame = buildAutoLayoutFrame(name, direction, 20, 20, 24);
    setSectionCornerRadius(sectionFrame, sectionCornerRadius);
    return sectionFrame;
  }

  function setSectionCornerRadius(frame: FrameNode, radius: number) {
    const corners = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    corners.forEach((corner) => {
      (frame as any)[`${corner}Radius`] = radius;
    });
  }
  function adjustTitle() {
    const docTitle = documentationFrame.findOne(
      (node) => node.name === "title"
    );
    if (!docTitle || docTitle.type !== "FRAME") return;
    const titleText = docTitle.children[0] as TextNode;
    titleText.fontSize = 70;
  }

  function buildDivider() {
    const divider = figma.createRectangle();
    divider.name = "divider";
    divider.resize(documentationWidth, 1.5);
    return divider;
  }

  function adjustDividers() {
    const dividers = documentationFrame.findAll(
      (node) => node.name === "divider"
    );
    dividers.forEach((divider) => {
      if (divider.type === "RECTANGLE") {
        divider.layoutAlign = "STRETCH";
      }
    });
    divider.remove();
  }

  figma.viewport.scrollAndZoomIntoView([documentationFrame]);
}
