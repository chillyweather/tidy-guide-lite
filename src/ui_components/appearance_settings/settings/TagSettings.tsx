/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import ColorPickerInput from "src/ui_components/ColorPickerInput";
import { LabelType } from "./CanvasAppearance";
import { Button } from "../Button";
import RadioButton from "../../RadioButton";
function TagColorSection(props: any) {
  return (
    <div className="tags-settings-element">
      <p
        style={{
          margin: 0,
        }}
      >
        Color:
      </p>
      <ColorPickerInput color={props.tagColor} setColor={props.setTagColor} />
    </div>
  );
}

function TagShapeSection({
  labelType,
  setLabelType,
  icons,
}: {
  labelType: string;
  setLabelType: (type: LabelType) => void;
  icons: any;
}) {
  return (
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
  );
}

function TagLineStyleComponent({
  lineType,
  setLineType,
}: {
  lineType: string;
  setLineType: (type: string) => void;
}) {
  return (
    <div className="tags-settings-element">
      <p
        style={{
          margin: 0,
        }}
      >
        style:
      </p>
      <div className="appearance-button-wrapper">
        <RadioButton
          selectedOption={lineType}
          setSelectedOption={setLineType}
          options={["Solid", "Dash"]}
        />
      </div>
    </div>
  );
}

export { TagColorSection, TagShapeSection, TagLineStyleComponent };
