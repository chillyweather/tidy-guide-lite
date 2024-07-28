/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@create-figma-plugin/ui";

import { emit, on } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import DeletePopup from "./ui_components/popups/deletePopup";
import DeleteSectionPopup from "./ui_components/popups/deleteSectionPopup";
import Toast from "./ui_components/Toast";
import ContentFromServer from "./ui_components/ContentFromServer";
import Footer from "./ui_components/Footer";
import Header from "./ui_components/Header";
import IndexPage from "./ui_components/IndexPage";
import Settings from "./ui_components/SettingsPage";
import MainContent from "./ui_components/MainContent";

import { useAtom } from "jotai";
import {
  appSettingsAtom,
  dataForUpdateAtom,
  isDetailsPageOpenAtom,
  isFromSavedDataAtom,
  isBuildingAtom,
  isBuildingOnCanvasAtom,
  selectedElementAtom,
  selectedElementNameAtom,
  selectedMasterIdAtom,
  selectedNodeIdAtom,
  selectedNodeKeyAtom,
  selectedSectionsAtom,
  selectionDataAtom,
  showContentFromServerAtom,
  showDeletePopupAtom,
  showDeleteSectionPopupAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showSettingsPageAtom,
  toastMessageAtom,
  toastTypeAtom,
  isPdSectionOpenAtom,
  documentationTitleAtom,
  isScrollAtom,
  isCurrentNameValidAtom,
  isWipAtom,
  documentationDataAtom,
  isFirstTimeAtom,
} from "./state/atoms";

//styles
import "!./styles.css";

function Plugin() {
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeIdAtom);
  const [selectedNodeKey, setSelectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [, setSelectionData] = useAtom(selectionDataAtom);
  const [, setIsDetailsPageOpen] = useAtom(isDetailsPageOpenAtom);
  const [appSettings, setAppSettings] = useAtom(appSettingsAtom);
  const [showIndexPage, setShowIndexPage] = useAtom(showIndexPageAtom);
  const [showMainContent] = useAtom(showMainContentAtom);
  const [showContentFromServer, setShowContentFromServer] = useAtom(
    showContentFromServerAtom
  );
  const [showSettingsPage] = useAtom(showSettingsPageAtom);

  const [showDeleteSectionPopup] = useAtom(showDeleteSectionPopupAtom);
  const [showDeletePopup, setShowDeletePopup] = useAtom(showDeletePopupAtom);

  //data from server
  const [dataForUpdate, setDataForUpdate]: any = useAtom(dataForUpdateAtom);

  const [isBuilding] = useAtom(isBuildingAtom);
  const [isBuildingOnCanvas, setIsBuildingOnCanvas] = useAtom(
    isBuildingOnCanvasAtom
  );
  //is plugin first time open
  const [isFirstTime, setIsFirstTime] = useAtom(isFirstTimeAtom);

  //show toast
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useAtom(toastMessageAtom);
  const [, setToastType] = useAtom(toastTypeAtom);

  //!TODO: documentatation level states
  //documentation title
  const [documentationTitle] = useAtom(documentationTitleAtom);
  //work in progress
  const [isWip] = useAtom(isWipAtom);
  //selected element
  const [selectedElement, setSelectedElement] = useAtom(selectedElementAtom);
  const [selectedElementName, setSelectedElementName] = useAtom(
    selectedElementNameAtom
  );
  const [selectedSections] = useAtom(selectedSectionsAtom);
  const [documentationData, setDocumentationData] = useAtom(
    documentationDataAtom
  );
  //preview data
  //is scroll
  const [, setIsScroll] = useAtom(isScrollAtom);
  //set selected master id
  const [selectedMasterId, setSelectedMasterId] = useAtom(selectedMasterIdAtom);
  //is new element found
  const [, setIsNewElementFound] = useState(false);
  //is content from server
  const [, setIsFromSavedData] = useAtom(isFromSavedDataAtom);
  //found existing documentation
  const [, setFoundDocumentation]: any = useState(null);
  //is draft
  const [, setIsPdSectionOpen] = useAtom(isPdSectionOpenAtom);

  const [, setIsCurrentNameValid] = useAtom(isCurrentNameValidAtom);

  on("SETTINGS", (settings: any) => {
    if (settings) {
      console.log("settings", settings);
      setAppSettings(settings);
    }
  });
  useEffect(() => {}, [showIndexPage]);

  useEffect(() => {
    if (showSettingsPage || showIndexPage) {
      setIsDetailsPageOpen(false);
    }
  }, [setIsDetailsPageOpen, showIndexPage, showSettingsPage]);

  useEffect(() => {
    if (selectedElement) {
      setIsPdSectionOpen(true);
    } else {
      setIsPdSectionOpen(false);
    }
  }, [selectedElement]);

  on("CHANGED_SELECTION", (data) => {
    setSelectionData(data);
  });

  on("SELECTION", (data) => {
    if (!data) {
      return;
    }
    const { defaultNode, name, key } = data;

    setSelectedElement(defaultNode);
    setSelectedNodeId(defaultNode.id);
    setSelectedElementName(name);
    setSelectedNodeKey(key);
    setDocumentationData((prevDocumentation: any) => {
      return {
        ...prevDocumentation,
        ["componentKey"]: selectedNodeKey,
        ["nodeId"]: selectedNodeId || "",
        ["docs"]: [],
        ["title"]: documentationTitle,
        ["inProgress"]: isWip,
      };
    });
  });

  useEffect(() => {
    if (
      isFirstTime &&
      selectedNodeKey &&
      dataForUpdate &&
      dataForUpdate.length
    ) {
      const foundDocId = dataForUpdate.find(
        (doc: any) => doc.componentKey === selectedNodeKey
      )?._id;
      if (foundDocId) {
        setSelectedMasterId(foundDocId);
        setIsDetailsPageOpen(true);
        setIsFromSavedData(true);
        setShowIndexPage(false);
        setShowContentFromServer(true);
      }
    }
  }, [isFirstTime, selectedNodeKey, dataForUpdate]);

  useEffect(() => {
    const currentSections = JSON.parse(JSON.stringify(selectedSections));
    setDocumentationData((prevDocumentation: any) => {
      return {
        ...prevDocumentation,
        ["docs"]: currentSections,
      };
    });
  }, [selectedSections]);

  on("FOUND_ELEMENT", (foundElement, foundElementName, key) => {
    setIsNewElementFound(true);
    setSelectedElement(foundElement);
    setSelectedElementName(foundElementName);
    setSelectedNodeKey(key);
  });

  function checkIfDocumentationExists(docs: any[], id: string) {
    if (docs.length && id) {
      return docs.find((doc) => doc._id === id);
    }
  }

  useEffect(() => {
    const found = checkIfDocumentationExists(dataForUpdate, selectedNodeKey);
    if (found && showMainContent && selectedElementName.length) {
      setFoundDocumentation(found);
      setIsToastOpen(true);
      setToastType("idle");
      setToastMessage(
        `Documentations must be unique, this element already have one in: \n${found.title}`
      );
      setSelectedElement(null);
      setSelectedElementName("");
    }
  }, [selectedNodeKey, selectedElement]);

  useEffect(() => {
    if (
      selectedElementName.length &&
      dataForUpdate.length &&
      !showMainContent &&
      !showContentFromServer
    ) {
      const found = dataForUpdate.find(
        (doc: any) => doc._id === selectedNodeKey
      );
      if (found) {
        setShowIndexPage(false);
        setShowContentFromServer(true);
        setSelectedMasterId(selectedNodeKey);
      }
    }
  }, [selectedElementName, dataForUpdate]);

  (function bodyScroll() {
    document.body.onscroll = function () {
      if (document.body.scrollTop == 0) {
        setIsScroll(false);
      } else {
        setIsScroll(true);
      }
    };
  })();

  useEffect(() => {
    if (showMainContent || showContentFromServer) {
      setIsFirstTime(false);
    }
  }, [showMainContent, showContentFromServer]);

  useEffect(() => {
    if (documentationTitle) {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["title"]: documentationTitle,
          ["inProgress"]: isWip,
        };
      });
    }
  }, [documentationTitle, isWip]);

  useEffect(() => {
    if (selectedNodeKey) {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["componentKey"]: selectedNodeKey,
          ["nodeId"]: selectedNodeId,
        };
      });
    } else {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["componentKey"]: "",
          ["nodeId"]: "",
        };
      });
    }
  }, [selectedNodeKey, selectedNodeId]);

  function closePopup() {
    setIsToastOpen(false);
  }

  on("SAVED_DATA", (data) => {
    setDataForUpdate(data);
  });

  useEffect(() => {
    if (documentationTitle) {
      const foundDoc = dataForUpdate.find(
        (doc: any) =>
          doc.title.toLowerCase() === documentationTitle.toLowerCase()
      );
      const foundDocId = foundDoc?._id;
      const foundDocTitle = foundDoc?.title;
      if (foundDocId && foundDocTitle && foundDocId !== selectedMasterId) {
        setIsCurrentNameValid(false);
        setIsToastOpen(true);
        setToastMessage("Documentation title must be unique");
        setToastType("error");
      } else {
        setIsCurrentNameValid(true);
      }
    }
  }, [documentationTitle]);

  async function handleAddDocumentation(data: any) {
    if (isBuildingOnCanvas) emit("BUILD", data, appSettings);
    setIsBuildingOnCanvas(false);
    setDocumentationData((prevDocumentation: any) => {
      return {
        ...prevDocumentation,
        ["_id"]: data._id,
      };
    });
  }

  useEffect(() => {
    if (Object.keys(documentationData).length > 0 && isBuilding) {
      handleAddDocumentation(documentationData);
    }
  }, [documentationData, isBuilding]);

  // //! Logout after 10 seconds of inactivity - IMPORTANT

  return (
    <div
      className={"container"}
      onClick={() => {
        //@ts-ignore
        const x = document.getElementsByTagName("details");
        let i;
        for (i = 0; i < x.length; i++) {
          x[i].open = false;
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setShowDeletePopup(false);
        }
      }}
    >
      {showDeletePopup && <DeletePopup />}
      {showDeleteSectionPopup && <DeleteSectionPopup />}

      {isToastOpen && toastMessage && <Toast onClose={closePopup} />}

      <Header />

      {showIndexPage && <IndexPage />}

      {showMainContent && <MainContent />}

      {selectedMasterId && showContentFromServer && !showMainContent && (
        <ContentFromServer />
      )}

      {showSettingsPage && <Settings />}

      {(showContentFromServer || showMainContent) && <Footer />}
    </div>
  );
}

export default render(Plugin);
