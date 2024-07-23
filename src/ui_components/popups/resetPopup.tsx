import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { isResetAtom, showResetPopupAtom } from "../../state/atoms";

function ResetPopup() {
  const [, setIsReset] = useAtom(isResetAtom);
  const [showResetPopup, setShowResetPopup] = useAtom(showResetPopupAtom);
  if (!showResetPopup) {
    return null;
  }

  return (
    <div
      className={"feedbackPopupBackground"}
      onClick={() => setShowResetPopup(false)}
      tabIndex={0}
    >
      <div
        className={"feedbackPopup resetPopup"}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={"closePopupButton"}
          onClick={() => setShowResetPopup(false)}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>Reset all Elements</h2>
        <p>This will reset all selected elements. </p>
        <div className="popupButtons footer">
          <button
            className={"button"}
            onClick={() => {
              setShowResetPopup(false);
            }}
          >
            Cancel
          </button>
          <button
            className={"button primary"}
            onClick={() => {
              setIsReset(true);
              setShowResetPopup(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPopup;
