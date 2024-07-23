import {
  computeMaximumBounds,
  getAbsolutePosition,
} from "@create-figma-plugin/utilities";

export function buildTopLevelLabels(
  elementsFrame: FrameNode,
  allLabels: any,
  node: InstanceNode
) {
  const bounds = computeMaximumBounds([elementsFrame, ...allLabels]);

  elementsFrame.children.forEach((childFrame) => {
    if (childFrame && childFrame.type === "FRAME") {
      const labelContent = elementsFrame.name
        .split("-")
        .slice(0, elementsFrame.name.split("-").length - 1);
      if (labelContent[0] === "" && labelContent.length === 1) return;

      const framePosition = getAbsolutePosition(childFrame);

      const label = figma.createText();
      label.fontSize = 12;
      figma.currentPage.appendChild(label);

      const result: string[] = [];

      const sampleElement = childFrame.findOne((element) => {
        return (
          element.type === "INSTANCE" &&
          element.name === node.name &&
          element.opacity === 1
        );
      });

      if (sampleElement && sampleElement.type === "INSTANCE") {
        const properties = sampleElement.componentProperties;
        labelContent.forEach((arrayElement) => {
          result.push(`${arrayElement}: ${properties[arrayElement].value}`);
        });
      }

      const labelText = result.join("\n");
      label.characters = labelText;

      label.y = framePosition.y;
      label.x = bounds[0].x - label.width - (352 - label.width);

      allLabels.push(label);
    }
  });
}
