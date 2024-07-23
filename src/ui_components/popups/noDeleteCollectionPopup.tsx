import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { showNonEmptyCollectionPopupAtom } from "src/state/atoms";

function NoDeleteCollectionPopup() {
  const [, setShowCancelPopup] = useAtom(showNonEmptyCollectionPopupAtom);
  return (
    <div
      className={"feedbackPopupBackground"}
      onClick={() => setShowCancelPopup(false)}
    >
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <button
          className={"closePopupButton"}
          onClick={() => setShowCancelPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Collection Contains Files</h2>
        <p style={{ textWrap: "wrap" }}>
          To delete this collection, please remove all documentation files
          within it first.
        </p>
        <div className="popupButtons">
          <button
            className={"button primary"}
            onClick={() => {
              setShowCancelPopup(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoDeleteCollectionPopup;
