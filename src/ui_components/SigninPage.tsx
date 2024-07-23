/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { useState, useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import { TidyLogo } from "../images/TidyLogo";
import {
  IconMail,
  IconEye,
  IconBuildingCommunity,
  IconUser,
} from "@tabler/icons-react";
import { createNewAccount } from "./ui_functions/authentication";
import {
  currentPageAtom,
  isLoginFailedAtom,
  showLoginPageAtom,
  showIndexPageAtom,
  showSettingsPageAtom,
  showSignupPageAtom,
  tokenAtom,
} from "src/state/atoms";

const SignIn = () => {
  const [, setIsSigninPageOpen] = useAtom(showSignupPageAtom);
  const [, setIsIndexPageOpen] = useAtom(showIndexPageAtom);
  const [isLoginFailed, setIsLoginFailed] = useAtom(isLoginFailedAtom);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [rank] = useState("Admin");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatedPasswordVisible, setRepeatedPasswordVisible] = useState(false);
  const [, setToken] = useAtom(tokenAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [, setIsLoginPageOpen] = useAtom(showLoginPageAtom);
  const [, setIsSettingPageOpen] = useAtom(showSettingsPageAtom);

  //error visibility states
  const [isEmailErrorVisible, setIsEmailErrorVisible] = useState(false);
  const [isPasswordErrorVisible, setIsPasswordErrorVisible] = useState(false);
  const [isRepeatedPasswordErrorVisible, setIsRepeatedPasswordErrorVisible] =
    useState(false);
  const [isPasswordsMatchErrorVisible, setIsPasswordsMatchErrorVisible] =
    useState(false);

  useEffect(() => {
    setCurrentPage("signin");
    setIsIndexPageOpen(false);
  }, []);

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 5;
    const isRepeatedPasswordValid = repeatedPassword.length >= 5;
    const isPasswordsMatch = password === repeatedPassword;

    setIsEmailErrorVisible(!isEmailValid);
    setIsPasswordErrorVisible(!isPasswordValid);
    setIsRepeatedPasswordErrorVisible(!isRepeatedPasswordValid);
    if (isPasswordValid && isRepeatedPasswordValid) {
      setIsPasswordsMatchErrorVisible(!isPasswordsMatch);
    } else {
      setIsPasswordsMatchErrorVisible(false);
    }

    return (
      isEmailValid &&
      isPasswordValid &&
      isRepeatedPasswordValid &&
      isPasswordsMatch
    );
  };

  const handleChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setIsEmailErrorVisible(false);
  };

  const handleCompanyNameChange = (e: any) => {
    setCompanyName(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setIsPasswordErrorVisible(false);
    setIsPasswordsMatchErrorVisible(false);
  };

  const handleRepeatedPasswordChange = (e: any) => {
    setRepeatedPassword(e.target.value);
    setIsRepeatedPasswordErrorVisible(false);
    setIsPasswordsMatchErrorVisible(false);
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) return;
    try {
      const response = await createNewAccount(
        userName,
        email,
        password,
        companyName,
        rank
      );
      const token = response.token;
      const id = response._id;
      if (token) {
        emit(
          "SAVE_USER_LOGIN_DATA",
          token,
          email,
          rank,
          userName,
          companyName,
          id
        );
        setToken(token);
        setIsSigninPageOpen(false);
        setIsSettingPageOpen(false);
        setIsIndexPageOpen(true);
      }
    } catch (error) {
      setIsLoginFailed(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="section login">
      <div className="navigation"></div>
      <TidyLogo />
      <p
        className={"redPara"}
        dangerouslySetInnerHTML={{
          __html: isLoginFailed
            ? "<u>Something went wrong, please, try again</u>"
            : "Please enter your credentials",
        }}
      >
        {}
      </p>

      {/* //! user name */}
      <div className="inputDiv">
        <input
          type="text"
          placeholder="Name"
          id="inputUserName"
          required
          spellcheck={false}
          value={userName}
          onChange={handleChangeUserName}
        />
        <IconUser
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-usergroup"
        />
      </div>

      {/* //! company name */}
      <div className="inputDiv">
        <input
          type="text"
          placeholder="*Company name"
          id="inputCompany"
          required
          spellcheck={false}
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        <IconBuildingCommunity
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-usergroup"
        />
      </div>

      {/* //! email */}
      <div className="inputDiv">
        <input
          type="text"
          placeholder="Email"
          id="inputMail"
          required
          spellcheck={false}
          value={email}
          onChange={handleEmailChange}
        />
        <IconMail
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-mail"
        />
        {isEmailErrorVisible && (
          <div className="invalid-text">Invalid email address</div>
        )}
      </div>

      {/* //! password */}
      <div className="inputDiv">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          id="inputPass"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <IconEye
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-eye"
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
        {isPasswordErrorVisible && (
          <div className="invalid-text">
            Password should be at least 5 symbols long
          </div>
        )}
        {isPasswordsMatchErrorVisible && (
          <div className="invalid-text">Password don't match</div>
        )}
      </div>

      {/* //! repeated password */}
      <div className="inputDiv">
        <input
          type={repeatedPasswordVisible ? "text" : "password"}
          placeholder="Repeat password"
          id="inputRepeatPass"
          required
          value={repeatedPassword}
          onChange={handleRepeatedPasswordChange}
        />
        <IconEye
          size={24}
          stroke={2}
          className="icon icon-tabler icon-tabler-eye"
          onClick={() => setRepeatedPasswordVisible(!repeatedPasswordVisible)}
        />

        {isRepeatedPasswordErrorVisible && (
          <div className="invalid-text">
            Password should be at least 5 symbols long
          </div>
        )}
        {isPasswordsMatchErrorVisible && (
          <div className="invalid-text">Password don't match</div>
        )}
      </div>
      <button type="submit">Sign up</button>

      {/* //! already have an account */}
      <p>
        Already have an account? You can log in{" "}
        <a
          href={"#"}
          onClick={() => {
            setIsSigninPageOpen(false);
            setIsLoginPageOpen(true);
          }}
        >
          here
        </a>
        .
      </p>
    </form>
  );
};

export default SignIn;
