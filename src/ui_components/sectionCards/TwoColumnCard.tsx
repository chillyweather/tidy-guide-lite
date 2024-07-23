import { h } from "preact";

const TwoColumnCard = ({
  data,
  leftTitle,
  setLeftTitle,
  leftTextContent,
  setLeftTextContent,
  rightTitle,
  setRightTitle,
  rightTextContent,
  setRightTextContent,
}: {
  data: any;
  leftTitle: string;
  setLeftTitle: Function;
  leftTextContent: string;
  setLeftTextContent: Function;
  rightTitle: string;
  setRightTitle: Function;
  rightTextContent: string;
  setRightTextContent: Function;
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
