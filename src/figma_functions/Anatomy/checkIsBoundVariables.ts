/* eslint-disable @typescript-eslint/no-explicit-any */
export function checkIsBoundVariables(frame: any, properties: string[]) {
  const boundVariables = frame.boundVariables;
  if (!boundVariables || typeof boundVariables !== "object") return false;

  const radiusProperties = properties;
  return radiusProperties.some((prop) => prop in boundVariables);
}
