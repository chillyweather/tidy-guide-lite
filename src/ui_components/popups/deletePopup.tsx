/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import {
  dataForUpdateAtom,
  elementToDeleteAtom,
  showDeletePopupAtom,
  tokenAtom,
} from "src/state/atoms";

import { deleteDocumentation } from "../ui_functions/documentationHandlers";
import Spinner from "../../images/loader-spinner-white.png";
import { handleDeletePictures } from "../ui_functions/deleteHandlers";

function DeletePopup() {
  const [, setShowDeletePopup] = useAtom(showDeletePopupAtom);
  const [elementToDelete] = useAtom(elementToDeleteAtom);
  const [dataForUpdate, setDataForUpdate] = useAtom(dataForUpdateAtom);
  const [token] = useAtom(tokenAtom);
  return (
    <div
      className={"feedbackPopupBackground"}
      id={"deletePopup"}
      onClick={() => setShowDeletePopup(false)}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowDeletePopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Delete element</h2>
        <p>
          Are you sure you want to delete this element?
          <br />
          This action cannot be undone.{" "}
        </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            id={"cancel-button"}
            onClick={() => {
              setShowDeletePopup(false);
            }}
          >
            Cancel
          </button>
          <button
            className={"button primary"}
            id={"delete-button"}
            onClick={async () => {
              document
                .getElementById("delete-button")
                ?.classList.add("spinner");
              handleDelete(
                token,
                elementToDelete,
                setDataForUpdate,
                setShowDeletePopup,
                dataForUpdate
              );
            }}
          >
            <img src={Spinner} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

async function handleDelete(
  token: string | undefined,
  elementId: string,
  setDataForUpdate: (value: any) => void,
  setShowDeletePopup: (value: boolean) => void,
  dataForUpdate: any
) {
  const result = await deleteDocumentation(token!, elementId);

  if (result) {
    await handleDeletePictures(elementId, dataForUpdate);
    setDataForUpdate((prevData: any) => {
      const newData = prevData.filter((el: any) => el._id !== elementId);
      return newData;
    });
    setShowDeletePopup(false);
  } else {
    alert("Something went wrong, please try again later.");
  }
}

export default DeletePopup;
