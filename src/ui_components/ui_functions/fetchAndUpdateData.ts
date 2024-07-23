/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCollectionDocs } from "./collectionHandlers";

async function fetchAndUpdateData(
  token: string,
  setDataForUpdate: any,
  collectinId: string
) {
  const newData = await getCollectionDocs(token, collectinId);
  setDataForUpdate(newData);
}

export default fetchAndUpdateData;

// async function fetchAndUpdateData(token: string, setDataForUpdate: any) {
//   const newData = await getDocumentations(token);
//   setDataForUpdate(newData);
// }
//
// export default fetchAndUpdateData;
