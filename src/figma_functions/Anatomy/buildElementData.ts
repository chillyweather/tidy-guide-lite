/* eslint-disable @typescript-eslint/no-explicit-any */
export function buildElementData(
  frame: FrameNode,
  textData: string
): FrameNode {
  const text = figma.createText();
  text.fontName = { family: "IBM Plex Mono", style: "Medium" };
  text.characters = textData;
  frame.appendChild(text);

  frame.strokeLeftWeight = 1;
  frame.paddingLeft = 19;
  frame.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.8299999833106995,
        g: 0.8299999833106995,
        b: 0.8299999833106995,
      },
      boundVariables: {},
    },
  ];

  frame.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.9803921580314636,
        g: 0.9803921580314636,
        b: 0.9803921580314636,
      },
      boundVariables: {},
    },
  ];

  return frame;
}
