import { h } from "preact";

const RadioButton = ({
  selectedOption,
  setSelectedOption,
  options,
}: {
  selectedOption: string;
  setSelectedOption: (prop: string) => void;
  options: string[];
}) => {
  const handleChange = (
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    setSelectedOption(event.currentTarget.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <input
          type="radio"
          id={options[0]}
          name={options[0]}
          value={options[0]}
          checked={selectedOption === `${options[0]}`}
          onChange={handleChange}
        />
        <label htmlFor={options[0]} style={{ color: "#323232" }}>
          {options[0]}
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <input
          type="radio"
          id={options[1]}
          name={options[1]}
          value={options[1]}
          checked={selectedOption === `${options[1]}`}
          onChange={handleChange}
        />
        <label htmlFor={options[0]} style={{ color: "#323232" }}>
          {options[1]}
        </label>
      </div>
    </div>
  );
};

export default RadioButton;
