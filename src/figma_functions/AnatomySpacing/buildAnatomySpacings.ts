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

  const anatomyGroups: (FrameNode[] | null)[] = [];

  if (elementSizes.length) {
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
