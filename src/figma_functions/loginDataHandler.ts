import { emit } from "@create-figma-plugin/utilities";

/**
 * Handles the token and email values for authentication.
 * If a token is provided, it is stored in the client storage along with the email.
 * If no token is provided, it retrieves the saved token and email from the client storage.
 * Emits an "AUTH_CHANGE" event with the token and email values.
 * Returns the saved token if both token and email are present in the client storage, otherwise returns null.
 * @param token - The token value to be stored in the client storage.
 * @param email - The email value to be stored in the client storage.
 * @param rank - The rank value to be stored in the client storage.
 * @param userName - The userName value to be stored in the client storage.
 * @param companyName - The companyName value to be stored in the client storage.
 * @param id - The id value to be stored in the client storage.
 * @returns The saved token if both token and email are present, otherwise null.
 */

export async function loginDataHandler(
  token?: string,
  email?: string,
  rank: string = "Viewer",
  userName: string = "",
  companyName: string = "",
  id: string = ""
) {
  // console.log("%c login data handler is running!!!", "color: Lime");
  if (token) {
    await figma.clientStorage.setAsync("token", token);
    await figma.clientStorage.setAsync("email", email);
    await figma.clientStorage.setAsync("rank", rank);
    await figma.clientStorage.setAsync("userName", userName);
    await figma.clientStorage.setAsync("companyName", companyName);
    await figma.clientStorage.setAsync("userId", id);
    // console.log("%c userId", "color: coral", id);
    // console.log("%c token", "color: coral", token);
    // console.log("%c email", "color: coral", email);
    // console.log("%c rank", "color: coral", rank);
    // console.log("%c userName", "color: coral", userName);
    // console.log("%c companyName", "color: coral", companyName);

    emit("AUTH_CHANGE", token, email, rank, userName, companyName, id);
  } else {
    const savedToken = await figma.clientStorage.getAsync("token");
    const savedEmail = await figma.clientStorage.getAsync("email");
    const savedRank = await figma.clientStorage.getAsync("rank");
    const savedUserName = await figma.clientStorage.getAsync("userName");
    const savedCompanyName = await figma.clientStorage.getAsync("companyName");
    const savedId = await figma.clientStorage.getAsync("userId");

    // console.log("%c savedId", "color:green", savedId);
    // console.log("%c savedToken", "color:green", savedToken);
    // console.log("%c savedEmail", "color:green", savedEmail);
    // console.log("%c savedRank", "color:green", savedRank);
    // console.log("%c savedUserName", "color:green", savedUserName);
    // console.log("%c savedCompanyName", "color:green", savedCompanyName);

    if (savedToken && savedEmail) {
      emit(
        "AUTH_CHANGE",
        savedToken,
        savedEmail,
        savedRank,
        savedUserName,
        savedCompanyName,
        savedId
      );
    } else {
      emit("AUTH_CHANGE", null);
    }
  }
}
