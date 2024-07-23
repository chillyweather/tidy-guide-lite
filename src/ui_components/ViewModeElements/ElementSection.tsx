/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { Link } from "./sections/Link";
import { Video } from "./sections/Video";
import { Image } from "./sections/Image";
import { List } from "./sections/List";
import { TwoColumns } from "./sections/TwoColumns";
import { DosDonts } from "./sections/DosDonts";
import { Text } from "./sections/Text";

const ElementSection = ({
  element,
  index,
  navigationLinks,
}: {
  element: any;
  index: number;
  navigationLinks: any;
}) => {
  const renderList = (arr: any) => {
    return (
      <ul className="list">
        {arr.map(
          (line: any, i: number) =>
            !!line.length && (
              <li key={i} className="list-item">
                {line}
              </li>
            )
        )}
      </ul>
    );
  };

  switch (element.datatype) {
    case "link":
      return (
        <Link element={element} index={index} headerData={navigationLinks} />
      );
    case "text":
      return (
        <Text element={element} index={index} headerData={navigationLinks} />
      );
    case "two-columns":
      return (
        <TwoColumns
          element={element}
          buildLists={renderList}
          index={index}
          headerData={navigationLinks}
        />
      );
      case "dos-donts":
      return (
        <DosDonts
          element={element}
          buildLists={renderList}
          index={index}
          headerData={navigationLinks}
        />
      );
    case "list":
      return <List element={element} buildLists={renderList} index={index} />;
    case "image":
      return <Image element={element} index={index} />;
    case "video":
      return <Video element={element} index={index} />;
    default:
      return null;
  }
};

export default ElementSection;
