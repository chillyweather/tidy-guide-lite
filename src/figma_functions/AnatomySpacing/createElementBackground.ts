import { darkFrameColor, lightFrameColor } from "./frameColors";
import { rgbToHsb } from "./rgbToHsb";

export function createElementBackground(
  element: FrameNode | InstanceNode | TextNode,
  node: InstanceNode
) {
  const selectionBackground = figma.createFrame();
  selectionBackground.fills = [];

  if ("fills" in node && node.fills && (node.fills as Paint[]).length > 0) {
    const fill = (node.fills as Paint[])[0] as Paint;
    if (fill.type === "SOLID" && fill.color) {
      const colors = fill.color as RGB;
      const hslFill = rgbToHsb(colors.r, colors.g, colors.b);
      if (hslFill.b > 0.8 && hslFill.s < 0.2) {
        selectionBackground.strokes = [darkFrameColor];
      } else {
        selectionBackground.strokes = [lightFrameColor];
      }
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
