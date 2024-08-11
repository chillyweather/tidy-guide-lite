/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAutoLayoutFrame } from "../utilityFunctions";
import { buildElementData } from "./buildElementData";

const varBgFills: readonly Paint[] = [
  {
    type: "SOLID",
    visible: true,
    opacity: 1,
    blendMode: "NORMAL",
    color: {
      r: 0.9330241084098816,
      g: 0.9330241084098816,
      b: 0.9330241084098816,
    },
    boundVariables: {},
  },
];
export function addBorderRadius(
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
    if (!(tag && tag.type === "COMPONENT")) return;
    const borderRadiusElement = buildAutoLayoutFrame(
      "borderRadius",
      "VERTICAL",
      0,
      0,
      12
    );
    indexes.appendChild(borderRadiusElement);
    const isBoundVariables = ifBoundVariables(frame);
    console.log("isBoundVariables", isBoundVariables);
    if (frame.cornerRadius !== figma.mixed) {
      buildIndexForAll(
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
      buildSeparateIndexes(tag, isRem, frame, unit, borderRadiusElement);
      return;
    }
  }
}

function buildSeparateIndexes(
  tag: ComponentNode,
  isRem: boolean,
  frame: any,
  unit: string,
  borderRadiusElement: FrameNode
) {
  const ltRadiusIndex = tag.createInstance();
  const rtRadiusIndex = tag.createInstance();
  const rbRadiusIndex = tag.createInstance();
  const lbRadiusIndex = tag.createInstance();

  const leftTopRadius = isRem
    ? frame.topLeftRadius.toFixed(2)
    : frame.topLeftRadius;
  const rightTopRadius = isRem
    ? frame.topRightRadius.toFixed(2)
    : frame.topRightRadius;
  const rightBottomRadius = isRem
    ? frame.bottomRightRadius.toFixed(2)
    : frame.bottomRightRadius;
  const leftBottomRadius = isRem
    ? frame.bottomLeftRadius.toFixed(2)
    : frame.bottomLeftRadius;

  if (ltRadiusIndex.children[1].type === "TEXT")
    ltRadiusIndex.children[1].characters = `Top left corner radius - ${leftTopRadius}${unit}`;
  if (rtRadiusIndex.children[1].type === "TEXT")
    rtRadiusIndex.children[1].characters = `Top right corner radius - ${rightTopRadius}${unit}`;
  if (rbRadiusIndex.children[1].type === "TEXT")
    rbRadiusIndex.children[1].characters = `Bottom right corner radius - ${rightBottomRadius}${unit}`;
  if (lbRadiusIndex.children[1].type === "TEXT")
    lbRadiusIndex.children[1].characters = `Bottom left corner radius - ${leftBottomRadius}${unit}`;

  const cornerIndexes = [
    ltRadiusIndex,
    rtRadiusIndex,
    rbRadiusIndex,
    lbRadiusIndex,
  ];

  cornerIndexes.forEach((node) => {
    borderRadiusElement.appendChild(node);
  });
}

async function buildIndexForAll(
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
  const borderVarContent = buildAutoLayoutFrame(
    "border-var-content",
    "VERTICAL",
    0,
    0,
    12
  );
  borderVarContent.paddingLeft = 50;
  if (isBoundVariables) {
    const varKey = frame.boundVariables.topLeftRadius;
    const varValue = await figma.variables.getVariableByIdAsync(varKey.id);
    const varData = figma.createText();
    varData.characters = `🔢 ${varValue?.name}`;
    const borderVariable = buildAutoLayoutFrame(
      "border-variable",
      "HORIZONTAL",
      8,
      4,
      4
    );
    borderVariable.cornerRadius = 4;
    borderVariable.fills = varBgFills;
    borderVariable.appendChild(varData);
    borderVarContent.appendChild(borderVariable);
  }
  const sizeData = buildAutoLayoutFrame("text-data", "VERTICAL", 8, 12, 4);
  buildElementData(sizeData, `border-radius: ${frame.cornerRadius}${unit}`);
  borderVarContent.appendChild(sizeData);
  borderRadiusElement.appendChild(borderVarContent);
}

// function setIndexValue(
//   isRem: boolean,
//   indexInfo: InstanceNode,
//   cornerRadius: any,
//   rootValue: number,
//   unit: string
// ) {
//   isRem
//     ? ((indexInfo.children[1] as TextNode).characters = `Border radius - ${(
//         cornerRadius / rootValue
//       ).toFixed(3)}${unit}`)
//     : ((indexInfo.children[1] as TextNode).characters =
//         `Border radius - ${cornerRadius}${unit}`);
// }

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
