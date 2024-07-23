import { addNewTextProperty } from "../figma_functions/addNewProperty";

/**
 * Builds a label component with the given size, color, and font weight.
 * @param size - The font size of the label.
 * @param color - The color of the label.
 * @param fontWeight - The font weight of the label.
 * @returns The label component.
 */
export function buildLabelComponent(
  size: number = 14,
  color: any = { r: 0, g: 0, b: 0 },
  fontWeight: string = "Bold"
): ComponentNode {
  const labelComponent = figma.createComponent();
  const labelComponentText = figma.createText();
  labelComponent.appendChild(labelComponentText);
  addNewTextProperty(labelComponent, labelComponentText, "text", "Label");

  labelComponentText.fills = [{ type: "SOLID", color: color }];

  labelComponentText.fontSize = size;
  labelComponentText.fontName = {
    family: "Inter",
    style: fontWeight,
  };
  labelComponentText.characters = `Label`;

  labelComponent.layoutMode = "HORIZONTAL";
  labelComponent.primaryAxisAlignItems = "CENTER";
  labelComponent.counterAxisAlignItems = "CENTER";

  labelComponent.layoutSizingHorizontal = "HUG";
  labelComponent.layoutSizingVertical = "HUG";
  labelComponent.name = "text-label";

  return labelComponent;
}
