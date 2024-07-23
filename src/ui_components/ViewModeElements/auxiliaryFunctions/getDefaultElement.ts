export function getDefaultElement(node: SceneNode) {
  if (node.type === "INSTANCE") {
    return getDefaultVariant(node);
  } else if (node.type === "COMPONENT") {
    if (node.parent && node.parent?.type === "COMPONENT_SET") {
      return node.parent.defaultVariant;
    } else return node;
  } else if (node.type === "COMPONENT_SET") {
    return node.defaultVariant;
  }
}

export function getDefaultVariant(node: InstanceNode) {
  const mainComponent = node.mainComponent;
  if (mainComponent?.parent?.type === "COMPONENT_SET") {
    const defaultVariant = mainComponent.parent.defaultVariant;
    return defaultVariant;
  }
  return mainComponent;
}
