/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeWithFills } from "../utilityFunctions";
import { rgbToHex } from "../utilityFunctions";
import { checkIsBoundVariables } from "./checkIsBoundVariables";
import { buildVarElement } from "./buildVarElement";
import { buildVarContent } from "./buildVarContent";
import { buildHexSection } from "./buildHexSection";
import { buildElementData } from "./buildElementData";
import { buildAutoLayoutFrame, setColorStyle } from "../utilityFunctions";

export async function addBackgroundInfo(
  frame: NodeWithFills,
  tagComponent: ComponentSetNode,
  indexes: FrameNode
) {
  if (!("fills" in frame)) return;
  if ((frame.fills as Paint[]).length === 0) return;

  let hex = "";
  let hexColorSection: FrameNode | undefined = undefined;

  const anatomySecondaryColorStyle = await setColorStyle(
    "anatomy-secondary",
    "707070"
  );

  const backgroundColorElement = buildAutoLayoutFrame(
    "backgroundColor",
    "VERTICAL",
    0,
    0,
    12
  );

  const backgroundDataSection = buildAutoLayoutFrame(
    "background-data",
    "VERTICAL",
    8,
    12,
    4
  );

  const tag = tagComponent.findOne((node) => node.name === "type=text");
  if (!(tag?.type === "COMPONENT")) return;
  const tagInstance = tag.createInstance();
  const index = tagInstance.findOne(
    (node) => node.name === "elementIndex" && node.type === "TEXT"
  );
  if (!(index && index.type === "TEXT")) return;
  index.characters = "bg";
  await (tagInstance.children[0] as FrameNode).setFillStyleIdAsync(
    anatomySecondaryColorStyle.id
  );
  if (tagInstance.children[1].type === "TEXT")
    tagInstance.children[1].characters = "Background";
  backgroundColorElement.appendChild(tagInstance);

  const firstFill = (frame.fills as readonly Paint[])[0];
  if (firstFill && "color" in firstFill) {
    hex = rgbToHex(firstFill.color);
    hexColorSection = buildHexSection(hex);
  }

  const content = buildVarContent("background");

  const cssValue = `background-color: ${hex};`;
  buildElementData(backgroundDataSection, cssValue);
  content.appendChild(backgroundDataSection);
  if (hexColorSection) content.appendChild(hexColorSection);
  backgroundColorElement.appendChild(content);
  indexes.appendChild(backgroundColorElement);

  const isBoundVariables = checkIsBoundVariables(frame, ["fills"]);
  if (isBoundVariables) {
    const varKey = frame.boundVariables?.fills;
    if (varKey) {
      const varValue = await figma.variables.getVariableByIdAsync(varKey[0].id);
      const varData = figma.createText();
      varData.characters = `🔢 ${varValue?.name}`;
      const fillsVariable = buildVarElement();
      fillsVariable.appendChild(varData);
      content.insertChild(0, fillsVariable);
    }
  }
}
