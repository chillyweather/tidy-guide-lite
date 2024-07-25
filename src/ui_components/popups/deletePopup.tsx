/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { elementToDeleteAtom, showDeletePopupAtom } from "src/state/atoms";

import Spinner from "../../images/loader-spinner-white.png";
import { emit } from "@create-figma-plugin/utilities";

export default function DeletePopup() {
  const [, setShowDeletePopup] = useAtom(showDeletePopupAtom);
  const [elementToDelete] = useAtom(elementToDeleteAtom);
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
              emit("DELETE_DOCUMENTATION", elementToDelete);
              setShowDeletePopup(false);
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
