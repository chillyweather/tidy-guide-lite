import { buildAutoLayoutFrame } from "../utilityFunctions";
export function buildCssBlock(textData: string): FrameNode {
  const frame = buildAutoLayoutFrame("text-data", "VERTICAL", 8, 12, 4);
  const text = createText(textData);
  frame.appendChild(text);

  applyFrameStyles(frame);

  return frame;
}

function createText(textData: string): TextNode {
  const text = figma.createText();
  text.fontName = { family: "IBM Plex Mono", style: "Medium" };
  text.characters = textData;
  return text;
}

function applyFrameStyles(frame: FrameNode): void {
  frame.strokeLeftWeight = 1;
  frame.paddingLeft = 19;
  frame.strokes = [createStroke()];
  frame.fills = [createFill()];
}

function createStroke(): Paint {
  return {
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
  };
}

function createFill(): Paint {
  return {
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
  };
}
