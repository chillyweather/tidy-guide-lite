/* eslint-disable @typescript-eslint/no-explicit-any */
import { setColorStyle } from "../figma_functions/utilityFunctions";
import { createTagLabel } from "./createTagLabel";
import { createLineBox } from "./createTagLine";
import {
  addNewTextProperty,
  addNewBooleanProperty,
} from "../figma_functions/addNewProperty";

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
  label?: string,
  isLink = true
) {
  console.log("settings >>>>", settings, "type >>>>", type);
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
      await icon.setVectorNetworkAsync({
        regions: [
          {
            windingRule: "NONZERO",
            loops: [[0, 1, 2, 3, 4, 10, 5, 6, 7, 8, 9, 11]],
            fills: [
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
            ],
            fillStyleId: "",
          },
        ],
        segments: [
          {
            start: 0,
            end: 1,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 2,
            end: 0,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 2,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 4,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 5,
            end: 4,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 7,
            end: 6,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 8,
            end: 7,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 8,
            end: 9,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 10,
            end: 9,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 11,
            end: 10,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 6,
            end: 5,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 1,
            end: 11,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
        ],
        vertices: [
          {
            x: 0.998077392578125,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0.998077392578125,
            y: 3,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 13.001922607421875,
            y: 3,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 13.001922607421875,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 14,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 14,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 13.001922607421875,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 13.001922607421875,
            y: 4,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0.998077392578125,
            y: 4,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0.998077392578125,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
        ],
      });
      if (TGWhite) {
        await icon.setFillStyleIdAsync(TGWhite.id);
      }
      icon.strokes = [];
      tagLabel.appendChild(icon);
    }

    if (type === "cornerRadius") {
      const icon = figma.createVector();
      await icon.setVectorNetworkAsync({
        regions: [
          {
            windingRule: "EVENODD",
            loops: [[4, 0, 5, 1, 6, 2, 7, 3]],
            fills: [
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
            ],
            fillStyleId: "",
          },
        ],
        segments: [
          {
            start: 2,
            end: 1,
            tangentStart: {
              x: 0,
              y: -3.0373363494873047,
            },
            tangentEnd: {
              x: 3.0373363494873047,
              y: 0.0003250539302825928,
            },
          },
          {
            start: 4,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 6,
            end: 5,
            tangentStart: {
              x: 2.485093116760254,
              y: 0.0002658963203430176,
            },
            tangentEnd: {
              x: 0,
              y: -2.485093593597412,
            },
          },
          {
            start: 0,
            end: 7,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 1,
            end: 0,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 3,
            end: 2,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 5,
            end: 4,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
          {
            start: 7,
            end: 6,
            tangentStart: {
              x: 0,
              y: 0,
            },
            tangentEnd: {
              x: 0,
              y: 0,
            },
          },
        ],
        vertices: [
          {
            x: 0.00010704994201660156,
            y: 0,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 3.4851388931274414,
            y: 0.00037297606468200684,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 8.984550476074219,
            y: 5.500372886657715,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 8.984550476074219,
            y: 8.999931335449219,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 7.984550476074219,
            y: 8.999931335449219,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 7.984550476074219,
            y: 5.500372886657715,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 3.485032081604004,
            y: 1.0003730058670044,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
          {
            x: 0,
            y: 1,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE",
          },
        ],
      });
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
