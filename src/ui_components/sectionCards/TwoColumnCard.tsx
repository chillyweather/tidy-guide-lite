/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconX, IconPlus } from "@tabler/icons-react";
import { useRef } from "preact/hooks";

const TwoColumnCard = ({
  leftTitle,
  setLeftTitle,
  leftItems = [""],
  setLeftItems,
  rightTitle,
  setRightTitle,
  rightItems = [""],
  setRightItems,
}: {
  leftTitle: string;
  setLeftTitle: (title: string) => void;
  leftItems: string[];
  setLeftItems: (items: any[]) => void;
  rightTitle: string;
  setRightTitle: (title: string) => void;
  rightItems: string[];
  setRightItems: (items: any[]) => void;
}) => {
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const addInputField = (items: any[], setItems: (items: any[]) => void) => {
    setItems([...items, ""]);
  };
  const deleteInputField = (index: number, items: any[], setItems: any) => {
    const newInputs = [...items];
    newInputs.splice(index, 1);
    setItems(newInputs);
  };

  return (
    <div className="twoColumnCardBodyContent">
      <div className="oneColumn">
        <input
          className="columnTitle listInputStyle"
          type="text"
          placeholder="Type title..."
          value={leftTitle || "Do"}
          onInput={(e) => setLeftTitle(e.currentTarget.value)}
        />
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          {leftItems.length
            ? leftItems.map((item, index) =>
                InputRow(
                  item,
                  leftItems,
                  index,
                  setLeftItems,
                  deleteInputField,
                  addButtonRef,
                  addInputField
                )
              )
            : InputRow(
                "",
                leftItems,
                0,
                setLeftItems,
                deleteInputField,
                addButtonRef,
                addInputField
              )}
        </div>
      </div>
      <div className="oneColumn">
        <input
          className="columnTitle listInputStyle"
          type="text"
          placeholder="Type title..."
          value={rightTitle || "Don't"}
          onInput={(e) => setRightTitle(e.currentTarget.value)}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {rightItems.length
            ? rightItems.map((item, index) =>
                InputRow(
                  item,
                  rightItems,
                  index,
                  setRightItems,
                  deleteInputField,
                  addButtonRef,
                  addInputField
                )
              )
            : InputRow(
                "",
                rightItems,
                0,
                setRightItems,
                deleteInputField,
                addButtonRef,
                addInputField
              )}
        </div>
      </div>
    </div>
  );
};

function InputRow(
  value: string,
  inputItems: string[],
  index: number,
  setInputItems: (items: any[]) => void,
  deleteInputField: (index: number, items: any[], setItems: any) => void,
  addButtonRef: any,
  addInputField: (items: any[], setItems: (items: any[]) => void) => void
) {
  return (
    <div className="dialogFlex">
      <div className="inputInputRowStyle">
        <textarea
          className="columnTextArea listInputStyle"
          rows={3}
          placeholder="Type text..."
          value={value}
          onInput={(e) => {
            const newItems = [...inputItems];
            newItems[index] = e.currentTarget.value;
            setInputItems(newItems);
          }}
          style={{ minHeight: "32px" }}
        />
        {inputItems.length > 1 && (
          <button
            className="closeButton"
            onClick={() => deleteInputField(index, inputItems, setInputItems)}
          >
            <IconX />
          </button>
        )}
      </div>
      {index === inputItems.length - 1 && (
        <button
          ref={addButtonRef}
          onClick={() => {
            addInputField(inputItems, setInputItems);
          }}
          className="listButtonStyle"
        >
          <IconPlus className={"no-events"} />
        </button>
      )}
    </div>
  );
}

export default TwoColumnCard;
