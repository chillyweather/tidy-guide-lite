/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  setColorStyle,
  turnAllBooleansOn,
  buildAutoLayoutFrame,
} from "../utilityFunctions";
import { findNodeByName } from "./findNodeByName";
import { createElementBackground } from "./createElementBackground";
import buildSpacingMarks from "../buildSpacingMarks";
import { changeSizingMarkerCharacters } from "./changeSizingMarkerCharacters";

export async function buildOneSizeAnatomySpacings(
  element: InstanceNode,
  elements: (InstanceNode | FrameNode)[],
  frame: FrameNode,
  booleanProperties: any,
  sizeMarker: ComponentSetNode | undefined,
  spacingMarker: ComponentSetNode
) {
  const dsGray100 = await setColorStyle(
    ".TG-admin/spacing-block-background",
    "F5F5F5"
  );
  const dsGray600 = await setColorStyle(
    ".TG-admin/spacing-block-label",
    "707070"
  );
  if (!element.children) {
    return null;
  }

  const workingElements: any[] = [];
  let tempX = 0;

  elements.forEach((subElement, index) => {
    try {
      const currentElement = element.clone();
      if (subElement && subElement.visible === true) {
        workingElements.push({ currentElement, subElement, index });
      }
      turnAllBooleansOn(currentElement, booleanProperties);
      frame.appendChild(currentElement);
      currentElement.x = tempX;
      tempX += 300;
    } catch {}
  });

  const anatomyFrames: FrameNode[] = [];

  for (const dataElement of workingElements) {
    figma.skipInvisibleInstanceChildren = true;
    const found = findNodeByName(
      dataElement.currentElement,
      dataElement.subElement.name
    );

    if (found) {
      const absX = found.absoluteTransform[0][2];
      const absY = found.absoluteTransform[1][2];
      const clonedFrame = found.clone();
      figma.currentPage.appendChild(clonedFrame);
      clonedFrame.x = absX;
      clonedFrame.y = absY;
      if (found.type === "FRAME" || found.type === "INSTANCE") {
        const background = createElementBackground(
          found,
          dataElement.currentElement
        );
        const spacingMarks = buildSpacingMarks(
          clonedFrame,
          {
            size: false,
            paddings: true,
            itemspacings: true,
            sameSpacingsColor: false,
            isShallow: true,
          },
          sizeMarker!,
          spacingMarker
        );

        if (!(spacingMarks && spacingMarks.length > 0)) {
          dataElement.currentElement.remove();
          background.remove();
          clonedFrame.remove();
          continue;
        }

        //! why not working?
        spacingMarks?.forEach((mark: any) =>
          changeSizingMarkerCharacters(mark)
        );
        const groupContent =
          spacingMarks && spacingMarks.length > 0
            ? [
                clonedFrame,
                dataElement.currentElement,
                background,
                ...spacingMarks,
              ]
            : [clonedFrame, dataElement.currentElement, background];

        const anatomyGroup = figma.group(groupContent, figma.currentPage);
        const anatomyAl = buildAutoLayoutFrame(
          "anatomySizesFrame",
          "VERTICAL",
          0,
          50
        );
        anatomyAl.counterAxisAlignItems = "CENTER";
        await anatomyAl.setFillStyleIdAsync(dsGray100.id);
        anatomyAl.paddingBottom = 40;
        anatomyAl.paddingTop = 40;
        anatomyAl.paddingLeft = 160;
        anatomyAl.paddingRight = 160;
        anatomyAl.layoutAlign = "STRETCH";
        anatomyAl.appendChild(anatomyGroup);
        const anatomyLabel = figma.createText();
        anatomyLabel.fontSize = 14;
        anatomyLabel.fontName = { family: "Inter", style: "Bold" };
        anatomyLabel.characters = dataElement.subElement.name;
        anatomyLabel.x = 16;
        anatomyLabel.y = 8;
        anatomyAl.appendChild(anatomyLabel);
        anatomyLabel.layoutPositioning = "ABSOLUTE";
        anatomyLabel.setFillStyleIdAsync(dsGray600.id);
        frame.appendChild(anatomyAl);
        anatomyAl.layoutSizingHorizontal = "HUG";
        dataElement.currentElement.opacity = 0.2;
      }
    }
  }
  frame.children.forEach((element) => {
    if (element.type === "FRAME") {
      element.layoutSizingHorizontal = "FILL";
    }
  });

  element.remove();
  return anatomyFrames;
}
