import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useAtom } from "jotai";
import {
  isBuildingAtom,
  isBuildingOnCanvasAtom,
  documentationTitleAtom,
  isCurrentNameValidAtom,
  selectedNodeIdAtom,
  // selectedVariantAtom,
  // allVariantsAtom,
} from "src/state/atoms";
// import { Dropdown } from "src/ui_components/Dropdown";

const Footer = () => {
  const [, setIsBuilding] = useAtom(isBuildingAtom);
  const [, setIsBuildingOnCanvas] = useAtom(isBuildingOnCanvasAtom);
  const [saveData, setSaveData] = useState(false);
  const [, setBuildOnCanvas] = useState(false);
  const [documentationTitle] = useAtom(documentationTitleAtom);
  const [isCurrentNameValid] = useAtom(isCurrentNameValidAtom);
  const [selectedNodeId] = useAtom(selectedNodeIdAtom);
  // const [, setSelectedVariant] = useAtom(selectedVariantAtom);
  // const [allVariants] = useAtom(allVariantsAtom);

  const isValid =
    !!documentationTitle?.length && isCurrentNameValid && selectedNodeId;

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
      <div className="leftFooterContent">
        {/* <Dropdown
          options={allVariants}
          onSelect={setSelectedVariant}
          placeholder="Select a variant"
        /> */}
      </div>
      <div className="rightFooterContent">
        <div className={isValid ? "" : "split-disabled"} disabled={!isValid}>
          <button
            className={isValid ? "primary" : "primary primary-disabled"}
            onClick={() => {
              setSaveData(true);
              setBuildOnCanvas(true);
            }}
          >
            Build
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
