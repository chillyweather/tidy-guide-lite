/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import imgloader from "../images/img-loader.gif";
import brokenImg from "../images/broken-image.svg";
import { Button } from "@create-figma-plugin/ui";

function hideImg(event: any) {
  event.target.classList.add("broken");
}

function loadImg(event: any) {
  event.target.classList.add("loaded");
}

export const Image = ({
  element,
  setCurrentImage,
  setIsImageOpen,
  index,
}: any) => (
  <div className={"section imageSection"}>
    <div className={"anchorLink"} id={element.title + index}></div>
    {element.title && (
      <div className={"title-row"}>
        <h3 className={"title"}>{element.title}</h3>
        <a href={"#top"} className={"back-link"}>
          ⬆︎
        </a>
      </div>
    )}
    {element.content.remoteImageLink.length && (
      <Button
        onClick={() => {
          setCurrentImage(element.content.remoteImageLink);
          setIsImageOpen(true);
        }}
        style={{
          cursor: "pointer",
          height: "100%",
          backgroundColor: "transparent",
          padding: 0,
        }}
      >
        <div className={"image-wrapper"}>
          <img
            className={"image"}
            src={element.content.remoteImageLink}
            onError={(event) => {
              hideImg(event);
            }}
            onLoad={(event) => {
              loadImg(event);
            }}
          />
          <div className={"invalid-image"}>
            <img src={brokenImg} />
            <h2>Invalid Image</h2>
            <p>The link image you are trying to access does not exist.</p>
          </div>
          <img src={imgloader} className={"img-loader"} />
        </div>
      </Button>
    )}
  </div>
);
