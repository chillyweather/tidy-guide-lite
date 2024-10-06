/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "preact/hooks";
import { useAtom } from "jotai";
import { isInternalSpacingAtom } from "../../state/atoms";

export function useCardState(card: any, isFromSavedData: boolean) {
  const [cardTitle, setCardTitle] = useState(card.title);
  const [paragraphTextContent, setParagraphTextContent] = useState(
    isFromSavedData && card.text ? card.text : ""
  );
  const [leftTitle, setLeftTitle] = useState(card.content.subtitle1 ?? "Do");
  const [rightTitle, setRightTitle] = useState(
    card.content.subtitle2 ?? "Don't"
  );
  const [leftItems, setLeftItems] = useState(
    isFromSavedData ? card.content.leftItems : []
  );
  const [rightItems, setRightItems] = useState(
    isFromSavedData ? card.content.rightItems : []
  );
  const [listItems, setListItems] = useState<string[]>(
    isFromSavedData ? card.content.inputs : [""]
  );
  const [sources, setSources] = useState(
    isFromSavedData ? card.content.sources : [{ source: "", link: "" }]
  );
  const [remoteImageLink, setRemoteImageLink] = useState(
    isFromSavedData ? card.content.remoteImageLink : ""
  );
  const [anatomyIndexPosition, setAnatomyIndexPosition] = useState(
    isFromSavedData ? card.content.anatomyIndexPosition : "left"
  );
  const [anatomyIndexSpacing, setAnatomyIndexSpacing] = useState(
    isFromSavedData ? card.content.anatomyIndexSpacing : "32"
  );
  const [releaseNotesMessage, setReleaseNotesMessage] = useState("");
  const [releaseNotesDate, setReleaseNotesDate] = useState("");

  const [isInternalSpacing, setIsInternalSpacing] = useAtom(
    isInternalSpacingAtom
  );

  useEffect(() => {
    if (isFromSavedData) {
      setIsInternalSpacing(card.content.isInternalSpacing);
    }
  }, [isFromSavedData]);

  return {
    cardTitle,
    setCardTitle,
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
    setListItems,
    sources,
    setSources,
    remoteImageLink,
    setRemoteImageLink,
    anatomyIndexPosition,
    setAnatomyIndexPosition,
    anatomyIndexSpacing,
    setAnatomyIndexSpacing,
    releaseNotesMessage,
    setReleaseNotesMessage,
    releaseNotesDate,
    setReleaseNotesDate,
    isInternalSpacing,
    setIsInternalSpacing,
  };
}
