import { h } from "preact";

const ReleaseNotesCard = ({
  setReleaseNotesComment,
  releaseNotesComment,
  setReleaseNotesDate,
}: {
  setReleaseNotesComment: Function;
  releaseNotesComment: string;
  setReleaseNotesDate: Function;
}) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  const currentDateTime = `${currentDate} ${currentTime}`;
  setReleaseNotesDate(currentDateTime);

  return (
    // <div className="textCardBodyContent">
    //   <textarea
    //     className={"cardTextArea"}
    //     rows={4}
    //     maxLength={600}
    //     placeholder="Description (optional)"
    //     value={releaseNotesComment}
    //     onInput={(e) => setReleaseNotesComment(e.currentTarget.value)}
    //   >
    //   </textarea>
    //   <div className="textSymbolsCounterRow">
    //     <div className="textSymbolsCounter">{releaseNotesComment.length}/600</div>
    //   </div>
    // </div>
    
    <div className="nothingCards">
      <p>This element will only be visible on canvas</p>
    </div>
  );
};

export default ReleaseNotesCard;
