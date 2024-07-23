/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import {
  currentUserIdAtom,
  currentUserRoleAtom,
  selectedCollectionAtom,
  isCollectionSwitchingAtom,
  dataForUpdateAtom,
} from "src/state/atoms";
import { findUserRole } from "src/ui_components/ui_functions/findUserRole";

interface DropdownProps {
  options: any[];
  onSelect: any;
}

const CollectionsDropdown: FunctionalComponent<DropdownProps> = ({
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsOwner] = useState(false);
  const [currentUserId] = useAtom(currentUserIdAtom);
  const [, setCurentUserRole] = useAtom(currentUserRoleAtom);
  const [selectedCollection, setSelectedCollection]: any = useAtom(
    selectedCollectionAtom
  );
  const [, setIsCollectionSwitching] = useAtom(isCollectionSwitchingAtom);
  const [, setDataForUpdate] = useAtom(dataForUpdateAtom);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedCollection(option);
    setIsOpen(false);
    onSelect(option || {});
  };

  useEffect(() => {
    if (selectedCollection) {
      if (currentUserId === selectedCollection.owner) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [selectedCollection]);

  useEffect(() => {
    const role = findUserRole(selectedCollection, currentUserId);
    setCurentUserRole(role);
  }, [selectedCollection]);

  return (
    <div class="dropdown-comp">
      <div className="dropdown-wrapper">
        <button
          className="dropdown-toggle"
          onClick={toggleDropdown}
          onBlur={() => setIsOpen(false)}
        >
          {selectedCollection && (
            <div className={"select-collection-dropdown-title"}>
              <div id={"dropdown-title"}>
                {selectedCollection.name || "Select an option"}
              </div>
            </div>
          )}
        </button>

        {isOpen && (
          <div class="dropdown-menu">
            {options.map((option) => {
              const role = findUserRole(option, currentUserId);
              return (
                <div
                  className={"dropdown-item"}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (option.name !== selectedCollection.name)
                      setIsCollectionSwitching(true);
                    setDataForUpdate([]);
                    selectOption(option);
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

export default CollectionsDropdown;
