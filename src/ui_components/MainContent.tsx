/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useAtom } from "jotai";
import { selectedSectionsAtom } from "../state/atoms";
import { DraggableCardList } from "./DraggableCardsList";
import HeaderCard from "./sectionCards/HeaderCard";

const MainContent = () => {
  const [selectedSections, setSelectedSections] = useAtom(selectedSectionsAtom);
  return (
    <div className="mainContent">
      <HeaderCard />
      <DraggableCardList
        items={selectedSections}
        setItems={setSelectedSections}
      />
    </div>
  );
};

export default MainContent;
