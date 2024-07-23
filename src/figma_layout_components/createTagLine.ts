/* eslint-disable @typescript-eslint/no-explicit-any */
import { setColorStyle } from "src/figma_functions/utilityFunctions";

function buildLine() {
  const line = figma.createVector();
  line.strokeAlign = "CENTER";
  line.strokeCap = "ROUND";
  line.strokeJoin = "MITER";
  line.strokeMiterLimit = 4;
  line.strokeWeight = 1;
  return line;
}

async function buildSolidLine() {
  const line = buildLine();
  line.vectorPaths = [
    {
      windingRule: "NONE",
      data: "M 46 0 L 0 4.664075115706767e-13",
    },
  ];
  return line;
}

async function buildDashedLine() {
  const line = buildLine();
  line.dashPattern = [1, 2];
  await line.setVectorNetworkAsync(vectorNetwork);
  return line;
}

export async function createLineBox(settings: any) {
  const lineType = settings?.lineType;
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");

  let lineElement;
  if (!lineType || lineType === "dashed") {
    lineElement = await buildDashedLine();
  } else {
    lineElement = await buildSolidLine();
  }
  lineElement.resize(40, lineElement.height);
  const lineBox = figma.createFrame();
  lineBox.appendChild(lineElement);
  lineBox.layoutPositioning = "AUTO";
  lineBox.layoutMode = "VERTICAL";
  lineBox.counterAxisAlignItems = "CENTER";
  lineBox.counterAxisSizingMode = "FIXED";
  lineBox.resize(24, 82);
  lineBox.layoutGrow = 1;
  lineBox.fills = [];
  lineElement.rotation = 90;
  lineElement.layoutGrow = 1;
  await lineElement.setStrokeStyleIdAsync(TGGray900.id);
  return lineBox;
}

const vectorNetwork: VectorNetwork = {
  regions: [],
  segments: [
    {
      start: 0,
      end: 1,
      tangentStart: {
        x: 0,
        y: 0,
      },
      tangentEnd: {
        x: 0,
        y: 0,
      },
    },
  ],
  vertices: [
    {
      x: 40,
      y: 0,
      strokeCap: "ROUND",
      strokeJoin: "MITER",
      cornerRadius: 0,
      handleMirroring: "NONE",
    },
    {
      x: 0,
      y: 4.664075386320289e-13,
      strokeCap: "ROUND",
      strokeJoin: "MITER",
      cornerRadius: 0,
      handleMirroring: "NONE",
    },
  ],
};
