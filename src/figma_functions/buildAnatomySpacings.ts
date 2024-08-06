/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import buildSpacingMarks from "./buildSpacingMarks";
import recurciveSearch from "./recurciveSearch";
import buildSizeMarkerComponentSet from "../figma_layout_components/buildSizeMarker";
import buildSpacingMarkerComponentSet from "../figma_layout_components/buildSpacingMarker";
import {
  turnAllBooleansOn,
  setVariantProps,
  setColorStyle,
  buildAutoLayoutFrame,
  findAllBooleanProps,
  findAllVariantProps,
  getElementSizes,
} from "./utilityFunctions";

export async function buildAnatomySpacings(
  element: InstanceNode,
  frame: FrameNode
) {
  const elements = getAnatomyElements(element);
  if (!(elements && elements.length)) return;
  const subtitle = figma.createText();
  subtitle.fontName = {
    family: "Inter",
    style: "Semi Bold",
  };
  subtitle.fontSize = 32;
  subtitle.characters = "Internal spacings";
  frame.appendChild(subtitle);
  const booleanProperties = await findAllBooleanProps(element);
  const variantProperties = await findAllVariantProps(element);
  const elementSizes = (await getElementSizes(element)) || [];
  const anatomyGroups: (FrameNode[] | null)[] = [];

  if (elementSizes && elementSizes.length) {
    for (const size of elementSizes) {
      const propNames = Object.keys(variantProperties);
      const sizeProp = propNames.find(
        (propName) => propName.toLowerCase() === "size"
      );
      if (sizeProp) {
        setVariantProps(element, sizeProp, size);
      }
      const spacings = await buildOneSizeAnatomySpacings(
        element,
        elements,
        frame,
        booleanProperties
      );
      anatomyGroups.push(spacings);
    }
  } else {
    const spacings = await buildOneSizeAnatomySpacings(
      element,
      elements,
      frame,
      booleanProperties
    );
    anatomyGroups.push(spacings);
  }
  return anatomyGroups;
}

async function buildOneSizeAnatomySpacings(
  element: InstanceNode,
  elements: (InstanceNode | FrameNode)[],
  frame: FrameNode,
  booleanProperties: any
) {
  const sizeMarker = await buildSizeMarkerComponentSet();
  const spacingMarker = await buildSpacingMarkerComponentSet();
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
    const currentElement = element.clone();
    if (subElement && subElement.visible === true) {
      workingElements.push({ currentElement, subElement, index });
    }
    turnAllBooleansOn(currentElement, booleanProperties);
    frame.appendChild(currentElement);
    currentElement.x = tempX;
    tempX += 300;
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
        //@ts-ignore
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
  sizeMarker?.remove();
  spacingMarker.remove();
  return anatomyFrames;
}

function getAnatomyElements(element: InstanceNode | FrameNode) {
  const anatomyElements: FrameNode[] | InstanceNode[] = [];
  recurciveSearch(element, anatomyElements);
  const result = anatomyElements.filter(
    (item: any, index: number, self: any) =>
      self.findIndex((t: any) => t.name === item.name) === index &&
      (item.layoutMode === "HORIZONTAL" || item.layoutMode === "VERTICAL")
  );

  return result;
}

function findNodeByName(node: SceneNode, name: string): SceneNode | null {
  if (node.name === name) {
    return node;
  }
  if (
    (node.type === "FRAME" || node.type === "INSTANCE") &&
    Array.isArray(node.children)
  ) {
    for (const child of node.children) {
      const found = findNodeByName(child, name);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

const lightFrameColor: SolidPaint = {
  type: "SOLID",
  visible: true,
  opacity: 1,
  blendMode: "NORMAL",
  color: {
    r: 1,
    g: 1,
    b: 1,
  },
};
const darkFrameColor: SolidPaint = {
  type: "SOLID",
  visible: true,
  opacity: 1,
  blendMode: "NORMAL",
  color: {
    r: 0,
    g: 0,
    b: 0,
  },
};

function createElementBackground(
  element: FrameNode | InstanceNode | TextNode,
  node: InstanceNode
) {
  const selectionBackground = figma.createFrame();
  selectionBackground.fills = [];

  //@ts-ignore
  if (node.fills && node.fills.length > 0) {
    //@ts-ignore
    const colors = node.fills[0].color;
    const hslFill = rgbToHsb(colors.r, colors.g, colors.b);
    if (hslFill.b > 0.8 && hslFill.s < 0.2) {
      selectionBackground.strokes = [darkFrameColor];
    } else {
      selectionBackground.strokes = [lightFrameColor];
    }
  } else {
    selectionBackground.strokes = [darkFrameColor];
  }

  selectionBackground.strokeWeight = 1;
  selectionBackground.dashPattern = [2, 4];
  selectionBackground.opacity = 0.5;

  figma.currentPage.appendChild(selectionBackground);
  if (element.width >= 0.01 && element.height >= 0.01) {
    selectionBackground.resize(element.width, element.height);
  }
  if (element.absoluteBoundingBox) {
    selectionBackground.x = element.absoluteBoundingBox.x;
    selectionBackground.y = element.absoluteBoundingBox.y;
  }
  return selectionBackground;
}

function rgbToHsb(
  r: number,
  g: number,
  b: number
): { h: number; s: number; b: number } {
  // r /= 255;
  // g /= 255;
  // b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    v = max;

  const d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  };
}

function changeSizingMarkerCharacters(
  node: InstanceNode,
  position = `${node.componentProperties.position.value}`
) {
  //! find position property
  if (position === "left" || position === "right") {
    const textElement = node.children.find((node) => node.type === "TEXT");
    const size = Math.round(node.height);
    if (textElement) {
      textElement.characters = `${size}`;
      const diff = 16 - textElement.width;
      const newWidth = node.width - diff;
      node.resize(newWidth, node.height);
    }
  } else {
    const textElement = node.children.find((node) => node.type === "TEXT");
    const size = Math.round(node.width);
    if (textElement) {
      textElement.characters = `${size}`;
    }
  }
}
