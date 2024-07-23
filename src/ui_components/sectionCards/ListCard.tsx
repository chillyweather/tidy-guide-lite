/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IconX, IconPlus } from "@tabler/icons-react";
import { h, FunctionComponent } from "preact";
import { useRef, useEffect } from "preact/hooks";

interface ListCardProps {
  listItems: any[];
  setListItems: (items: any[]) => void;
}

const ListCard: FunctionComponent<ListCardProps> = ({
  listItems,
  setListItems,
}) => {
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const addInputField = () => {
    setListItems([...listItems, ""]);
  };

  const deleteInputField = (index: number) => {
    const newInputs = [...listItems];
    newInputs.splice(index, 1);
    setListItems(newInputs);
  };

  const handleInputChange = (index: number, event: Event) => {
    const newInputs = [...listItems];
    const newValue = (event.target as HTMLInputElement).value;
    if (newValue === "") return;
    newInputs[index] = newValue;
    setListItems(newInputs);
  };

  useEffect(() => {
    if (addButtonRef.current) {
      const parentElement = addButtonRef.current.parentElement?.parentElement;
      if (parentElement) {
        const inputElements = parentElement.getElementsByTagName("input");
        inputElements[inputElements.length - 1].focus();
      }
    }
  }, [listItems]);

  return (
    <div className="listCardContentStyle">
      <div className="listInputColumnStyle">
        {listItems.map((value: string, index: number) => (
          <div key={index} className="listCollumnStyle">
            <div className="inputInputRowStyle">
              <input
                type="text"
                value={value}
                onInput={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => {
                  e.key === "Enter" &&
                    (e.target as HTMLInputElement).value &&
                    addInputField();
                }}
                className="listInputStyle"
                placeholder="Enter text..."
              />
              <button onClick={() => deleteInputField(index)}>
                <IconX />
              </button>
            </div>
            {index === listItems.length - 1 && (
              <button
                ref={addButtonRef}
                onClick={() => {
                  addInputField();
                }}
                className="listButtonStyle"
              >
                <IconPlus className={"no-events"} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCard;
