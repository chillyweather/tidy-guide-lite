/* eslint-disable @typescript-eslint/no-explicit-any */
import { emit, on, once, showUI } from "@create-figma-plugin/utilities";
import documentationBuilder from "./figma_functions/documentationBuilder";
// import { tempData } from "./tempData";
import { checkSelection } from "./figma_functions/checkSelection";
import { settingsDataHandler } from "./figma_functions/settingsDataHandler";
import { getNode } from "./figma_functions/getNode";

import { buildOneSection } from "./figma_functions/buildOneSection";
import handleCanvasColors from "./figma_functions/handleCanvasColors";

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Medium" });
};

export default async function () {
  await settingsDataHandler();
  let savedData: any = {};

  try {
    const savedDataString = figma.root.getSharedPluginData(
      "guide_lite",
      "saved_data"
    );
    if (savedDataString) savedData = JSON.parse(savedDataString);
    if (Object.keys(savedData).length) {
      const savedDataArray = convertToArray(savedData);
      emit("SAVED_DATA", savedDataArray);
    }
  } catch (error) {
    console.log("error", error);
  }

  // const user = figma.currentUser;
  // const document = figma.root.name;
  // const page = figma.currentPage.name;

  // const sessionData = {
  //   user: user,
  //   document: document,
  //   page: page,
  // };

  const selectionData = await checkSelection();
  if (selectionData) emit("SELECTION", selectionData);

  on("GET_SELECTION", async () => {
    const selectionData = await checkSelection();
    if (selectionData) emit("SELECTION", selectionData);
  });

  on("CLOSE", () => {
    figma.closePlugin();
  });

  on("UPDATE_APP_SETTINGS", async (data) => {
    figma.clientStorage.setAsync("appSettings", data);

    handleCanvasColors(data);
  });

  on("CLEAR_SELECTION", () => {
    figma.currentPage.selection = [];
  });

  on("GET_NEW_SELECTION", async (key, id) => {
    if (key) {
      const foundElement = await getNode(id, key);

      if (foundElement) {
        const foundElementName = foundElement.name;
        emit("FOUND_ELEMENT", foundElement, foundElementName, key);
      }
    }
  });

  on("BUILD", async (data, appSettings) => {
    try {
      const id = data.nodeId;
      savedData[id] = data;
      const savedDataArray = convertToArray(savedData);
      emit("SAVED_DATA", savedDataArray);
      const savedDataString = JSON.stringify(savedData);
      figma.root.setSharedPluginData(
        "guide_lite",
        "saved_data",
        savedDataString
      );
      await documentationBuilder(data, loadFonts, appSettings);
    } catch (error) {
      console.log("error on documentation build in Figma :>> ", error);
    }
  });

  on(
    "BUILD_ONE_SECTION",
    async ({
      selectedNodeId,
      selectedNodeKey,
      cardType,
      anatomyIndexPosition,
      anatomyIndexSpacing,
      appSettings,
      isInternalSpacing,
    }) => {
      buildOneSection(
        loadFonts,
        selectedNodeId,
        selectedNodeKey,
        cardType,
        anatomyIndexPosition,
        anatomyIndexSpacing,
        appSettings,
        isInternalSpacing
      );
    }
  );

  on("DELETE_DOCUMENTATION", async (data) => {
    delete savedData[data];
    const savedDataArray = convertToArray(savedData);
    emit("SAVED_DATA", savedDataArray);
    const savedDataString = JSON.stringify(savedData);
    figma.root.setSharedPluginData("guide_lite", "saved_data", savedDataString);
  });
  figma.on("selectionchange", async () => {
    const selectionData = await checkSelection();
    if (selectionData) {
      emit("CHANGED_SELECTION", selectionData);
    } else {
      emit("CHANGED_SELECTION", null);
    }
  });

  once("CLOSE", () => {
    figma.closePlugin();
  });
}

showUI({
  height: 720,
  width: 640,
  // height: 640,
  // width: 520,
});
function convertToArray(savedData: any) {
  const savedDataArray = [];
  for (const key in savedData) {
    savedDataArray.push(savedData[key]);
  }
  return savedDataArray;
}
