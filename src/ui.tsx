/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@create-figma-plugin/ui";

import { emit, on } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import FeedbackPopup from "./ui_components/popups/feedbackPopup";
import ResetPopup from "./ui_components/popups/resetPopup";
import DeletePopup from "./ui_components/popups/deletePopup";
import EmptyIndex from "./ui_components/EmptyIndex";
import DeleteSectionPopup from "./ui_components/popups/deleteSectionPopup";
import PasswordResetPopup from "./ui_components/popups/passwordResetPopup";
import DeleteAccountPopup from "./ui_components/popups/deleteAccountPopup";
import CrashLogoutPopup from "./ui_components/popups/crashLogoutPopup";
import NoDeleteCollectionPopup from "./ui_components/popups/noDeleteCollectionPopup";
import Toast from "./ui_components/Toast";
// import { sendRaster } from "./ui_components/ui_functions/sendRaster";
// import fetchAndUpdateData from "./ui_components/ui_functions/fetchAndUpdateData";
import ContentFromServer from "./ui_components/ContentFromServer";
import DetailsPage from "./ui_components/ViewModeElements/DetailsPage";
import Footer from "./ui_components/Footer";
import Header from "./ui_components/Header";
import IndexPage from "./ui_components/IndexPage";
// import LoaderPage from "./ui_components/LoadingPage";
// import LoggedIn from "./ui_components/LoggedInPage";
// import Login from "./ui_components/LoginPage";
// import SignIn from "./ui_components/SigninPage";
import Settings from "./ui_components/SettingsPage";
import MainContent from "./ui_components/MainContent";
// import {
//   updateDocumentation,
//   createDocumentation,
// } from "./ui_components/ui_functions/documentationHandlers";
// import {
//   getCollections,
//   getCollectionDocs,
// } from "./ui_components/ui_functions/collectionHandlers";
import { getUsers } from "./ui_components/ui_functions/authentication";

import { useAtom } from "jotai";
import {
  appSettingsAtom,
  collectionDocsTriggerAtom,
  collectionsAtom,
  // currentCompanyAtom,
  // currentDocumentationsAtom,
  // currentFigmaUserAtom,
  currentUserCollectionsAtom,
  currentUserIdAtom,
  // currentUserNameAtom,
  currentUserRoleAtom,
  dataForUpdateAtom,
  isCollectionSwitchingAtom,
  isDetailsPageOpenAtom,
  isFromSavedDataAtom,
  // isPublishAndViewAtom,
  isResetAtom,
  isViewModeOpenAtom,
  isBuildingAtom,
  isBuildingOnCanvasAtom,
  selectedCollectionAtom,
  selectedComponentPicAtom,
  selectedElementAtom,
  selectedElementNameAtom,
  selectedMasterIdAtom,
  selectedNodeIdAtom,
  selectedNodeKeyAtom,
  selectedSectionsAtom,
  selectionDataAtom,
  showContentFromServerAtom,
  showCrashLogoutPopupAtom,
  showDeleteAccountPopupAtom,
  showDeletePopupAtom,
  showDeleteSectionPopupAtom,
  showFeedbackPopupAtom,
  showIndexPageAtom,
  showMainContentAtom,
  showNonEmptyCollectionPopupAtom,
  showPasswordResetPopupAtom,
  showSettingsPageAtom,
  // showSignupPageAtom,
  tokenAtom,
  toastMessageAtom,
  toastTypeAtom,
  usersAtom,
  // userRankAtom,
  isPdSectionOpenAtom,
  documentationTitleAtom,
  isScrollAtom,
  isDraftAtom,
  showResetPopupAtom,
  isCurrentNameValidAtom,
  isWipAtom,
  documentationDataAtom,
  // loggedInUserAtom,
  selectedCardAtom,
  // currentFigmaFileAtom,
  // currentFigmaPageAtom,
  isFirstTimeAtom,
} from "./state/atoms";

//styles
import "!./styles.css";

function Plugin() {
  //!Jotai states
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeIdAtom);
  const [selectedNodeKey, setSelectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [selectedComponentPic, setSelectedComponentPic] = useAtom(
    selectedComponentPicAtom
  );
  const [isViewModeOpen, setIsViewModeOpen] = useAtom(isViewModeOpenAtom);
  // const [, setCurrentCompany] = useAtom(currentCompanyAtom);
  // const [, setCurrentUserName] = useAtom(currentUserNameAtom);
  const [currentUserId, setCurrentUserId] = useAtom(currentUserIdAtom);
  const [collections, setCollections] = useAtom(collectionsAtom);
  const [selectedCollection, setSelectedCollection]: any = useAtom(
    selectedCollectionAtom
  );
  const [collectionDocsTrigger] = useAtom(collectionDocsTriggerAtom);
  const [currentUserRole] = useAtom(currentUserRoleAtom);
  // const [, setCurrentDocumentations] = useAtom(currentDocumentationsAtom);
  // const [isPublishAndView, setIsPublishAndView] = useAtom(isPublishAndViewAtom);
  const [, setSelectionData] = useAtom(selectionDataAtom);
  const [, setCurrentUserCollections] = useAtom(currentUserCollectionsAtom);
  const [isCollectionSwitching, setIsCollectionSwitching] = useAtom(
    isCollectionSwitchingAtom
  );
  const [showCrashLogoutPopup] = useAtom(showCrashLogoutPopupAtom);
  const [isDetailsPageOpen, setIsDetailsPageOpen] = useAtom(
    isDetailsPageOpenAtom
  );
  const [, setUsers] = useAtom(usersAtom);
  const [appSettings, setAppSettings] = useAtom(appSettingsAtom);

  // const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useAtom(tokenAtom);
  // const [, setFigmaCurrentUser] = useAtom(currentFigmaUserAtom);
  // const [, setCurrentDocument] = useAtom(currentFigmaFileAtom);
  // const [, setCurrentPage] = useAtom(currentFigmaPageAtom);

  // const [showSigninPage] = useAtom(showSignupPageAtom);
  const [showIndexPage, setShowIndexPage] = useAtom(showIndexPageAtom);
  const [showMainContent, setShowMainContent] = useAtom(showMainContentAtom);
  const [showContentFromServer, setShowContentFromServer] = useAtom(
    showContentFromServerAtom
  );
  const [showSettingsPage] = useAtom(showSettingsPageAtom);

  //navigation-popups
  const [showDeleteSectionPopup] = useAtom(showDeleteSectionPopupAtom);
  const [showFeedbackPopup] = useAtom(showFeedbackPopupAtom);
  const [showResetPopup, setShowResetPopup] = useAtom(showResetPopupAtom);
  const [showDeletePopup, setShowDeletePopup] = useAtom(showDeletePopupAtom);
  const [showPasswordResetPopup] = useAtom(showPasswordResetPopupAtom);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useAtom(
    showDeleteAccountPopupAtom
  );
  const [showNonEmptyCollectionPopup] = useAtom(
    showNonEmptyCollectionPopupAtom
  );

  //data from server
  const [dataForUpdate, setDataForUpdate]: any = useAtom(dataForUpdateAtom);

  const [isBuilding, setIsBuilding] = useAtom(isBuildingAtom);
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
  const [documentationTitle, setDocumentationTitle] = useAtom(
    documentationTitleAtom
  );
  //work in progress
  const [isWip, setIsWip] = useAtom(isWipAtom);
  //selected element
  const [selectedElement, setSelectedElement] = useAtom(selectedElementAtom);
  const [selectedElementName, setSelectedElementName] = useAtom(
    selectedElementNameAtom
  );
  const [, setSelectedCard] = useAtom(selectedCardAtom);
  //selected cards
  const [selectedSections, setSelectedSections] = useAtom(selectedSectionsAtom);
  //element to delete
  //documentation
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
  //reset documentation
  const [isReset, setIsReset] = useAtom(isResetAtom);
  //is draft
  const [isDraft] = useAtom(isDraftAtom);
  //is pd section open
  const [, setIsPdSectionOpen] = useAtom(isPdSectionOpenAtom);
  //user rank

  //current image array
  const [currentImageArray, setCurrentImageArray] = useState<Uint8Array | null>(
    null
  );

  const [, setIsCurrentNameValid] = useAtom(isCurrentNameValidAtom);

  on("SETTINGS", (settings: any) => {
    if (settings) {
      setAppSettings(settings);
    }
  });
  useEffect(() => {
    // console.log("showIndexPage", showIndexPage);
  }, [showIndexPage]);

  useEffect(() => {
    if (showSettingsPage || showIndexPage) {
      setIsDetailsPageOpen(false);
    }
  }, [
    setIsDetailsPageOpen,
    // showLoginPage,
    // showSigninPage,
    showIndexPage,
    showSettingsPage,
  ]);

  useEffect(() => {
    if (selectedElement) {
      setIsPdSectionOpen(true);
    } else {
      setIsPdSectionOpen(false);
    }
  }, [selectedElement]);

  useEffect(() => {
    if (collections && collections.length && !selectedCollection) {
      const userCollections = collections.filter(
        (collection: any) => collection.owner === currentUserId
      );
      setSelectedCollection(userCollections[0]);
    }
  }, [collections, selectedCollection, setSelectedCollection, token]);
  //
  //   async function collectionDocsHandler(token: string, collectionId: string) {
  //     const data = await getCollectionDocs(token, collectionId);
  //     if (data && data.length) {
  //       setDataForUpdate(data);
  //       setCurrentDocumentations(data);
  //     } else {
  //       setDataForUpdate([]);
  //     }
  //     setIsCollectionSwitching(false);
  //     setIsLoading(false);
  //   }

  useEffect(() => {
    if (collections && currentUserId) {
      const userCollections = collections.filter(
        (collection: any) => collection.owner === currentUserId
      );
      setCurrentUserCollections(userCollections);
    }
  }, [collections, currentUserId]);

  // useEffect(() => {
  //   if (selectedCollection) {
  //     collectionDocsHandler(token, selectedCollection._id);
  //   }
  // }, [selectedCollection, collectionDocsTrigger]);

  // useEffect(() => {
  //   if (token && currentUserId) {
  //     getUserCollections(token, currentUserId);
  //   }
  // }, [token, currentUserId, collectionDocsTrigger]);

  // useEffect(() => {
  //   if (token) {
  //     setCurrentUsers(token);
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (currentUserRole && currentUserRole === "Viewer") {
  //     setIsViewModeOpen(true);
  //   } else {
  //     setIsViewModeOpen(false);
  //   }
  // }, [currentUserRole]);

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
        // ["_id"]: documentationId,
        ["componentKey"]: selectedNodeKey,
        ["nodeId"]: selectedNodeId || "",
        ["docs"]: [],
        ["title"]: documentationTitle,
        ["draft"]: isDraft,
        ["inProgress"]: isWip,
      };
    });
  });

  //MARK: Auto open details page
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

  // on("SESSION", ({ user, document, page }) => {
  //   setFigmaCurrentUser(user);
  //   setCurrentDocument(document);
  //   setCurrentPage(page);
  // });

  on("FOUND_ELEMENT", (foundElement, foundElementName, key) => {
    setIsNewElementFound(true);
    setSelectedElement(foundElement);
    setSelectedElementName(foundElementName);
    setSelectedNodeKey(key);
  });

  on("COMPONENT_PIC_FOR_UPLOAD", async ({ bytes }) => {
    // console.log("bytes", bytes);
    setCurrentImageArray(bytes);
  });

  function checkIfDocumentationExists(docs: any[], id: string) {
    if (docs.length && id) {
      return docs.find((doc) => doc._id === id);
    }
  }

  // async function uploadComponentPic(bytes: Uint8Array, loggedInUser: string) {
  //   const url = await sendRaster(bytes, loggedInUser, "componentPic");
  //   if (url) {
  //     setSelectedComponentPic(url);
  //   }
  // }

  //   async function getUserCollections(token: string, userId: string) {
  //     let collections = await getCollections(token, userId);
  //
  //     collections = collections.sort((a: any, b: any) => {
  //       const aIsOwnedByUser = a.owner === userId;
  //       const bIsOwnedByUser = b.owner === userId;
  //
  //       if (aIsOwnedByUser && !bIsOwnedByUser) {
  //         return -1;
  //       }
  //       if (!aIsOwnedByUser && bIsOwnedByUser) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //
  //     setCollections(collections);
  //   }

  async function setCurrentUsers(token: string) {
    const users = await getUsers(token);
    setUsers(users);
  }

  // useEffect(() => {
  //   if (
  //     currentImageArray &&
  //     currentImageArray.length &&
  //     !selectedComponentPic &&
  //     (showMainContent || isDetailsPageOpen)
  //   ) {
  //     uploadComponentPic(currentImageArray, loggedInUser);
  //   }
  // }, [currentImageArray, selectedComponentPic]);

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
    if (isReset) {
      setDocumentationTitle("");
      setIsWip(false);
      setSelectedElement(null);
      setSelectedElementName("");
      setSelectedCard("");
      setSelectedNodeKey("");
      setSelectedSections([]);
      setDocumentationData({ docs: [] });
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (documentationTitle) {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["title"]: documentationTitle,
          ["inProgress"]: isWip,
          ["draft"]: isDraft,
          ["collection"]: selectedCollection?._id,
        };
      });
    }
  }, [documentationTitle, isWip, isDraft, selectedCollection]);

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

  useEffect(() => {
    if (selectedComponentPic) {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["componentPic"]: selectedComponentPic,
        };
      });
    } else {
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          ["componentPic"]: "",
        };
      });
    }
  }, [selectedComponentPic]);

  function closePopup() {
    setIsToastOpen(false);
  }

  on("SAVED_DATA", (data) => {
    setDataForUpdate(data);
  });

  useEffect(() => {
    // console.log("dataForUpdate", dataForUpdate);
    // console.log("documentationData", documentationData);
    if (
      documentationTitle
      // &&
      // (dataForUpdate.length || documentationData.docs.length)
    ) {
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
    // console.log("data", data);
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
    // console.log("dataForUpdate", dataForUpdate);
  }, [dataForUpdate]);

  useEffect(() => {
    if (Object.keys(documentationData).length > 0 && isBuilding) {
      // console.log("documentationData", documentationData);
      handleAddDocumentation(documentationData);
    }
  }, [documentationData, isBuilding]);

  // useEffect(() => {
  //   if (isViewModeOpen && selectedMasterId && dataForUpdate) {
  //     const foundData = dataForUpdate.find(
  //       (item: any) => item._id === selectedMasterId
  //     );
  //     setSelectedSections(foundData.docs);
  //   }
  // }, [selectedMasterId, isViewModeOpen, dataForUpdate]);

  // //! Logout after 10 seconds of inactivity - IMPORTANT
  // useEffect(() => {
  //   let timeoutId: any;
  //   if (isLoading) {
  //     timeoutId = setTimeout(() => {
  //       // emit("LOGOUT");
  //       setIsLoading(false);
  //       // setShowCrashLogoutPopup(true);
  //     }, 10000); // 10 seconds
  //   }
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [isLoading]);

  useEffect(() => {
    // console.log("showNonEmptyCollectionPopup", showNonEmptyCollectionPopup);
  }, [showNonEmptyCollectionPopup]);

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
          setShowResetPopup(false);
          setShowDeletePopup(false);
          setShowDeleteAccountPopup(false);
        }
      }}
    >
      {showFeedbackPopup && <FeedbackPopup />}
      {/* {isLoading && <LoaderPage />} */}
      {showResetPopup && <ResetPopup />}
      {showDeletePopup && <DeletePopup />}
      {showDeleteSectionPopup && <DeleteSectionPopup />}
      {showDeleteAccountPopup && <DeleteAccountPopup />}
      {showPasswordResetPopup && <PasswordResetPopup />}
      {showCrashLogoutPopup && <CrashLogoutPopup />}
      {showNonEmptyCollectionPopup && <NoDeleteCollectionPopup />}

      {isToastOpen && toastMessage && <Toast onClose={closePopup} />}

      <Header />

      {showIndexPage && <IndexPage />}
      {/* {(isFirstTime || showIndexPage) && <IndexPage />} */}

      {!isCollectionSwitching && showIndexPage && <EmptyIndex />}

      {showMainContent && !isViewModeOpen && <MainContent />}

      {/* content in Edit mode */}
      {selectedMasterId &&
        showContentFromServer &&
        !showMainContent &&
        !isViewModeOpen && <ContentFromServer />}

      {/* //MARK: View mode content */}
      {selectedMasterId &&
        showContentFromServer &&
        !showMainContent &&
        isViewModeOpen && <DetailsPage />}

      {showSettingsPage && <Settings />}

      {(showContentFromServer || showMainContent) && <Footer />}
    </div>
  );
}

export default render(Plugin);
