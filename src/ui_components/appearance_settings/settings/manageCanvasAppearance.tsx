/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useAtom } from "jotai";
import {
  appSettingsAtom,
  settingsUnitsAtom,
  settingsRemRootAtom,
  appFontsAtom,
  documentationFontAtom,
} from "../../../state/atoms";
import { useEffect, useState } from "preact/hooks";
import ColorPickerInput from "../../ColorPickerInput";
import { TagLabel, TagLine } from "../../tagPreviewElements";
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
import Dropdown from "../Dropdown";

export type LabelType =
  | "round"
  | "square"
  | "square-rounded"
  | "square-rounded-rotated";

// const defaultFont = {
//   family: "Inter",
// };

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
  const [documentationFontName, setDocumentationFontName] = useAtom(
    documentationFontAtom
  );

  const [fontStyles, setFontStyles] = useState<DropdownOption[]>([]);
  const [documentationTitleFont, setDocumentationTitleFont] = useState<any>(
    appSettings.documentationFont || fontList[0]
  );
  const [documentationTitleFontStyle, setDocumentationTitleFontStyle] =
    useState<any>(appSettings.documentationFontStyle || fontStyles[0]);

  useEffect(() => {
    setAppSettings({
      labelType,
      lineType,
      tagColor,
      units,
      rootValue,
      documentationFont: documentationTitleFont,
    });
  }, [labelType, lineType, tagColor, units, rootValue, documentationTitleFont]);

  useEffect(() => {
    if (documentationFontName) {
      const { family } = documentationFontName;
      setDocumentationTitleFont({
        family,
      });
    }
  }, [documentationFontName]);

  useEffect(() => {
    console.log("documentationFont", documentationTitleFont);
    console.log("appFonts", appFonts);
    console.log("fontList", fontList);
    console.log("appSettings.documentationFont", appSettings.documentationFont);
    console.log("appSettings", appSettings);
    const foundStyles = appFonts.filter(
      (font: any) => font.fontName.family === documentationTitleFont.name
    );
    const fontStyles = foundStyles.map((font: any, index: number) => {
      return {
        id: index,
        name: `${font.fontName.style}`,
      };
    });
    setFontStyles(fontStyles);
    // if (foundStyles.length) {
    //   console.log("foundStyles", foundStyles);
    // }
  }, [documentationTitleFont]);

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
      setDocumentationFontName({
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
          name: `${font.fontName.family}`,
        };
      });
      const uniqueFonts = fonts.filter(
        (font: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t.name === font.name)
      );
      setFontList(uniqueFonts);
    }
  }, [appFonts]);

  //   useEffect(() => {
  //     if (appFonts && appFonts.length) {
  //       const fonts = appFonts.map((font: any, index: number) => {
  //         return {
  //           id: index,
  //           name: `${font.fontName.family} - ${font.fontName.style}`,
  //           // name: `${font.fontName.family} - ${font.fontName.style}`,
  //         };
  //       });
  //       console.log("fonts", fonts);
  //       setFontList(fonts);
  //     }
  //   }, [appFonts]);

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
      <div className="font-block">
        <p>Title: </p>
        <Dropdown
          options={fontList}
          selectedOption={documentationTitleFont}
          onSelect={(value) => setDocumentationTitleFont(value)}
          placeholder="Font"
        />
        <Dropdown
          options={fontStyles}
          selectedOption={documentationTitleFontStyle}
          onSelect={(value) => setDocumentationTitleFontStyle(value)}
          placeholder="Style"
        />
      </div>
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
        <div className="tag-preview-frame">
          <div className="tag-preview">
            <TagLabel label={tagLabelText} color={tagColor} shape={labelType} />
            <TagLine color={tagColor} type={lineType} />
          </div>
        </div>
      </div>
    </div>
  );
}
