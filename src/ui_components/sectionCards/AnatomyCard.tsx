/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconBoxAlignLeftFilled,
  IconBoxAlignRightFilled,
  IconBoxAlignTopFilled,
  IconBoxAlignBottomFilled,
} from "@tabler/icons-react";
import { h } from "preact";
import NumericInput from "../NumericCheckbox";

const AnatomyCard = ({
  anatomyIndexPosition,
  setAnatomyIndexPosition,
  anatomyIndexSpacing,
  setAnatomyIndexSpacing,
}: {
  anatomyIndexPosition: string;
  setAnatomyIndexPosition: (position: string) => void;
  anatomyIndexSpacing: string;
  setAnatomyIndexSpacing: (spacing: string) => void;
}) => {
  type AnatomyIndexPosition = "left" | "right" | "top" | "bottom";

  function handlePositionChange(position: AnatomyIndexPosition) {
    setAnatomyIndexPosition(position);
  }

  return (
    <div className="anatomy-buttons-wrapper">
      <div className="anatomy-input-wrapper">
        <p style={{ margin: 0, paddingRight: "8px" }}>Layout:</p>
        <div className="anatomy-buttons-internal-wrapper">
          <button
            className={
              anatomyIndexPosition === "left" ? "selected-index-layout" : ""
            }
            onClick={() => handlePositionChange("left")}
            style={{ width: "24px", height: "24px" }}
          >
            <IconBoxAlignRightFilled
              style={{
                color: anatomyIndexPosition === "left" ? "#5C6CFF" : "#9597A2",
              }}
            />
          </button>
          <button
            className={
              anatomyIndexPosition === "right" ? "selected-index-layout" : ""
            }
            onClick={() => handlePositionChange("right")}
            style={{ width: "24px", height: "24px" }}
          >
            <IconBoxAlignLeftFilled
              style={{
                color: anatomyIndexPosition === "right" ? "#5C6CFF" : "#9597A2",
              }}
            />
          </button>
          <button
            className={
              anatomyIndexPosition === "top" ? "selected-index-layout" : ""
            }
            onClick={() => handlePositionChange("top")}
            style={{ width: "24px", height: "24px" }}
          >
            <IconBoxAlignBottomFilled
              style={{
                color: anatomyIndexPosition === "top" ? "#5C6CFF" : "#9597A2",
              }}
            />
          </button>
          <button
            className={
              anatomyIndexPosition === "bottom" ? "selected-index-layout" : ""
            }
            onClick={() => handlePositionChange("bottom")}
            style={{ width: "24px", height: "24px" }}
          >
            <IconBoxAlignTopFilled
              style={{
                color:
                  anatomyIndexPosition === "bottom" ? "#5C6CFF" : "#9597A2",
              }}
            />
          </button>
        </div>
      </div>
      <div className="spacing-input-wrapper">
        <p style={{ margin: 0, paddingRight: "8px" }}>Spacing:</p>
        <NumericInput
          value={parseInt(anatomyIndexSpacing)}
          onChange={(value) => setAnatomyIndexSpacing(value.toString())}
          anatomyIndexPosition={anatomyIndexPosition}
        />
      </div>
    </div>
  );
};

export default AnatomyCard;
