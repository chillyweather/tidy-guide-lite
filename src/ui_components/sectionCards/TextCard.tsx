import { h } from "preact";

const TextCard = ({
  textContent,
  setTextContent,
}: {
  textContent: string;
  setTextContent: Function;
}) => {
  return (
    <div className="textCardBodyContent">
      <textarea
        className="cardTextArea"
        rows={15}
        maxLength={1000}
        placeholder="Enter text..."
        value={textContent}
        onInput={(e) => setTextContent(e.currentTarget.value)}
      />
      <div className="textSymbolsCounterRow">
        <div className="textSymbolsCounter">{textContent.length}/1000</div>
      </div>
    </div>
  );
};

export default TextCard;
