import { h } from "preact";
import Dropdown, { DropdownOption } from "../Dropdown";
interface FontSettingElementsProps {
  label: string;
  fonts: DropdownOption[];
  styles: DropdownOption[];
  selectedFont: DropdownOption;
  setSelectedFont: (value: DropdownOption) => void;
  selectedStyle: DropdownOption;
  setSelectedStyle: (value: DropdownOption) => void;
}
const FontSettingsElement = ({
  label,
  fonts,
  styles,
  selectedFont,
  setSelectedFont,
  selectedStyle,
  setSelectedStyle,
}: FontSettingElementsProps) => {
  const defaultFont = {
    id: 999999,
    name: "Inter",
  };
  const defaultStyle = {
    id: 999999,
    name: "Regular",
  };
  return (
    <div className="font-block">
      <p>{label}: </p>
      <Dropdown
        options={fonts}
        selectedOption={selectedFont}
        onSelect={(value) => setSelectedFont(value ?? defaultFont)}
        placeholder="Font"
      />
      <Dropdown
        options={styles}
        selectedOption={selectedStyle}
        onSelect={(value) => setSelectedStyle(value ?? defaultStyle)}
        placeholder="Style"
      />
    </div>
  );
};

export default FontSettingsElement;
