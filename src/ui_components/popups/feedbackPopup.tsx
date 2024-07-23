/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useState } from "preact/hooks";
import { useAtom } from "jotai";
import { showFeedbackPopupAtom, currentFigmaUserAtom } from "src/state/atoms";
import { sendFeedback } from "../ui_functions/sendFeedback";
import { IconX } from "@tabler/icons-react";
import feedbackLoader from "../../images/feedback.gif";

function FeedbackPopup() {
  const [user]: any = useAtom(currentFigmaUserAtom);
  const [show, setShow] = useAtom(showFeedbackPopupAtom);
  const [title, setTitle] = useState("");
  const [titleText, setTitleText] = useState("Give feedback");
  const [bodyText, setBodyText] = useState(
    "Your feedback is invaluable to us! \nPlease take a moment to let us know how \nwe can enhance your experience with our app."
  );
  const [, setActionText] = useState("Please leave your feedback below");
  const [isHidden, setIsHidden] = useState(false);
  const [align, setAlign] = useState("left");
  const [body, setBody] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  if (!show) {
    return null;
  }

  return (
    <div className={"feedbackPopupBackground"} onClick={() => setShow(false)}>
      <div
        className={"feedbackPopup"}
        onClick={(e) => e.stopPropagation()}
        style={{ textAlign: align }}
      >
        <button
          className={"closePopupButton"}
          onClick={() => {
            setShow(false);
          }}
        >
          <IconX />
        </button>
        <h2 className={"dialogTitle"}>{titleText}</h2>
        <p style={{ marginTop: "12px" }}>{bodyText}</p>
        {/* <div className={"divider"} hidden={isHidden}></div>
        <p>{actionText}</p> */}
        <label className={"dialogLabel dialogFlex"} hidden={isHidden}>
          <input
            hidden={isHidden}
            className={"dialogInput"}
            id={"feedback-title"}
            type="text"
            placeholder={"Type title..."}
            value={title}
            //@ts-ignore
            onInput={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={"dialogLabel dialogFlex"} hidden={isHidden}>
          <textarea
            hidden={isHidden}
            className={"dialogTextarea"}
            value={body}
            maxLength={1500}
            placeholder={"Type text..."}
            onInput={(e) => {
              //@ts-ignore
              setBody(e.target.value);
              setFeedbackText(e.currentTarget.value);
            }}
          />
          <div className="textSymbolsCounterRow" hidden={isHidden}>
            <div className="textSymbolsCounter">{feedbackText.length}/1500</div>
          </div>
        </label>
        <button
          hidden={isHidden}
          className={"button submitButton primary"}
          onClick={async () => {
            await sendFeedback(title, `${body} \n ----- \n ${user.name}`);
            setTitleText("Thanks for your feedback");
            setBodyText("Your feedback means a lot to us");
            setActionText("");
            setAlign("center");
            setIsHidden(true);
          }}
        >
          Submit
        </button>
        <div className={"image-flex"}>
          <img src={feedbackLoader} hidden={!isHidden}></img>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPopup;
