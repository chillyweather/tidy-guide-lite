import { h } from "preact";

const ColorPickerInput = ({
  color,
  setColor,
}: {
  color: string;
  setColor: (newColor: string) => void;
}) => {
  const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setColor(target.value);
  };

  const handleColorChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setColor(target.value);
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <input
        type="color"
        value={color}
        onInput={handleColorChange}
        className={"color-picker-input"}
      />
      <input
        type="text"
        value={color}
        onInput={handleInputChange}
        style={{ marginRight: "6px", height: "32px" }}
      />
    </div>
  );
};

export default ColorPickerInput;
