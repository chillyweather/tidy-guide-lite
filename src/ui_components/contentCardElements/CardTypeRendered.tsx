/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useAtom } from "jotai";
import { useCardState } from "../hooks/useCardState";
import { isFromSavedDataAtom } from "../../state/atoms";
import HeaderCard from "../sectionCards/HeaderCard";
import PropertyCard from "../sectionCards/PropertyCard";
import VariantsCard from "../sectionCards/VariantsCard";
import AnatomyCard from "../sectionCards/AnatomyCard";
import SpacingsCard from "../sectionCards/SpacingsCard";
import ReleaseNotesCard from "../sectionCards/ReleaseNotesCard";
import TextCard from "../sectionCards/TextCard";
import TwoColumnCard from "../sectionCards/TwoColumnCard";
import LinkCard from "../sectionCards/LinkCard";
import ListCard from "../sectionCards/ListCard";
import ImageCard from "../sectionCards/ImageCard";
export const currentCardContent = (cardType: string, card: any) => {
  const [isFromSavedData] = useAtom(isFromSavedDataAtom);
  const {
    paragraphTextContent,
    setParagraphTextContent,
    leftTitle,
    setLeftTitle,
    rightTitle,
    setRightTitle,
    leftItems,
    setLeftItems,
    rightItems,
    setRightItems,
    listItems,
    setSources,
    remoteImageLink,
    setRemoteImageLink,
    anatomyIndexPosition,
    setAnatomyIndexPosition,
    anatomyIndexSpacing,
    setAnatomyIndexSpacing,
    releaseNotesMessage,
    setReleaseNotesMessage,
    setReleaseNotesDate,
    setListItems,
    sources,
  } = useCardState(card, isFromSavedData);

  switch (cardType) {
    case "header":
      return <HeaderCard />;
    case "property":
      return <PropertyCard />;
    case "variants":
      return <VariantsCard />;
    case "anatomy":
      return (
        <AnatomyCard
          anatomyIndexPosition={anatomyIndexPosition}
          setAnatomyIndexPosition={setAnatomyIndexPosition}
          anatomyIndexSpacing={anatomyIndexSpacing}
          setAnatomyIndexSpacing={setAnatomyIndexSpacing}
        />
      );
    case "spacing":
      return <SpacingsCard />;
    case "release-notes":
      return (
        <ReleaseNotesCard
          setReleaseNotesComment={setReleaseNotesMessage}
          releaseNotesComment={releaseNotesMessage}
          setReleaseNotesDate={setReleaseNotesDate}
        />
      );
    case "text":
      return (
        <TextCard
          textContent={paragraphTextContent}
          setTextContent={setParagraphTextContent}
        />
      );
    case "two-columns":
      return (
        <TwoColumnCard
          leftTitle={leftTitle}
          setLeftTitle={setLeftTitle}
          leftItems={leftItems}
          setLeftItems={setLeftItems}
          rightTitle={rightTitle}
          setRightTitle={setRightTitle}
          rightItems={rightItems}
          setRightItems={setRightItems}
        />
      );
    case "list":
      return <ListCard listItems={listItems} setListItems={setListItems} />;
    case "link":
      return <LinkCard sources={sources} setSources={setSources} />;
    case "image":
      return (
        <ImageCard
          remoteImageLink={remoteImageLink}
          setRemoteImageLink={setRemoteImageLink}
        />
      );
    default:
      return null;
  }
};
