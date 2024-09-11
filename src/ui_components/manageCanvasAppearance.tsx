/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useAtom } from "jotai";
import {
  appSettingsAtom,
  settingsUnitsAtom,
  settingsRemRootAtom,
} from "../state/atoms";
import { useEffect, useState } from "preact/hooks";
import ColorPickerInput from "./ColorPickerInput";
import { TagLabel, TagLine } from "./tagPreviewElements";
import {
  IconCircleFilled,
  IconSquareFilled,
  IconSquareRoundedFilled,
  IconSquareRotatedFilled,
} from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import RadioButton from "./RadioButton";
// import { NumericInput } from "tidy-ds";

export default function manageCanvasAppearance() {
  const [appSettings, setAppSettings]: any = useAtom(appSettingsAtom);
  const [tagLabelText] = useState("42");

  const [labelType, setLabelType] = useState<
    "round" | "square" | "square-rounded" | "square-rounded-rotated"
  >(appSettings.labelType || "round");
  const [tagColor, setTagColor] = useState(appSettings.tagColor || "#F1592A");
  const [lineType, setLineType] = useState(appSettings.lineType || "Solid");
  const [units, setUnits] = useAtom(settingsUnitsAtom);
  const [rootValue, setRootValue] = useAtom(settingsRemRootAtom);

  useEffect(() => {
    setAppSettings({
      labelType,
      lineType,
      tagColor,
      units,
      rootValue,
    });
  }, [labelType, lineType, tagColor, units, rootValue]);

  useEffect(() => {
    if (appSettings.rootValue) {
      setRootValue(appSettings.rootValue);
    }
    if (appSettings.units) {
      setUnits(appSettings.units);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(appSettings).length) {
      emit("UPDATE_APP_SETTINGS", appSettings);
    }
  }, [appSettings]);

  const icons = {
    round: (
      <IconCircleFilled
        style={{
          color: labelType === "round" ? "#5C6CFF" : "#9597A2",
          height: "13px",
          width: "13px",
        }}
      />
    ),
    square: (
      <IconSquareFilled
        style={{
          color: labelType === "square" ? "#5C6CFF" : "#9597A2",
          height: "13px",
          width: "13px",
        }}
      />
    ),
    "square-rounded": (
      <IconSquareRoundedFilled
        style={{
          color: labelType === "square-rounded" ? "#5C6CFF" : "#9597A2",
          height: "13px",
          width: "13px",
        }}
      />
    ),
    "square-rounded-rotated": (
      <IconSquareRotatedFilled
        style={{
          color: labelType === "square-rounded-rotated" ? "#5C6CFF" : "#9597A2",
          height: "13px",
          width: "13px",
        }}
      />
    ),
  };

  return (
    <div className="manage-canvas">
      <h2>Documentation Appearance</h2>
      <div className="anatomy-tags-settings-with-preview">
        <div className="anatomy-tags-settings">
          <div className="tags-settings-element">
            <p style={{ margin: 0 }}>Color:</p>
            <ColorPickerInput color={tagColor} setColor={setTagColor} />
          </div>
          <div className="tags-settings-element">
            <p style={{ margin: 0 }}>Shape:</p>
            <div
              className="appearance-button-wrapper"
              style={{
                border: "1px solid #D2DCF9",
                borderRadius: "6px",
                height: "36px",
                padding: "4px",
              }}
            >
              <Button
                label={icons.round}
                type="round"
                labelType={labelType}
                setType={setLabelType}
              />
              <Button
                label={icons.square}
                type="square"
                labelType={labelType}
                setType={setLabelType}
              />
              <Button
                label={icons["square-rounded"]}
                type="square-rounded"
                labelType={labelType}
                setType={setLabelType}
              />
              <Button
                label={icons["square-rounded-rotated"]}
                type="square-rounded-rotated"
                labelType={labelType}
                setType={setLabelType}
              />
            </div>
          </div>
          <div className="tags-settings-element">
            <p style={{ margin: 0 }}>style:</p>
            <div className="appearance-button-wrapper">
              <RadioButton
                selectedOption={lineType}
                setSelectedOption={setLineType}
                options={["Solid", "Dash"]}
              />
            </div>
          </div>
          {/* <div className="tags-settings-element">
            <p style={{ margin: 0 }}>Units:</p>
            <div className="appearance-button-wrapper">
              <RadioButton
                selectedOption={units}
                setSelectedOption={setUnits}
                options={["px", "rem"]}
              />
            </div>
          </div>
          <NumericInput value={rootValue} onChange={setRootValue} /> */}
        </div>
        <div className="tag-preview-frame">
          <div className="tag-preview">
            <TagLabel label={tagLabelText} color={tagColor} shape={labelType} />
            <TagLine color={tagColor} type={lineType} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Button = ({
  label,
  type,
  labelType,
  setType,
}: {
  label: JSX.Element | string;
  type: string;
  labelType: string;
  setType: (type: any) => void;
}) => {
  function handleClick(type: string) {
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
