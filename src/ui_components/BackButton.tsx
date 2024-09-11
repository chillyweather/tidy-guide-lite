import { h } from "preact";
import { useAtom } from "jotai";
// import { useEffect } from "preact/hooks";
import {
  currentPageAtom,
  documentationTitleAtom,
  isDetailsPageOpenAtom,
  isDocJustOpenedAtom,
  isResetAtom,
  isToBuildComponentPicAtom,
  selectedComponentPicAtom,
  selectedElementAtom,
  selectedElementNameAtom,
  selectedSectionsAtom,
  selectedNodeIdAtom,
  selectedNodeKeyAtom,
  showContentFromServerAtom,
  showEditUserFormAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showManageCanvasAppearanceAtom,
  showManageCollectionsPageAtom,
  showManageUsersPageAtom,
  showSettingsContentAtom,
  showSettingsPageAtom,
} from "../state/atoms";
import { IconArrowLeft } from "@tabler/icons-react";

export default function BackButton() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [, setIsDetailsPageOpen] = useAtom(isDetailsPageOpenAtom);
  const [, setIsToBuildComponentPic] = useAtom(isToBuildComponentPicAtom);
  const [, setSelectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [, setSelectedNodeId] = useAtom(selectedNodeIdAtom);
  const [, setSelectedComponentPic] = useAtom(selectedComponentPicAtom);
  const [, setSelectedElement] = useAtom(selectedElementAtom);
  const [, setSelectedElementName] = useAtom(selectedElementNameAtom);
  const [, setIsIndexOpen] = useAtom(showIndexPageAtom);
  const [, setIsMainContentOpen] = useAtom(showMainContentAtom);
  const [, setIsContenFromServerOpen] = useAtom(showContentFromServerAtom);
  const [, setIsSettingsPageOpen] = useAtom(showSettingsPageAtom);
  const [, setIsDocJustOpened] = useAtom(isDocJustOpenedAtom);
  const [, setIsReset] = useAtom(isResetAtom);
  const [, setShowSettingsContent] = useAtom(showSettingsContentAtom);
  const [, setShowManageUsersPage] = useAtom(showManageUsersPageAtom);
  const [, setShowManageCollectionsPage] = useAtom(
    showManageCollectionsPageAtom
  );
  const [, setShowEditUserForm] = useAtom(showEditUserFormAtom);
  const [, setShowManageCanvasAppearance] = useAtom(
    showManageCanvasAppearanceAtom
  );
  const [, setSelectedSections] = useAtom(selectedSectionsAtom);
  const [, setDocumentationTitle] = useAtom(documentationTitleAtom);

  // useEffect(() => {
  //   console.log("currentPage", currentPage);
  // }, [currentPage]);

  function backToIndex() {
    setIsContenFromServerOpen(false);
    setIsDetailsPageOpen(false);
    setIsDocJustOpened(true);
    setIsIndexOpen(true);
    setIsMainContentOpen(false);
    setIsReset(true);
    setIsSettingsPageOpen(false);
    setIsToBuildComponentPic(false);
    setSelectedComponentPic("");
    setSelectedElement(null);
    setSelectedElementName("");
    setSelectedNodeId("");
    setSelectedNodeKey("");
    setShowManageCanvasAppearance(false);
    setShowManageUsersPage(false);
    setShowSettingsContent(false);
    setShowSettingsContent(false);
    setShowManageCollectionsPage(false);
    setShowEditUserForm(false);
    setSelectedSections([]);
    setDocumentationTitle("");
  }

  function backToSettings() {
    setShowManageCanvasAppearance(false);
    setShowManageCollectionsPage(false);
    setShowManageUsersPage(false);
    setShowSettingsContent(true);
  }

  return (
    <button
      onClick={() => {
        switch (currentPage) {
          case "details":
            backToIndex();
            break;
          case "new-documnent":
            backToIndex();
            break;
          case "settings":
            backToIndex();
            break;
          case "settings-section":
            backToIndex();
            setCurrentPage("index");
            break;
          case "canvas-appearance":
            backToSettings();
            setCurrentPage("settings");
            break;
          case "logout":
            backToIndex();
            break;
          default:
            backToIndex();
            break;
        }
      }}
      className="flex-button back-button"
    >
      <IconArrowLeft />
      Back
    </button>
  );
}
