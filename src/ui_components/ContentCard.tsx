/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { emit, on } from "@create-figma-plugin/utilities";
import { useState } from "preact/hooks";
import { useAtom } from "jotai";
import {
  appSettingsAtom,
  documentationDataAtom,
  documentationTitleAtom,
  isFromSavedDataAtom,
  loggedInUserAtom,
  sectionToDeleteAtom,
  sectionToDeleteIndexAtom,
  selectedNodeIdAtom,
  selectedNodeKeyAtom,
  showDeleteSectionPopupAtom,
  isBuildingAtom,
  selectedCardAtom,
  selectedSectionsAtom,
  currentFigmaPageAtom,
  currentFigmaFileAtom,
} from "../state/atoms";
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
  IconEye,
  IconEyeOff,
  IconArtboard,
} from "@tabler/icons-react";
import { Toggle, Text } from "@create-figma-plugin/ui";
import AnatomyIcon from "./../images/anatomy.svg";
import SpacingIcon from "./../images/spacing.svg";
import PropertyIcon from "./../images/property.svg";
import VariantsIcon from "./../images/variants.svg";
import ReleaseNotesIcon from "./../images/release-notes.svg";
// import TokensIcon from "./../images/tokens.svg";

import {
  // deleteSection,
  duplicateSection,
  openSection,
} from "./ui_functions/cardActions";

// import { deleteFileFromServer } from "./ui_functions/fileManagementFunctions";

//content cards
import HeaderCard from "./sectionCards/HeaderCard";
import ImageCard from "./sectionCards/ImageCard";
import LinkCard from "./sectionCards/LinkCard";
import ListCard from "./sectionCards/ListCard";
import PropertyCard from "./sectionCards/PropertyCard";
import ReleaseNotesCard from "./sectionCards/ReleaseNotesCard";
import TextCard from "./sectionCards/TextCard";
import TwoColumnCard from "./sectionCards/TwoColumnCard";
import VariantsCard from "./sectionCards/VariantsCard";
import AnatomyCard from "./sectionCards/AnatomyCard";
import VideoCard from "./sectionCards/VideoCard";
import SpacingsCard from "./sectionCards/SpacingsCard";
import { useEffect } from "preact/hooks";
import { sendRaster } from "./ui_functions/sendRaster";
import DosDontsCard from "./sectionCards/DosDonts";

function makeDraggable(event: any) {
  event.target.parentElement.parentElement.parentElement.parentElement.setAttribute(
    "draggable",
    true
  );
}
function removeDraggable(event: any) {
  event.target.parentElement.parentElement.parentElement.parentElement.setAttribute(
    "draggable",
    false
  );
}

export const ContentCard = (card: any, index: number) => {
  const [isFromSavedData] = useAtom(isFromSavedDataAtom);
  const [appSettings] = useAtom(appSettingsAtom);
  const [loggedInUser] = useAtom(loggedInUserAtom);
  const [, setDocumentationData] = useAtom(documentationDataAtom);
  const [documentationTitle] = useAtom(documentationTitleAtom);
  const [isBuilding, setIsBuilding] = useAtom(isBuildingAtom);
  const [selectedCard, setSelectedCard] = useAtom(selectedCardAtom);
  const [, setSelectedSections]: any = useAtom(selectedSectionsAtom);

  //card title
  const [cardTitle, setCardTitle] = useState(card.title);
  // general use
  const [isHidden, setIsHidden] = useState(
    isFromSavedData ? card.hidden : false
  );
  const [publish, setPublish] = useState<boolean>(
    isFromSavedData ? card.publish : true
  );
  // text card
  const [paragraphTextContent, setParagraphTextContent] = useState(
    isFromSavedData && card.text ? card.text : ""
  );
  // two column card
  const [leftTitle, setLeftTitle] = useState(
    isFromSavedData ? card.content.subtitle1 : ""
  );
  const [leftTextContent, setLeftTextContent] = useState(
    isFromSavedData ? card.content.text1 : ""
  );
  const [rightTitle, setRightTitle] = useState(
    isFromSavedData ? card.content.subtitle2 : ""
  );
  const [rightTextContent, setRightTextContent] = useState(
    isFromSavedData ? card.content.text2 : ""
  );
  // list
  const [listItems, setListItems] = useState<string[]>(
    isFromSavedData ? card.content.inputs : [""]
  );
  // link
  const [sources, setSources]: any[] = useState(
    isFromSavedData ? card.content.sources : [{ source: "", link: "" }]
  );
  //video card data
  const [selectedVideo, setSelectedVideo] = useState(-1);
  const [, setSelectedVideoContent] = useState({});
  const [videoLink, setVideoLink] = useState("");
  const [foundVideoData, setFoundVideoData]: any = useState({});
  const [videoDataElements, setVideoDataElements]: any[] = useState(
    isFromSavedData ? card.content.videoDataElements : []
  );
  //image card data
  const [remoteImageLink, setRemoteImageLink] = useState(
    isFromSavedData ? card.content.remoteImageLink : ""
  );
  //layout for anatomy card
  const [anatomyIndexPosition, setAnatomyIndexPosition] = useState(
    isFromSavedData ? card.content.anatomyIndexPosition : "left"
  );
  const [anatomyIndexSpacing, setAnatomyIndexSpacing] = useState(
    isFromSavedData ? card.content.anatomyIndexSpacing : "32"
  );
  //release notes card data
  const [releaseNotesMessage, setReleaseNotesMessage] = useState("");
  const [releaseNotesDate, setReleaseNotesDate] = useState("");
  const [currentImageArray, setCurrentImageArray] = useState<Uint8Array>();

  const [, setShowDeleteSectionPopup] = useAtom(showDeleteSectionPopupAtom);
  const [, setSectionToDelete] = useAtom(sectionToDeleteAtom);
  const [, setSectionToDeleteIndex] = useAtom(sectionToDeleteIndexAtom);
  const [selectedNodeId] = useAtom(selectedNodeIdAtom);
  const [selectedNodeKey] = useAtom(selectedNodeKeyAtom);
  const [currentPage] = useAtom(currentFigmaPageAtom);
  const [currentDocument] = useAtom(currentFigmaFileAtom);

  on("IMAGE_ARRAY_FOR_UPLOAD", async ({ bytes, type }) => {
    if (bytes.length && type === card.datatype) {
      setCurrentImageArray(bytes);
    }
  });

  async function handleImageFromFigmaUpload(
    currentImageArray: Uint8Array,
    loggedInUser: string,
    currentImageType: string
  ) {
    const url = await sendRaster(
      currentImageArray,
      loggedInUser,
      currentImageType
    );
    setRemoteImageLink(url);
  }

  useEffect(() => {
    if (
      !card.content.remoteImageLink &&
      currentImageArray &&
      loggedInUser &&
      card.datatype
    ) {
      handleImageFromFigmaUpload(
        currentImageArray,
        loggedInUser,
        card.datatype
      );
    }
  }, [currentImageArray, loggedInUser, card.content.remoteImageLink]);

  //!-------------------------------------------------------------------------------//
  //!-------from here content changes depending on isFromSavedData state------------//
  //!-------------------------------------------------------------------------------//

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
    publish: publish,
    text: paragraphTextContent,
    hidden: isHidden || false,
    content: {
      //anatomy content
      anatomyIndexPosition: anatomyIndexPosition || "left",
      anatomyIndexSpacing: anatomyIndexSpacing || "32",
      //two column content
      subtitle1: leftTitle,
      subtitle2: rightTitle,
      text1: leftTextContent,
      text2: rightTextContent,
      //link content
      sources: sources,
      //list content
      inputs: listItems,
      //image content
      remoteImageLink: remoteImageLink,
      //video content
      videoDataElements: videoDataElements,
      //release notes content
      releaseNotesMessage: releaseNotesMessage,
      releaseNotesDate: releaseNotesDate,
      // currentAuthor: currentAuthor,
      currentDocument: currentDocument,
      currentPage: currentPage,
    },
  };

  const currentCardContent = (cardType: string) => {
    if (cardType === "header") {
      return <HeaderCard />;
    } else if (cardType === "property") {
      return <PropertyCard />;
    } else if (cardType === "variants") {
      return <VariantsCard />;
    } else if (cardType === "anatomy") {
      return (
        <AnatomyCard
          anatomyIndexPosition={anatomyIndexPosition}
          setAnatomyIndexPosition={setAnatomyIndexPosition}
          anatomyIndexSpacing={anatomyIndexSpacing}
          setAnatomyIndexSpacing={setAnatomyIndexSpacing}
        />
      );
    } else if (cardType === "spacing") {
      return <SpacingsCard />;
    } else if (cardType === "release-notes") {
      return (
        <ReleaseNotesCard
          setReleaseNotesComment={setReleaseNotesMessage}
          releaseNotesComment={releaseNotesMessage}
          setReleaseNotesDate={setReleaseNotesDate}
        />
      );
    } else if (cardType === "text") {
      return (
        <TextCard
          textContent={paragraphTextContent}
          setTextContent={setParagraphTextContent}
        />
      );
    } else if (cardType === "two-columns") {
      return (
        <TwoColumnCard
          data={card}
          leftTitle={leftTitle}
          setLeftTitle={setLeftTitle}
          leftTextContent={leftTextContent}
          setLeftTextContent={setLeftTextContent}
          rightTitle={rightTitle}
          setRightTitle={setRightTitle}
          rightTextContent={rightTextContent}
          setRightTextContent={setRightTextContent}
        />
      );
    } else if (cardType === "dos-donts") {
      return (
        <DosDontsCard
          data={card}
          leftTitle={leftTitle}
          setLeftTitle={setLeftTitle}
          leftTextContent={leftTextContent}
          setLeftTextContent={setLeftTextContent}
          rightTitle={rightTitle}
          setRightTitle={setRightTitle}
          rightTextContent={rightTextContent}
          setRightTextContent={setRightTextContent}
        />
      );
    } else if (cardType === "list") {
      return <ListCard listItems={listItems} setListItems={setListItems} />;
    } else if (cardType === "link") {
      return <LinkCard sources={sources} setSources={setSources} />;
    } else if (cardType === "image") {
      return (
        <ImageCard
          remoteImageLink={remoteImageLink}
          setRemoteImageLink={setRemoteImageLink}
        />
      );
    } else if (cardType === "video") {
      {
        return VideoCard(
          foundVideoData,
          selectedVideo,
          setFoundVideoData,
          setSelectedVideo,
          setSelectedVideoContent,
          setVideoDataElements,
          setVideoLink,
          videoDataElements,
          videoLink
        );
      }
    } else {
      return null;
    }
  };

  function PublishToggle(
    publish: boolean,
    setPublish: (value: boolean) => void,
    label: string
  ) {
    function handleChange(event: any) {
      const newValue = event.currentTarget.checked;
      setPublish(newValue);
    }
    return (
      <Toggle
        onChange={handleChange}
        value={publish}
        style={{ border: "none", cursor: "pointer" }}
        disabled={isHidden}
      >
        <Text>{label}</Text>
      </Toggle>
    );
  }

  function handleBuildClick() {
    emit("BUILD_ONE_SECTION", {
      selectedNodeId,
      selectedNodeKey,
      cardType,
      anatomyIndexPosition,
      anatomyIndexSpacing,
      appSettings,
    });
  }

  const handleOpenSection = (e: MouseEvent) => {
    openSection(e, id, selectedCard!, setSelectedCard);
  };

  const handleDeleteSection = async () => {
    setShowDeleteSectionPopup(true);
    setSectionToDeleteIndex(index);
    setSectionToDelete(card);
    //     deleteSection(e, index, setSelectedSections);
    //     if (!remoteImageLink) return;
    //
    //     const deletion = await deleteFileFromServer(remoteImageLink);
    //     if (deletion) {
    //       console.log(deletion);
    //     }
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
        // if (elementIsEmpty(currentCardData)) {
        //   newDocs[index].hidden = true;
        //   setIsHidden(true);
        // }
        setIsBuilding(false);
        return newDocumentation;
      });
    }
  }, [isBuilding]);

  // useEffect(() => {
  //   if (Object.keys(documentationData).length > 0)
  //     setPreviewData(JSON.parse(JSON.stringify(documentationData)));
  // }, [documentationData]);

  return cardType === "header" ? (
    <div className={isHidden ? "sectionCard draft" : "sectionCard"}>
      <HeaderCard />
    </div>
  ) : (
    <div className={isHidden ? "sectionCard draft" : "sectionCard"}>
      <div className="cardHeader">
        <div className="leftContent">
          <IconGripVertical
            className={"dragIcon"}
            onMouseOver={(event) => {
              makeDraggable(event);
            }}
            onMouseOut={(event) => {
              removeDraggable(event);
            }}
          />
          <div className="addSectionIcon" type={cardType} alt={cardType}>
            <img src={AnatomyIcon} className={"anatomy"} />
            <img src={SpacingIcon} className={"spacing"} />
            <img src={PropertyIcon} className={"property"} />
            <img src={VariantsIcon} className={"variants"} />
            {/* <img src={TokensIcon} className={"tokens"} /> */}
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
          {/*//!all card content here */}
          {currentCardContent(cardType)}
          {/*//!all card content here */}
          <div className="cardFooter">
            <div className="leftContent hidePredefined">
              {PublishToggle(publish, setPublish, "Publish to Tidy Viewer")}
            </div>
            <div className="rightContent">
              <button
                onClick={handleBuildClick}
                tool-tip={"Build this section on canvas"}
              >
                <IconArtboard />
              </button>
              <button
                className={"cardAuxButton eyeIcon"}
                onClick={() => {
                  setIsHidden(!isHidden);
                  setPublish(false);
                }}
              >
                <IconEye />
                <IconEyeOff />
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
