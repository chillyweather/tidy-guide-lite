import { getDefaultElement, getAllSiblings } from "./utilityFunctions";

export async function checkSelection() {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    // figma.notify("Please select an instance, component or component set");
    // return;
  } else if (selection.length > 1) {
    // figma.notify("Please select only one instance, component or component set");
    // return;
  } else {
    const node = selection[0];
    if (
      node.type !== "INSTANCE" &&
      node.type !== "COMPONENT" &&
      node.type !== "COMPONENT_SET"
    ) {
      // figma.notify("Please select an instance, component or component set");
      return;
    }

    const defaultNode = await getDefaultElement(node);
    if (!defaultNode) {
      // figma.notify("Please select an instance, component or component set");
      return;
    }

    const siblingsNames = await getAllSiblings(defaultNode);
    const defaultNodeName = defaultNode.name;

    const name =
      defaultNode &&
      defaultNode.parent &&
      defaultNode.parent.type === "COMPONENT_SET"
        ? defaultNode.parent.name
        : defaultNode.name;

    const key =
      defaultNode &&
      defaultNode.parent &&
      defaultNode.parent.type === "COMPONENT_SET"
        ? defaultNode.parent.key
        : defaultNode.key;

    return { defaultNode, name, key, siblingsNames, defaultNodeName };
  }
}
