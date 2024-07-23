import { h } from "preact";

export const TwoColumns = ({ element, buildLists, index }: any) => {
  return (
    <div className={"section twoColumnsSection"}>
      <div className={"anchorLink"} id={element.title + index}></div>
      {element.title && (
        <div className={"title-row"}>
          <h3 className={"title"}>{element.title}</h3>
          <a href={"#top"} className={"back-link"}>
            ⬆︎
          </a>
        </div>
      )}
      {Object.keys(element.content).length && (
        <div class={"two-columns"}>
          <div>
            <strong>
              <h4>{element.content.subtitle1}</h4>
            </strong>
            <p style={{ margin: 0 }}>
              {buildLists(element.content.text1.split("\n"), "unordered")}
            </p>
          </div>
          <div>
            <strong>
              <h4>{element.content.subtitle2}</h4>
            </strong>
            <p style={{ margin: 0 }}>
              {buildLists(element.content.text2.split("\n"), "unordered")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
