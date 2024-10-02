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
          {leftItems.map((item, index) => (
            <div className="dialogFlex">
              <div className="inputInputRowStyle">
                <textarea
                  className="columnTextArea listInputStyle"
                  rows={3}
                  placeholder="Type text..."
                  value={item}
                  onInput={(e) => {
                    const newItems = [...leftItems];
                    newItems[index] = e.currentTarget.value;
                    setLeftItems(newItems);
                  }}
                  style={{ minHeight: "32px" }}
                />
                {leftItems.length > 1 && (
                  <button
                    className="closeButton"
                    onClick={() =>
                      deleteInputField(index, leftItems, setLeftItems)
                    }
                  >
                    <IconX />
                  </button>
                )}
              </div>
              {index === leftItems.length - 1 && (
                <button
                  ref={addButtonRef}
                  onClick={() => {
                    addInputField(leftItems, setLeftItems);
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
      <div className="oneColumn">
        <input
          className="columnTitle listInputStyle"
          type="text"
          placeholder="Type title..."
          value={rightTitle || "Don't"}
          onInput={(e) => setRightTitle(e.currentTarget.value)}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {rightItems.map((item, index) => (
            <div className="dialogFlex">
              <div className="inputInputRowStyle">
                <textarea
                  className="columnTextArea listInputStyle"
                  rows={3}
                  placeholder="Type text..."
                  value={item}
                  onInput={(e) => {
                    const newItems = [...rightItems];
                    newItems[index] = e.currentTarget.value;
                    setRightItems(newItems);
                  }}
                  style={{ minHeight: "32px" }}
                />
                {rightItems.length > 1 && (
                  <button
                    className="closeButton"
                    onClick={() =>
                      deleteInputField(index, rightItems, setRightItems)
                    }
                  >
                    <IconX />
                  </button>
                )}
              </div>
              {index === rightItems.length - 1 && (
                <button
                  ref={addButtonRef}
                  onClick={() => {
                    addInputField(rightItems, setRightItems);
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
    </div>
  );
};

export default TwoColumnCard;
