import { h } from "preact";
import loader from "../images/loader-v1-b.gif";
import { VerticalSpace, Text, Muted } from "@create-figma-plugin/ui";
const LoaderPage = () => {
  return (
    <div
      // className={"loader"}
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <img src={loader} id={"loader-image"} />
      <VerticalSpace space="medium" />
      <Text>
        <Muted>Data is loading...</Muted>
      </Text>
    </div>
  );
};
export default LoaderPage;
