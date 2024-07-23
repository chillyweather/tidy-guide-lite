/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconTrash, IconCopy } from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import { useEffect } from "preact/hooks";
import {
  getDocumentation,
  createDocumentation,
} from "./ui_functions/documentationHandlers";
import { useAtom } from "jotai";
import {
  currentPageAtom,
  dataForUpdateAtom,
  elementToDeleteAtom,
  isDetailsPageOpenAtom,
  isViewModeOpenAtom,
  selectedCollectionAtom,
  selectedMasterIdAtom,
  showContentFromServerAtom,
  showDeletePopupAtom,
  showIndexPageAtom,
  isFromSavedDataAtom,
  tokenAtom,
} from "src/state/atoms";
import { getCollectionDocs } from "./ui_functions/collectionHandlers";

const IndexPage = () => {
  const [, setIsFromSavedData] = useAtom(isFromSavedDataAtom);
  const [, setIsContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [, setIsIndexOpen] = useAtom(showIndexPageAtom);
  const [, setSelectedMasterId] = useAtom(selectedMasterIdAtom);
  const [token] = useAtom(tokenAtom);
  const [, setShowDeletePopup] = useAtom(showDeletePopupAtom);
  const [, setElementToDelete] = useAtom(elementToDeleteAtom);
  const [dataForUpdate, setDataForUpdate]: any = useAtom(dataForUpdateAtom);
  const [isViewModeOpen] = useAtom(isViewModeOpenAtom);
  const [selectedCollection]: any = useAtom(selectedCollectionAtom);
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
                  //
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
                  setSelectedMasterId(element._id);
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
                  "cardAuxButton noPredefined tooltipButton duplicateButton"
                }
                onClick={async () =>
                  await handleDocClone(
                    token,
                    element._id,
                    setDataForUpdate,
                    selectedCollection
                  )
                }
              >
                <IconCopy />
              </button>
            )}
            {!isViewModeOpen && (
              <button
                className={
                  "cardAuxButton noPredefined redButton tooltipButton trashButton"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeletePopup(true);
                  setElementToDelete(element._id);
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

async function handleDocClone(
  token: string,
  id: string,
  setData: (value: any) => void,
  selectedCollection: any
) {
  const docFromServer = await getDocumentation(token, id);

  delete docFromServer._id;
  docFromServer.title = docFromServer.title + " copy";
  docFromServer["collection"] = selectedCollection?._id;

  const clonedDoc = await createDocumentation(token, docFromServer);
  if (!clonedDoc._id) return;

  const newDocs = await getCollectionDocs(token, selectedCollection?._id);
  if (!newDocs) return;

  setData(newDocs);
}
