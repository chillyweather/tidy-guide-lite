import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useAtom } from "jotai";
import {
  isBuildingAtom,
  isBuildingOnCanvasAtom,
  documentationTitleAtom,
  isCurrentNameValidAtom,
  selectedNodeIdAtom,
} from "src/state/atoms";
import { IconChevronDown } from "@tabler/icons-react";

const Footer = () => {
  const [, setIsBuilding] = useAtom(isBuildingAtom);
  const [, setIsBuildingOnCanvas] = useAtom(isBuildingOnCanvasAtom);
  const [saveData, setSaveData] = useState(false);
  const [, setBuildOnCanvas] = useState(false);
  const [isPublishDropdownOpen, setIsPublishDropdownOpen] = useState(false);
  const [documentationTitle] = useAtom(documentationTitleAtom);
  const [isCurrentNameValid] = useAtom(isCurrentNameValidAtom);
  const [selectedNodeId] = useAtom(selectedNodeIdAtom);

  const isValid =
    !!documentationTitle?.length && isCurrentNameValid && selectedNodeId;

  function PublishButtonDropdown() {
    return (
      <div
        className={"feedbackPopupBackground"}
        // className={"feedbackPopupBackground invisible"}
        onClick={() => {
          console.log("will publish");
          setSaveData(true);
          setBuildOnCanvas(true);
          setIsPublishDropdownOpen(false);
        }}
      ></div>
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
      setIsBuilding,
      setIsBuildingOnCanvas,
      setBuildOnCanvas,
      setSaveData
    );
  }, [saveData]);

  return (
    <div className={"footer"}>
      <div className="leftFooterContent"></div>
      <div className="rightFooterContent">
        {isPublishDropdownOpen && <PublishButtonDropdown />}
        <div
          className={isValid ? "split" : "split split-disabled"}
          disabled={!isValid}
        >
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={() => {
              setSaveData(true);
              setBuildOnCanvas(true);
            }}
          >
            Build
          </button>
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={() => {
              setSaveData(true);
              setBuildOnCanvas(true);
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
  setIsBuilding: (arg: boolean) => void,
  setIsBuildingOnCanvas: (arg: boolean) => void,
  setBuildOnCanvas: (arg: boolean) => void,
  setSaveData: (arg: boolean) => void
) {
  if (saveData) {
    setIsBuilding(true);
    setIsBuildingOnCanvas(true);
    setBuildOnCanvas(false);
  }
  setSaveData(false);
}
