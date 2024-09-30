import { setColorStyle } from "src/figma_functions/utilityFunctions";

//fonts
const interMedium: FontName = {
  family: "Inter",
  style: "Medium",
};
const interSemiBold: FontName = {
  family: "Inter",
  style: "Semi Bold",
};

//color styles
async function buildColorStyles() {
  const anatomyLabelsColor = await setColorStyle(
    ".TG-admin/anatomy-labels",
    "292929"
  );

  return { anatomyLabelsColor };
}

const styles = await buildColorStyles();

//anatomy tags
export const anatomyProps: {
  index: {
    color: Paint[];
    fontSize: number;
    fontName: FontName;
    textCase: TextCase;
    verticalAlign: "CENTER" | "TOP" | "BOTTOM";
    horizontalAlign: "CENTER" | "LEFT" | "RIGHT" | "JUSTIFIED";
    lineHeight: LineHeight;
  };
  labelText: {
    colorStyle: PaintStyle;
    fontSize: number;
    fontName: FontName;
  };
} = {
  index: {
    color: [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1,
        },
      },
    ],
    fontSize: 14,
    fontName: interSemiBold,
    textCase: "UPPER",
    horizontalAlign: "CENTER",
    verticalAlign: "CENTER",
    lineHeight: {
      unit: "PERCENT",
      value: 2.9999999329447746,
    },
  },
  labelText: {
    colorStyle: styles.anatomyLabelsColor,
    fontName: interMedium,
    fontSize: 14,
  },
};
