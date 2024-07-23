/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";

export const Text = ({ element, index }: any) => {
  const textArray = element.text ? element.text.split("\n") : [];
  return (
    <div className={"section textSection"}>
      <div className={"anchorLink"} id={element.title + index}></div>
      {element.title && (
        <div className={"title-row"}>
          <h3 className={"title"}>{element.title}</h3>
          <a href={"#top"} className={"back-link"}>
            ⬆︎
          </a>
        </div>
      )}
      {/* {element.text.length && <p>{element.text}</p>} */}
      {textArray &&
        textArray.length &&
        textArray.map(
          (paragraph: any, i: number) =>
            !!paragraph.length && <p key={i}>{paragraph}</p>
        )}
    </div>
  );
};
