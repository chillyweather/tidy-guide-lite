/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconX } from "@tabler/icons-react";

import { useAtom } from "jotai";
import {
  showDeleteSectionPopupAtom,
  sectionToDeleteIndexAtom,
  selectedSectionsAtom,
} from "src/state/atoms";
import Spinner from "../../images/loader-spinner-white.png";
import { deleteSection } from "../ui_functions/cardActions";

function DeleteSectionPopup() {
  const [, setSelectedSections] = useAtom(selectedSectionsAtom);
  const [sectionToDeleteIndex] = useAtom(sectionToDeleteIndexAtom);
  const [, setShowDeleteSectionPopup] = useAtom(showDeleteSectionPopupAtom);

  const handleDeleteSection = async () => {
    deleteSection(sectionToDeleteIndex, setSelectedSections);
  };

  return (
    <div
      className={"feedbackPopupBackground"}
      id={"deletePopup"}
      onClick={() => setShowDeleteSectionPopup(false)}
      tabIndex={0}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowDeleteSectionPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Delete element</h2>
        <p>
          Are you sure you want to delete this element?
          <br />
          This action will only take effect after Publish.
        </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            id={"cancel-button"}
            onClick={() => {
              setShowDeleteSectionPopup(false);
            }}
          >
            <img
              src=""
              style={{ display: "none" }}
              onError={(event) => {
                (event.target as HTMLElement)?.parentElement?.focus();
              }}
            />
            Cancel
          </button>
          <button
            className={"button primary"}
            id={"delete-button"}
            onClick={async () => {
              handleDeleteSection();
              setShowDeleteSectionPopup(false);
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

export default DeleteSectionPopup;
