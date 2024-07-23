/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTagInstance } from "./tagBuilgingFunctions";

export function buildTagElements(
  tagComp: ComponentSetNode | ComponentNode | undefined,
  frame: any,
  elementX: number,
  elementY: number,
  elementWidth: number,
  elementHeight: number,
  distances: any
): InstanceNode {
  const distanceData = Object.entries(distances);
  const minDistance = distanceData.sort((a: any, b: any) => a[1] - b[1])[0];
  const direction = minDistance[0];

  const tag = getTagInstance(direction, tagComp);
  figma.currentPage.appendChild(tag);
  placeTags(
    direction,
    frame,
    tag,
    elementX,
    elementY,
    elementWidth,
    elementHeight
  );
  return tag;
}

function placeTags(
  tagDirection: any,
  frame: any,
  tag: any,
  elementX: number,
  elementY: number,
  elementWidth: number,
  elementHeight: number
) {
  const midX = elementX + elementWidth / 2;
  const midY = elementY + elementHeight / 2;
  const tagDistanceFromObject = 2;
  const frameLeftX = frame.absoluteBoundingBox.x;
  const frameRightX = frameLeftX + frame.width;
  const frameTopY = frame.absoluteBoundingBox.y;
  const frameBottomY = frameTopY + frame.height;

  if (tagDirection === "top") {
    const tagHeight = Math.abs(elementY - frameTopY) + 64;
    tag.resize(24, tagHeight);
    tag.y = elementY - tagHeight - tagDistanceFromObject;
    tag.x = midX - tag.width / 2;
  }
  if (tagDirection === "right") {
    const tagWidth = Math.abs(frameRightX - (elementX + elementWidth)) + 64;
    tag.resize(tagWidth, 24);
    tag.y = midY - 12;
    tag.x = elementX + elementWidth + tagDistanceFromObject;
  }
  if (tagDirection === "bottom") {
    const tagHeight = Math.abs(frameBottomY - (elementY + elementHeight)) + 64;
    tag.resize(24, tagHeight);
    tag.y = elementY + elementHeight + tagDistanceFromObject;
    tag.x = midX - tag.width / 2;
  }
  if (tagDirection === "left") {
    const tagWidth = Math.abs(elementX - frameLeftX) + 64;
    tag.resize(tagWidth, 24);
    tag.y = midY - 12;
    tag.x = elementX - tagWidth - tagDistanceFromObject;
  }
}
