import { VariantObject } from "./getVariantsArray";

export function deleteInvalidProps(obj: Record<string, VariantObject>): void {
  for (const key in obj) {
    if (obj[key].variantOptions.length < 2) {
      delete obj[key];
    }
  }
}
