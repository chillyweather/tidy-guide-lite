import { h, FunctionComponent } from "preact";
import { useState } from "preact/hooks";

interface NumericInputProps {
  value: number;
  onChange: (newValue: number) => void;
  onBlur?: (value: number) => void;
  placeholder?: string;
  className?: string;
}

const NumericInput: FunctionComponent<NumericInputProps> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInputChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    const newValue = e.currentTarget.value;
    setInputValue(newValue);
    if (!isNaN(parseFloat(newValue))) {
      onChange(parseFloat(newValue));
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(parseFloat(inputValue));
    }
  };

  return (
    <input
      type="number"
      value={inputValue}
      onInput={handleInputChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default NumericInput;
