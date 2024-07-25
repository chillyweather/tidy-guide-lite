/* eslint-disable @typescript-eslint/ban-ts-comment */
import { h } from "preact";
import { useAtom } from "jotai";
import {
  showSettingsContentAtom,
  isFirstTimeAtom,
  showLoginPageAtom,
  showSettingsPageAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showContentFromServerAtom,
} from "src/state/atoms";
import { IconSettings } from "@tabler/icons-react";

const UserMenu = () => {
  const [, setIsLoginPageOpen] = useAtom(showLoginPageAtom);
  const [, setIsIndexOpen] = useAtom(showIndexPageAtom);
  const [, setIsMainContentOpen] = useAtom(showMainContentAtom);
  const [, setIsContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [, setIsSettingsPageOpen] = useAtom(showSettingsPageAtom);
  const [, setIsFirstTime] = useAtom(isFirstTimeAtom);
  const [, setShowSettingsContent] = useAtom(showSettingsContentAtom);
  function closeMenu() {
    // @ts-ignore
    // document.getElementById("userMenu").open = false;
  }

  return (
    <div className={"user-menu"}>
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
        <p>Settings</p>
      </div>
    </div>
  );
};

export default UserMenu;
