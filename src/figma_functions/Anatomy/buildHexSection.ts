import { buildAutoLayoutFrame } from "../utilityFunctions";

export function buildHexSection(hexValue: string) {
  const colorSample = figma.createRectangle();
  colorSample.resize(14, 14);
  colorSample.cornerRadius = 2.8;
  colorSample.fills = [figma.util.solidPaint(hexValue)];
  colorSample.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.7019608020782471,
        g: 0.7019608020782471,
        b: 0.7019608020782471,
      },
      boundVariables: {},
    },
  ];

  const hex = figma.createText();
  hex.characters = hexValue;

  const colorWithHex = buildAutoLayoutFrame(
    "color-with-hex~",
    "HORIZONTAL",
    0,
    0,
    4
  );

  colorWithHex.appendChild(colorSample);
  colorWithHex.appendChild(hex);
  return colorWithHex;
}
