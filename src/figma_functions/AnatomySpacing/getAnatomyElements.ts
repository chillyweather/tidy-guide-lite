import recurciveSearch from "../recurciveSearch";

type AnatomyElement = FrameNode | InstanceNode;

export function getAnatomyElements(element: InstanceNode | FrameNode) {
  const anatomyElements: AnatomyElement[] = [];
  recurciveSearch(element, anatomyElements);
  console.log("anatomyElements>>>>>>>>>>>>>>>>>>>>>>>", anatomyElements);
  const result = anatomyElements.filter(
    (item: AnatomyElement, index: number, self: AnatomyElement[]) =>
      self.findIndex((t: AnatomyElement) => t.name === item.name) === index &&
      "layoutMode" in item &&
      (item.layoutMode === "HORIZONTAL" || item.layoutMode === "VERTICAL")
  );

  return result;
}
