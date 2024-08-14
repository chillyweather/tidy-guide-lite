/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAutoLayoutFrame } from "../utilityFunctions";
import { buildElementData } from "./buildElementData";
import { varBgFills } from "../layoutResources/fills";

type Corners = {
  topLeftRadius: string;
  topRightRadius: string;
  bottomLeftRadius: string;
  bottomRightRadius: string;
};
const corners: Corners = {
  topLeftRadius: "⌜",
  topRightRadius: "⌝",
  bottomLeftRadius: "⌞",
  bottomRightRadius: "⌟",
};
export async function addBorderRadius(
  frame: any,
  tagComponent: ComponentSetNode,
  indexes: FrameNode,
  isRem: boolean = false,
  rootValue: number = 16,
  unit: string = "px"
) {
  if (frame.cornerRadius !== 0) {
    const tag = tagComponent.findOne(
      (node) => node.name === "type=cornerRadius"
    );
    if (!(tag?.type === "COMPONENT")) return;
    const borderRadiusElement = buildAutoLayoutFrame(
      "borderRadius",
      "VERTICAL",
      0,
      0,
      12
    );
    indexes.appendChild(borderRadiusElement);
    const isBoundVariables = ifBoundVariables(frame);
    if (frame.cornerRadius !== figma.mixed) {
      await handleUniformCornerRadius(
        tag,
        frame,
        isRem,
        rootValue,
        unit,
        isBoundVariables,
        borderRadiusElement
      );
      return;
    } else if (frame.cornerRadius === figma.mixed) {
      await handleMixedCornerRadius(
        tag,
        isRem,
        frame,
        unit,
        borderRadiusElement,
        isBoundVariables
      );
      return;
    }
  }
}

async function handleMixedCornerRadius(
  tag: ComponentNode,
  isRem: boolean,
  frame: any,
  unit: string,
  borderRadiusElement: FrameNode,
  isBoundVariables: boolean
) {
  const radiusVariables = [
    "topLeftRadius",
    "topRightRadius",
    "bottomLeftRadius",
    "bottomRightRadius",
  ];
  const boundVariables: string[] = [];
  const foundVariables: Record<string, string> = {};
  if (isBoundVariables) {
    radiusVariables.forEach((variable) => {
      if (Object.keys(frame.boundVariables).includes(variable)) {
        boundVariables.push(variable);
      }
    });
  }
  if (boundVariables.length) {
    for (const variable of boundVariables) {
      const varKey = frame.boundVariables[variable];
      const foundVariable = await figma.variables.getVariableByIdAsync(
        varKey.id
      );
      if (!foundVariable) continue;
      foundVariables[variable] = foundVariable.name;
    }
  }
  const title = tag.createInstance();
  const borderVarContent = buildBorderVarContent();
  const { topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius } =
    frame;

  const leftTopRadius = isRem ? topLeftRadius.toFixed(2) : topLeftRadius;
  const rightTopRadius = isRem ? topRightRadius.toFixed(2) : topRightRadius;
  const rightBottomRadius = isRem
    ? bottomRightRadius.toFixed(2)
    : bottomRightRadius;
  const leftBottomRadius = isRem
    ? bottomLeftRadius.toFixed(2)
    : bottomLeftRadius;

  if (title.children[1].type === "TEXT")
    title.children[1].characters = "Corner radius:";

  if (Object.keys(foundVariables).length) {
    for (const [key, value] of Object.entries(foundVariables)) {
      const varData = figma.createText();
      varData.characters = `🔢 ${
        corners[key as keyof typeof corners]
      } ${value}`;
      const borderVariable = buildVarElement();
      borderVariable.appendChild(varData);
      borderVarContent.appendChild(borderVariable);
    }
  }

  const radiusData = `border-top-left-radius: ${leftTopRadius}${unit};
border-top-right-radius: ${rightTopRadius}${unit};
border-bottom-right-radius: ${rightBottomRadius}${unit};
border-bottom-left-radius: ${leftBottomRadius}${unit};`;

  const sizeData = buildAutoLayoutFrame("text-data", "VERTICAL", 8, 12, 4);
  buildElementData(sizeData, radiusData);
  borderRadiusElement.appendChild(title);
  borderVarContent.appendChild(sizeData);
  borderRadiusElement.appendChild(borderVarContent);
}

async function handleUniformCornerRadius(
  tag: ComponentNode,
  frame: any,
  isRem: boolean,
  rootValue: number,
  unit: string,
  isBoundVariables: boolean,
  borderRadiusElement: FrameNode
) {
  const indexInfo = tag.createInstance();
  indexInfo.name = ".corner-radius";
  if (indexInfo.children[1].type === "TEXT") {
    (indexInfo.children[1] as TextNode).characters = `Border radius`;
  }
  borderRadiusElement.appendChild(indexInfo);
  const borderVarContent = buildBorderVarContent();
  if (isBoundVariables) {
    const varKey = frame.boundVariables.topLeftRadius;
    const varValue = await figma.variables.getVariableByIdAsync(varKey.id);
    const varData = figma.createText();
    varData.characters = `🔢 ${varValue?.name}`;
    const borderVariable = buildVarElement();
    borderVariable.appendChild(varData);
    borderVarContent.appendChild(borderVariable);
  }
  const sizeData = buildAutoLayoutFrame("text-data", "VERTICAL", 8, 12, 4);
  buildElementData(sizeData, `border-radius: ${frame.cornerRadius}${unit};`);
  borderVarContent.appendChild(sizeData);
  borderRadiusElement.appendChild(borderVarContent);
}

function buildBorderVarContent() {
  const borderVarContent = buildAutoLayoutFrame(
    "border-var-content",
    "VERTICAL",
    0,
    0,
    12
  );
  borderVarContent.paddingLeft = 50;
  return borderVarContent;
}

function buildVarElement() {
  const borderVariable = buildAutoLayoutFrame(
    "border-variable",
    "HORIZONTAL",
    8,
    4,
    4
  );
  borderVariable.cornerRadius = 4;
  borderVariable.fills = varBgFills;
  return borderVariable;
}

function ifBoundVariables(frame: any) {
  const boundVariables = frame.boundVariables;
  if (!boundVariables || typeof boundVariables !== "object") return false;

  const radiusProperties = [
    "bottomLeftRadius",
    "topleftRadius",
    "bottomRightRadius",
    "topRightRadius",
  ];
  return radiusProperties.some((prop) => prop in boundVariables);
}
