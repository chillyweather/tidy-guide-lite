/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildTag } from "./buildTag";

export default async function buildTagComponentSet(settings: any) {
  const tagBottomLine = await buildTag("A", "bottom", settings);
  tagBottomLine!.name = "type=bottom line";
  const tagTopLine = await buildTag("B", "top", settings);
  tagTopLine!.name = "type=top line";
  const tagLeftLine = await buildTag("C", "left", settings);
  tagLeftLine!.name = "type=left line";
  const tagRightLine = await buildTag("D", "right", settings);
  tagRightLine!.name = "type=right line";
  const tagIndex = await buildTag("E", "index", settings);
  tagIndex!.name = "type=index only";
  const tagText = await buildTag("F", "text", settings);
  tagText!.name = "type=text";
  const tagImportant = await buildTag("!", "important", settings);
  tagImportant!.name = "type=important";
  const tagInfo = await buildTag("»", "info", settings);
  tagInfo!.name = "type=info";
  const tagSize = await buildTag("", "size", settings, false);
  tagSize!.name = "type=size";
  const tagCornerRadius = await buildTag("", "cornerRadius", settings, false);
  tagCornerRadius!.name = "type=cornerRadius";

  const tags = [
    tagTopLine,
    tagRightLine,
    tagBottomLine,
    tagLeftLine,
    tagIndex,
    tagText,
    tagImportant,
    tagInfo,
    tagSize,
    tagCornerRadius,
  ];

  const tagComponentSet = figma.combineAsVariants(
    tags as ComponentNode[],
    figma.currentPage
  );
  if (!tags.length) return;
  tagComponentSet.name = ".DS anatomy tags";
  tagComponentSet.layoutPositioning = "AUTO";
  tagComponentSet.layoutMode = "VERTICAL";
  tagComponentSet.itemSpacing = 20;
  tagComponentSet.fills = [
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
      boundVariables: {},
    },
  ];
  tagComponentSet.paddingBottom = 20;
  tagComponentSet.paddingTop = 20;
  tagComponentSet.paddingLeft = 20;
  tagComponentSet.paddingRight = 20;
  tagComponentSet.cornerRadius = 28;
  tagComponentSet.resize(372, tagComponentSet.height);

  return tagComponentSet;
}
