/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { TidyLogo } from "../images/TidyLogo";
import { useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import {
  currentCompanyAtom,
  currentDocumentationsAtom,
  currentPageAtom,
  currentUserIdAtom,
  currentUserNameAtom,
  currentUserRoleAtom,
  loggedInUserAtom,
  selectedCollectionAtom,
  tokenAtom,
} from "src/state/atoms";

const LoggedIn = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [, setCurrentUserId] = useAtom(currentUserIdAtom);
  const [, setCurrentCompany] = useAtom(currentCompanyAtom);
  const [, setCurrentUserName] = useAtom(currentUserNameAtom);
  const [, setCurrentUserRole] = useAtom(currentUserRoleAtom);
  const [, setCurrentDocumentations] = useAtom(currentDocumentationsAtom);
  const [, setSelectedCollection] = useAtom(selectedCollectionAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [loggedInUser, setLoggedInUser] = useAtom(loggedInUserAtom);

  function resetStates() {
    setCurrentUserId("");
    setCurrentCompany("");
    setCurrentUserName("");
    setCurrentUserRole("");
    setCurrentDocumentations(null);
    setSelectedCollection(null);
    setToken("");
    setLoggedInUser("");
  }

  useEffect(() => {
    setCurrentPage("logout");
  }, []);

  return (
    <div className="section login">
      <div className="navigation"></div>
      <TidyLogo />
      <h2>
        You're logged in as
        <br />
        <br />
        <strong>{loggedInUser}</strong>
      </h2>
      <div className={"loginFlex"}>
        <button
          onClick={() => {
            setToken("");
            resetStates();
            emit("LOGOUT");
          }}
        >
          Log out
        </button>
      </div>
      <footer>
        By signing in you accept our <br />
        <a href={"#"}>Privacy policy</a> and <a href={"#"}>Terms of service</a>
      </footer>
    </div>
  );
};

export default LoggedIn;
