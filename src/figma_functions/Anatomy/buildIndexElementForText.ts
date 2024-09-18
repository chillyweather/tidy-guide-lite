/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAutoLayoutFrame, setTextContent } from "../utilityFunctions";
import { makeCollapsibleComponent } from "../utilityFunctions";
import { buildCssBlock } from "./buildElementData";
import { buildHexSection } from "./buildHexSection";
// import { toTitleCase } from "../utilityFunctions";
import { varDataFills } from "../constants";

export function buildIndexElementForText(
  parent: FrameNode,
  indexWithLabel: InstanceNode,
  element: any,
  isRem: boolean,
  unit: string,
  rootValue: number
) {
  setTextContent(indexWithLabel, "Text", `🆃 ${element.elementName}`);

  const textStyleSection = buildAutoLayoutFrame(
    "text-style",
    "HORIZONTAL",
    8,
    4,
    4
  );

  const textStyleFrame = buildTextStyleData(element, textStyleSection);
  const textData = `font-family: ${element.elementFontName.family};
font-size: ${
    isRem
      ? (parseInt(element.elementFontSize) / rootValue).toFixed(2)
      : element.elementFontSize
  }${unit};
font-style: ${element.elementFontName.style};
font-weight: ${element.elementFontWeight};
line-height: ${element.elementLineHeight.value || "AUTO"};
letter-spacing: ${element.elementLetterSpacing};
text-decoration: ${element.elementTextDecoration.toLowerCase()};
text-case: ${element.elementTextCase};`;
  const textDataFrame = buildCssBlock(textData);
  const textColorFrame = buildTextColorSection(element);

  const data = buildAutoLayoutFrame("index-data", "VERTICAL", 0, 0, 12);
  data.appendChild(textStyleFrame);
  data.appendChild(textDataFrame);
  textDataFrame.name = "text-data~";
  data.appendChild(textColorFrame);
  data.paddingLeft = 50;

  const collapsibleComponent = makeCollapsibleComponent(data);
  //@ts-ignore
  const collapsibleInstance = collapsibleComponent.children[0].createInstance();
  collapsibleComponent.remove();
  data.remove();

  parent.appendChild(collapsibleInstance);
}

function buildTextColorSection(element: any): FrameNode {
  const frame = buildAutoLayoutFrame("text-color", "VERTICAL", 0, 0, 12);
  const colorWithHex = buildHexSection(element.elementFill);
  if (colorWithHex) frame.appendChild(colorWithHex);

  if (element.elementVariable) {
    const colorStyleFrame = buildAutoLayoutFrame(
      "color-style",
      "HORIZONTAL",
      8,
      4,
      4
    );
    const colorStyle = figma.createText();
    colorStyle.characters = `🎨 ${element.elementVariable}`;
    colorStyleFrame.appendChild(colorStyle);
    colorStyleFrame.cornerRadius = 4;
    colorStyleFrame.fills = varDataFills;
    frame.appendChild(colorStyleFrame);
  }

  const cssValue = `color: ${element.elementFill};`;
  const textColorDataSection = buildCssBlock(cssValue);
  frame.appendChild(textColorDataSection);

  return frame;
}

function buildTextStyleData(element: any, frame: FrameNode): FrameNode {
  const styleData = `🔤 ${element.elementStyleName}`;
  const text = figma.createText();
  text.characters = styleData;
  frame.appendChild(text);

  frame.cornerRadius = 4;
  frame.fills = varDataFills;

  return frame;
}
