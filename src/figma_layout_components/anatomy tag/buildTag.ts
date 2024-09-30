/* eslint-disable @typescript-eslint/no-explicit-any */
import { setColorStyle } from "../../figma_functions/utilityFunctions";
import { createTagLabel } from "./createTagLabel";
import { createLineBox } from "./createTagLine";
import {
  addNewTextProperty,
  addNewBooleanProperty,
} from "../../figma_functions/addNewProperty";

import {
  sizeVectorNetwork,
  cornerRadiusVectorNetwork,
} from "../vectorNetworks";

export function addText(letterText: string) {
  const letter = figma.createText();
  letter.fills = [
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
    },
  ];
  letter.fontSize = 14;
  letter.fontName = {
    family: "Inter",
    style: "Semi Bold",
  };
  letter.textCase = "UPPER";
  letter.characters = letterText;
  letter.textAlignHorizontal = "CENTER";
  letter.textAlignVertical = "CENTER";
  letter.lineHeight = {
    unit: "PERCENT",
    value: 2.9999999329447746,
  };
  return letter;
}

export async function buildLabelText(label: string) {
  const anatomyLabelsColor = await setColorStyle(
    ".TG-admin/anatomy-labels",
    "292929"
  );
  const labelText = figma.createText();
  await labelText.setFillStyleIdAsync(anatomyLabelsColor.id);
  labelText.fontSize = 14;
  labelText.fontName = {
    family: "Inter",
    style: "Medium",
  };
  labelText.characters = label;
  return labelText;
}

export async function buildTag(
  letter: string,
  type: string,
  settings?: any,
  isLink = true
) {
  const TGWhite = await setColorStyle(".TG-admin/anatomy-icon", "FFFFFF");
  const TGGray600 = await setColorStyle(
    ".TG-admin/anatomy-secondary",
    "707070"
  );
  const TGLightBlue500 = await setColorStyle(".TG-admin/links", "00B0FF");
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");

  const index = addText(`${letter}`);
  index.name = "elementIndex";
  const tagLabel = await createTagLabel(index, settings);
  const tag = figma.createComponent();
  tag.layoutPositioning = "AUTO";
  tag.primaryAxisAlignItems = "CENTER";
  tag.counterAxisAlignItems = "CENTER";

  if (type === "bottom") {
    const lineBox = await createLineBox(settings);
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "VERTICAL";
    tag.appendChild(tagLabel);
    tag.appendChild(lineBox);
    tag.resize(24, 32);
    tag.itemSpacing = -4;
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }

  if (type === "top") {
    const lineBox = await createLineBox(settings);
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "VERTICAL";
    tag.appendChild(lineBox);
    tag.appendChild(tagLabel);
    tag.resize(24, 32);
    tag.itemSpacing = -4;
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }

  if (type === "left") {
    const lineBox = await createLineBox(settings);
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(lineBox);
    tag.appendChild(tagLabel);
    lineBox.rotation = 90;
    lineBox.layoutAlign = "STRETCH";
    tag.resize(32, 24);
    tag.itemSpacing = -4;
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }

  if (type === "right") {
    const lineBox = await createLineBox(settings);
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(tagLabel);
    tag.appendChild(lineBox);
    lineBox.rotation = 90;
    lineBox.layoutAlign = "STRETCH";
    tag.resize(32, 24);
    tag.itemSpacing = -4;
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }

  if (type === "index") {
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(tagLabel);
    tag.resize(24, 24);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }

  if (
    type === "text" ||
    type === "important" ||
    type === "info" ||
    type === "size" ||
    type === "cornerRadius"
  ) {
    const text = await buildLabelText("text");
    tag.resize(24, 24);
    tag.counterAxisSizingMode = "AUTO";
    tag.counterAxisAlignItems = "CENTER";
    tag.itemSpacing = 8;
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(tagLabel);
    tag.appendChild(text);

    if (isLink) {
      const linkText = await buildLabelText("link");
      await linkText.setFillStyleIdAsync(TGLightBlue500.id);
      linkText.textDecoration = "UNDERLINE";
      tag.appendChild(linkText);
      addNewTextProperty(tag, linkText, "link", "link");
      addNewBooleanProperty(tag, linkText, "Show link", true);
      linkText.visible = false;
    }

    text.textCase = "ORIGINAL";
    if (type !== "text") {
      await tagLabel.setFillStyleIdAsync(TGGray600.id);
    }
    if (type === "info") {
      tagLabel.paddingLeft = 1;
      tagLabel.paddingBottom = 1;
    }

    if (type === "size") {
      const icon = figma.createVector();
      await icon.setVectorNetworkAsync(sizeVectorNetwork);
      if (TGWhite) {
        await icon.setFillStyleIdAsync(TGWhite.id);
      }
      icon.strokes = [];
      tagLabel.appendChild(icon);
    }

    if (type === "cornerRadius") {
      const icon = figma.createVector();
      await icon.setVectorNetworkAsync(cornerRadiusVectorNetwork);
      if (TGWhite) {
        await icon.setFillStyleIdAsync(TGWhite.id);
      }
      icon.strokes = [];
      tagLabel.appendChild(icon);
    }

    if (type === "text") {
      if (TGGray900) {
        await tagLabel.setFillStyleIdAsync(TGGray900.id);
      }
      addNewTextProperty(tag, index, "index", "A");
    }
    //add text properties
    addNewTextProperty(tag, text, "label", "Text");

    return tag;
  }
}
