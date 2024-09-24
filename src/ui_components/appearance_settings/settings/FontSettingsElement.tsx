/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Dropdown, { DropdownOption } from "./Dropdown";
interface FontSettingElementsProps {
  label: string;
  fonts: DropdownOption[];
  appFonts: any[];
  selectedFont: DropdownOption;
  setSelectedFont: (value: DropdownOption) => void;
  selectedStyle: DropdownOption;
  setSelectedStyle: (value: DropdownOption) => void;
}
const FontSettingsElement = ({
  label,
  fonts,
  appFonts,
  selectedFont,
  setSelectedFont,
  selectedStyle,
  setSelectedStyle,
}: FontSettingElementsProps) => {
  const [fontStyles, setFontStyles] = useState<DropdownOption[]>([]);

  useEffect(() => {
    const foundStyles = appFonts.filter(
      (font: any) => font.fontName.family === selectedFont.name
    );
    const fontStyles = foundStyles.map((font: any, index: number) => {
      return {
        id: index,
        name: `${font.fontName.style}`,
      };
    });
    setFontStyles(fontStyles);
  }, [selectedFont]);

  useEffect(() => {
    if (fontStyles.length) {
      const regular = fontStyles.find(
        (style: any) => style.name === selectedStyle.name
      );
      if (regular) {
        setSelectedStyle(regular);
      } else {
        setSelectedStyle(defaultStyle);
      }
    }
  }, [fontStyles]);

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
        options={fontStyles}
        selectedOption={selectedStyle}
        onSelect={(value) => setSelectedStyle(value ?? defaultStyle)}
        placeholder="Style"
      />
    </div>
  );
};

export default FontSettingsElement;
