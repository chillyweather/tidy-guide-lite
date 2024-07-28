/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState, useEffect } from "preact/hooks";
import {
  isToBuildComponentPicAtom,
  currentPageAtom,
  selectedElementAtom,
  isDocJustOpenedAtom,
  documentationDataAtom,
  selectedSectionsAtom,
  isFromSavedDataAtom,
} from "src/state/atoms";
import {
  showSettingsContentAtom,
  isFirstTimeAtom,
  showLoginPageAtom,
  showSettingsPageAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showContentFromServerAtom,
} from "src/state/atoms";
import BackButton from "./BackButton";
import { IconSettings } from "@tabler/icons-react";

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
  const [isDocJustOpened, setIsDocJustOpened] = useAtom(isDocJustOpenedAtom);
  const [documentationData]: any = useAtom(documentationDataAtom);
  const [selectedSections] = useAtom(selectedSectionsAtom);
  const [, setIsFromSavedData] = useAtom(isFromSavedDataAtom);

  const [, setInitialSelectedSections] = useState(null);
  const [, setInitialDocumentationData] = useState(null);
  const [, setInitialSelectedSectionsLength] = useState(0);

  const [, setIsContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [, setIsSettingsPageOpen] = useAtom(showSettingsPageAtom);
  const [, setIsFirstTime] = useAtom(isFirstTimeAtom);
  const [, setShowSettingsContent] = useAtom(showSettingsContentAtom);
  function closeMenu() {
    // @ts-ignore
    // document.getElementById("userMenu").open = false;
  }

  useEffect(() => {
    if (documentationData && documentationData.title && isDocJustOpened) {
      setInitialDocumentationData(
        JSON.parse(JSON.stringify(documentationData))
      );
      setInitialSelectedSections(JSON.parse(JSON.stringify(selectedSections)));
      setInitialSelectedSectionsLength(selectedSections!.length || 0);
      setIsDocJustOpened(false);
    }
  }, [documentationData]);

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
