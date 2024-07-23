import { createPaintStyle, getLocalColorStyle } from "./utilityFunctions";

const ANATOMY = ".TG-admin/anatomy-primary";

export default function handleCanvasColors({
  tagColor,
}: {
  tagColor?: string;
}) {
  handleAnatomyColors(ANATOMY, tagColor);
}

export async function handleAnatomyColors(
  styleName: string,
  tagColor: string | undefined
) {
  if (!tagColor) return;

  const style = await getLocalColorStyle(styleName);
  if (!style) {
    createPaintStyle(ANATOMY, tagColor);
    return;
  }

  const solidPaint = figma.util.solidPaint;
  style.paints = [solidPaint(tagColor)];
}
