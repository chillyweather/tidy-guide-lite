/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";
import {
  documentationTitleAtom,
  isWipAtom,
  documentationDataAtom,
} from "src/state/atoms";
import CheckboxElement from "../Checkbox";

const HeaderCard = () => {
  const [, setDocumentationData] = useAtom(documentationDataAtom);
  const [documentationTitle, setDocumentationTitle] = useAtom(
    documentationTitleAtom
  );
  const [isWip, setIsWip] = useAtom(isWipAtom);

  const handleValueChange = (newValue: boolean) => {
    setIsWip(newValue);
  };

  useEffect(() => {
    setDocumentationData((prevDocumentation: any) => {
      const newDocumentation = { ...prevDocumentation };
      newDocumentation.title = documentationTitle;
      newDocumentation.inProgress = isWip;
      return newDocumentation;
    });
  }, [documentationTitle, isWip]);

  return (
    <div className="cardHeader" id="headerCard">
      <input
        className={"sectionTitle"}
        id={"docName"}
        type={"text"}
        value={documentationTitle}
        placeholder={"Untitled"}
        spellcheck={false}
        onInput={(e) => setDocumentationTitle(e.currentTarget.value)}
      />

      <CheckboxElement
        value={isWip!}
        setValue={handleValueChange}
        label="Work in progress"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export default HeaderCard;
