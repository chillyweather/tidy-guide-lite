import { h } from "preact";
import LinkBlock from "../LinkBlock";
import { IconPlus } from "@tabler/icons-react";

const LinkCard = ({
  sources,
  setSources,
}: {
  sources: any[];
  setSources: Function;
}) => {
  const addSource = () => {
    setSources([...sources, { source: "", link: "" }]);
  };

  return (
    <div className={"linkBlockColumn"}>
      {LinkBlock(sources, setSources)}
      <button
        onClick={(event) => {
          addSource();
          setTimeout(function(){
            //@ts-ignore;
            event.target.parentElement.parentElement.parentElement.getElementsByTagName("input")[event.target.parentElement.parentElement.parentElement.getElementsByTagName("input").length-3].focus();
        }, 200);
          
        }}
        className={"addLink"}>
        <IconPlus className={"no-events"} />
      </button>
    </div>
  );
};

export default LinkCard;
