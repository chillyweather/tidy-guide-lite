import { emit, on, once, showUI } from "@create-figma-plugin/utilities";
import documentationBuilder from "./figma_functions/documentationBuilder";
// import { tempData } from "./tempData";
import { checkSelection } from "./figma_functions/checkSelection";
import { settingsDataHandler } from "./figma_functions/settingsDataHandler";
import { getNode } from "./figma_functions/getNode";
import imageFromFigma from "./figma_functions/imageFromFigma";
import { logoutDataHandler } from "./figma_functions/logoutDataHandler";
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

  on("PIC_FROM_FIGMA", async ({ type, nodeId, key }) => {
    imageFromFigma(loadFonts, type, nodeId, key);
  });

  on("UPDATE_APP_SETTINGS", async (data) => {
    figma.clientStorage.setAsync("appSettings", data);

    handleCanvasColors(data);
  });

  on("GET_COMPONENT_PIC", async (key, id) => {
    if (key) {
      const foundElement = await getNode(id, key);
      if (foundElement) {
        if (foundElement.type === "COMPONENT_SET") {
          const bytes = await foundElement.defaultVariant.exportAsync({
            format: "PNG",
            constraint: { type: "SCALE", value: 2 },
          });
          emit("COMPONENT_PIC_FOR_UPLOAD", { bytes });
        } else {
          const bytes = await foundElement.exportAsync({
            format: "PNG",
            constraint: { type: "SCALE", value: 2 },
          });
          emit("COMPONENT_PIC_FOR_UPLOAD", { bytes });
        }
      }
    }
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
    }) => {
      buildOneSection(
        loadFonts,
        selectedNodeId,
        selectedNodeKey,
        cardType,
        anatomyIndexPosition,
        anatomyIndexSpacing,
        appSettings
      );
    }
  );

  on("DELETE_ACCOUNT", async () => {
    await figma.clientStorage.deleteAsync("token");
    figma.notify("Account deleted");
  });

  figma.on("selectionchange", async () => {
    const selectionData = await checkSelection();
    if (selectionData) {
      emit("CHANGED_SELECTION", selectionData);
    } else {
      emit("CHANGED_SELECTION", null);
    }
  });

  once("LOGOUT", () => {
    const date = Date.now();
    const parsedDate = new Date(date);
    console.log("LOGOUT at ", parsedDate);
    figma.clientStorage.deleteAsync("token");
    figma.clientStorage.deleteAsync("email");
    figma.clientStorage.deleteAsync("rank");
    figma.clientStorage.deleteAsync("userName");
    figma.clientStorage.deleteAsync("companyName");
    figma.clientStorage.deleteAsync("userId");
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
