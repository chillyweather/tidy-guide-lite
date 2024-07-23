function researchNodes(
  frame: InstanceNode | FrameNode | ComponentNode,
  arrX: [number[]],
  arrY: [number[]],
  isShallow?: boolean
) {
  if (frame && frame.children) {
    frame.children.forEach((node) => {
      if (
        !(
          node.type === "INSTANCE" ||
          node.type === "FRAME" ||
          node.type === "TEXT"
        )
      )
        return;
      if (node.visible === true) {
        if (
          // !node.children ||
          node.type === "TEXT" ||
          node.children.length === 0 ||
          node.type === "INSTANCE" ||
          node.layoutMode !== frame.layoutMode ||
          (isShallow && node.type === "FRAME")
        ) {
          getCoordinates(node, arrX, arrY);
        } else {
          researchNodes(node, arrX, arrY);
        }
      }
    });
  }
}

export { researchNodes };

function getCoordinates(node: any, arrX: [number[]], arrY: [number[]]) {
  if (
    node.absoluteBoundingBox &&
    node.absoluteBoundingBox.width > 0.01 &&
    node.absoluteBoundingBox.height > 0.01
  ) {
    arrX.push([
      node.absoluteBoundingBox.x,
      node.absoluteBoundingBox.x + node.absoluteBoundingBox.width,
      node.absoluteBoundingBox.width,
    ]);
    arrY.push([
      node.absoluteBoundingBox.y,
      node.absoluteBoundingBox.y + node.absoluteBoundingBox.height,
      node.absoluteBoundingBox.height,
    ]);
  }
}
