/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//!--------BUILD----------//
/**
 * Creates a new auto-layout frame with the specified properties.
 * @param name - The name of the frame.
 * @param direction - The layout direction of the frame. Can be "NONE", "HORIZONTAL", or "VERTICAL".
 * @param paddingHorizontal - The horizontal padding of the frame. Defaults to 20.
 * @param paddingVertical - The vertical padding of the frame. Defaults to 20.
 * @param itemSpacing - The spacing between items in the frame. Defaults to 10.
 * @returns The newly created auto-layout frame.
 */
export function buildAutoLayoutFrame(
  name: string,
  direction: "NONE" | "HORIZONTAL" | "VERTICAL",
  paddingHorizontal = 20,
  paddingVertical = 20,
  itemSpacing = 10
): FrameNode {
  const frame = figma.createFrame();
  frame.layoutMode = direction;
  frame.paddingBottom = paddingVertical;
  frame.paddingLeft = paddingHorizontal;
  frame.paddingRight = paddingHorizontal;
  frame.paddingTop = paddingVertical;
  frame.itemSpacing = itemSpacing;
  frame.counterAxisSizingMode = "AUTO";
  frame.name = name;
  return frame;
}

//!--------FIND----------//
/**
 * Finds the master component of a given node.
 * If the node is a component set, returns the component set.
 * If the node is a component, returns the component's parent if it is a component set, otherwise returns the component itself.
 * @param node - The node to find the master component of.
 * @returns The master component of the given node.
 */
export async function findMasterComponent(node: InstanceNode) {
  const immediateMaster = await node.getMainComponentAsync();
  const masterParent = immediateMaster?.parent;
  const trueMaster =
    masterParent?.type === "COMPONENT_SET" ? masterParent : immediateMaster;
  return trueMaster;
}

/**
 * Finds all boolean properties in a given frame's master component.
 * @param node - The frame to search for boolean properties.
 * @returns An object containing all found boolean properties and their definitions.
 */
export async function findAllBooleanProps(node: InstanceNode) {
  const masterFrame = await findMasterComponent(node);
  const frameProps = masterFrame?.componentPropertyDefinitions;
  const foundProps: any = {};

  for (const prop in frameProps) {
    if (frameProps[prop].type === "BOOLEAN") {
      foundProps[prop] = frameProps[prop];
    }
  }
  return foundProps;
}

/**
 * Finds all variant properties of a given component node by searching for its master component and returning its component property definitions that have a type of "VARIANT".
 * @param node - The component node to search for variant properties.
 * @returns An object containing the found variant properties, with the property names as keys and the property definitions as values.
 */
export async function findAllVariantProps(node: InstanceNode) {
  const masterFrame = await findMasterComponent(node);
  const frameProps = masterFrame?.componentPropertyDefinitions;
  const foundProps: any = {};

  for (const prop in frameProps) {
    if (frameProps[prop].type === "VARIANT") {
      foundProps[prop] = frameProps[prop];
    }
  }
  return foundProps;
}

/**
 * Returns the default variant of a component or component set, or the node itself if it's an instance.
 * @param node - The node to get the default element for.
 * @returns The default variant of a component or component set, or the node itself if it's an instance. Returns null if the node is not a component, component set, or instance.
 */
export async function getDefaultElement(node: SceneNode) {
  if (node.type === "INSTANCE") {
    return await getDefaultVariant(node);
  } else if (node.type === "COMPONENT") {
    if (node.parent && node.parent?.type === "COMPONENT_SET") {
      return node.parent.defaultVariant;
    } else return node;
  } else if (node.type === "COMPONENT_SET") {
    return node.defaultVariant;
  } else {
    // figma.closePlugin(
    //   "Please, select Component, Component Set or Instance node"
    // );
    return null;
  }
}

export async function getDefaultVariant(node: InstanceNode) {
  const mainComponent = await node.getMainComponentAsync();
  if (mainComponent?.parent?.type === "COMPONENT_SET") {
    const defaultVariant = mainComponent.parent.defaultVariant;
    return defaultVariant;
  }
  return mainComponent;
}

/**
 * Returns the size options for a given Figma node by searching for a master component and checking its properties.
 * @param node - The Figma node to get the size options for.
 * @returns An array of size options, or null if no size options were found.
 */
export async function getElementSizes(node: InstanceNode) {
  const masterComponent = await findMasterComponent(node);
  if (masterComponent) {
    if (masterComponent.componentPropertyDefinitions.size)
      return masterComponent.componentPropertyDefinitions.size.variantOptions;
    if (masterComponent.componentPropertyDefinitions.Size) {
      return masterComponent.componentPropertyDefinitions.Size.variantOptions;
    }
  }
  return null;
}

//!--------SET----------//
/**
 * Sets the value of a variant property on a given node.
 * @param node - The node to set the property on.
 * @param name - The name of the property to set.
 * @param value - The value to set the property to.
 */
export function setVariantProps(
  node: InstanceNode,
  name: string,
  value: string
) {
  const propList = node.componentProperties;
  for (const property in propList) {
    if (property.includes(`${name}`) && propList[property].type === "VARIANT") {
      try {
        const newProps = {};
        //@ts-ignore
        newProps[property] = value;
        node.setProperties(newProps);
      } catch (error) {
        // node.opacity = 0;
        console.log(
          `error :>> node with property ${property} and value ${value} doesn't exist on node ${node}`
        );
      }
    }
  }
}

/**
 * Sets a boolean property on an instance node.
 * @param element - The instance node to set the property on.
 * @param name - The name of the property to set.
 * @param value - The value to set the property to.
 */
export function setBooleanProps(
  element: InstanceNode,
  name: string,
  value: boolean
) {
  const propList = element.componentProperties;
  for (const property in propList) {
    if (property.includes(`${name}`)) {
      try {
        const newProps: any = {};
        newProps[property] = value;
        element.setProperties(newProps);
      } catch (error) {
        console.log(
          `error :>> node with property ${property} and value ${value} doesn't exist on node ${element}`
        );
      }
    }
  }
}

/**
 * Sets the text of a text node.
 * @param element - The text node to set the text on.
 * @param name - The name of the property to set.
 * @param value - The value to set the property to.
 */
export function setTextProps(
  element: InstanceNode,
  name: string,
  value: string
) {
  const propList = element.componentProperties;

  for (const property in propList) {
    if (property.startsWith(`${name}`)) {
      const newProps: any = {};
      newProps[property] = `${value}`;
      element.setProperties(newProps);
    }
  }
}

export function turnAllBooleansOn(
  element: InstanceNode,
  booleanProperties: any
) {
  for (const property in booleanProperties) {
    setBooleanProps(element, property, true);
  }
}

export function turnAllBooleansOff(
  element: InstanceNode,
  booleanProperties: any
) {
  for (const property in booleanProperties) {
    setBooleanProps(element, property, false);
  }
}

//!color styles
//& convert hex to rgb
export function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const colors = {
    r: r,
    g: g,
    b: b,
  };
  return colors;
}

//& color style creation
export function createPaintStyle(name: string, hex: string) {
  const baseStyle = figma.createPaintStyle();
  baseStyle.name = name;
  const paint: Paint = {
    type: "SOLID",
    color: hexToRGB(hex),
  };
  baseStyle.paints = [paint];
  return baseStyle;
}

//& check if new styles already were created earlier
// function ifStyleExists(name: string) {
//   const styles = figma.getLocalPaintStyles();
//   return styles.some((style) => style.name === name);
// }

//& find by name and return local style
export async function getLocalColorStyle(name: string) {
  const styles = await figma.getLocalPaintStylesAsync();
  const newStyle = styles.find((style) => style.name === name);
  return newStyle;
}

export async function setColorStyle(name: string, hex: string) {
  const existingStyle = await getLocalColorStyle(name);
  if (existingStyle) {
    return existingStyle;
  } else {
    const newStyle = createPaintStyle(name, hex);
    return newStyle;
  }
}

export function setTextContent(
  element: InstanceNode,
  layerName: string,
  text: string
) {
  try {
    const textNode = element.findOne((node) => node.name === layerName);
    if (!textNode)
      throw new Error(
        `Text node with name ${layerName} doesn't exist on node ${element.name}`
      );
    if (textNode && textNode.type === "TEXT") {
      textNode.characters = text;
    }
  } catch (error) {
    console.log("error", error);
  }
}

/*
 * Finds the master page of a given node.
 * @param node - The node to find the master page of.
 * @returns The master page of the given node, or null if no master page was found.
 */
export function findMasterPage(node: any): PageNode | null {
  if (node.type === "PAGE") {
    return node;
  } else {
    if (node.parent) {
      const newNode = node.parent;
      return findMasterPage(newNode);
    } else {
      return null;
    }
  }
}

/*
 * Finds the documentation frame of a given node.
 * @param node - The node to find the documentation frame of.
 * @returns The documentation frame of the given node, or null if no documentation frame was found.
 */
export async function findDocFrame(node: InstanceNode) {
  const master = await node.getMainComponentAsync();
  if (master) {
    const masterPage = findMasterPage(master);
    if (masterPage) {
      const docFrame = masterPage.children.find((node) =>
        /(\.)?documentation/i.test(node.name)
      );
      return docFrame;
    } else {
      return null;
    }
  }
}

/*
 * Clones a frame node or instance node and appends it to the current page.
 * If the cloned node is an instance, it will be detached before appending.
 * The position of the cloned node will be set to match the original node.
 *
 * @param frame - The frame node or instance node to clone.
 * @returns The cloned frame node.
 */
export function cloneFrame(frame: FrameNode | InstanceNode) {
  let newFrame = frame.clone();
  if (newFrame.type === "INSTANCE") {
    newFrame = newFrame.detachInstance();
  }
  const parent = figma.currentPage;
  parent.appendChild(newFrame);
  if (frame.absoluteBoundingBox) {
    newFrame.x = frame.absoluteBoundingBox.x;
    newFrame.y = frame.absoluteBoundingBox.y;
  }

  return newFrame;
}

//!--------NEW----------//

/**
 * Retrieves the color of a TextNode.
 * @param {object} options - The options for retrieving the color.
 * @param {TextNode} options.node - The TextNode to retrieve the color from.
 * @returns {string | null} The color of the TextNode in hexadecimal format, or null if no color is found.
 */
export function getTextNodeColor({ node }: { node: TextNode }): string | null {
  //@ts-ignore
  const fills: ReadonlyArray<Paint> | figma.mixed = node.fills;

  if (fills.length === 0) {
    return null;
  } else {
    const fill = fills[0].color;
    const hexFill = rgbToHex({ r: fill.r, g: fill.g, b: fill.b });
    return hexFill;
  }
}

/**
 * Converts RGB values to a hexadecimal color code.
 * @param r - The red component of the RGB color (0-1).
 * @param g - The green component of the RGB color (0-1).
 * @param b - The blue component of the RGB color (0-1).
 * @returns The hexadecimal color code.
 */
export function rgbToHex({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}

/**
 * Creates a collapsible component from a given frame node.
 * @param frame - The frame node to create the collapsible component from.
 * @param hiddenInClosed - An array of strings representing the names of items to be hidden when the component is closed. Default is an empty array.
 * @param hiddenInOpen - An array of strings representing the names of items to be hidden when the component is open. Default is an empty array.
 */
export function makeCollapsibleComponent(
  frame: FrameNode,
  hiddenInClosed: string[] = [],
  hiddenInOpen: string[] = []
) {
  const open = frame.clone();
  open.name = "on";
  const closed = frame.clone();
  closed.name = "off";

  const foundHiddenInClosed = locateHiddenItems(
    closed,
    hiddenInClosed,
    hiddenInOpen
  );

  foundHiddenInClosed.foundHiddenInClosed.forEach((element) => {
    element.visible = false;
  });
  const foundHiddenInOpen = locateHiddenItems(
    open,
    hiddenInClosed,
    hiddenInOpen
  );

  foundHiddenInOpen.foundHiddenInOpen.forEach((element) => {
    element.visible = false;
  });

  const openComponent = figma.createComponentFromNode(open);
  const closedComponent = figma.createComponentFromNode(closed);

  const variants = [openComponent, closedComponent];
  variants.forEach((variant) => {
    figma.currentPage.appendChild(variant);
  });

  const variantComponentSet = figma.combineAsVariants(
    variants,
    figma.currentPage
  );

  variantComponentSet.editComponentProperty("Property 1", {
    name: "Show details",
  });
  return variantComponentSet;
}

function locateHiddenItems(
  frame: FrameNode,
  hiddenInClosed: string[],
  hiddenInOpen: string[]
) {
  const foundHiddenInClosed = frame.findAll((element: any) =>
    element.name.endsWith("~")
  );
  if (hiddenInClosed.length) {
    hiddenInClosed.forEach((element) => {
      const found = frame.findOne((node) => node.name === element);
      if (found) {
        foundHiddenInClosed.push(found);
      }
    });
  }
  const foundHiddenInOpen = frame.findAll((element: any) =>
    element.name.endsWith("^")
  );
  if (hiddenInOpen.length) {
    hiddenInOpen.forEach((element) => {
      const found = frame.findOne((node) => node.name === element);
      if (found) {
        foundHiddenInOpen.push(found);
      }
    });
  }
  return { foundHiddenInClosed, foundHiddenInOpen };
}

export function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
