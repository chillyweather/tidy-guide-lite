/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { IconX } from "@tabler/icons-react";

const TwoColumnCard = ({
  leftTitle,
  setLeftTitle,
  leftItems,
  setLeftItems,
  rightTitle,
  setRightTitle,
  rightItems,
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
          value={leftTitle}
          onInput={(e) => setLeftTitle(e.currentTarget.value)}
        />
        <div>
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
                <button
                  onClick={() =>
                    deleteInputField(index, leftItems, setLeftItems)
                  }
                >
                  <IconX />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="oneColumn">
        <input
          className="columnTitle listInputStyle"
          type="text"
          placeholder="Type title..."
          value={rightTitle}
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
                <button
                  onClick={() =>
                    deleteInputField(index, rightItems, setRightItems)
                  }
                >
                  <IconX />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnCard;
