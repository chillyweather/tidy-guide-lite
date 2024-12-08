/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export interface EffectResult {
  style?: string;
  dropShadow?: string;
  innerShadow?: string;
  backgroundBlur?: string;
  layerBlur?: string;
}

export async function getEffects(node: InstanceNode) {
  const effectTypes = {
    DROP_SHADOW: "Drop shadow",
    INNER_SHADOW: "Inner shadow",
    BACKGROUND_BLUR: "Background blur",
    LAYER_BLUR: "Layer blur",
  };

  const effects = node.effects;
  if (!effects) {
    return null;
  }

  const result: EffectResult = {};

  const styleName = await findStyleName(node);
  console.log("styleName", styleName);
  if (styleName) {
    result.style = styleName;
  }

  for (const effect of effects) {
    const effectType = effectTypes[effect.type];
    if (effectType === "Drop shadow") {
      result.dropShadow = buildShadowDescription(effectType, effect);
    }
    if (effectType === "Inner shadow") {
      result.innerShadow = buildShadowDescription(effectType, effect);
    }
    if (effectType === "Background blur") {
      result.backgroundBlur = buildBlurDescription(effectType, effect);
    }
    if (effectType === "Layer blur") {
      result.layerBlur = buildBlurDescription(effectType, effect);
    }
  }
  return result;
}

async function findStyleName(node: InstanceNode) {
  const effectStyleId = node.effectStyleId;

  if (effectStyleId && effectStyleId.length > 0) {
    const foundStyle = await figma.getStyleByIdAsync(effectStyleId);
    if (foundStyle) {
      return foundStyle.name;
    }
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    (
      (1 << 24) +
      (Math.round(r * 255) << 16) +
      (Math.round(g * 255) << 8) +
      Math.round(b * 255)
    )
      .toString(16)
      .slice(1)
  );
}

function buildShadowDescription(effectType: any, effect: any) {
  const red = effect.color.r;
  const green = effect.color.g;
  const blue = effect.color.b;
  return `${effectType}:
• color: ${rgbToHex(red, green, blue).toUpperCase()}
• transparency: ${Math.round(effect.color.a * 100)}%
• offset X: ${effect.offset.x}px
• offset Y: ${effect.offset.y}px
• radius: ${effect.radius}px
• spread: ${effect.spread}px`;
}

function buildBlurDescription(effectType: any, effect: any) {
  return `${effectType} radius: ${effect.radius}px`;
}
