/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { LabelType } from "./settings/CanvasAppearance";

export const Button = ({
  label,
  type,
  labelType,
  setType,
}: {
  label: JSX.Element | string;
  type: LabelType;
  labelType: string;
  setType: (type: LabelType) => void;
}) => {
  function handleClick(type: LabelType) {
    setType(type);
  }

  const selectedStyle = {
    border: "1px solid #5C6CFF",
    height: "26px",
    width: "26px",
    backgroundColor: "#E5E8FF",
  };
  const idleStyle = {
    height: "26px",
    width: "26px",
  };

  return (
    <button
      className="appearance-button"
      onClick={() => handleClick(type)}
      style={type === labelType ? selectedStyle : idleStyle}
    >
      {label}
    </button>
  );
};
