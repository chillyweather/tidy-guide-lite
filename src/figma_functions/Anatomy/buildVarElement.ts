import { varBgFills } from "../layoutResources/fills";
import { buildAutoLayoutFrame } from "../utilityFunctions";

export function buildVarElement() {
  const borderVariable = buildAutoLayoutFrame(
    "border-variable",
    "HORIZONTAL",
    8,
    4,
    4
  );
  borderVariable.cornerRadius = 4;
  borderVariable.fills = varBgFills;
  return borderVariable;
}
