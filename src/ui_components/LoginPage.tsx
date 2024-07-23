/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { useState, useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import {
  currentCompanyAtom,
  currentPageAtom,
  currentUserNameAtom,
  isLoginFailedAtom,
  loggedInUserAtom,
  showIndexPageAtom,
  showLoginPageAtom,
  showPasswordResetPopupAtom,
  showSettingsPageAtom,
  showSignupPageAtom,
  tokenAtom,
  userRankAtom,
} from "src/state/atoms";

import { TidyLogo } from "../images/TidyLogo";
import { IconMail, IconEye } from "@tabler/icons-react";
import { login } from "./ui_functions/authentication";
import { validateEmail } from "./ui_functions/validateEmail";
// import { getDocumentation } from "../auxiliaryFunctions/documentationHandlers";

const Login = () => {
  const [, setUserRank] = useAtom(userRankAtom);
  const [, setShowPasswordResetPopup] = useAtom(showPasswordResetPopupAtom);
  const [, setIsIndexPageOpen] = useAtom(showIndexPageAtom);
  const [, setIsSigninPageOpen] = useAtom(showSignupPageAtom);
  const [isLoginFailed, setIsLoginFailed] = useAtom(isLoginFailedAtom);
  const [, setIsSettingPageOpen] = useAtom(showSettingsPageAtom);
  const [, setIsLoginPageOpen] = useAtom(showLoginPageAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [, setCurrentCompany] = useAtom(currentCompanyAtom);
  const [, setCurrentUserName] = useAtom(currentUserNameAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [, setLoggedInUser] = useAtom(loggedInUserAtom);
  useEffect(() => {
    setCurrentPage("login");
    setIsIndexPageOpen(false);
  }, []);

  const handleEmailChange = (e: any) => {
    setIsLoginFailed(false);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setIsLoginFailed(false);
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const emailIsValid = validateEmail(email);
    setIsEmailValid(emailIsValid);

    const passwordIsValid = password.length >= 5;
    setIsPasswordValid(passwordIsValid);

    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    try {
      const response = await login(email, password);
      const token = response.token;
      if (token) {
        const rank = response.rank;
        const user = response.name;
        const company = response.company;
        const id = response._id;

        emit("SAVE_USER_LOGIN_DATA", token, email, rank, user, company, id);
        setToken(token);
        setLoggedInUser(email);
        setUserRank(rank);
        setCurrentCompany(response.company);
        setCurrentUserName(response.name);
        setIsLoginPageOpen(false);
        setIsSettingPageOpen(false);
        setIsIndexPageOpen(true);
      }
    } catch (error) {
      console.log("Login failed:", error);
      setIsLoginFailed(true);
    }
  };

  const invalidEmailClass = !isEmailValid ? "notFilled" : "";
  const invalidPasswordClass = !isPasswordValid ? "notFilled" : "";

  return (
    <form onSubmit={handleSubmit} className="section login">
      <div className="navigation"></div>
      <TidyLogo />
      <p
        className={"redPara"}
        dangerouslySetInnerHTML={{
          __html: isLoginFailed
            ? "<u>Wrong email or password, please, try again</u>"
            : "Please enter your credentials",
        }}
      ></p>
      <div className={isLoginFailed ? "inputDiv inputDiv-invalid" : "inputDiv"}>
        <input
          type="text"
          placeholder="Email"
          id="inputMail"
          required
          spellcheck={false}
          value={email}
          onChange={handleEmailChange}
          className={invalidEmailClass}
        />
        <IconMail
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-mail"
        />
        <div className="invalidText">Invalid email address</div>
      </div>
      <div className={isLoginFailed ? "inputDiv inputDiv-invalid" : "inputDiv"}>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          id="inputPass"
          required
          value={password}
          onChange={handlePasswordChange}
          className={invalidPasswordClass}
        />
        <IconEye
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-eye"
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
        <div className="invalidText">
          Password should be at least 5 symbols long
        </div>
      </div>
      <button type="submit">Login</button>
      <p style="margin-top: -1.25em;text-align: center; width: 100%;">
        Forgot your password? Click{" "}
        <a
          href={"#"}
          onClick={() => {
            setShowPasswordResetPopup(true);
          }}
        >
          here
        </a>
        .
      </p>
      <div className="flex-container">
        <p style="margin: 0;">Don't have an account?</p>
        <button
          className={"signup secondary"}
          onClick={() => {
            setIsLoginPageOpen(false);
            setIsSigninPageOpen(true);
          }}
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Login;
