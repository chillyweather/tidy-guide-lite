import { h } from "preact";

export const Link = ({ element, index }: any) => {
  const links = element.content.sources;
  return (
    <div className={"section linkSection"}>
      <div className={'anchorLink'} id={element.title + index}></div>
      {element.title && (
        <div className={"title-row"}>
          <h3 className={"title"}>
            {element.title}
          </h3>
          <a href={"#top"} className={"back-link"}>
            ⬆︎
          </a>
        </div>
      )}
      <div className={"links-block"}>
        {links.length &&
          links.map((input: any) => {
            return (
              <a
                href={input.link}
                target="_blank"
                rel="noopener noreferrer"
                className={"link"}
              >
                {input.source}
              </a>
            );
          })}
      </div>
    </div>
  );
};
