/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAutoLayoutFrame } from "../figma_functions/utilityFunctions";

export type Direction = "HORIZONTAL" | "VERTICAL";

export function buildVariantFrames(
  workingArrays: any[],
  defaultElement: InstanceNode | null | undefined,
  elementCollector: InstanceNode[],
  baseFrameCollector: FrameNode[],
  variantKeys: string[],
  missedItemsArray: InstanceNode[]
) {
  const allElementsFrame = buildAutoLayoutFrame(
    "variants-frame",
    "VERTICAL",
    0,
    0
  );

  if (variantKeys.length > 1) {
    //! case 2 - 2 variant properties
    if (variantKeys.length === 2) {
      const secondLevelFrame = buildSecondLevelFrame(variantKeys);
      workingArrays.forEach((subArr) => {
        const thirdLevelFrame = buildThirdLevelFrame(variantKeys, "HORIZONTAL");
        for (const element of subArr) {
          buildLowestLevelFrames(
            defaultElement,
            elementCollector,
            element,
            thirdLevelFrame,
            missedItemsArray
          );
        }
        thirdLevelFrame.layoutSizingHorizontal = "HUG";
        secondLevelFrame.layoutSizingHorizontal = "HUG";
        secondLevelFrame.appendChild(thirdLevelFrame);
      });
      baseFrameCollector.push(secondLevelFrame);
      allElementsFrame.appendChild(secondLevelFrame);
    }
    //! case 3 - 3 or more variant properties
    if (variantKeys.length > 2) {
      workingArrays.forEach((arr) => {
        const secondLevelFrame = buildSecondLevelFrame(variantKeys);

        arr.forEach((subArr: any) => {
          const thirdLevelFrame = buildThirdLevelFrame(
            variantKeys,
            "HORIZONTAL"
          );

          for (const element of subArr) {
            buildLowestLevelFrames(
              defaultElement,
              elementCollector,
              element,
              thirdLevelFrame,
              missedItemsArray
            );
          }
          secondLevelFrame.appendChild(thirdLevelFrame);
          secondLevelFrame.layoutSizingHorizontal = "HUG";
          thirdLevelFrame.layoutSizingHorizontal = "HUG";
        });
        if (defaultElement) {
          if (isBasicFrameEmpty(secondLevelFrame, defaultElement)) {
            secondLevelFrame.remove();
          } else {
            baseFrameCollector.push(secondLevelFrame);
            allElementsFrame.appendChild(secondLevelFrame);
          }
        }
      });
    }
  } else {
    //! case 1 - 1 variant property
    const thirdLevelFrame = buildThirdLevelFrame(variantKeys, "VERTICAL");
    const subArr = workingArrays[0];
    for (const element of subArr) {
      buildLowestLevelFrames(
        defaultElement,
        elementCollector,
        element,
        thirdLevelFrame,
        missedItemsArray
      );
    }
    baseFrameCollector.push(thirdLevelFrame);
    thirdLevelFrame.layoutSizingHorizontal = "HUG";
    allElementsFrame.appendChild(thirdLevelFrame);
  }
  const result = figma.ungroup(allElementsFrame)[0];
  return result;
}

export function buildLowestLevelFrames(
  defaultElement: InstanceNode | null | undefined,
  elementCollector: InstanceNode[],
  element: any,
  thirdLevelFrame: FrameNode,
  missedItemsArray: InstanceNode[]
) {
  const currentElement = defaultElement?.clone();
  if (currentElement) {
    elementCollector.push(currentElement);
    try {
      currentElement.setProperties(element);
      thirdLevelFrame.appendChild(currentElement);
      if (
        currentElement.opacity === 0 ||
        currentElement.children.every(
          (child) => "opacity" in child && child.opacity === 0
        )
      ) {
        missedItemsArray.push(currentElement);
      }
    } catch (error) {
      thirdLevelFrame.appendChild(currentElement);
      currentElement.opacity = 0;
      missedItemsArray.push(currentElement);
    }
  }
}

export function getTopFrameName(variantKeys: string[]) {
  const propName = variantKeys.slice(0, variantKeys.length - 2);
  const result = propName.join("-");
  return result;
}
export function buildThirdLevelFrame(
  variantKeys: string[],
  direction: Direction
) {
  return buildAutoLayoutFrame(
    `${variantKeys[variantKeys.length - 1]}-frame`,
    direction,
    18,
    18,
    46
  );
}

export function buildSecondLevelFrame(variantKeys: string[]) {
  return buildAutoLayoutFrame(
    `${variantKeys[variantKeys.length - 2]}-frame`,
    "VERTICAL",
    0,
    0
  );
}
export function isBasicFrameEmpty(frame: FrameNode, node: InstanceNode) {
  const elements = frame
    .findAll((element) => element.type === "INSTANCE")
    .filter((instance) => instance.name.startsWith(node.name));
  return elements.every(
    (item) => item.type === "INSTANCE" && item.opacity === 0
  );
}
