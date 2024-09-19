/* eslint-disable @typescript-eslint/no-explicit-any */

export interface StrokeProps {
  strokeAlign: string;
  strokeWeight: number | number[];
  strokeColor: any;
  dashed: boolean;
}
export function getStrokeInfo(
  frame: any
  // tagComp: ComponentSetNode,
  // indexes: FrameNode,
  // isRem: boolean = false,
  // rootValue: number = 16,
  // unit: string = "px"
) {
  if (frame.strokes && frame.strokes.length > 0) {
    const strokeProps: StrokeProps = {
      strokeAlign: frame.strokeAlign,
      strokeWeight: 0,
      strokeColor: frame.strokes[0].color,
      dashed: frame.dashPattern.length ? true : false,
    };

    if (frame.strokeWeight === figma.mixed) {
      strokeProps.strokeWeight = [
        frame.strokeLeftWeight,
        frame.strokeRightWeight,
        frame.strokeTopWeight,
        frame.strokeBottomWeight,
      ];

      // for (const res in result) {
      //   if (result[res] > 0) {
      //     const foundTagComponent = tagComp.findOne(
      //       (node) => node.name === "type=info" && node.type === "COMPONENT"
      //     );
      //     if (!foundTagComponent || foundTagComponent.type !== "COMPONENT")
      //       return;
      //     const tag = foundTagComponent.createInstance();
      //     strokeWeight = result[res];
      //     setStrokeProps(
      //       tag,
      //       strokeWeight,
      //       strokeAlign,
      //       indexes,
      //       res,
      //       isRem,
      //       rootValue,
      //       unit
      //     );
      //   }
      // }
    } else {
      strokeProps.strokeWeight = frame.strokeWeight;
      // const foundTagComponent = tagComp.findOne(
      //   (node) => node.name === "type=info" && node.type === "COMPONENT"
      // );
      // if (!foundTagComponent || foundTagComponent.type !== "COMPONENT") return;
      // const tag = foundTagComponent.createInstance();
      // strokeWeight = frame.strokeWeight;
      // setStrokeProps(
      //   tag,
      //   strokeWeight,
      //   strokeAlign,
      //   indexes,
      //   "Stroke",
      //   isRem,
      //   rootValue,
      //   unit
      // );
    }
    return strokeProps;
  }
  return null;
}

// export function setStrokeProps(
//   tag: any,
//   strokeWeight: string,
//   strokeAlign: any,
//   indexes: FrameNode,
//   strokeKind: string,
//   isRem: boolean = false,
//   rootValue: number = 16,
//   unit: string = "px"
// ) {
//   isRem
//     ? setTextContent(
//         tag,
//         "Text",
//         `${strokeKind} - ${(parseFloat(strokeWeight) / rootValue).toFixed(
//           3
//         )}${unit}`
//       )
//     : setTextContent(
//         tag,
//         "Text",
//         `${strokeKind} - ${strokeWeight}px, ${toTitleCase(strokeAlign)}`
//       );
//
//   const indexLink = tag.findOne((element: any) => element.name === "link");
//   if (indexLink) indexLink.visible = false;
//   indexes.appendChild(tag);
// }
