/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEffects, EffectResult } from "./getEffects";
import { setTextContent } from "../../utilityFunctions";

export async function addEffectsInfo(
  frame: any,
  tagComponent: ComponentSetNode,
  indexes: FrameNode
) {
  const effects: EffectResult | null = await getEffects(frame);
  if (!effects) return;

  const tag = tagComponent.findOne((node) => node.name === "type=info");
  if (!(tag && tag.type === "COMPONENT")) return;

  const effectsDataElement = createEffectsDataElement(tag);

  const effectNames = Object.keys(effects);
  console.log("effectNames", effectNames);
  effectNames.forEach((effectName) => {
    const indexInfo = figma.createFrame();
    indexInfo.name = `.${effectName}`;

    if (effectName === "innerShadow" || effectName === "dropShadow") {
      indexInfo.counterAxisAlignItems = "MIN";
      const indexText = indexInfo.findOne((node) => node.name === "Text");
      if (!(indexText && indexText.type === "TEXT")) return;
      indexText.paragraphSpacing = 3;
    }
    indexes.appendChild(indexInfo);
  });
}
function createEffectsDataElement(tag: ComponentNode) {
  const effectsData = tag.createInstance();
  setTextContent(effectsData, "Text", `Effects`);
  const indexLink = effectsData.findOne((node) => node.name === "link");
  if (indexLink) indexLink.visible = false;
  return effectsData;
}
