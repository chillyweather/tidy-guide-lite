import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useAtom } from "jotai";
import {
  isPublishAndViewAtom,
  isBuildingAtom,
  isBuildingOnCanvasAtom,
  isDraftAtom,
  documentationTitleAtom,
  showResetPopupAtom,
  isCurrentNameValidAtom,
} from "src/state/atoms";
import PublishCanvas from "../images/publish-icon-canvas.jpg";
import PublishViewer from "../images/publish-icon-viewer.jpg";
import { IconReload, IconChevronDown } from "@tabler/icons-react";

const Footer = () => {
  const [, setIsBuilding] = useAtom(isBuildingAtom);
  const [, setIsBuildingOnCanvas] = useAtom(isBuildingOnCanvasAtom);
  const [saveData, setSaveData] = useState(false);
  const [buildOnCanvas, setBuildOnCanvas] = useState(false);
  const [publishToViewer, setPublishToViewer] = useState(false);
  const [isPublishDropdownOpen, setIsPublishDropdownOpen] = useState(false);
  const [, setIsPublishAndView] = useAtom(isPublishAndViewAtom);
  const [isDraft, setIsDraft] = useAtom(isDraftAtom);
  const [documentationTitle] = useAtom(documentationTitleAtom);
  const [, setShowResetPopup] = useAtom(showResetPopupAtom);
  const [isCurrentNameValid] = useAtom(isCurrentNameValidAtom);

  const isValid = !!documentationTitle?.length && isCurrentNameValid;

  // useEffect(() => {
  //   console.log("+++++++++++++++");
  //   console.log("isCurrentNameValid", isCurrentNameValid);
  //   console.log("+++++++++++++++");
  // }, [isValid, documentationTitle, isCurrentNameValid]);

  function PublishButtonDropdown() {
    return (
      <div
        className={"feedbackPopupBackground"}
        // className={"feedbackPopupBackground invisible"}
        onClick={() => {
          setIsPublishDropdownOpen(false);
        }}
      >
        <div className={"publish-dropdown"}>
          <button
            className={"publish-dropdown-item"}
            id={"publish-button"}
            onClick={() => {
              setSaveData(true);
              setIsDraft(false);
              setBuildOnCanvas(true);
              setIsPublishDropdownOpen(false);
            }}
          >
            <div className="publish-content-wrapper">
              <h4>Build on Canvas</h4>
              <p>Build on Canvas and publish to Tidy Viewer</p>
            </div>
            <img src={PublishCanvas} className={"publish-icon"} />
          </button>
          <div className="divider"></div>
          <button
            className={"publish-dropdown-item"}
            onClick={() => {
              setSaveData(true);
              setIsDraft(false);
              setPublishToViewer(true);
              setIsPublishDropdownOpen(false);
              setIsPublishAndView(true);
            }}
          >
            <div className={"publish-content-wrapper"}>
              <h4>Publish and view</h4>
              <p>Publish & switch to view mode</p>
            </div>
            <img src={PublishViewer} className={"publish-icon"} />
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!isValid) {
      setIsPublishDropdownOpen(false);
    }
  }, [isValid, setIsPublishDropdownOpen]);

  useEffect(() => {
    handlePublish(
      saveData,
      isDraft,
      setIsBuilding,
      setIsBuildingOnCanvas,
      buildOnCanvas,
      publishToViewer,
      setPublishToViewer,
      setBuildOnCanvas,
      setSaveData
    );
  }, [saveData]);

  return (
    <div className={"footer"}>
      <div className="leftFooterContent">
        <button className={"flex-btn"} onClick={() => setShowResetPopup(true)}>
          <IconReload />
          Reset
        </button>
      </div>
      <div className="rightFooterContent">
        <button
          className={"second"}
          onClick={() => {
            setIsDraft(true);
            setSaveData(true);
          }}
        >
          Save as draft
        </button>

        {isPublishDropdownOpen && <PublishButtonDropdown />}
        <div
          className={isValid ? "split" : "split split-disabled"}
          disabled={!isValid}
        >
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey) {
                setSaveData(true);
                setIsDraft(false);
                setBuildOnCanvas(true);
              } else {
                setSaveData(true);
                setIsDraft(false);
                setPublishToViewer(true);
              }
            }}
          >
            Publish
          </button>
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={() => {
              console.log("first button clicked");
              setIsPublishDropdownOpen(!isPublishDropdownOpen);
              setTimeout(function () {
                document.getElementById("publish-button")?.focus();
              }, 300);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsPublishDropdownOpen(false);
            }}
          >
            <IconChevronDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;

function handlePublish(
  saveData: boolean,
  isDraft: boolean | undefined,
  setIsBuilding: (arg: boolean) => void,
  setIsBuildingOnCanvas: (arg: boolean) => void,
  buildOnCanvas: boolean,
  publishToViewer: boolean,
  setPublishToViewer: (arg: boolean) => void,
  setBuildOnCanvas: (arg: boolean) => void,
  setSaveData: (arg: boolean) => void
) {
  if (saveData) {
    if (isDraft) {
      setIsBuilding(true);
      setIsBuildingOnCanvas(false);
    } else if (!isDraft && buildOnCanvas) {
      setIsBuilding(true);
      setIsBuildingOnCanvas(true);
      setBuildOnCanvas(false);
    } else if (!isDraft && publishToViewer) {
      setIsBuilding(true);
      setIsBuildingOnCanvas(false);
      setPublishToViewer(false);
    }
    setSaveData(false);
  }
}
