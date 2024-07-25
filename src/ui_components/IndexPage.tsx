/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // _loneElement,
  h,
} from "preact";
import { IconTrash } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import { useEffect } from "preact/hooks";

import { useAtom } from "jotai";
import {
  currentPageAtom,
  dataForUpdateAtom,
  elementToDeleteAtom,
  isDetailsPageOpenAtom,
  isViewModeOpenAtom,
  selectedMasterIdAtom,
  showContentFromServerAtom,
  showDeletePopupAtom,
  showIndexPageAtom,
  isFromSavedDataAtom,
} from "src/state/atoms";

const IndexPage = () => {
  const [, setIsFromSavedData] = useAtom(isFromSavedDataAtom);
  const [, setIsContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [, setIsIndexOpen] = useAtom(showIndexPageAtom);
  const [, setSelectedMasterId] = useAtom(selectedMasterIdAtom);
  const [, setShowDeletePopup] = useAtom(showDeletePopupAtom);
  const [, setElementToDelete] = useAtom(elementToDeleteAtom);
  const [dataForUpdate]: any = useAtom(dataForUpdateAtom);
  const [isViewModeOpen] = useAtom(isViewModeOpenAtom);
  const [, setIsDetailsPageOpen] = useAtom(isDetailsPageOpenAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  if (Object.keys(dataForUpdate).length === 0) return <div>{!!"no data"}</div>;

  const sortedData = dataForUpdate.sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );

  useEffect(() => {
    setCurrentPage("index");
    setIsIndexOpen(true);
  }, []);

  return (
    <div className={"componentBTN-wrapper"}>
      {sortedData.map((element: any) => {
        const title = element.title;
        const wip = element.inProgress;
        const draft = element.draft;
        if (draft === true && isViewModeOpen === true) {
          return null;
        }

        return (
          <div className={"componentBTN"}>
            <div
              className={
                draft
                  ? "inner-componentBTN draftComponent"
                  : "inner-componentBTN"
              }
              onClick={(e) => {
                setIsDetailsPageOpen(true);
                setCurrentPage("details");
                if (e.metaKey || e.ctrlKey) {
                  emit(
                    "GET_NEW_SELECTION",
                    element.componentKey,
                    element.nodeId
                  );
                } else {
                  emit(
                    "GET_NEW_SELECTION",
                    element.componentKey,
                    element.nodeId
                  );
                  setSelectedMasterId(element.nodeId);
                  setIsFromSavedData(true);
                  setIsIndexOpen(false);
                  setIsContenFromServerOpen(true);
                }
              }}
            >
              <div className="inner-div">{title}</div>
              {wip && <div className={"wip"}>WIP</div>}
            </div>
            {!isViewModeOpen && (
              <button
                className={
                  "cardAuxButton noPredefined redButton tooltipButton trashButton"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeletePopup(true);
                  setElementToDelete(element.nodeId);
                  setTimeout(function () {
                    document.getElementById("cancel-button")?.focus();
                  }, 300);
                }}
              >
                <IconTrash className={"trashIcon"} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;
