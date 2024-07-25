/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useEffect } from "preact/hooks";
import { DraggableCardList } from "./DraggableCardsList";
//content cards
import HeaderCard from "./sectionCards/HeaderCard";
import { emit } from "@create-figma-plugin/utilities";
import { useAtom } from "jotai";
import {
  selectedNodeKeyAtom,
  selectedNodeIdAtom,
  selectedComponentPicAtom,
  dataForUpdateAtom,
  selectedMasterIdAtom,
  selectedSectionsAtom,
  documentationTitleAtom,
  documentationIdAtom,
  isWipAtom,
  documentationDataAtom,
} from "src/state/atoms";

const ContentFromServer = () => {
  const [selectedSections, setSelectedSections] = useAtom(selectedSectionsAtom);
  const [selectedMasterId] = useAtom(selectedMasterIdAtom);
  const [data]: any = useAtom(dataForUpdateAtom);
  const [selectedNodeKey, setSelectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeIdAtom);
  const [, setSelectedComponentPic] = useAtom(selectedComponentPicAtom);
  const [, setDocumentationTitle] = useAtom(documentationTitleAtom);
  const [, setDocumentationId] = useAtom(documentationIdAtom);
  const [, setIsWip] = useAtom(isWipAtom);
  const [, setDocumentationData] = useAtom(documentationDataAtom);

  const foundData = data.find((item: any) => item.nodeId === selectedMasterId);

  useEffect(() => {
    if (selectedNodeId && selectedNodeKey) {
      emit("GET_NEW_SELECTION", selectedNodeKey, selectedNodeId);
    }
  }, [selectedMasterId, selectedNodeId]);

  useEffect(() => {
    if (foundData && foundData.nodeId) {
      setSelectedSections(foundData.docs);
      setDocumentationTitle(foundData.title);
      setDocumentationId(foundData.nodeId);
      setSelectedNodeKey(foundData.componentKey);
      setSelectedNodeId(foundData.nodeId);
      setIsWip(foundData.inProgress);
      setSelectedComponentPic(foundData.componentPic);
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          nodeId: foundData.nodeId,
        };
      });
    }
  }, [foundData.nodeId]);

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

export default ContentFromServer;
