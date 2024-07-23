import { emit } from "@create-figma-plugin/utilities";

export async function tokenHandler(token?: string) {
  if (token) {
    await figma.clientStorage.setAsync("token", token);
    emit("AUTH_CHANGE", token);
  } else {
    const savedToken = await figma.clientStorage.getAsync("token");
    if (savedToken) {
      emit("AUTH_CHANGE", savedToken);
      return savedToken;
    } else {
      emit("AUTH_CHANGE", null);
    }
  }
}
