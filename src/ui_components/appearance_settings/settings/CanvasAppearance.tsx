/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useAtom } from "jotai";
import {
  appSettingsAtom,
  settingsUnitsAtom,
  settingsRemRootAtom,
  appFontsAtom,
} from "../../../state/atoms";
import { useEffect, useState } from "preact/hooks";
import {
  TagColorSection,
  TagShapeSection,
  TagLineStyleComponent,
} from "./TagSettings";
import TagPreview from "./TagPreview";
import {
  IconCircleFilled,
  IconSquareFilled,
  IconSquareRoundedFilled,
  IconSquareRotatedFilled,
} from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import { DropdownOption } from "../Dropdown";
import FontSettingsElement from "./FontSettingsElement";
import { defaultFont, defaultStyle } from "../../../resources/constants";

export type LabelType =
  | "round"
  | "square"
  | "square-rounded"
  | "square-rounded-rotated";

export default function CanvasAppearance() {
  const [appSettings, setAppSettings]: any = useAtom(appSettingsAtom);
  const [tagLabelText] = useState("42");

  const [labelType, setLabelType] = useState<LabelType>(
    appSettings.labelType || "round"
  );
  const [tagColor, setTagColor] = useState(appSettings.tagColor || "#F1592A");
  const [lineType, setLineType] = useState(appSettings.lineType || "Solid");
  const [units, setUnits] = useAtom(settingsUnitsAtom);
  const [rootValue, setRootValue] = useAtom(settingsRemRootAtom);
  const [appFonts] = useAtom(appFontsAtom); //all the fonts in the app
  const [fontList, setFontList] = useState<DropdownOption[]>([]); //list of unique fonts in the app (only font names)

  //! font states
  const [documentationTitleFont, setDocumentationTitleFont] =
    useState<DropdownOption>(
      { id: 999999, name: appSettings.documentationFonts.title.family } ||
        defaultFont
    );
  const [documentationTitleStyleFont, setDocumentationTitleStyleFont] =
    useState<DropdownOption>(
      { id: 999999, name: appSettings.documentationFonts.title.style } ||
        defaultStyle
    );
  const [documentationSectionTitleFont, setDocumentationSectionTitleFont] =
    useState<DropdownOption>(
      {
        id: 999999,
        name: appSettings.documentationFonts.sectionTitle.family,
      } || defaultFont
    );
  const [
    documentationSectionTitleFontStyle,
    setDocumentationSectionTitleFontStyle,
  ] = useState<DropdownOption>(
    { id: 999999, name: appSettings.documentationFonts.sectionTitle.style } ||
      defaultStyle
  );

  useEffect(() => {
    setAppSettings({
      labelType,
      lineType,
      tagColor,
      units,
      rootValue,
      documentationFonts: {
        title: {
          family: documentationTitleFont.name,
          style: documentationTitleStyleFont.name,
        },
        sectionTitle: {
          family: documentationSectionTitleFont.name,
          style: documentationSectionTitleFontStyle.name,
        },
      },
    });
  }, [
    labelType,
    lineType,
    tagColor,
    units,
    rootValue,
    documentationTitleFont,
    documentationTitleStyleFont,
    documentationSectionTitleFont,
    documentationSectionTitleFontStyle,
  ]);

  useEffect(() => {
    console.log("appSettings", appSettings);
  }, [appSettings]);

  useEffect(() => {
    if (appSettings.rootValue) {
      setRootValue(appSettings.rootValue);
    }
    if (appSettings.units) {
      setUnits(appSettings.units);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(appSettings).length) {
      emit("UPDATE_APP_SETTINGS", appSettings);
    }
  }, [appSettings]);

  useEffect(() => {
    if (appSettings.documentationFont) {
      setDocumentationTitleFont({
        id: "xxx",
        name: `${appSettings.documentationFont.family}`,
      });
    }
  }, []);

  useEffect(() => {
    if (appFonts && appFonts.length) {
      const fonts = appFonts.map((font: any, index: number) => {
        return {
          id: index,
          name: font.fontName.family,
        };
      });
      const uniqueFonts = fonts.filter(
        (font: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t.name === font.name)
      );
      setFontList(uniqueFonts);
    }
  }, [appFonts]);

  function getIconStyle(
    currentLabelType: LabelType,
    iconType: LabelType
  ): h.JSX.CSSProperties {
    return {
      color: currentLabelType === iconType ? "#5C6CFF" : "#9597A2",
      height: "13px",
      width: "13px",
    };
  }
  const icons = {
    round: <IconCircleFilled style={getIconStyle(labelType, "round")} />,
    square: <IconSquareFilled style={getIconStyle(labelType, "square")} />,
    "square-rounded": (
      <IconSquareRoundedFilled
        style={getIconStyle(labelType, "square-rounded")}
      />
    ),
    "square-rounded-rotated": (
      <IconSquareRotatedFilled
        style={getIconStyle(labelType, "square-rounded-rotated")}
      />
    ),
  };

  const FontSettingsSection = () => (
    <div>
      <h4>Font</h4>
      <FontSettingsElement
        label="Title"
        fonts={fontList}
        appFonts={appFonts}
        selectedFont={documentationTitleFont}
        setSelectedFont={setDocumentationTitleFont}
        selectedStyle={documentationTitleStyleFont}
        setSelectedStyle={setDocumentationTitleStyleFont}
      />
      <FontSettingsElement
        label="Section Title"
        fonts={fontList}
        appFonts={appFonts}
        selectedFont={documentationSectionTitleFont}
        setSelectedFont={setDocumentationSectionTitleFont}
        selectedStyle={documentationSectionTitleFontStyle}
        setSelectedStyle={setDocumentationSectionTitleFontStyle}
      />
    </div>
  );

  return (
    <div className="manage-canvas">
      <h2>Documentation Appearance</h2>
      <FontSettingsSection />
      <h4>Tags</h4>
      <div className="anatomy-tags-settings-with-preview">
        <div className="anatomy-tags-settings">
          <TagColorSection tagColor={tagColor} setTagColor={setTagColor} />
          <TagShapeSection
            labelType={labelType}
            setLabelType={setLabelType}
            icons={icons}
          />
          <TagLineStyleComponent
            lineType={lineType}
            setLineType={setLineType}
          />
        </div>
        <TagPreview
          tagColor={tagColor}
          labelType={labelType}
          lineType={lineType}
          tagLabelText={tagLabelText}
        />
      </div>
    </div>
  );
}
