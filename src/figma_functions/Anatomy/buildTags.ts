/* eslint-disable @typescript-eslint/no-explicit-any */
import { computeMaximumBounds } from "@create-figma-plugin/utilities";
import { buildIndexesFrame } from "../tagPlacementFunctions";
import {
  findAllNodes,
  elementsCoordinatesAndDimensions,
  // getTagInstance,
} from "./tagBuilgingFunctions";
import { buildTagElements } from "./buildTagElements";
import { buildAutoLayoutFrame, setVariantProps } from "../utilityFunctions";
import { getEffects } from "../getEffects";
import { setTextContent } from "../utilityFunctions";
import { buildIndexElementForText } from "./buildIndexElementForText";
import { toTitleCase } from "../utilityFunctions";
import { addBorderRadius } from "./addBorderRadius";
import { addBackgroundInfo } from "./addBackgroundInfo";

export default async function buildTags(
  tagComponent: ComponentSetNode | undefined,
  frame: any,
  instances: boolean,
  textElements: boolean,
  elementMaxWidth?: number | null,
  pluginSettings?: any
) {
  const isRem = pluginSettings?.units === "rem" || false;
  const rootValue = pluginSettings?.rootValue || 16;
  const unit = isRem ? "rem" : "px";

  if (!tagComponent) return;

  const links = tagComponent.findAll((node) => node.name === "link");
  links.forEach((link) => {
    link.visible = false;
  });
  const abc = Array.from({ length: 999 }, (_, i) => (i + 1).toString());
  const minSizeProperty = frame.minWidth ? frame.minWidth : null;

  const tagElements: any[] = [];

  elementsCoordinatesAndDimensions.length = 0;

  await findAllNodes(frame, instances, textElements);

  const indexes = buildIndexesFrame(frame);

  //! sort by elementX value
  //! need to implement better sorting

  //data for tag placement
  interface FrameData {
    width: number;
    height: number;
    x: number;
    y: number;
  }

  const frameData: FrameData = {
    width: frame.width,
    height: frame.height,
    x: frame.absoluteBoundingBox.x,
    y: frame.absoluteBoundingBox.y,
  };

  function getDistances(dot: any, rectangle: FrameData) {
    const bottomDistance =
      rectangle.y + rectangle.height - (dot.elementY + dot.elementHeight);
    const topDistance = dot.elementY - rectangle.y;
    const leftDistance = dot.elementX - rectangle.x;
    const rightDistance =
      rectangle.x + rectangle.width - (dot.elementX + dot.elementWidth);

    const distances = {
      top: topDistance,
      bottom: bottomDistance,
      left: leftDistance,
      right: rightDistance,
    };

    return distances;
  }

  function getPriority(dot: any, rectangle: FrameData) {
    const distances = getDistances(dot, rectangle);

    const verticalMinimum = Math.min(distances.top, distances.bottom);
    const horizontalMinimum = Math.min(distances.left, distances.right);

    const firstPriority = Math.min(verticalMinimum, horizontalMinimum);
    const secondPriority = (verticalMinimum + horizontalMinimum) / 2;

    return [firstPriority, secondPriority];
  }

  // NOTE: elements with same distance from the edge sorted by
  // NOTE: distance to the edge on other axis
  elementsCoordinatesAndDimensions.sort((a, b) => {
    const prioritiesA = getPriority(a, frameData);
    const prioritiesB = getPriority(b, frameData);
    if (prioritiesA[0] === prioritiesB[0]) {
      return prioritiesA[1] - prioritiesB[1];
    }
    return prioritiesA[0] - prioritiesB[0];
  });

  const usedComponentIndexes: any[] = [];

  let currentIndex = 0;

  elementsCoordinatesAndDimensions.forEach((element) => {
    const distances = getDistances(element, frameData);
    const {
      elementX,
      elementY,
      elementWidth,
      elementHeight,
      elementName,
      elementMain,
      elementStyleName,
      elementFontName,
      elementFontSize,
    }: {
      elementX: number;
      elementY: number;
      elementWidth: number;
      elementHeight: number;
      elementName: string;
      elementMain: string;
      elementStyleName: string;
      elementFontName: FontName;
      elementFontSize: number;
    } = element;

    // NOTE: elements (tags and indexes)
    const tag = buildTagElements(
      tagComponent,
      frame,
      elementX,
      elementY,
      elementWidth,
      elementHeight,
      distances
    );
    const indexWithLabelComp = tagComponent.findOne(
      (node) => node.name === "type=text" && node.type === "COMPONENT"
    );
    if (!indexWithLabelComp || indexWithLabelComp.type !== "COMPONENT") return;
    const indexWithLabel = indexWithLabelComp.createInstance();
    const indexElement = buildAutoLayoutFrame(
      "indexElement",
      "VERTICAL",
      0,
      0,
      8
    );
    indexElement.appendChild(indexWithLabel);
    indexes.appendChild(indexElement);

    // NOTE: finding "sibling" elements with the same name and main element
    function findUsedData(
      dataObj: any,
      mainElement: string,
      name: string
    ): string | undefined {
      for (let i = 0; i < dataObj.length; i++) {
        if (
          dataObj[i].mainElement === mainElement &&
          dataObj[i].name === name
        ) {
          return dataObj[i].index;
        }
      }
      return undefined;
    }

    if (elementMain) {
      const foundIndex = findUsedData(
        usedComponentIndexes,
        elementMain,
        elementName
      );
      if (!foundIndex) {
        usedComponentIndexes.push({
          mainElement: elementMain,
          name: elementName,
          index: abc[currentIndex],
        });
        setTextContent(tag, "elementIndex", `${abc[currentIndex]}`);
        setTextContent(indexWithLabel, "elementIndex", `${abc[currentIndex]}`);
        currentIndex += 1;
      } else {
        setTextContent(tag, "elementIndex", `${foundIndex}`);
        indexWithLabel.remove();
        indexElement.remove();
      }
    } else {
      setTextContent(tag, "elementIndex", `${abc[currentIndex]}`);
      setTextContent(indexWithLabel, "elementIndex", `${abc[currentIndex]}`);
      currentIndex += 1;
    }

    if (
      elementStyleName &&
      elementFontName &&
      elementFontSize &&
      !indexWithLabel.removed
    ) {
      buildIndexElementForText(
        indexElement,
        indexWithLabel,
        element,
        isRem,
        unit,
        rootValue
      );
    } else if (!indexWithLabel.removed) {
      setTextContent(indexWithLabel, "Text", `💠 ${elementName}`);
    }

    if (elementName === "Icon" && indexWithLabel) {
      isRem
        ? setTextContent(
            indexWithLabel,
            "Text",
            `⭐ Icon - ${(elementWidth / rootValue).toFixed(3)}${unit}`
          )
        : setTextContent(
            indexWithLabel,
            "Text",
            `⭐ Icon - ${elementWidth.toFixed()}${unit}`
          );
    }
    tag.name = `.tag`;
    if (!indexWithLabel.removed)
      indexWithLabel.name = `.${abc[currentIndex]}_${elementName}`;
    tagElements.push(tag);
  });

  await addBackgroundInfo(frame, tagComponent, indexes);

  if (minSizeProperty)
    addMinWidthIndex(
      minSizeProperty,
      tagComponent,
      indexes,
      isRem,
      rootValue,
      unit
    );

  if (elementMaxWidth && elementMaxWidth > 0) {
    addMaxWidth(
      frame,
      tagComponent,
      indexes,
      elementMaxWidth,
      isRem,
      rootValue,
      unit
    );
  }
  await addBorderRadius(frame, tagComponent, indexes, isRem, rootValue, unit);
  addEffectsInfo(frame, tagComponent, indexes);
  //! error here
  addStrokeInfo(frame, tagComponent, indexes, isRem, rootValue, unit);

  //! find size of all tags (and frame) together
  const tagBounds = computeMaximumBounds(tagElements);

  const yLimit =
    tagBounds[1].y > frame.absoluteBoundingBox.y + frame.height
      ? tagBounds[1].y
      : frame.absoluteBoundingBox.y + frame.height;
  indexes.y = yLimit + 52;

  tagElements.push(indexes);
  return { tagElements, indexes };
}

function addMinWidthIndex(
  minSize: number,
  tagComponent: ComponentSetNode,
  indexes: FrameNode,
  isRem: boolean = false,
  rootValue: number = 16,
  unit: string = "px"
) {
  const indexWithLabelComponent = tagComponent.findOne(
    (node) => node.name === "type=size" && node.type === "COMPONENT"
  );
  if (!indexWithLabelComponent || indexWithLabelComponent.type !== "COMPONENT")
    return;
  const indexWithLabel = indexWithLabelComponent.createInstance();

  indexes.appendChild(indexWithLabel);

  setVariantProps(indexWithLabel, "type", "size");
  if (minSize) {
    isRem
      ? setTextContent(
          indexWithLabel,
          "Text",
          `Minimal width - ${(minSize / rootValue).toFixed(3)}${unit}`
        )
      : setTextContent(
          indexWithLabel,
          "Text",
          `Minimal width - ${minSize}${unit}`
        );
  } else {
    setTextContent(indexWithLabel, "Text", `Minimal width - Not determined`);
  }
}

function addEffectsInfo(
  frame: any,
  tagComponent: ComponentSetNode,
  indexes: FrameNode
) {
  const effects: any = getEffects(frame);
  if (!effects) return;

  const tag = tagComponent.findOne((node) => node.name === "type=info");
  if (!(tag && tag.type === "COMPONENT")) return;
  const effectNames = Object.keys(effects);
  effectNames.forEach((effectName) => {
    const indexInfo = tag.createInstance();
    indexInfo.name = `.${effectName}`;
    setTextContent(indexInfo, "Text", `${effects[effectName]}`);
    const indexLink = indexInfo.findOne((node) => node.name === "link");
    if (indexLink) indexLink.visible = false;
    if (effectName === "innerShadow" || effectName === "dropShadow") {
      indexInfo.counterAxisAlignItems = "MIN";
      const indexText = indexInfo.findOne((node) => node.name === "Text");
      if (!(indexText && indexText.type === "TEXT")) return;
      indexText.paragraphSpacing = 3;
    }
    indexes.appendChild(indexInfo);
  });
}

function addMaxWidth(
  frame: any,
  tagComponent: ComponentSetNode,
  indexes: FrameNode,
  maxWidth: number,
  isRem: boolean = false,
  rootValue: number = 16,
  unit: string = "px"
) {
  if (maxWidth && maxWidth > 0) {
    const foundTagComponent = tagComponent.findOne(
      (node) => node.name === "type=size" && node.type === "COMPONENT"
    );
    if (!foundTagComponent || foundTagComponent.type !== "COMPONENT") return;
    const tag = foundTagComponent.createInstance();

    isRem
      ? setTextContent(
          tag,
          "Text",
          `Maximal width - ${(maxWidth / rootValue).toFixed(3)}${unit}`
        )
      : setTextContent(tag, "Text", `Maximal width - ${maxWidth}${unit}`);

    indexes.appendChild(tag);
  }
}

function addStrokeInfo(
  frame: any,
  tagComp: ComponentSetNode,
  indexes: FrameNode,
  isRem: boolean = false,
  rootValue: number = 16,
  unit: string = "px"
) {
  if (frame.strokes && frame.strokes.length > 0) {
    const strokeAlign = frame.strokeAlign;
    let strokeWeight = "";

    if (frame.strokeWeight === figma.mixed) {
      const result: any = {};
      result["Left stroke"] = frame.strokeLeftWeight;
      result["Right stroke"] = frame.strokeRightWeight;
      result["Top stroke"] = frame.strokeTopWeight;
      result["Bottom stroke"] = frame.strokeBottomWeight;

      for (const res in result) {
        if (result[res] > 0) {
          const foundTagComponent = tagComp.findOne(
            (node) => node.name === "type=info" && node.type === "COMPONENT"
          );
          if (!foundTagComponent || foundTagComponent.type !== "COMPONENT")
            return;
          const tag = foundTagComponent.createInstance();
          strokeWeight = result[res];
          setStrokeProps(
            tag,
            strokeWeight,
            strokeAlign,
            indexes,
            res,
            isRem,
            rootValue,
            unit
          );
        }
      }
    } else {
      const foundTagComponent = tagComp.findOne(
        (node) => node.name === "type=info" && node.type === "COMPONENT"
      );
      if (!foundTagComponent || foundTagComponent.type !== "COMPONENT") return;
      const tag = foundTagComponent.createInstance();
      strokeWeight = frame.strokeWeight;
      setStrokeProps(
        tag,
        strokeWeight,
        strokeAlign,
        indexes,
        "Stroke",
        isRem,
        rootValue,
        unit
      );
    }
  }
}

function setStrokeProps(
  tag: any,
  strokeWeight: string,
  strokeAlign: any,
  indexes: FrameNode,
  strokeKind: string,
  isRem: boolean = false,
  rootValue: number = 16,
  unit: string = "px"
) {
  isRem
    ? setTextContent(
        tag,
        "Text",
        `${strokeKind} - ${(parseFloat(strokeWeight) / rootValue).toFixed(
          3
        )}${unit}`
      )
    : setTextContent(
        tag,
        "Text",
        `${strokeKind} - ${strokeWeight}px, ${toTitleCase(strokeAlign)}`
      );

  const indexLink = tag.findOne((element: any) => element.name === "link");
  if (indexLink) indexLink.visible = false;
  indexes.appendChild(tag);
}

export function makeLabelTextFlow(labelInstance: InstanceNode) {
  labelInstance.primaryAxisSizingMode = "FIXED";
  labelInstance.layoutAlign = "STRETCH";
  labelInstance.children.forEach((child) => {
    if (child.type === "TEXT" && child.characters !== "") {
      child.layoutGrow = 1;
      child.textAutoResize = "HEIGHT";
    }
  });
}
