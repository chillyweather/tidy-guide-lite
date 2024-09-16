/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import "!./Dropdown.css";

/**
 * Represents an option in a dropdown menu.
 *
 * @property {string|number} id - A unique identifier for the option.
 * @property {string} name - The display name of the option.
 * @property {any} [key: string] - Any additional properties associated with the option.
 */
export interface DropdownOption {
  id: string | number;
  name: string;
  [key: string]: any;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedOption?: DropdownOption | null;
  onSelect: (option: DropdownOption | null) => void;
  placeholder?: string;
  renderOption?: (option: DropdownOption) => h.JSX.Element;
}

interface DropdownButtonProps {
  selectedOption?: DropdownOption | null;
  placeholder?: string;
  toggleDropdown: () => void;
  setIsOpen: (value: boolean) => void;
}

/**
 * Renders a button that toggles the dropdown menu.
 *
 * @param selectedOption - The currently selected `DropdownOption`, or `null` if no option is selected.
 * @param placeholder - The placeholder text to display when no option is selected.
 * @param toggleDropdown - A function that toggles the visibility of the dropdown menu.
 * @param setIsOpen - A function that sets the open state of the dropdown menu.
 * @returns A JSX element representing the dropdown toggle button.
 */
const DropdownButton: FunctionalComponent<DropdownButtonProps> = ({
  selectedOption,
  placeholder,
  toggleDropdown,
  setIsOpen,
}) => (
  <button
    className="dropdown-toggle"
    onClick={toggleDropdown}
    onBlur={() => setIsOpen(false)}
  >
    <div className="select-dropdown-title">
      <div id="dropdown-title">
        {selectedOption ? selectedOption.name : placeholder}
      </div>
    </div>
  </button>
);

interface DropdownMenuProps {
  options: DropdownOption[];
  handleSelect: (option: DropdownOption) => void;
  renderOption?: (option: DropdownOption) => h.JSX.Element;
}

/**
 * Renders a dropdown menu with the provided options.
 *
 * @param options - An array of `DropdownOption` objects representing the available options in the dropdown.
 * @param handleSelect - A callback function that is called when the user selects an option.
 * @param renderOption - An optional function to render a custom UI for each dropdown option.
 */
const DropdownMenu: FunctionalComponent<DropdownMenuProps> = ({
  options,
  handleSelect,
  renderOption,
}) => (
  <div className="dropdown-menu">
    {options.map((option) => (
      <div
        key={option.id}
        className="dropdown-item"
        onMouseDown={(e) => {
          e.preventDefault();
          handleSelect(option);
        }}
      >
        {renderOption ? renderOption(option) : option.name}
      </div>
    ))}
  </div>
);

/**
 * A reusable dropdown component that allows users to select an option from a list.
 *
 * @param options - An array of `DropdownOption` objects representing the available options in the dropdown.
 * @param selectedOption - The currently selected `DropdownOption`.
 * @param onSelect - A callback function that is called when the user selects an option.
 * @param placeholder - The placeholder text to display when no option is selected.
 * @param renderOption - An optional function to render a custom UI for each dropdown option.
 */
const Dropdown: FunctionalComponent<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  placeholder = "Select an option",
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-comp">
      <div className="dropdown-wrapper">
        <DropdownButton
          selectedOption={selectedOption}
          placeholder={placeholder}
          toggleDropdown={toggleDropdown}
          setIsOpen={setIsOpen}
        />
        {isOpen && (
          <DropdownMenu
            options={options}
            handleSelect={handleSelect}
            renderOption={renderOption}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
