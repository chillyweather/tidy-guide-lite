/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useState } from "preact/hooks";
import { useAtom } from "jotai";
import { showPasswordResetPopupAtom } from "src/state/atoms";
import { IconMail, IconX } from "@tabler/icons-react";
import feedbackLoader from "../../images/feedback.gif";
import {
  getPasswordResetToken,
  resetPassword,
} from "../ui_functions/authentication";
import { validateEmail } from "../ui_functions/validateEmail";

function PasswordResetPopup() {
  const [show, setShow] = useAtom(showPasswordResetPopupAtom);
  const [email, setEmail] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [align, setAlign] = useState("left");
  const [passwordResetToken, setPasswordResetToken] = useState("");
  const [popupTitle, setPopupTitle] = useState("Reset your password");
  const [popupText, setPopupText] = useState(
    "Enter the email address linked to your account. If it exists in our system, you'll be directed to the screen to create a new password shortly."
  );
  const [, setPopupSecondText] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [isNewPasswordSet, setIsNewPasswordSet] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPassword1Valid, setIsPassword1Valid] = useState(true);
  const [isPassword2Valid, setIsPassword2Valid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  if (!show) {
    return null;
  }

  const getTokenContent = () => {
    return (
      <div className="popup-content noFeedback">
        <div className={"inputDiv"} hidden={isHidden}>
          <input
            hidden={isHidden}
            className={"dialogInput"}
            type="email"
            placeholder={"Email address"}
            value={email}
            onInput={(e) => {
              if (e.target) {
                setIsEmailValid(true);
                setEmail((e.target as HTMLInputElement).value);
              }
            }}
          />
          <IconMail
            size={24}
            stroke={2}
            className="icon icon-tabler icon-tabler-mail"
          />
          {!isEmailValid && (
            <div className="invalid-text">Invalid email address</div>
          )}
        </div>
        <button
          hidden={isHidden}
          className={"button submitButton primary"}
          onClick={async () => {
            if (!validateEmail(email)) {
              setIsEmailValid(false);
              return;
            }
            const result = await getPasswordResetToken(email);
            const resetToken = result.passwordResetToken;
            if (resetToken) {
              setPasswordResetToken(resetToken);
              setPopupTitle("Enter your new password");
              setPopupText("Enter your new password");
              setPopupSecondText("Repeat password");
            } else {
              setPopupTitle("Something went wrong");
              setPopupText(
                "We couldn't find an account with that email address. Please try again."
              );
              setEmail("");
            }
          }}
        >
          Reset
        </button>
      </div>
    );
  };

  const setNewPasword = () => {
    return (
      <div className="popup-content">
        <label className={"dialogLabel"} hidden={isHidden}>
          <input
            hidden={isHidden}
            className={"dialogInput"}
            type="text"
            placeholder={"Password"}
            value={newPassword}
            minLength={5}
            onInput={(e) => {
              if (e.target) {
                setIsPassword1Valid(true);
                setNewPassword((e.target as HTMLInputElement).value);
              }
            }}
          />
          {!isPassword1Valid && (
            <div className="invalid-text">{errorMessage}</div>
          )}
        </label>
        <label
          className={"dialogLabel"}
          hidden={isHidden}
          style={{ marginTop: "8px" }}
        >
          <input
            hidden={isHidden}
            className={"dialogInput"}
            type="text"
            placeholder={"Repeat password"}
            value={repeatNewPassword}
            onInput={(e) => {
              if (e.target) {
                setIsPassword2Valid(true);
                setRepeatNewPassword((e.target as HTMLInputElement).value);
              }
            }}
          />
          {!isPassword2Valid && (
            <div className="invalid-text">{errorMessage}</div>
          )}
        </label>
        <button
          hidden={isHidden}
          className={"button submitButton primary"}
          onClick={async () => {
            try {
              if (newPassword.length < 5) {
                setErrorMessage("Password should be at least 5 symbols long");
                setIsPassword1Valid(false);
                return;
              }
              if (repeatNewPassword.length < 5) {
                setErrorMessage("Password should be at least 5 symbols long");
                setIsPassword2Valid(false);
                return;
              }
              if (
                newPassword.length > 5 &&
                repeatNewPassword.length > 5 &&
                newPassword !== repeatNewPassword
              ) {
                setErrorMessage("Passwords not match");
                setIsPassword1Valid(false);
                setIsPassword2Valid(false);
                return;
              }
              const result = await resetPassword(
                email,
                passwordResetToken,
                newPassword,
                repeatNewPassword
              );
              if (result) {
                setIsNewPasswordSet(true);
                setPasswordResetToken("");
                setPopupTitle("Password reset successful");
                setPopupText(
                  "Your password has been reset. Please, login with your new password."
                );
                setAlign("center");
                setIsHidden(true);
              } else {
                setPopupTitle("Something went wrong");
                setPopupText(
                  "We couldn't find an account with that email address. Please try again."
                );
                setEmail("");
              }
            } catch (error) {
              setPopupTitle("Something went wrong");
              setPopupText("Please, try again.");
            }
          }}
        >
          Submit
        </button>
      </div>
    );
  };

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
        {!passwordResetToken && !isNewPasswordSet && (
          <h2 className={"dialogTitle"}>{popupTitle}</h2>
        )}
        <p style={{ textWrap: "wrap", color: "#5C5C5C" }}>{popupText}</p>
        {passwordResetToken && !isNewPasswordSet
          ? setNewPasword()
          : getTokenContent()}
        <div className={"image-flex"}>
          <img src={feedbackLoader} hidden={!isHidden}></img>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetPopup;
