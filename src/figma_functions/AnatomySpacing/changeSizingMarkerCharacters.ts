export function changeSizingMarkerCharacters(
  node: InstanceNode,
  position = `${node.componentProperties.position.value}`
) {
  if (position === "left" || position === "right") {
    const textElement = node.children.find((node) => node.type === "TEXT");
    const size = Math.round(node.height);
    if (textElement && textElement.type === "TEXT") {
      {
        textElement.characters = `${size}`;
        const diff = 16 - textElement.width;
        const newWidth = node.width - diff;
        node.resize(newWidth, node.height);
      }
    }
  } else {
    const textElement = node.children.find((node) => node.type === "TEXT");
    const size = Math.round(node.width);
    if (textElement && textElement.type === "TEXT") {
      textElement.characters = `${size}`;
    }
  }
}
