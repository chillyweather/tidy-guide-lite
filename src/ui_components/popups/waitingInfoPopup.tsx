import { h } from "preact";
import { IconX } from "@tabler/icons-react";
import { TidyLogo } from "./../../images/TidyLogo";

function WaitingInfoPopup({
  setShowWaitingInfoPopup,
}: {
  setShowWaitingInfoPopup: Function;
}) {
  return (
    <div
      className={"feedbackPopupBackground"}
      onClick={() => setShowWaitingInfoPopup(false)}
    >
      <div className={"feedbackPopup fullscreen"} onClick={(e) => e.stopPropagation()}>
        {/* <button
          className={"closePopupButton"}
          onClick={() => setShowWaitingInfoPopup(false)}
        >
          <IconX />
        </button> */}
        <TidyLogo />
        {/* <h2 className={"dialogTitle"}>Your account is set up!</h2> */}
        <p style={{ whiteSpace: "normal" }}>
          Thanks for joining Tidy Beta! 🚀<br />
          We'll review your details and notify you once approved.
          <br /><br />

          In the meantime, feel free to explore <a href={"https://tidy.guide/"} target={"_blank"}>Tidy Guide</a> for more information about what's coming next.
          <br /><br />

          For any questions please contact us at 
          <br /><a href={"mailto:support@tidy.guide"} target={"_blank"}>support@tidy.guide</a>.
        </p>
        <div className="popupButtons">
          {/* <button
            className={"button primary"}
            onClick={() => {
              setShowWaitingInfoPopup(false);
            }}
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default WaitingInfoPopup;
