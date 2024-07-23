import { findMasterComponent } from "./utilityFunctions";
export async function getNode(id: string, key: string) {
  try {
    const node = await figma.getNodeByIdAsync(id);
    if (node && node.type === "COMPONENT_SET") return node;
    else if (node && node.type === "COMPONENT") {
      if (node.parent && node.parent.type === "COMPONENT_SET") {
        return node.parent;
      } else {
        return node;
      }
    } else if (node && node.type === "INSTANCE") {
      const masterComponent = await findMasterComponent(node);
      return masterComponent;
    }
  } catch (error) {
    console.log("error", error);
  }

  try {
    const importedComponentSet = await figma.importComponentSetByKeyAsync(key);
    return importedComponentSet;
  } catch (error) {
    console.log("error", error);
  }

  try {
    const importedComponent = await figma.importComponentByKeyAsync(key);
    return importedComponent;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}
