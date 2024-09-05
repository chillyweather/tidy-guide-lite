import { buildAutoLayoutFrame } from "../utilityFunctions";

export function buildVarContent(name: string) {
  const varContent = buildAutoLayoutFrame(name, "VERTICAL", 0, 0, 12);
  varContent.paddingLeft = 50;
  return varContent;
}
