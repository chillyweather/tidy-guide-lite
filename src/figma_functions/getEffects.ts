export function getEffects(node: InstanceNode) {
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

  const result = {};

  const styleName = findStyleName(node);
  if (styleName) {
    //@ts-ignore
    result.style = `Effect style: ${styleName}`;
  }

  effects.forEach((effect) => {
    const effectType = effectTypes[effect.type];
    if (effectType === "Drop shadow") {
      const shadowDescription = buildShadowDescription(effectType, effect);
      //@ts-ignore
      result.dropShadow = shadowDescription;
    }
    if (effectType === "Inner shadow") {
      const shadowDescription = buildShadowDescription(effectType, effect);
      //@ts-ignore
      result.innerShadow = shadowDescription;
    }

    if (effectType === "Background blur") {
      const blurDescription = buildBlurDescription(effectType, effect);
      //@ts-ignore
      result.backgroundBlur = blurDescription;
    }
    if (effectType === "Layer blur") {
      const blurDescription = buildBlurDescription(effectType, effect);
      //@ts-ignore
      result.layerBlur = blurDescription;
    }
  });
  return result;
}

function findStyleName(node: InstanceNode) {
  const effectStyleId = node.effectStyleId;
  if (effectStyleId && effectStyleId.length > 0) {
    const styles = figma.getLocalEffectStyles();
    const foundStyle = styles.find((s) => s.id === effectStyleId);
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
