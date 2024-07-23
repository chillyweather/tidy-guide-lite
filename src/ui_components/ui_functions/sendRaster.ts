import { uploadFileToServer } from "./fileManagementFunctions";

export async function sendRaster(
  bytes: Uint8Array,
  loggedInUser: string,
  type: string
) {
  if (type === "componentPic") {
    const blob = new Blob([bytes], { type: "image/png" });
    const file = new File([blob], `${type}.png`, {
      type: "image/png",
    });
    const url = await uploadFileToServer(file, loggedInUser);
    return url;
  } else {
    const blob = new Blob([bytes], { type: "image/svg+xml" });
    const file = new File([blob], `${type}.svg`, {
      type: "image/svg+xml",
    });
    const url = await uploadFileToServer(file, loggedInUser);
    return url;
  }
}
