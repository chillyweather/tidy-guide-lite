/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import {
  currentUserIdAtom,
  currentUserRoleAtom,
  selectedCollectionAtom,
  selectedCollectionInSettingsAtom,
} from "src/state/atoms";
import { findUserRole } from "src/ui_components/ui_functions/findUserRole";

interface DropdownProps {
  options: any[];
}

const CollectionsInSettingsDropdown: FunctionalComponent<DropdownProps> = ({
  options,
}) => {
  const [filteredOptions, setFilteredOptions]: any = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserId] = useAtom(currentUserIdAtom);
  const [, setCurentUserRole] = useAtom(currentUserRoleAtom);
  const [selectedCollectionInSettings, setSelectedCollectionInSettings]: any =
    useAtom(selectedCollectionInSettingsAtom);
  const [selectedCollection]: any = useAtom(selectedCollectionAtom);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    console.log("option", option);
    setSelectedCollectionInSettings(option);
    // setSelectedCollection(option);
    // setIsOpen(false);
  };

  useEffect(() => {
    const filteredCollections = options.filter(
      (collection) => collection.owner === currentUserId
    );
    setFilteredOptions(filteredCollections);
  }, [options]);

  useEffect(() => {
    if (selectedCollection) {
      setSelectedCollectionInSettings(selectedCollection);
    }
  }, []);

  useEffect(() => {
    const role = findUserRole(selectedCollectionInSettings, currentUserId);
    setCurentUserRole(role);
  }, [selectedCollectionInSettings]);

  return (
    <div class="dropdown-comp">
      <div className="dropdown-wrapper">
        <button
          className="dropdown-toggle"
          onClick={toggleDropdown}
          onBlur={() => setIsOpen(false)}
        >
          {filteredOptions[0] && (
            <div className={"select-collection-dropdown-title"}>
              <div
                id={"dropdown-title"}
                onBlur={() => {
                  setIsOpen(false);
                }}
              >
                {(selectedCollectionInSettings &&
                  selectedCollectionInSettings.name) ||
                  "Select an option"}
              </div>
            </div>
          )}
        </button>
        {isOpen && (
          <div class="dropdown-menu">
            {filteredOptions.map((option: any) => {
              const role = findUserRole(option, currentUserId);
              return (
                <div
                  className={"dropdown-item"}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectOption(option);
                    setIsOpen(false);
                  }}
                >
                  <div>{option.name}</div>{" "}
                  <span className={"tag " + role}></span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsInSettingsDropdown;
