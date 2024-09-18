/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAutoLayoutFrame, rgbToHex } from "../utilityFunctions";
import { buildCssBlock } from "./buildElementData";
import { checkIsBoundVariables } from "./checkIsBoundVariables";
import { buildVarElement } from "./buildVarElement";
import { buildVarContent } from "./buildVarContent";
import { getStrokeInfo } from "./getStrokeInfo";
import { buildHexSection } from "./buildHexSection";
import { varDataFills } from "../constants";
import { getStrokeColorVariable } from "./tagBuilgingFunctions";

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
export async function addBorderInfo(
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
    const borderElement = buildAutoLayoutFrame(
      "borderData",
      "VERTICAL",
      0,
      0,
      12
    );
    indexes.appendChild(borderElement);
    const isBoundVariables = checkIsBoundVariables(frame, [
      "bottomLeftRadius",
      "topleftRadius",
      "bottomRightRadius",
      "topRightRadius",
    ]);
    if (frame.cornerRadius !== figma.mixed) {
      await handleUniformCornerRadius(
        tag,
        frame,
        isRem,
        rootValue,
        unit,
        isBoundVariables,
        borderElement
      );
    } else if (frame.cornerRadius === figma.mixed) {
      await handleMixedCornerRadius(
        tag,
        isRem,
        frame,
        unit,
        borderElement,
        isBoundVariables
      );
    }

    const strokeData = getStrokeInfo(frame);
    if (!strokeData) return;
    const colorSection = buildAutoLayoutFrame("color", "VERTICAL", 0, 0, 12);
    colorSection.paddingLeft = 50;
    borderElement.appendChild(colorSection);
    const { strokeWeight, strokeColor, dashed } = strokeData;
    const hexSection = buildHexSection(rgbToHex(strokeColor));
    if (hexSection) {
      colorSection.appendChild(hexSection);
    }
    const variable = await getStrokeColorVariable(frame);
    if (variable) {
      const colorStyleFrame = buildAutoLayoutFrame(
        "color-style",
        "HORIZONTAL",
        8,
        4,
        4
      );
      const colorStyle = figma.createText();
      colorStyle.characters = `🎨 ${variable.name}`;
      colorStyleFrame.appendChild(colorStyle);
      colorStyleFrame.cornerRadius = 4;
      colorStyleFrame.fills = varDataFills;
      colorSection.appendChild(colorStyleFrame);
    }
    const cssValue = `border: ${strokeWeight}${unit} ${
      dashed ? "dashed" : "solid"
    } ${rgbToHex(strokeColor)}`;
    const cssBlock = buildCssBlock(cssValue);
    colorSection.appendChild(cssBlock);
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
  const borderVarContent = buildVarContent("border-var-content");
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
    title.children[1].characters = "Corner radius";

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

  const sizeData = buildCssBlock(radiusData);
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
    (indexInfo.children[1] as TextNode).characters = `Border`;
  }
  borderRadiusElement.appendChild(indexInfo);
  const borderVarContent = buildVarContent("border-var-content");
  if (isBoundVariables) {
    const varKey = frame.boundVariables.topLeftRadius;
    const varValue = await figma.variables.getVariableByIdAsync(varKey.id);
    const varData = figma.createText();
    varData.characters = `🔢 ${varValue?.name}`;
    const borderVariable = buildVarElement();
    borderVariable.appendChild(varData);
    borderVarContent.appendChild(borderVariable);
  }

  const sizeData = buildCssBlock(
    `border-radius: ${frame.cornerRadius}${unit};`
  );
  borderVarContent.appendChild(sizeData);
  borderRadiusElement.appendChild(borderVarContent);
}
