/* eslint-disable @typescript-eslint/no-explicit-any */
import { findAllBooleanProps } from "../figma_functions/utilityFunctions";
import { findAllVariantProps } from "../figma_functions/utilityFunctions";
import { getElementSizes } from "../figma_functions/utilityFunctions";
import { buildLabelComponent } from "../figma_layout_components/buildLabelComponent";
import { buildAtomTags } from "../figma_functions/Anatomy/buildAtomTags";
import buildAllTags from "../figma_layout_components/buildTagComponent";
import { deleteInvalidProps } from "./deleteInvalidProps";

export async function buildAnatomySection(
  node: InstanceNode,
  parentFrame: FrameNode,
  indexPosition: string = "left",
  indexSpacing: string = "32",
  pluginSettings: any,
  sectionData: any
) {
  const {
    // title,
    tagFrame,
  } = sectionData.elements;
  const booleanProperties = await findAllBooleanProps(node);
  const variantProperties = await findAllVariantProps(node);
  const elementSizes = await getElementSizes(node);

  deleteInvalidProps(variantProperties);

  const labelComponent = buildLabelComponent();
  const tagComponent = await buildAllTags(pluginSettings);

  const tags = await buildAtomTags(
    node,
    booleanProperties,
    elementSizes!,
    variantProperties,
    labelComponent,
    tagComponent,
    indexPosition,
    indexSpacing,
    pluginSettings,
    tagFrame
  );

  tags.forEach((tag) => {
    parentFrame.appendChild(tag);
  });

  labelComponent.remove();
  tagComponent!.remove();

  return parentFrame;
}
