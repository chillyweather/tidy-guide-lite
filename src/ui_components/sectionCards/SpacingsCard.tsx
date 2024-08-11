import { h } from "preact";
import CheckboxElement from "../Checkbox";
import { useAtom } from "jotai";
import { isInternalSpacingAtom } from "src/state/atoms";

const SpacingsCard = () => {
  const [isInternalSpacing, setIsInternalSpacing] = useAtom(
    isInternalSpacingAtom
  );
  return (
    <div className="nothingCards" style={{ marginLeft: "112px" }}>
      <CheckboxElement
        value={isInternalSpacing}
        setValue={setIsInternalSpacing}
        label="Internal Spacings"
      />
    </div>
  );
};

export default SpacingsCard;
