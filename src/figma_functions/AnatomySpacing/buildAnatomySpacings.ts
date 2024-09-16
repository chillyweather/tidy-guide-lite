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
import buildSizeMarkerComponentSet from "src/figma_layout_components/buildSizeMarker";
import buildSpacingMarkerComponentSet from "src/figma_layout_components/buildSpacingMarker";
import { buildOneSizeAnatomySpacings } from "./buildOneAnatomySpacing";

export async function buildAnatomySpacings(
  element: InstanceNode,
  frame: FrameNode
) {
  const elements = getAnatomyElements(element);
  if (!(elements && elements.length)) return;

  const sizeMarker = await buildSizeMarkerComponentSet();
  const spacingMarker = await buildSpacingMarkerComponentSet();
  if (!sizeMarker || !spacingMarker) return;

  const subtitle = createSubtitle();
  frame.appendChild(subtitle);

  const booleanProperties = await findAllBooleanProps(element);
  const variantProperties = await findAllVariantProps(element);

  const elementSizes = (await getElementSizes(element)) ?? [];

  let anatomyGroups: (FrameNode[] | null)[] = [];

  if (elementSizes.length) {
    anatomyGroups = await Promise.all(
      elementSizes.map(async (size) => {
        const sizeElement = element.clone();
        const propNames = Object.keys(variantProperties);
        const sizeProp = propNames.find(
          (propName) => propName.toLowerCase() === "size"
        );
        if (sizeProp) {
          setVariantProps(sizeElement, sizeProp, size);
        }
        return buildOneSizeAnatomySpacings(
          sizeElement,
          elements,
          frame,
          booleanProperties,
          sizeMarker,
          spacingMarker
        );
      })
    );
  } else {
    const spacings = await buildOneSizeAnatomySpacings(
      element,
      elements,
      frame,
      booleanProperties,
      sizeMarker,
      spacingMarker
    );
    anatomyGroups = [spacings];
  }
  sizeMarker?.remove();
  spacingMarker.remove();
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
