/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildTitle } from "../figma_doc_sections/elementBuildingFunctions";
import buildSectionContent from "./sectionBuilder";
import { buildAutoLayoutFrame, getDefaultElement } from "./utilityFunctions";
import { getNode } from "./getNode";
import { emit, computeMaximumBounds } from "@create-figma-plugin/utilities";

export const documentationWidth = 1200;
export const documentationPadding = 20;

const sectionCornerRadius = 8;
const documentationCornerRadius = 12;

export default async function documentationBuilder(
  data: any,
  loadFonts: (font?: any) => Promise<void>,
  appSettings: any,
  template: any
) {
  await loadFonts(appSettings.documentationFonts.title);
  await loadFonts(appSettings.documentationFonts.sectionTitle);

  const children = figma.currentPage.children;
  const bounds = computeMaximumBounds(Array.from(children));

  const documentationFrame = buildDocumentationFrame(
    template.name,
    template.direction
  );
  figma.currentPage.appendChild(documentationFrame);
  if (children && children.length) {
    documentationFrame.x = bounds[1].x + 100;
    documentationFrame.y = bounds[0].y;
  }

  const headerSectionFrame = buildSectionFrame();
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

  const predefinedSections = ["anatomy", "spacing", "property", "variants"];

  for (const element of data.docs) {
    if (element.hidden) continue;

    const isPredefined = predefinedSections.includes(element.datatype);
    if (isPredefined && !currentNode) continue;

    const sectionFrame = buildSectionFrame();

    addSectionToDocFrame(sectionFrame, element, appSettings);

    buildSectionContent(element, sectionFrame, currentNode, appSettings);

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
    direction: "NONE" | "HORIZONTAL" | "VERTICAL"
  ): FrameNode {
    const documentationFrame = buildAutoLayoutFrame(
      name,
      direction,
      50,
      60,
      40
    );

    documentationFrame.resize(documentationWidth, documentationFrame.height);
    documentationFrame.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1,
        },
        boundVariables: {},
      },
    ];
    documentationFrame.topLeftRadius = documentationCornerRadius;
    documentationFrame.topRightRadius = documentationCornerRadius;
    documentationFrame.bottomLeftRadius = documentationCornerRadius;
    documentationFrame.bottomRightRadius = documentationCornerRadius;
    return documentationFrame;
  }

  function buildSectionFrame() {
    const sectionFrame = buildAutoLayoutFrame(
      "sectionFrame",
      "VERTICAL",
      20,
      20,
      24
    );

    sectionFrame.topLeftRadius = sectionCornerRadius;
    sectionFrame.topRightRadius = sectionCornerRadius;
    sectionFrame.bottomLeftRadius = sectionCornerRadius;
    sectionFrame.bottomRightRadius = sectionCornerRadius;
    return sectionFrame;
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
