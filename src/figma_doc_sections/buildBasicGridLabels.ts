/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const BACKGROUND_PADDING = 10;
const DEFAULT_FONT = { family: "Inter", style: "Regular" };
const DEFAULT_FONT_SIZE = 12;

export function buildBasicGridLabels(frame: FrameNode, variantProps: any) {
  const defaultElement = frame.findOne((node) => node.type === "INSTANCE");
  if (!defaultElement) return;

  const topLabels: InstanceNode[] = [];
  const leftLabels: InstanceNode[] = [];

  const isOnlyFrames = frame.children.every((node) => node.type === "FRAME");
  if (isOnlyFrames) {
    buildSecondLevelLabels(
      frame,
      variantProps,
      topLabels,
      defaultElement,
      leftLabels
    );
  }

  buildFirstLevelLabels(
    frame,
    variantProps,
    defaultElement,
    leftLabels,
    topLabels,
    isOnlyFrames
  );

  const leftest = leftLabels.sort((a, b) => a.x - b.x);
  leftLabels.forEach((node) => (node.x = leftest[0].x));

  const topLabelsGroup =
    topLabels.length > 0 ? figma.group(topLabels, figma.currentPage) : null;
  const leftLabelsGroup =
    leftLabels.length > 0 ? figma.group(leftLabels, figma.currentPage) : null;

  if (topLabelsGroup && leftLabelsGroup) {
    return [topLabelsGroup, leftLabelsGroup];
  } else if (topLabelsGroup) {
    return [topLabelsGroup];
  } else {
    return [leftLabelsGroup];
  }
}

function buildFirstLevelLabels(
  frame: FrameNode,
  variantProps: any,
  defaultElement: SceneNode,
  leftLabels: any[],
  topLabels: any[],
  isOnlyFrames: boolean
) {
  const firstLevelFrame = isOnlyFrames ? frame.children[0] : frame;
  if (firstLevelFrame && firstLevelFrame.type === "FRAME") {
    const firstLevelLayoutMode = firstLevelFrame.layoutMode;
    const firstProp = firstLevelFrame.name.split("-")[0];
    const firstPropVariants = variantProps[firstProp].variantOptions;
    firstPropVariants.forEach((prop: string, index: number) => {
      const label = figma.createText();
      figma.currentPage.appendChild(label);
      label.characters = prop;
      label.fontSize = DEFAULT_FONT_SIZE;
      label.fontName = DEFAULT_FONT;

      if (firstLevelLayoutMode === "VERTICAL") {
        label.x =
          //@ts-ignore
          firstLevelFrame.children[index].absoluteBoundingBox.x -
          (label.width + 60);
        // allLeftSideLabels.push(label);
        label.y =
          //@ts-ignore
          firstLevelFrame.children[index].absoluteBoundingBox.y +
          defaultElement?.height / 2 -
          label.height / 2;
        leftLabels.push(label);
      }
      if (firstLevelLayoutMode === "HORIZONTAL") {
        label.x =
          //@ts-ignore
          firstLevelFrame.children[index].absoluteBoundingBox.x +
          firstLevelFrame.children[index].width / 2 -
          label.width / 2;
        // -
        // BACKGROUND_PADDING;
        label.y = label.y =
          //@ts-ignore
          firstLevelFrame.children[index].absoluteBoundingBox.y - 60;
        topLabels.push(label);
      }
    });
  }
}

function buildSecondLevelLabels(
  frame: FrameNode,
  variantProps: any,
  topLabels: any[],
  defaultElement: SceneNode,
  leftLabels: any[]
) {
  const secondLevelLayoutMode = frame.layoutMode;
  const secondProp = frame.name.split("-")[0];
  const secondPropVariants = variantProps[secondProp].variantOptions;
  secondPropVariants.forEach((variant: string, index: number) => {
    const label = figma.createText();
    label.fontSize = DEFAULT_FONT_SIZE;
    label.fontName = DEFAULT_FONT;
    figma.currentPage.appendChild(label);
    label.characters = variant;
    if (secondLevelLayoutMode === "HORIZONTAL") {
      label.x =
        //@ts-ignore
        frame.children[index].absoluteBoundingBox.x +
        frame.children[index].width / 2 -
        label.width / 2;
      //@ts-ignore
      label.y = frame.children[index].absoluteBoundingBox.y - 60;
      // label.y = frame.children[index].absoluteBoundingBox.y - 60;
      topLabels.push(label);
    }
    if (secondLevelLayoutMode === "VERTICAL") {
      label.x =
        //@ts-ignore
        frame.children[index].absoluteBoundingBox.x - (label.width + 60);
      label.y =
        //@ts-ignore
        frame.children[index].absoluteBoundingBox.y +
        defaultElement?.height / 2 -
        label.height / 2 +
        BACKGROUND_PADDING;
      leftLabels.push(label);
    }
  });
}
