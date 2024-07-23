/* eslint-disable @typescript-eslint/ban-ts-comment */
import { h } from "preact";
import { useAtom } from "jotai";
import {
  currentUserNameAtom,
  showSettingsContentAtom,
  loggedInUserAtom,
  isFirstTimeAtom,
  showLoginPageAtom,
  showSettingsPageAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showContentFromServerAtom,
  showFeedbackPopupAtom,
} from "src/state/atoms";
import {
  IconMessage2Check,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

const UserMenu = () => {
  const [, setIsLoginPageOpen] = useAtom(showLoginPageAtom);
  const [, setIsIndexOpen] = useAtom(showIndexPageAtom);
  const [, setIsMainContentOpen] = useAtom(showMainContentAtom);
  const [, setIsContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [, setIsSettingsPageOpen] = useAtom(showSettingsPageAtom);
  const [, setFeedbackPage] = useAtom(showFeedbackPopupAtom);
  const [, setIsFirstTime] = useAtom(isFirstTimeAtom);
  const [currentUserName] = useAtom(currentUserNameAtom);
  const [, setShowSettingsContent] = useAtom(showSettingsContentAtom);
  const [loggedInUser] = useAtom(loggedInUserAtom);
  function closeMenu() {
    // @ts-ignore
    document.getElementById("userMenu").open = false;
  }

  return (
    <div className={"user-menu"}>
      <div className="user-item">
        <div className="user-tag" first-letter={loggedInUser.slice(0, 1)}>
          {loggedInUser.slice(0, 1)}
        </div>
        <div className="flex-col">
          <div className="tag viewer"></div>
          <p className="user-name">{currentUserName}</p>
          <p className="user-mail">{loggedInUser}</p>
        </div>
      </div>

      <hr />

      <div
        className="user-item"
        onClick={() => {
          closeMenu();
          setFeedbackPage(true);
        }}
      >
        <IconMessage2Check />
        <p>Feedback</p>
      </div>

      <div
        className="user-item"
        onClick={() => {
          closeMenu();
          setIsLoginPageOpen(false);
          setIsIndexOpen(false);
          setIsMainContentOpen(false);
          setIsContenFromServerOpen(false);
          setIsSettingsPageOpen(true);
          setShowSettingsContent(true);
          setIsFirstTime(false);
        }}
      >
        <IconSettings />
        <p>Settings & Members</p>
      </div>

      <hr />

      <div
        className="user-item"
        onClick={() => {
          closeMenu();
          setIsIndexOpen(false);
          setIsMainContentOpen(false);
          setIsContenFromServerOpen(false);
          setIsSettingsPageOpen(false);
          setIsLoginPageOpen(true);
          setIsFirstTime(false);
        }}
      >
        <IconLogout />
        <p>Log-out</p>
      </div>
    </div>
  );
};

export default UserMenu;
