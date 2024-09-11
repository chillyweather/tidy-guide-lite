/* eslint-disable @typescript-eslint/no-explicit-any */
export type Combination = Record<string, string>;

export interface VariantObject {
  type: string;
  defaultValue: string;
  variantOptions: string[];
}

export function getVariantsArray(
  variantProperties: any,
  variantKeys: string[]
) {
  const secondProp = variantKeys[variantKeys.length - 2];

  if (secondProp && variantKeys.length > 2) {
    const secondPropOptions = variantProperties[secondProp].variantOptions;
    const workingArrays = splitArray(
      buildAllPropsArray(variantProperties, variantKeys),
      secondPropOptions.length
    );
    return workingArrays;
  } else {
    const workingArrays = buildAllPropsArray(variantProperties, variantKeys);
    console.log("%c workingArrays", "color: Lime", workingArrays);
    return workingArrays;
  }
}

export function buildAllPropsArray(
  obj: Record<string, VariantObject>,
  keys: string[]
): Combination[][] {
  const orderedKeys = reorderProps(keys, obj);
  const combinations: Combination[] = [];
  const stack: Combination[] = [];

  function generate(index: number): void {
    if (index === orderedKeys.length) {
      combinations.push(Object.assign({}, ...stack));
      return;
    }

    const key = orderedKeys[index];
    const { variantOptions } = obj[key];
    for (let i = 0; i < variantOptions.length; i++) {
      stack.push({ [key]: variantOptions[i] });
      generate(index + 1);
      stack.pop();
    }
  }

  generate(0);

  const lastKey = orderedKeys[orderedKeys.length - 1];
  const subarrays: Combination[][] = [];
  const subarrayLength = obj[lastKey].variantOptions.length;

  for (let i = 0; i < combinations.length; i += subarrayLength) {
    subarrays.push(combinations.slice(i, i + subarrayLength));
  }

  return subarrays;
}

export function splitArray(arr: any, len: number) {
  const result: any = [];
  for (let i = 0; i < arr.length; i += len) {
    const chunk = arr.slice(i, i + len);
    result.push(chunk);
  }
  return result;
}

export function reorderProps(variantKeys: string[], variantProps: any) {
  reorderArrayByPropLength(variantKeys, variantProps);
  reorderArrayByType(variantKeys);
  return variantKeys.reverse();
}

function reorderArrayByPropLength(arr: any, variantProps: any): void {
  arr.sort((propA: string | number, propB: string | number) => {
    const variantOptionsA = variantProps[propA].variantOptions;
    const variantOptionsB = variantProps[propB].variantOptions;
    return variantOptionsB.length - variantOptionsA.length;
  });
}

function reorderArrayByType(arr: string[]) {
  let temp: string;
  const state = arr.find((node) => node.toLowerCase() === "state");
  const type = arr.find((node) => node.toLowerCase() === "type");
  if (type) {
    const index = arr.indexOf(type);
    temp = arr.splice(index, 1)[0];
    arr.unshift(temp);
  }
  if (state) {
    const index = arr.indexOf(state);
    temp = arr.splice(index, 1)[0];
    arr.splice(1, 0, temp); // Insert at index 1
  }
}
