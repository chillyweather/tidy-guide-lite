/* eslint-disable @typescript-eslint/no-explicit-any */
import { setTextProps } from "./utilityFunctions";

export function setSizingMarkerValue(
  node: InstanceNode,
  position = `${node.componentProperties.position.value}`,
  settings: any = {}
) {
  const isRem = settings?.units === "rem" || false;
  const markerText = node.findOne((node) => node.type === "TEXT");
  if (!markerText) return;
  //! find position property
  const nodeHeight = isRem
    ? (node.height / settings.rootValue).toFixed(2)
    : Math.round(node.height);
  if (position === "left" || position === "right") {
    setTextProps(node, "text", `${nodeHeight}`);
    if (markerText) {
      const diff = 16 - markerText.width;
      const newWidth = node.width - diff;
      node.resize(newWidth, node.height);
    }
  } else {
    if (markerText.type === "TEXT") {
      markerText.characters = isRem
        ? `${(Math.round(node.width) / settings.rootValue).toFixed(2)}`
        : `${Math.round(node.width)}`;
    }
  }
}
