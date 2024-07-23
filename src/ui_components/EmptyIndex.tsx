import { h } from "preact";
import EmptyState from "../images/empty-state.svg";

export default function EmptyIndex() {
  return (
    <div className="empty-index">
      <img src={EmptyState} className={"empty-index-image"} />
      <div className="empty-index-flex">
        <h2>Looks like you don't have any Documentation</h2>
        <p>Fortunately, it's easy to create documentation</p>
      </div>
      <button
        className={"blue-button"}
        onClick={() => {
          document.getElementById("new-button")?.click();
        }}
      >
        Start Documenting
      </button>
    </div>
  );
}
