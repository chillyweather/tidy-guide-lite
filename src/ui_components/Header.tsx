/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IconArrowLeft, IconPlus, IconPalette } from "@tabler/icons-react";
import { useAtom } from "jotai";
import {
  currentPageAtom,
  isFirstTimeAtom,
  isFromSavedDataAtom,
  isToBuildComponentPicAtom,
  selectedElementAtom,
  showContentFromServerAtom,
  showIndexPageAtom,
  showLoginPageAtom,
  showMainContentAtom,
  // showSettingsContentAtom,
  showSettingsPageAtom,
  showManageCanvasAppearanceAtom,
} from "src/state/atoms";
import BackButton from "./BackButton";

import { h } from "preact";
import HeaderActions from "./HeaderActions";
import { emit } from "@create-figma-plugin/utilities";

const Header = () => {
  const [isLoginPageOpen, setIsLoginPageOpen] = useAtom(showLoginPageAtom);
  const [, setIsToBuildComponentPic] = useAtom(isToBuildComponentPicAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [selectedElement] = useAtom(selectedElementAtom);
  const [isIndexOpen, setIsIndexOpen] = useAtom(showIndexPageAtom);
  const [isMainContentOpen, setIsMainContentOpen] =
    useAtom(showMainContentAtom);
  const [isContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [isSettingsPageOpen] = useAtom(showSettingsPageAtom);
  const [, setIsFromSavedData] = useAtom(isFromSavedDataAtom);

  const [, setIsContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [, setIsSettingsPageOpen] = useAtom(showSettingsPageAtom);
  const [, setIsFirstTime] = useAtom(isFirstTimeAtom);
  // const [, setShowSettingsContent] = useAtom(showSettingsContentAtom);
  const [, setShowManageCanvasAppearance] = useAtom(
    showManageCanvasAppearanceAtom
  );

  return (
    <div className="header">
      <div className="headerContent">
        {!isLoginPageOpen &&
          (isIndexOpen ? (
            <div className="componentHeader">
              <button
                id="new-button"
                className="flex-button add-button"
                onClick={() => {
                  setCurrentPage("new-documnent");
                  setIsIndexOpen(false);
                  setIsMainContentOpen(true);
                  setIsFromSavedData(false);
                  emit("GET_SELECTION");
                  setIsToBuildComponentPic(true);
                }}
              >
                <IconPlus />
                New Documentation
              </button>
            </div>
          ) : (
            <div className={"search-flex"}>
              <BackButton />
              <div></div>
            </div>
          ))}

        <button
          className="header-button back"
          onClick={() => {
            isLoginPageOpen && setIsLoginPageOpen(false);
          }}
        >
          <IconArrowLeft />
          Back
        </button>
        <div className={"side-flex"}>
          <button
            onClick={() => {
              setIsLoginPageOpen(false);
              setIsIndexOpen(false);
              setIsMainContentOpen(false);
              setIsContenFromServerOpen(false);
              setIsSettingsPageOpen(true);
              // setShowSettingsContent(false);
              setIsFirstTime(false);
              setShowManageCanvasAppearance(true);
              setCurrentPage("canvas-appearance");
            }}
          >
            <IconPalette />
          </button>
        </div>
      </div>
      {(selectedElement || isMainContentOpen || isContenFromServerOpen) &&
        !isIndexOpen &&
        !isLoginPageOpen &&
        !isSettingsPageOpen && <HeaderActions />}
    </div>
  );
};

export default Header;
