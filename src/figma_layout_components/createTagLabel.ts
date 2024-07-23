/* eslint-disable @typescript-eslint/no-explicit-any */
import { setColorStyle } from "src/figma_functions/utilityFunctions";
export async function createTagLabel(textNode: TextNode, settings: any) {
  const labelType = settings?.labelType;
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");

  let tagLabel;

  switch (labelType) {
    case "square":
      tagLabel = await buildSquare(textNode);
      break;
    case "square-rounded":
      tagLabel = await buildRoundedSquare(textNode);
      break;
    case "square-rounded-rotated":
      tagLabel = await buildRoundedRotatedSquare(textNode);
      break;
    default:
      tagLabel = await buildEllipse(textNode);
  }

  await tagLabel.setFillStyleIdAsync(TGGray900.id);
  tagLabel.layoutPositioning = "AUTO";
  tagLabel.layoutMode = "VERTICAL";
  tagLabel.resize(24, 24);
  tagLabel.primaryAxisAlignItems = "CENTER";
  tagLabel.counterAxisAlignItems = "CENTER";
  tagLabel.name = "index";

  return tagLabel;
}

async function buildEllipse(textNode: TextNode) {
  const tagLabel = figma.createFrame();
  tagLabel.bottomLeftRadius = 50;
  tagLabel.bottomRightRadius = 50;
  tagLabel.topRightRadius = 50;
  tagLabel.topLeftRadius = 50;
  tagLabel.appendChild(textNode);
  return tagLabel;
}

async function buildSquare(textNode: TextNode) {
  const tagLabel = figma.createFrame();
  tagLabel.appendChild(textNode);
  return tagLabel;
}

async function buildRoundedSquare(textNode: TextNode) {
  const tagLabel = figma.createFrame();
  tagLabel.appendChild(textNode);
  tagLabel.cornerRadius = 4;
  return tagLabel;
}

async function buildRoundedRotatedSquare(textNode: TextNode) {
  const tagLabel = figma.createFrame();
  tagLabel.appendChild(textNode);
  tagLabel.cornerRadius = 4;
  tagLabel.rotation = 45;
  textNode.rotation = -45;
  return tagLabel;
}
