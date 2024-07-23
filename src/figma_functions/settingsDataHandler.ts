/* eslint-disable @typescript-eslint/no-explicit-any */
import { emit } from "@create-figma-plugin/utilities";
import handleCanvasColors from "./handleCanvasColors";

export async function settingsDataHandler() {
  const currentSettings: any =
    await figma.clientStorage.getAsync("appSettings");
  if (currentSettings) {
    emit("SETTINGS", currentSettings);
    if (currentSettings.tagColor) handleCanvasColors(currentSettings.tagColor);
  }
}
