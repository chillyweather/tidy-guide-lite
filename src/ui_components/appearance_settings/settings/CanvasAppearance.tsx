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
import ColorPickerInput from "../../ColorPickerInput";
import TagPreview from "./TagPreview";
import {
  IconCircleFilled,
  IconSquareFilled,
  IconSquareRoundedFilled,
  IconSquareRotatedFilled,
} from "@tabler/icons-react";
import { emit } from "@create-figma-plugin/utilities";
import RadioButton from "../../RadioButton";
import { Button } from "../Button";
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
  const [documentationFonts, setDocumentationFonts] = useState({
    title: {
      font:
        { id: 999999, name: appSettings.documentationFonts.title.family } ||
        defaultFont,
      style:
        { id: 999999, name: appSettings.documentationFonts.title.style } ||
        defaultStyle,
    },
    sectionTitle: {
      font:
        {
          id: 999999,
          name: appSettings.documentationFonts.sectionTitle.family,
        } || defaultFont,
      style:
        {
          id: 999999,
          name: appSettings.documentationFonts.sectionTitle.style,
        } || defaultStyle,
    },
  });

  const updateFontSetting = (hierarchy: string, type: string, value: any) => {
    setDocumentationFonts((prev) => ({
      ...prev,
      [hierarchy as keyof typeof prev]: {
        ...prev[hierarchy as keyof typeof prev],
        [type]: value,
      },
    }));
  };

  useEffect(() => {
    setAppSettings({
      labelType,
      lineType,
      tagColor,
      units,
      rootValue,
      documentationFonts: {
        title: {
          family: documentationFonts.title.font.name,
          style: documentationFonts.title.style.name,
        },
        sectionTitle: {
          family: documentationFonts.sectionTitle.font.name,
          style: documentationFonts.sectionTitle.style.name,
        },
      },
    });
  }, [labelType, lineType, tagColor, units, rootValue, documentationFonts]);

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
      updateFontSetting("title", "font", appSettings.documentationFont.title);
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

  const icons = {
    round: (
      <IconCircleFilled
        style={{
          color: labelType === "round" ? "#5C6CFF" : "#9597A2",
          height: "13px",
          width: "13px",
        }}
      />
    ),
    square: (
      <IconSquareFilled
        style={{
          color: labelType === "square" ? "#5C6CFF" : "#9597A2",
          height: "13px",
          width: "13px",
        }}
      />
    ),
    "square-rounded": (
      <IconSquareRoundedFilled
        style={{
          color: labelType === "square-rounded" ? "#5C6CFF" : "#9597A2",
          height: "13px",
          width: "13px",
        }}
      />
    ),
    "square-rounded-rotated": (
      <IconSquareRotatedFilled
        style={{
          color: labelType === "square-rounded-rotated" ? "#5C6CFF" : "#9597A2",
          height: "13px",
          width: "13px",
        }}
      />
    ),
  };

  return (
    <div className="manage-canvas">
      <h2>Documentation Appearance</h2>
      <h4>Font</h4>
      <FontSettingsElement
        label="Title"
        fonts={fontList}
        appFonts={appFonts}
        selectedFont={documentationFonts.title.font}
        setSelectedFont={(value) => updateFontSetting("title", "font", value)}
        selectedStyle={documentationFonts.title.style}
        setSelectedStyle={(value) => updateFontSetting("title", "style", value)}
      />

      <FontSettingsElement
        label="Section Title"
        fonts={fontList}
        appFonts={appFonts}
        selectedFont={documentationFonts.sectionTitle.font}
        setSelectedFont={(value) =>
          updateFontSetting("sectionTitle", "font", value)
        }
        selectedStyle={documentationFonts.sectionTitle.style}
        setSelectedStyle={(value) =>
          updateFontSetting("sectionTitle", "style", value)
        }
      />

      <h4>Tags</h4>
      <div className="anatomy-tags-settings-with-preview">
        <div className="anatomy-tags-settings">
          <div className="tags-settings-element">
            <p style={{ margin: 0 }}>Color:</p>
            <ColorPickerInput color={tagColor} setColor={setTagColor} />
          </div>
          <div className="tags-settings-element">
            <p style={{ margin: 0 }}>Shape:</p>
            <div
              className="appearance-button-wrapper"
              style={{
                border: "1px solid #D2DCF9",
                borderRadius: "6px",
                height: "36px",
                padding: "4px",
              }}
            >
              <Button
                label={icons.round}
                type="round"
                labelType={labelType}
                setType={setLabelType}
              />
              <Button
                label={icons.square}
                type="square"
                labelType={labelType}
                setType={setLabelType}
              />
              <Button
                label={icons["square-rounded"]}
                type="square-rounded"
                labelType={labelType}
                setType={setLabelType}
              />
              <Button
                label={icons["square-rounded-rotated"]}
                type="square-rounded-rotated"
                labelType={labelType}
                setType={setLabelType}
              />
            </div>
          </div>
          <div className="tags-settings-element">
            <p style={{ margin: 0 }}>style:</p>
            <div className="appearance-button-wrapper">
              <RadioButton
                selectedOption={lineType}
                setSelectedOption={setLineType}
                options={["Solid", "Dash"]}
              />
            </div>
          </div>
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
