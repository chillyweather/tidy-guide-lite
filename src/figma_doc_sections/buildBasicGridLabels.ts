/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// const BACKGROUND_PADDING = 10;
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
        label.x = xPosition(index, firstLevelFrame) - (label.width + 60);
        label.y =
          yPosition(index, firstLevelFrame) +
          defaultElement?.height / 2 -
          label.height / 2;
        leftLabels.push(label);
      }
      if (firstLevelLayoutMode === "HORIZONTAL") {
        label.x =
          xPosition(index, firstLevelFrame) +
          firstLevelFrame.children[index].width / 2 -
          label.width / 2;
        label.y = yPosition(index, firstLevelFrame) - 60;
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
      placeHorizontalLabel(frame, label, index, 60, topLabels);
    }
    if (secondLevelLayoutMode === "VERTICAL") {
      placeVerticalLabel(frame, label, index, 60, leftLabels);
    }
  });
}
function xPosition(index: number, frame: FrameNode) {
  return frame.children[index].absoluteTransform[0][2];
}

function yPosition(index: number, frame: FrameNode) {
  return frame.children[index].absoluteTransform[1][2];
}

function placeVerticalLabel(
  frame: FrameNode,
  label: TextNode,
  index: number,
  shift: number,
  labelsArray: any[] = []
) {
  label.x = xPosition(index, frame) - (label.width + shift);
  label.y =
    yPosition(index, frame) +
    frame.children[index].height / 2 -
    label.height / 2;
  labelsArray.push(label);
}

function placeHorizontalLabel(
  frame: FrameNode,
  label: TextNode,
  index: number,
  shift: number,
  labelsArray: any[] = []
) {
  label.x =
    xPosition(index, frame) + frame.children[index].width / 2 - label.width / 2;
  label.y = yPosition(index, frame) - shift;
  labelsArray.push(label);
}
