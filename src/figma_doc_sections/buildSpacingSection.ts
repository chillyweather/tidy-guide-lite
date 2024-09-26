/* eslint-disable @typescript-eslint/no-explicit-any */
import buildSizeMarkerComponentSet from "../figma_layout_components/buildSizeMarker";
import buildSpacingMarkerComponentSet from "../figma_layout_components/buildSpacingMarker";
import { buildLabelComponent } from "src/figma_layout_components/buildLabelComponent";
import { buildAtomSpacings } from "src/figma_functions/buildDefaultSpacings";
import { findAllBooleanProps } from "src/figma_functions/utilityFunctions";
import { findAllVariantProps } from "src/figma_functions/utilityFunctions";
import { getElementSizes } from "src/figma_functions/utilityFunctions";
import { setColorStyle } from "src/figma_functions/utilityFunctions";

export async function buildSpacingSection(
  node: InstanceNode,
  frame: FrameNode,
  pluginSettings?: any
) {
  const TGGray600 = await setColorStyle(
    ".TG-admin/anatomy-secondary",
    "707070"
  );
  const sizeMarker = await buildSizeMarkerComponentSet();
  const spacingMarker = await buildSpacingMarkerComponentSet();
  const labelComponent = buildLabelComponent();

  if (!(sizeMarker && spacingMarker && labelComponent)) return;

  const booleanProps = await findAllBooleanProps(node);
  const variantProps = await findAllVariantProps(node);
  const elementSizes = (await getElementSizes(node)) || [];
  const atomSpacings = await buildAtomSpacings(
    node,
    booleanProps,
    labelComponent,
    elementSizes,
    variantProps,
    sizeMarker,
    spacingMarker,
    pluginSettings
  );

  atomSpacings.forEach((node) => {
    if (!node) return;
    if (node.name) {
      const sizeSectionLabel = figma.createText();
      sizeSectionLabel.characters = node.name;
      sizeSectionLabel.fontSize = 14;
      sizeSectionLabel.fontName = { family: "Inter", style: "Semi Bold" };
      node.insertChild(0, sizeSectionLabel);
      sizeSectionLabel.setFillStyleIdAsync(TGGray600.id);
    }
    frame.appendChild(node);
    node.name = "spacing-element";
    node.layoutSizingHorizontal = "FILL";
    node.primaryAxisAlignItems = "CENTER";
  });

  sizeMarker.remove();
  spacingMarker.remove();
  labelComponent.remove();
  // frame.name = frame.name + "- Spacing";
  return frame;
}
