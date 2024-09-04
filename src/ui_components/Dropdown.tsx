import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

interface DropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  placeholder?: string;
}

export const Dropdown = ({ options, onSelect, placeholder }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    console.log("options", options);
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);

  return (
    <div className="dropdown">
      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{ color: "black" }}
      >
        {selectedOption || placeholder || "Select an option"}
        <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                handleOptionClick(option);
              }}
              className={selectedOption === option ? "selected" : ""}
              style={{ color: "black" }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
