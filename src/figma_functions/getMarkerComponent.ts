export function getMarkerComponent(
  sizeMarker: ComponentSetNode,
  spacingMarker: ComponentSetNode,
  markerPosition: string,
  type = "spacing"
) {
  const page = figma.currentPage;

  const spacingSet = type === "size" ? sizeMarker : spacingMarker;

  const spacing = spacingSet.findOne(
    (node: SceneNode): node is ComponentNode =>
      node !== null && node.name === `position=${markerPosition}`
  );

  if (!spacing || spacing.type !== "COMPONENT") return;

  const spacingInstance = spacing.createInstance();
  page.appendChild(spacingInstance);
  return spacingInstance;
}
