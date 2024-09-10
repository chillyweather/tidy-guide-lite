export function findNodeByName(
  node: SceneNode,
  name: string
): SceneNode | null {
  if (node.name === name) {
    return node;
  }
  if (
    (node.type === "FRAME" || node.type === "INSTANCE") &&
    Array.isArray(node.children)
  ) {
    for (const child of node.children) {
      const found = findNodeByName(child, name);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
