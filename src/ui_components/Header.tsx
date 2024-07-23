/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  IconArrowLeft,
  IconEye,
  IconPencil,
  IconPlus,
  IconExternalLink,
  IconList,
  IconSearch,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState, useEffect } from "preact/hooks";
import {
  collectionsAtom,
  currentUserRoleAtom,
  isViewModeOpenAtom,
  selectedCollectionAtom,
  isToBuildComponentPicAtom,
  currentPageAtom,
  showLoginPageAtom,
  selectedElementAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showContentFromServerAtom,
  showSettingsPageAtom,
  isDocJustOpenedAtom,
  dataForUpdateAtom,
  tokenAtom,
  selectedMasterIdAtom,
  documentationDataAtom,
  selectedSectionsAtom,
  isFromSavedDataAtom,
  loggedInUserAtom,
} from "src/state/atoms";
import BackButton from "./BackButton";

import { getCollectionDocs } from "./ui_functions/collectionHandlers";

import { h } from "preact";
import HeaderActions from "./HeaderActions";
import UserMenu from "./UserMenu";
import { emit } from "@create-figma-plugin/utilities";
import CollectionsDropdown from "./CollectionsDropdown";

const Header = () => {
  const [isLoginPageOpen, setIsLoginPageOpen] = useAtom(showLoginPageAtom);
  const [isViewModeOpen, setIsViewModeOpen] = useAtom(isViewModeOpenAtom);
  const [collections] = useAtom(collectionsAtom);
  const [selectedCollection, setSelectedCollection]: any = useAtom(
    selectedCollectionAtom
  );
  const [userRole] = useAtom(currentUserRoleAtom);
  const [, setIsToBuildComponentPic] = useAtom(isToBuildComponentPicAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [selectedElement] = useAtom(selectedElementAtom);
  const [isIndexOpen, setIsIndexOpen] = useAtom(showIndexPageAtom);
  const [isMainContentOpen, setIsMainContentOpen] =
    useAtom(showMainContentAtom);
  const [isContenFromServerOpen, setIsContenFromServerOpen] = useAtom(
    showContentFromServerAtom
  );
  const [isSettingsPageOpen] = useAtom(showSettingsPageAtom);
  const [isDocJustOpened, setIsDocJustOpened] = useAtom(isDocJustOpenedAtom);
  const [dataForUpdate]: any = useAtom(dataForUpdateAtom);
  const [, setSelectedMasterId] = useAtom(selectedMasterIdAtom);
  const [token] = useAtom(tokenAtom);
  const [documentationData]: any = useAtom(documentationDataAtom);
  const [selectedSections] = useAtom(selectedSectionsAtom);
  const [, setIsFromSavedData] = useAtom(isFromSavedDataAtom);

  const [, setInitialSelectedSections] = useState(null);
  const [, setInitialDocumentationData] = useState(null);
  const [, setInitialSelectedSectionsLength] = useState(0);
  const [navState, setNavState] = useState(false);
  const [avatarColor, setAvatarColor] = useState("#F584AD");
  const [lastCollectionUpdate, setLastCollectionUpdate] = useState("");

  useEffect(() => {
    if (selectedCollection) {
      const timestamp = convertTimestamp(selectedCollection.updatedAt);
      setLastCollectionUpdate(timestamp);
    }
  }, [selectedCollection]);

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

  function Toggle() {
    const handleToggle = async () => {
      if (!token) return;
      setIsViewModeOpen(!isViewModeOpen);
      if (!isIndexOpen) {
        setIsMainContentOpen(false);
        setIsContenFromServerOpen(true);
        await getCollectionDocs(token, selectedCollection?._id);
        const currentDocumentation = dataForUpdate.find(
          (item: any) => item.title === documentationData.title
        );
        setSelectedMasterId(currentDocumentation._id);
      }
    };

    return (
      <button
        className={isViewModeOpen ? "mode-button viewer" : "mode-button editor"}
        onClick={handleToggle}
        disabled={userRole === "Viewer" || isMainContentOpen}
      >
        <div className={"thumb"}></div>
        <div className="mode-icon view">
          <IconEye />
        </div>
        <div className="mode-icon edit">
          <IconPencil />
        </div>
      </button>
    );
  }
  const [loggedInUser] = useAtom(loggedInUserAtom);
  function colorAvatar() {
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
              {collections && collections.length && (
                <CollectionsDropdown
                  options={collections}
                  onSelect={setSelectedCollection}
                />
              )}
              <h2 className={"updated"}>Last update: {lastCollectionUpdate}</h2>
              <a
                href={"https://tidy.guide/guide/overview"}
                target={"_blank"}
                className={"link-icon"}
              >
                <IconExternalLink stroke={1.5} />
              </a>
              {!isViewModeOpen && (
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
              )}
            </div>
          ) : (
            <div className={"search-flex"}>
              <BackButton />
              {!isSettingsPageOpen && (
                <div className="searchbox">
                  <IconSearch />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      document
                        .getElementsByClassName("headerSection")[0]
                        // @ts-ignore
                        .click();
                      // @ts-ignore
                      window.find(
                        (e.target as HTMLFormElement).getElementsByTagName(
                          "input"
                        )[0].value
                      );
                      // @ts-ignore
                      window
                        .getSelection()
                        .anchorNode.parentElement.scrollIntoView();
                    }}
                  >
                    <input
                      id={"search-input"}
                      type={"search"}
                      placeholder={"Type to search..."}
                    ></input>
                  </form>
                </div>
              )}
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
          {Toggle()}

          {!isIndexOpen &&
            isViewModeOpen &&
            !isLoginPageOpen &&
            !isSettingsPageOpen && (
              <button
                className={"navigation-button " + navState}
                onClick={() => {
                  setNavState(!navState);
                }}
                onBlur={() => {
                  setNavState(false);
                }}
              >
                <IconList />
              </button>
            )}

          <details className="header-login tooltip" id="userMenu">
            <summary>
              <div
                style={{ backgroundColor: avatarColor }}
                className="user-tag"
                first-letter={loggedInUser.slice(0, 1)}
              >
                {loggedInUser.slice(0, 1)}
              </div>
            </summary>
            {colorAvatar()}
            <UserMenu />
          </details>
        </div>
      </div>
      {(selectedElement || isMainContentOpen || isContenFromServerOpen) &&
        !isIndexOpen &&
        !isViewModeOpen &&
        !isLoginPageOpen &&
        !isSettingsPageOpen && <HeaderActions />}
    </div>
  );
};

export default Header;

function convertTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const options = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
