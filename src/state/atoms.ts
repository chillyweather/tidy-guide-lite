import { atom } from "jotai";
import { Screens } from "./navigationTypes";
import { CurrenPage } from "./atomTypes";

//navigation
export const historyAtom = atom<Screens[]>([Screens.HOME]);
export const currentScreenAtom = atom(
  (get) => get(historyAtom)[get(historyAtom).length - 1]
);
export const currentPageAtom = atom<CurrenPage>("login");
export const currentFigmaPageAtom = atom("");
export const currentFigmaFileAtom = atom("");

export const checkExistingDocumentAtom = atom(false);

export const selectedVariantAtom = atom("");
export const allVariantsAtom = atom([]);

//settings
export const appSettingsAtom = atom({});
export const settingsUnitsAtom = atom("px");
export const settingsRemRootAtom = atom(16);
// export const settingsStrokeStyleAtom = atom("solid");

//page states
export const showLoginPageAtom = atom(false);
export const showSignupPageAtom = atom(false);
export const showIndexPageAtom = atom(true);
export const showMainContentAtom = atom(false);
export const showContentFromServerAtom = atom(false);
export const showSettingsPageAtom = atom(false);
export const showSettingsContentAtom = atom(true);
export const showManageUsersPageAtom = atom(false);
export const showManageCollectionsPageAtom = atom(false);
export const showManageCanvasAppearanceAtom = atom(false);

export const isFromSavedDataAtom = atom(false);

export const isFirstTimeAtom = atom(true);
export const isBuildingAtom = atom(false);
export const isBuildingOnCanvasAtom = atom(false);

export const selectedNodeIdAtom = atom("");
export const selectedNodeKeyAtom = atom("");
export const selectedComponentPicAtom = atom("");
export const isToBuildComponentPicAtom = atom(false);
export const isViewModeOpenAtom = atom(false);
export const isPublishAndViewAtom = atom(false);
export const selectionDataAtom = atom(null);
export const isDetailsPageOpenAtom = atom(false);
export const selectedMasterIdAtom = atom("");
export const selectedCardAtom = atom("");

export const usersAtom = atom([]);
export const currentUserNameAtom = atom("");
export const currentFigmaUserAtom = atom({});
export const currentCompanyAtom = atom("");
export const currentUserIdAtom = atom("");
export const currentUserRoleAtom = atom("");
export const currentDocumentationsAtom = atom(null);
export const documentationDataAtom = atom({ docs: [] });
export const userRankAtom = atom("");
export const loggedInUserAtom = atom("");

//login data
export const tokenAtom = atom("");
export const isLoginFailedAtom = atom(false);

//context replacements
export const selectedElementAtom = atom(null);
export const selectedElementNameAtom = atom("");
export const isDocJustOpenedAtom = atom(false);
export const isResetAtom = atom(false);
export const dataForUpdateAtom = atom([]);
export const selectedSectionsAtom = atom([]);

//current documentation
export const documentationTitleAtom = atom("");
export const documentationIdAtom = atom("");

export const isDraftAtom = atom(false);
export const isWipAtom = atom(false);

export const isScrollAtom = atom(false);
export const isInternalSpacingAtom = atom(true);

//collections
export const collectionsAtom = atom([]);
export const currentUserCollectionsAtom = atom([]);
export const selectedCollectionAtom = atom(null);
export const selectedCollectionInSettingsAtom = atom(null);

//triggers
export const collectionDocsTriggerAtom = atom(0);

export const userToEditAtom = atom(null);
export const collectionToEditAtom = atom(null);
export const sectionToDeleteIndexAtom = atom(-1);
export const sectionToDeleteAtom = atom(null);
export const isCollectionSwitchingAtom = atom(false);

//show forms
export const showEditUserFormAtom = atom(false);

//popup trigger states
export const showCrashLogoutPopupAtom = atom(false);
export const showDeleteAccountPopupAtom = atom(false);
export const showDeletePopupAtom = atom(false);
export const showDeleteSectionPopupAtom = atom(false);
export const showFeedbackPopupAtom = atom(false);
export const showPasswordResetPopupAtom = atom(false);
export const showResetPopupAtom = atom(false);

//toast states
export const toastMessageAtom = atom("");
export const toastTypeAtom = atom("idle");

//show non empty collection
export const showNonEmptyCollectionPopupAtom = atom(false);

//for delete popup
export const elementToDeleteAtom = atom("");

//small interface elements
export const isPdSectionOpenAtom = atom(true);
export const isCurrentNameValidAtom = atom(false);
