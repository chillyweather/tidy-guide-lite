import { h } from "preact";

export const DosDonts = ({ element, buildLists, index }: any) => {
  return (
    <div className={"section twoColumnsSection dosDontSection"}>
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
          <div className={"list-flex"}>
            <strong>
              <h4>Do's</h4>
            </strong>
            <p style={{ margin: 0 }}>
              {buildLists(element.content.text1.split("\n"), "unordered")}
            </p>
          </div>
          <div className={"list-flex"}>
            <strong>
              <h4>Don'ts</h4>
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
