import { h } from "preact";

const TwoColumnCard = ({
  leftTitle,
  setLeftTitle,
  leftTextContent,
  setLeftTextContent,
  rightTitle,
  setRightTitle,
  rightTextContent,
  setRightTextContent,
}: {
  leftTitle: string;
  setLeftTitle: (title: string) => void;
  leftTextContent: string;
  setLeftTextContent: (text: string) => void;
  rightTitle: string;
  setRightTitle: (title: string) => void;
  rightTextContent: string;
  setRightTextContent: (text: string) => void;
}) => {
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
        <div className="dialogFlex">
          <textarea
            className="columnTextArea listInputStyle"
            rows={15}
            maxLength={1000}
            placeholder="Type text..."
            value={leftTextContent}
            onInput={(e) => setLeftTextContent(e.currentTarget.value)}
          />
          <div className="textSymbolsCounterRow">
            <div className="textSymbolsCounter">
              {leftTextContent.length}/1000
            </div>
          </div>
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
        <div className="dialogFlex">
          <textarea
            className="columnTextArea listInputStyle"
            rows={15}
            maxLength={1000}
            placeholder="Type text..."
            value={rightTextContent}
            onInput={(e) => setRightTextContent(e.currentTarget.value)}
          />
          <div className="textSymbolsCounterRow">
            <div className="textSymbolsCounter">
              {rightTextContent.length}/1000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnCard;
