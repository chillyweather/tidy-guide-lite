import { h } from "preact";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
  scrollListPrev,
  scrollListNext,
} from "../auxiliaryFunctions/listNavigationFunctions";
import { chunkArray } from "../auxiliaryFunctions/chunkArray";

export const List = ({
  element,
  buildLists,
  index,
}: {
  element: any;
  buildLists: any;
  index: number;
}) => {
  const newListArray = chunkArray(element.content.inputs, 5);
  return (
    <div className={"section listSection"}>
      <div className={"anchorLink"} id={element.title + index}></div>
      {element.title && (
        <div className={"title-row"}>
          <h3 className={"title"}>{element.title}</h3>
          <a href={"#top"} className={"back-link"}>
            ⬆︎
          </a>
        </div>
      )}
      <div className="listWrapper">
        {newListArray.length &&
          newListArray.map((list: any, i: number) => {
            return (
              <div className="listContainer">
                <div className="list" id={element.title + i}>
                  {buildLists(list)}
                </div>
              </div>
            );
          })}
      </div>
      {newListArray.length > 1 && (
        <ol className={"pagination"}>
          <button
            className={"btnPrev disabled"}
            onClick={() => {
              scrollListPrev(event);
            }}
          >
            <IconArrowLeft />
          </button>
          <div className={"currentPage"}>1</div>/
          <div className={"totalPages"}>
            {Math.ceil(element.content.inputs.length / 5)}
          </div>
          <button
            className={"btnNext"}
            onClick={() => {
              scrollListNext(event);
            }}
          >
            <IconArrowRight />
          </button>
        </ol>
      )}
    </div>
  );
};
