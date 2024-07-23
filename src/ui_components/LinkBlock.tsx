/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { videoTextBoxElement } from "./textBoxForLinksElement";
import { IconX } from "@tabler/icons-react";

function LinkBlock(sources: any, setSources: any) {
  const addSource = () => {
    setSources([...sources, { source: "", link: "" }]);
  };

  const deleteSource = (index: number) => {
    const newSources = [...sources];
    newSources.splice(index, 1);
    setSources(newSources);
  };

  const updateSource = (
    index: number,
    field: "source" | "link",
    value: string
  ) => {
    const newSources = [...sources];
    newSources[index][field] = value;
    setSources(newSources);
  };

  return (
    <div className={"linkBlock"}>
      {sources.map((source: any, index: number) => (
        <div key={index} className={"singleLink"}>
          {videoTextBoxElement(
            source.source,
            (value: any) => updateSource(index, "source", value),
            `Add title...`
          )}
          {videoTextBoxElement(
            source.link,
            (value: any) => updateSource(index, "link", value),
            `Paste URL...`,
            "link",
            addSource,
            source.source.length === 0 ? true : false
          )}
          <button onClick={() => deleteSource(index)}>
            <IconX />
          </button>
        </div>
      ))}
    </div>
  );
}

export default LinkBlock;
