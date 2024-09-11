/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getNodeColor } from "../utilityFunctions";

export const elementsCoordinatesAndDimensions = [];
async function findFontStyleName(textNode: TextNode) {
  if (textNode.textStyleId === "") {
    return "Style not determined";
  } else {
    const foundStyle = await figma.getStyleByIdAsync(
      textNode.textStyleId as string
    );
    if (foundStyle) return foundStyle.name;
  }
}

function isIcon(node: SceneNode) {
  return (
    node.type === "INSTANCE" &&
    node.children.length === 1 &&
    node.children[0].name === "ic" &&
    node.children[0].type === "VECTOR"
  );
}

async function addInstancesToArray(node: any, array: any[]) {
  array.push({
    elementX: node.absoluteBoundingBox.x,
    elementY: node.absoluteBoundingBox.y,
    elementWidth: node.absoluteRenderBounds.width,
    elementHeight: node.absoluteRenderBounds.height,
    elementName: isIcon(node) ? "Icon" : node.name,
    elementMain: node.mainComponent.id,
  });
}

async function addVectorToArray(node: any, array: any[]) {
  array.push({
    elementX: node.absoluteBoundingBox.x,
    elementY: node.absoluteBoundingBox.y,
    elementWidth: node.absoluteRenderBounds.width,
    elementHeight: node.absoluteRenderBounds.height,
    elementName: node.name,
    elementMain: null,
  });
}

export async function addTextNodesToArray(
  node: any,
  array: any[]
): Promise<void> {
  const nodeFillColor = getNodeColor(node);
  const variable = await getFillColorVariable(node);
  const styleName = await findFontStyleName(node);
  const letterSpacing = getLetterSpacing(node);
  const textCase = getTextCase(node);

  array.push({
    elementX: node.absoluteBoundingBox.x,
    elementY: node.absoluteBoundingBox.y,
    elementWidth: node.absoluteRenderBounds.width,
    elementHeight: node.height,
    elementName: node.name,
    elementMain: null,
    elementStyleName: styleName,
    elementFontName: node.fontName,
    elementFontSize: node.fontSize,
    elementFontWeight: node.fontWeight,
    elementLineHeight: node.lineHeight.unit,
    elementLetterSpacing: letterSpacing,
    elementTextDecoration: node.textDecoration,
    elementTextCase: textCase,
    elementFill: nodeFillColor,
    elementVariable: variable?.name,
  });
}

function getTextCase(node: TextNode) {
  //@ts-ignore
  const textCase: TextCase | figma.mixed = node.textCase;
  switch (textCase) {
    case "SMALL_CAPS":
      return "small-caps";
    case "SMALL_CAPS_FORCED":
      return "small-caps-forced";
    case "UPPER":
      return "uppercase";
    case "LOWER":
      return "lowercase";
    case "TITLE":
      return "capitalize";
    default:
      return "none";
  }
}

function getLetterSpacing(node: TextNode) {
  //@ts-ignore
  const letterSpacing: LetterSpacing | figma.mixed = node.letterSpacing;
  if (letterSpacing) {
    const unit = letterSpacing.unit;
    const value = letterSpacing.value;
    if (value === 0) {
      return "0";
    } else if (unit === "PIXELS") {
      return `${value}px`;
    } else {
      return `${value}%`;
    }
  }
}

async function getFillColorVariable(node: TextNode) {
  // @ts-ignore
  const fills: ReadonlyArray<Paint> | figma.mixed = node.fills;
  if (fills.length === 0) {
    return null;
  }
  const boundVariable = fills[0].boundVariables.color;
  if (!boundVariable) {
    return null;
  }
  const found = await figma.variables.getVariableByIdAsync(boundVariable.id);
  return found;
}

export async function findAllNodes(
  frame: FrameNode | GroupNode,
  instances: boolean,
  textElements: boolean
): Promise<void> {
  figma.skipInvisibleInstanceChildren = true;
  for (const node of frame.children) {
    if (node.absoluteBoundingBox && node.width > 0.01) {
      console.log("node.type", node.type);
      console.log("node.name", node.name);
      if (node.type === "INSTANCE" && instances && !node.name.startsWith("_")) {
        await addInstancesToArray(node, elementsCoordinatesAndDimensions);
      }
      if (node.type === "VECTOR" && !node.name.startsWith("_")) {
        await addVectorToArray(node, elementsCoordinatesAndDimensions);
      }
      if (node.type === "TEXT" && textElements && !node.name.startsWith("_")) {
        await addTextNodesToArray(node, elementsCoordinatesAndDimensions);
      } else if (
        (node.type === "FRAME" || node.type === "GROUP") &&
        node.children
      ) {
        await findAllNodes(node, instances, textElements);
      }
    }
  }
}

//-> new string of indexes for tags accorging to user input
export function newABC(string: string, start: string) {
  const startIndex = string.indexOf(start.toLowerCase());
  const newString = string.slice(startIndex);
  return newString;
}

//-> setting tag direction according to user input
export function getTagInstance(tagDirection: string, tagComp: any) {
  if (tagDirection === "top") {
    const tag = tagComp
      .findOne((node: ComponentNode) => node.name === "type=bottom line")
      .createInstance();
    return tag;
  }
  if (tagDirection === "right") {
    const tag = tagComp
      .findOne((node: ComponentNode) => node.name === "type=left line")
      .createInstance();
    return tag;
  }
  if (tagDirection === "bottom") {
    const tag = tagComp
      .findOne((node: ComponentNode) => node.name === "type=top line")
      .createInstance();
    return tag;
  }
  if (tagDirection === "left") {
    const tag = tagComp
      .findOne((node: ComponentNode) => node.name === "type=right line")
      .createInstance();
    return tag;
  }
}
//-> add hyperlink to the index label text
export function addLink({
  component,
  link,
}: {
  component: ComponentNode;
  link: string;
}): void {
  const linkText = component.findOne(
    (node) => node.name === "link" && node.type === "TEXT"
  );
  if (!(linkText && linkText.type === "TEXT")) return;
  linkText.hyperlink = { type: "NODE", value: link };
}
