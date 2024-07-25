/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState, useEffect } from "preact/hooks";
import {
  isToBuildComponentPicAtom,
  currentPageAtom,
  showLoginPageAtom,
  selectedElementAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showContentFromServerAtom,
  showSettingsPageAtom,
  isDocJustOpenedAtom,
  documentationDataAtom,
  selectedSectionsAtom,
  isFromSavedDataAtom,
  loggedInUserAtom,
} from "src/state/atoms";
import BackButton from "./BackButton";
import { IconSettings } from "@tabler/icons-react";

import { h } from "preact";
import HeaderActions from "./HeaderActions";
import UserMenu from "./UserMenu";
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
  const [avatarColor, setAvatarColor] = useState("#F584AD");

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

  const [loggedInUser] = useAtom(loggedInUserAtom);
  function colorAavatar() {
    const colorList = [
      "#F584AD",
      "#AC93F0",
      "#D1423F",
      "#DC1677",
      "#C233A0",
      "#6163E1",
      "#246DB6",
      "#008290",
      "#7BA100",
      "#9355D2",
      "#6D8391",
      "#3B814F",
      "#8190EA",
      "#50CE71",
      "#F2BA3B",
      "#030303",
      "#E38072",
      "#543150",
      "#F8970C",
      "#285736",
      "#00BFA5",
      "#FF7BAD",
      "#84CE29",
      "#FF6D00",
      "#FF372B",
      "#304FFE",
    ];
    const alphaUser =
      loggedInUser.slice(0, 1).toLowerCase().charCodeAt(0) - 97 + 1;
    const alphaToken =
      loggedInUser
        .slice(loggedInUser.lastIndexOf("@") - 1, loggedInUser.lastIndexOf("@"))
        .toLowerCase()
        .charCodeAt(0) -
      97 +
      1;
    let selectedColorIndex = alphaUser - alphaToken;
    if (selectedColorIndex < 0) {
      selectedColorIndex *= -1;
    }
    const selectedColor = colorList[selectedColorIndex];
    setAvatarColor(selectedColor);

    const styles = ".user-tag{background-color:" + selectedColor + "}";
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }

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
          <button>
            <IconSettings />
          </button>
          {/* <details className="header-login tooltip" id="userMenu">
            <summary>
              <div
                style={{ backgroundColor: avatarColor }}
                className="user-tag"
                first-letter={loggedInUser.slice(0, 1)}
              >
                {loggedInUser.slice(0, 1)}
              </div>
            </summary>
            {colorAavatar()}
            <UserMenu />
          </details> */}
        </div>
        <IconSettings />
      </div>
      {(selectedElement || isMainContentOpen || isContenFromServerOpen) &&
        !isIndexOpen &&
        !isLoginPageOpen &&
        !isSettingsPageOpen && <HeaderActions />}
    </div>
  );
};

export default Header;
