import recurciveSearch from "../recurciveSearch";

export function getAnatomyElements(element: InstanceNode | FrameNode) {
  const anatomyElements: FrameNode[] | InstanceNode[] = [];
  recurciveSearch(element, anatomyElements);
  const result = anatomyElements.filter(
    (item: any, index: number, self: any) =>
      self.findIndex((t: any) => t.name === item.name) === index &&
      (item.layoutMode === "HORIZONTAL" || item.layoutMode === "VERTICAL")
  );

  return result;
}
