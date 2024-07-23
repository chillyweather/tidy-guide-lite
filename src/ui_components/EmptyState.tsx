import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import emptyImage from "../images/empty.svg";

export default function EmptyState() {
  return (
    <div
      className={"empty-state"}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <img
        src={emptyImage}
        alt="Please select a component in Figma."
        className={"empty-image"}
      />
      <p>Before initiating the Tidy Builder, you need to select a component.</p>
      <button
        className={"buttonPrimary"}
        onClick={() => {
          emit("GET_SELECTION");
        }}
      >
        Select component
      </button>
    </div>
  );
}
