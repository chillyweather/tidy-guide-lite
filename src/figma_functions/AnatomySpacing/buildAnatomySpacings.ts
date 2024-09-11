/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import {
  setVariantProps,
  findAllBooleanProps,
  findAllVariantProps,
  getElementSizes,
} from "../utilityFunctions";
import { getAnatomyElements } from "./getAnatomyElements";
import { buildOneSizeAnatomySpacings } from "./buildOneAnatomySpacing";

export async function buildAnatomySpacings(
  element: InstanceNode,
  frame: FrameNode
) {
  const elements = getAnatomyElements(element);
  if (!(elements && elements.length)) return;

  const subtitle = createSubtitle();
  frame.appendChild(subtitle);

  const booleanProperties = await findAllBooleanProps(element);
  const variantProperties = await findAllVariantProps(element);

  const elementSizes = (await getElementSizes(element)) ?? [];

  let anatomyGroups: (FrameNode[] | null)[] = [];

  if (elementSizes.length) {
    anatomyGroups = await Promise.all(
      elementSizes.map(async (size) => {
        const propNames = Object.keys(variantProperties);
        const sizeProp = propNames.find(
          (propName) => propName.toLowerCase() === "size"
        );
        if (sizeProp) {
          console.log("sizeProp", sizeProp);
          setVariantProps(element, sizeProp, size);
        }
        return buildOneSizeAnatomySpacings(
          element,
          elements,
          frame,
          booleanProperties
        );
      })
    );
  } else {
    const spacings = await buildOneSizeAnatomySpacings(
      element,
      elements,
      frame,
      booleanProperties
    );
    anatomyGroups = [spacings];
  }
  return anatomyGroups;
}
function createSubtitle() {
  const subtitle = figma.createText();
  subtitle.fontName = {
    family: "Inter",
    style: "Semi Bold",
  };
  subtitle.fontSize = 32;
  subtitle.characters = "Internal spacings";
  return subtitle;
}
