/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAutoLayoutFrame } from "../figma_functions/utilityFunctions";
import {
  documentationWidth,
  documentationPadding,
} from "../figma_functions/documentationBuilder";
import { doNetwork, dontNetwork } from "src/resources/vectors/vectorElements";

export function buildTitle(title: string) {
  const titleFrame = buildAutoLayoutFrame("title", "HORIZONTAL", 0, 0, 0);
  const titleText = figma.createText();
  titleText.characters = title;
  titleText.fontSize = 40;
  titleText.fontName = { family: "Inter", style: "Semi Bold" };
  titleFrame.appendChild(titleText);
  return titleFrame;
}

export function buildSubtitle(subtitle: string) {
  const titleFrame = buildAutoLayoutFrame("subtitle", "HORIZONTAL", 0, 0, 0);
  const titleText = figma.createText();
  titleText.characters = subtitle;
  titleText.fontSize = 28;
  titleText.fontName = { family: "Inter", style: "Regular" };
  titleFrame.appendChild(titleText);
  return titleFrame;
}

export function buildText(text: string) {
  const textFrame = buildAutoLayoutFrame("text", "VERTICAL", 0, 0, 0);
  textFrame.maxWidth = 650;
  const textContent = figma.createText();
  textContent.characters = text;
  textContent.fontSize = 14;
  textContent.lineHeight = { value: 164, unit: "PERCENT" };
  textContent.fontName = { family: "Inter", style: "Regular" };
  textFrame.appendChild(textContent);
  textContent.layoutSizingHorizontal = "FILL";
  return textFrame;
}

export function buildTwoColumns(element: any, parentFrame: FrameNode) {
  if (
    !element.content.subtitle1 ||
    !element.content.subtitle2 ||
    !element.content.leftItems ||
    !element.content.rightItems
  ) {
    return;
  }
  const columnSpacing = 20;
  const columnWidth =
    (documentationWidth - documentationPadding * 2 - columnSpacing) / 2;
  const { subtitle1, subtitle2, rightItems, leftItems } = element.content;
  const title1Frame = buildSubtitle(subtitle1);
  title1Frame.resize(columnWidth, title1Frame.height);
  const title2Frame = buildSubtitle(subtitle2);
  title2Frame.resize(columnWidth, title2Frame.height);

  const leftElements: FrameNode[] = [];
  const rightElements: FrameNode[] = [];

  if (leftItems.length) {
    leftItems.forEach((item: string) => {
      const itemFrame = buildText(item);
      itemFrame.resize(columnWidth, itemFrame.height);
      const leftElementWrapper = buildAutoLayoutFrame(
        "leftElementWrapper",
        "HORIZONTAL",
        0,
        0,
        12
      );
      const icon = figma.createVector();
      icon.setVectorNetworkAsync(doNetwork as VectorNetwork);
      icon.strokes = [];
      leftElementWrapper.appendChild(icon);
      leftElementWrapper.appendChild(itemFrame);
      leftElements.push(leftElementWrapper);
    });
  }

  if (rightItems.length) {
    rightItems.forEach((item: string) => {
      const itemFrame = buildText(item);
      itemFrame.resize(columnWidth, itemFrame.height);
      const rightElementWrapper = buildAutoLayoutFrame(
        "rightElementWrapper",
        "HORIZONTAL",
        0,
        0,
        12
      );
      const icon = figma.createVector();
      icon.setVectorNetworkAsync(dontNetwork as VectorNetwork);
      icon.strokes = [];
      rightElementWrapper.appendChild(icon);
      rightElementWrapper.appendChild(itemFrame);
      rightElements.push(rightElementWrapper);
    });
  }

  const textWrapper = buildAutoLayoutFrame("textWrapper", "VERTICAL", 0, 0, 20);
  const leftWrapper = buildAutoLayoutFrame("leftWrapper", "VERTICAL", 0, 0, 20);
  const rightWrapper = buildAutoLayoutFrame(
    "rightWrapper",
    "VERTICAL",
    0,
    0,
    20
  );
  leftWrapper.appendChild(title1Frame);
  rightWrapper.appendChild(title2Frame);
  if (leftElements.length) {
    leftElements.forEach((item: FrameNode) => {
      leftWrapper.appendChild(item);
    });
  }
  if (rightElements.length) {
    rightElements.forEach((item: FrameNode) => {
      rightWrapper.appendChild(item);
    });
  }
  textWrapper.appendChild(leftWrapper);
  textWrapper.appendChild(rightWrapper);
  parentFrame.appendChild(textWrapper);
}

const removeEmptyLines = (text: string) => {
  let result = text.replace(/^\s*[\r\n]/gm, "");
  result = result.replace(/\n+$/, "");
  return result;
};

export function buildListText(text: string, type: string) {
  const textFrame = buildAutoLayoutFrame("text", "VERTICAL", 0, 0, 0);
  const textContent = figma.createText();
  textContent.characters = removeEmptyLines(text);
  textContent.fontSize = 14;
  textContent.lineHeight = { value: 164, unit: "PERCENT" };
  textContent.listSpacing = 16;
  textContent.fontName = { family: "Inter", style: "Regular" };
  textFrame.appendChild(textContent);
  textContent.layoutSizingHorizontal = "FILL";
  if (type === "unordered") {
    textContent.setRangeListOptions(0, textContent.characters.length, {
      type: "UNORDERED",
    });
  } else {
    textContent.setRangeListOptions(0, textContent.characters.length, {
      type: "UNORDERED",
    });
  }
  return textFrame;
}

export function buildLinkText(text: string, link: string) {
  const textFrame = buildAutoLayoutFrame("link", "VERTICAL", 0, 0, 0);
  const textContent = figma.createText();
  textContent.characters = text;
  textContent.fontSize = 16;
  textContent.fontName = { family: "Inter", style: "Regular" };
  textContent.fills = [
    {
      type: "SOLID",
      color: {
        r: 0.15829861164093018,
        g: 0.6913270354270935,
        b: 0.8083333373069763,
      },
    },
  ];
  textFrame.appendChild(textContent);
  textContent.layoutSizingHorizontal = "FILL";
  textContent.setRangeHyperlink(0, textContent.characters.length, {
    type: "URL",
    value: link,
  });
  return textFrame;
}

export async function buildImageFromRemoteSource(link: string) {
  // Get an image from a URL.
  const node = figma.createImageAsync(link).then(async (image: Image) => {
    const node = figma.createRectangle();

    const { width, height } = await image.getSizeAsync();
    node.resize(width, height);
    const currentDocumentationWidth =
      documentationWidth - documentationPadding * 2;
    const scale = currentDocumentationWidth / width;
    node.resize(width * scale, height * scale);

    node.fills = [
      {
        type: "IMAGE",
        imageHash: image.hash,
        scaleMode: "FILL",
      },
    ];
    return node;
  });
  return node;
}
export async function buildImageFromLocalSource(imageArray: any) {
  const node = figma.createRectangle();

  const imageData = new Uint8Array(imageArray);
  const newImage = figma.createImage(imageData);
  const { width, height } = await newImage.getSizeAsync();
  const currentDocumentationWidth =
    documentationWidth - documentationPadding * 2;
  const scale = currentDocumentationWidth / width;
  node.resize(width * scale, height * scale);
  // const imageHash = figma.createImage(imageArray).hash;
  node.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: newImage.hash }];
  return node;
}
