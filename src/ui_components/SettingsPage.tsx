/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useAtom } from "jotai";
import {
  currentPageAtom,
  showSettingsContentAtom,
  showManageCanvasAppearanceAtom,
} from "src/state/atoms";
import {
  IconArrowRight,
  IconUser,
  IconChevronRight,
} from "@tabler/icons-react";
import CanvasAppearance from "./appearance_settings/settings/CanvasAppearance";
import { useEffect } from "react";

const Settings = () => {
  const [showSettingsContent, setShowSettingsContent] = useAtom(
    showSettingsContentAtom
  );

  const [showManageCanvasAppearance, setShowManageCanvasAppearance] = useAtom(
    showManageCanvasAppearanceAtom
  );
  const [, setCurrentPage] = useAtom(currentPageAtom);

  useEffect(() => {
    setCurrentPage("settings");
  }, []);

  useEffect(() => {}, [showSettingsContent]);

  function handleSections(sectionName: string) {
    switch (sectionName) {
      case "canvas":
        setCurrentPage("canvas-appearance");
        setShowManageCanvasAppearance(true);
        setShowSettingsContent(false);
        break;
      default:
        break;
    }
  }

  const SettingsContent = (
    <div className={"settings-wrapper"}>
      <SettingsSection
        props={{
          icon: IconUser,
          title: "Appearance on canvas",
          description: "Set up how your Figma layout will look",
          onClick: () => {
            handleSections("canvas");
          },
        }}
      />
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
      {/* {showSettingsContent && SettingsContent} */}

      {showManageCanvasAppearance && CanvasAppearance()}
    </div>
  );
};

export default Settings;

function SettingsSection({
  props,
}: {
  props: {
    icon: any;
    title: string;
    description: string;
    onClick: () => void;
  };
}) {
  return (
    <div className="settings-section-plus-userlist">
      <div className="settings-section-flex">
        <div className="settings-section-content">
          <div className="title-flex">
            {props.icon}
            <h4>{props.title}</h4>
          </div>
          <p>{props.description}</p>
        </div>
        {IconArrowRight}
        <button
          id={"settings-primary-button"}
          className={"button primary"}
          onClick={props.onClick}
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
