import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import {
  IconSpacingVertical,
  IconSpacingHorizontal,
} from "@tabler/icons-react";

interface NumericInputProps {
  value: number;
  onChange: (newValue: number) => void;
  anatomyIndexPosition: string;
}

const NumericInput = ({
  value,
  onChange,
  anatomyIndexPosition,
}: NumericInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    const newValue = parseFloat(event.currentTarget.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <input
        style={{
          width: "80px",
          height: "32px",
          paddingLeft: "22px",
          borderRadius: "4px",
        }}
        type="number"
        value={inputValue}
        onInput={handleInputChange}
      />
      {anatomyIndexPosition === "left" || anatomyIndexPosition === "right" ? (
        <IconSpacingHorizontal
          size={16}
          style={{
            position: "absolute",
            left: "5px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#40424F",
          }}
        />
      ) : (
        <IconSpacingVertical
          size={16}
          style={{
            position: "absolute",
            left: "5px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#40424F",
          }}
        />
      )}
    </div>
  );
};

export default NumericInput;
