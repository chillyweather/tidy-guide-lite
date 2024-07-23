/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteMultipleFilesFromServer } from "./fileManagementFunctions";
import {
  getDocumentations,
  deleteDocumentation,
} from "./documentationHandlers";
import { getMyAccountData, deleteAccount } from "./authentication";

export async function handleDeletePictures(
  elementId: string,
  dataForUpdate: any
) {
  const documentationToDelete = dataForUpdate.find(
    (el: any) => el._id === elementId
  );
  const links = findImageUrls(documentationToDelete);
  if (links.length === 0) return;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await deleteMultipleFilesFromServer(links);
}

export function findImageUrls(data: any) {
  const links: string[] = [];
  const docs = data.docs;
  if (!docs.length) return links;
  for (const doc of docs) {
    const link = doc.content.remoteImageLink;
    if (!(link && link.startsWith("https://tidy-guide-resources"))) continue;
    links.push(link);
  }
  return links;
}

export async function handleDeleteAccount(token: string) {
  const imageLinks = [];

  const accountData = await getMyAccountData(token);
  const id = accountData?.id;

  const allDocumentations = await getDocumentations(token);
  const currentUsersDocs = allDocumentations.filter(
    (doc: any) => doc.user === id
  );

  for (const doc of currentUsersDocs) {
    const links = findImageUrls(doc);
    if (links.length) imageLinks.push(...links);
    await deleteDocumentation(token, doc._id);
  }

  if (imageLinks.length) {
    await deleteMultipleFilesFromServer(imageLinks);
  }

  const result = await deleteAccount(token, id);

  return result;
}
