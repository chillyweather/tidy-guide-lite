import { h } from "preact";
import { useAtom } from "jotai";
import { showCrashLogoutPopupAtom } from "src/state/atoms";
import { emit } from "@create-figma-plugin/utilities";

function CrashLogoutPopup() {
  const [showCrashLogoutPopup] = useAtom(showCrashLogoutPopupAtom);

  if (!showCrashLogoutPopup) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"}>
      <div className={"feedbackPopup"} onClick={(e) => e.stopPropagation()}>
        <h2 className={"dialogTitle"}>Oops! Looks like our beta misbehaved.</h2>
        <p style={{ textWrap: "wrap" }}>
          While we're busy teaching it some manners, could you do us a favor and
          close, then reopen the plugin window?
        </p>
        <p style={{ textWrap: "wrap" }}>
          Thanks a bunch for your patience and understanding.
        </p>
        <div className="popupButtons">
          <button
            className={"button primary"}
            id={"delete-button"}
            onClick={() => {
              emit("CLOSE");
            }}
          >
            Close plugin
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrashLogoutPopup;
