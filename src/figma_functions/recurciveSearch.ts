export default function recurciveAnatomySearch(
  element: InstanceNode | FrameNode,
  arr: SceneNode[] = []
) {
  element.children.forEach((node) => {
    if (
      (node.type === "FRAME" &&
        (node.layoutMode === "HORIZONTAL" || node.layoutMode === "VERTICAL")) ||
      (node.type === "INSTANCE" &&
        !node.name.toLowerCase().includes("min") &&
        !node.name.toLowerCase().includes("size"))
    ) {
      if (!node.children) {
        arr.push(node);
      } else {
        arr.push(node);
        return recurciveAnatomySearch(node, arr);
      }
    }
  });

  return arr;
}
