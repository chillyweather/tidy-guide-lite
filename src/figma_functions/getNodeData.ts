/* eslint-disable @typescript-eslint/no-explicit-any */
export function getNodeData(node: SceneNode) {
  if (!(node.type === "COMPONENT" || node.type === "COMPONENT_SET")) return;

  if (node && "id" in node) {
    const clonedNode = node.clone();

    const nodeData: any = {};
    for (const key in clonedNode) {
      if (key in clonedNode) {
        nodeData[key as keyof (ComponentNode | ComponentSetNode)] =
          clonedNode[key as keyof (ComponentNode | ComponentSetNode)];
      }
    }
    console.log(nodeData);
  }
}
