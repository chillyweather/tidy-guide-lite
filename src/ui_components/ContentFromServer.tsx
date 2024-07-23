/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
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
  isDraftAtom,
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
  const [thisCardIsDraft, setThisCardIsDraft] = useState(false);
  const [, setIsDraft] = useAtom(isDraftAtom);
  const [, setDocumentationTitle] = useAtom(documentationTitleAtom);
  const [, setDocumentationId] = useAtom(documentationIdAtom);
  const [, setIsWip] = useAtom(isWipAtom);
  const [, setDocumentationData] = useAtom(documentationDataAtom);

  const foundData = data.find((item: any) => item._id === selectedMasterId);

  useEffect(() => {
    setIsDraft(thisCardIsDraft);
  }, [thisCardIsDraft]);

  useEffect(() => {
    setThisCardIsDraft(foundData.draft);
  }, [foundData.draft]);

  useEffect(() => {
    if (selectedNodeId && selectedNodeKey) {
      emit("GET_NEW_SELECTION", selectedNodeKey, selectedNodeId);
    }
  }, [selectedMasterId, selectedNodeId]);

  useEffect(() => {
    if (foundData && foundData._id) {
      setSelectedSections(foundData.docs);
      setDocumentationTitle(foundData.title);
      setDocumentationId(foundData._id);
      setSelectedNodeKey(foundData.componentKey);
      setSelectedNodeId(foundData.nodeId);
      setIsWip(foundData.inProgress);
      setSelectedComponentPic(foundData.componentPic);
      setDocumentationData((prevDocumentation: any) => {
        return {
          ...prevDocumentation,
          _id: foundData._id,
        };
      });
    }
  }, [foundData._id]);

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
