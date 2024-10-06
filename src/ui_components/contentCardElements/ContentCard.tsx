/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { emit } from "@create-figma-plugin/utilities";
import { useAtom } from "jotai";
import {
  appSettingsAtom,
  currentFigmaFileAtom,
  currentFigmaPageAtom,
  documentationDataAtom,
  documentationTitleAtom,
  isBuildingAtom,
  isFromSavedDataAtom,
  layoutTemplatesAtom,
  sectionToDeleteAtom,
  sectionToDeleteIndexAtom,
  selectedCardAtom,
  selectedNodeIdAtom,
  selectedNodeKeyAtom,
  selectedSectionsAtom,
  showDeleteSectionPopupAtom,
  selectedElementNameAtom,
} from "../../state/atoms";
import {
  IconGripVertical,
  IconChevronDown,
  IconPilcrow,
  IconVideo,
  IconColumns,
  IconExposure,
  IconListDetails,
  IconLink,
  IconPhoto,
  IconCopy,
  IconTrash,
  IconArtboard,
  IconSparkles,
  IconClover,
} from "@tabler/icons-react";
import AnatomyIcon from "../../images/anatomy.svg";
import SpacingIcon from "../../images/spacing.svg";
import PropertyIcon from "../../images/property.svg";
import VariantsIcon from "../../images/variants.svg";
import ReleaseNotesIcon from "../../images/release-notes.svg";

import { duplicateSection, openSection } from "../ui_functions/cardActions";
import { useCardState } from "../hooks/useCardState";
import { currentCardContent } from "./CardTypeRendered";

//content cards
import HeaderCard from "../sectionCards/HeaderCard";
import { useEffect } from "preact/hooks";
import { getDosAndDonts } from "../ai_functions/getDosAndDonts";
import { getTextSectionRequest } from "../ai_functions/getTextSectionRequest";
import { askClaude } from "../ai_functions/claudeTest";
import {
  makeDraggable,
  removeDraggable,
  fillDosAndDontsInputs,
} from "./ContentCardUtils";

export const ContentCard = (card: any, index: number) => {
  const [isFromSavedData] = useAtom(isFromSavedDataAtom);
  const [appSettings] = useAtom(appSettingsAtom);
  const [, setDocumentationData] = useAtom(documentationDataAtom);
  const [documentationTitle] = useAtom(documentationTitleAtom);
  const [isBuilding, setIsBuilding] = useAtom(isBuildingAtom);
  const [selectedCard, setSelectedCard] = useAtom(selectedCardAtom);
  const [selectedElementName] = useAtom(selectedElementNameAtom);
  const [, setSelectedSections]: any = useAtom(selectedSectionsAtom);
  const {
    cardTitle,
    setCardTitle,
    paragraphTextContent,
    setParagraphTextContent,
    leftTitle,
    rightTitle,
    leftItems,
    setLeftItems,
    rightItems,
    setRightItems,
    listItems,
    sources,
    remoteImageLink,
    anatomyIndexPosition,
    anatomyIndexSpacing,
    releaseNotesMessage,
    releaseNotesDate,
    isInternalSpacing,
    setIsInternalSpacing,
  } = useCardState(card, isFromSavedData);

  const [, setShowDeleteSectionPopup] = useAtom(showDeleteSectionPopupAtom);
  const [, setSectionToDelete] = useAtom(sectionToDeleteAtom);
  const [, setSectionToDeleteIndex] = useAtom(sectionToDeleteIndexAtom);
  const [selectedNodeId] = useAtom(selectedNodeIdAtom);
  const [selectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [currentPage] = useAtom(currentFigmaPageAtom);
  const [currentDocument] = useAtom(currentFigmaFileAtom);
  const [layoutTemplates] = useAtom(layoutTemplatesAtom);

  useEffect(() => {
    if (isFromSavedData) {
      setIsInternalSpacing(card.content.isInternalSpacing);
    }
  }, [isFromSavedData]);

  const id = card.docId;
  const isSelected = selectedCard === id;
  const cardType = card.datatype;

  //data for export
  interface CardDataProps {
    content: any;
    datatype: string;
    docId: string;
    index: number;
    hidden: boolean;
    publish: boolean;
    text: string;
    title: string;
  }

  const currentCardData: CardDataProps = {
    docId: id,
    index: index,
    title: cardTitle,
    datatype: cardType,
    publish: true,
    text: paragraphTextContent,
    hidden: false,
    content: {
      //anatomy content
      anatomyIndexPosition: anatomyIndexPosition || "left",
      anatomyIndexSpacing: anatomyIndexSpacing || "32",
      isInternalSpacing: isInternalSpacing,
      //two column content
      subtitle1: leftTitle || "Do",
      subtitle2: rightTitle || "Don't",
      leftItems,
      rightItems,
      //link content
      sources: sources,
      //list content
      inputs: listItems,
      //image content
      remoteImageLink: remoteImageLink,
      //release notes content
      releaseNotesMessage: releaseNotesMessage,
      releaseNotesDate: releaseNotesDate,
      currentDocument: currentDocument,
      currentPage: currentPage,
    },
  };

  useEffect(() => {}, [card]);
  function handleBuildClick() {
    emit("BUILD_ONE_SECTION", {
      selectedNodeId,
      selectedNodeKey,
      cardType,
      anatomyIndexPosition,
      anatomyIndexSpacing,
      appSettings,
      isInternalSpacing,
      layoutTemplates,
    });
  }

  const handleOpenSection = (e: MouseEvent) => {
    openSection(e, id, selectedCard!, setSelectedCard);
  };

  const handleGetDosDonts = async () => {
    const response = await getDosAndDonts(
      selectedElementName,
      documentationTitle
    );
    const dos = response[0];
    const donts = response[1];
    fillDosAndDontsInputs(dos, leftItems, setLeftItems);
    fillDosAndDontsInputs(donts, rightItems, setRightItems);
  };

  const handleTextRequest = async () => {
    const response = await getTextSectionRequest(
      selectedElementName,
      documentationTitle,
      paragraphTextContent,
      cardTitle
    );
    if (response) setParagraphTextContent(response);
  };

  const handleAskCloude = async () => {
    const response = askClaude("What is your favourite color?");
    console.log("Claude's response ", response);
  };

  const handleDeleteSection = async () => {
    setShowDeleteSectionPopup(true);
    setSectionToDeleteIndex(index);
    setSectionToDelete(card);
  };

  const handleDuplicateSection = (e: MouseEvent) => {
    duplicateSection(e, index, card, setSelectedSections);
  };

  useEffect(() => {
    if (isBuilding) {
      setDocumentationData((prevDocumentation: any) => {
        const newDocumentation = { ...prevDocumentation };
        const newDocs = newDocumentation.docs;
        newDocs["title"] = documentationTitle;
        newDocs[index] = currentCardData;
        setIsBuilding(false);
        return newDocumentation;
      });
    }
  }, [isBuilding]);

  return cardType === "header" ? (
    <div className={"sectionCard"}>
      <HeaderCard />
    </div>
  ) : (
    <div className={"sectionCard"}>
      <div className="cardHeader">
        <div className="leftContent">
          <IconGripVertical
            className={"dragIcon"}
            onMouseOver={(event: any) => {
              makeDraggable(event);
            }}
            onMouseOut={(event: any) => {
              removeDraggable(event);
            }}
          />
          <div className="addSectionIcon" type={cardType} alt={cardType}>
            <img src={AnatomyIcon} className={"anatomy"} />
            <img src={SpacingIcon} className={"spacing"} />
            <img src={PropertyIcon} className={"property"} />
            <img src={VariantsIcon} className={"variants"} />
            <img src={ReleaseNotesIcon} className={"releasenotes"} />
            <IconPilcrow className={"paragraph"} />
            <IconVideo className={"video"} />
            <IconColumns className={"twoColumns"} />
            <IconExposure className={"dosDonts"} stroke-width="1.5" />
            <IconListDetails className={"list"} />
            <IconLink className={"link"} />
            <IconPhoto className={"image"} />
          </div>
          <input
            className={"sectionTitle"}
            type={"text"}
            value={cardTitle}
            placeholder={"Untitled"}
            onInput={(e) => setCardTitle(e.currentTarget.value)}
          />
        </div>
        <div className="rightContent">
          <button
            onClick={handleBuildClick}
            className={"cardAuxButton hoverButton"}
            tool-tip={"Build this section on canvas"}
          >
            <IconArtboard />
          </button>
          {!isSelected && (
            <button
              className={
                "cardAuxButton hoverButton noPredefined tooltipButton duplicateButton"
              }
              onClick={handleDuplicateSection}
            >
              <IconCopy />
            </button>
          )}
          {!isSelected && DeleteButtonWithTooltip()}
          <button
            className={"cardAuxButton chevIcon"}
            onClick={handleOpenSection}
          >
            <IconChevronDown />
          </button>
        </div>
      </div>
      {isSelected && (
        <div className="cardBody">
          {currentCardContent(cardType, card)}
          <div className="cardFooter">
            <div className="leftContent hidePredefined">
              {card.datatype === "two-columns" && (
                <button
                  className="cardAuxButton"
                  onClick={() => {
                    handleGetDosDonts();
                  }}
                >
                  <IconSparkles />
                </button>
              )}
              {card.datatype === "text" && (
                <button className="cardAuxButton" onClick={handleTextRequest}>
                  <IconSparkles />
                </button>
              )}
              {card.datatype === "text" && (
                <button className="cardAuxButton" onClick={handleAskCloude}>
                  <IconClover />
                </button>
              )}
            </div>
            <div className="rightContent">
              <button
                onClick={handleBuildClick}
                tool-tip={"Build this section on canvas"}
              >
                <IconArtboard />
              </button>
              <button
                className={
                  "cardAuxButton noPredefined tooltipButon duplicateButton"
                }
                onClick={handleDuplicateSection}
              >
                <IconCopy />
              </button>
              {DeleteButtonWithTooltip()}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function DeleteButtonWithTooltip() {
    return (
      <div className="tooltip hoverButton redButton tooltipButton deleteButton">
        <button className="cardAuxButton" onClick={handleDeleteSection}>
          <IconTrash />
        </button>
      </div>
    );
  }
};
