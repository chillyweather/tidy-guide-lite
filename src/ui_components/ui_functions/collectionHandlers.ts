export async function getCollections(token: string, userId: string) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${userId}/user-collections`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function renameCollection(
  token: string | undefined,
  collectionId: string,
  name: string
) {
  if (!token) return;
  const headersList = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({ name: name });

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}/rename`,
    {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.text();
  return data;
}

export async function addNewCollection(token: string, name: string) {
  const headersList = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({ name: name });

  const response = await fetch(
    "https://api.tidyframework.com/api/collections/",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteCollection(token: string, collectionId: string) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function getCollectionUsers(token: string, collectionId: string) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}/users`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function addCollectionUser(
  token: string,
  collectionId: string,
  email: string,
  permission: string
) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email,
    permission,
    collectionId,
  });

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}/users`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function changeUserPermissions(
  token: string,
  userId: string,
  collectionId: string,
  permission: string
) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    userId,
    permission,
    collectionId,
  });

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}/users`,
    {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteCollectionUser(
  token: string,
  collectionId: string,
  email: string
) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email,
    collectionId,
  });

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}/users`,
    {
      method: "DELETE",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function getCollectionDocs(token: string, collectionId: string) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}/docs`,
    {
      method: "GET",
      headers: headersList,
    }
  );
  if (!response.ok) return [];

  const data = await response.json();
  return data;
}

// let headersList = {
//   "Accept": "*/*",
//   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
//   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDJhYTUwMTI5NzRkODBjOGVkNDQ1ZiIsImlhdCI6MTcxMTQ1ODE2MCwiZXhwIjoxNzQyOTk0MTYwfQ.IsFyeQdc9_ZugMnggsGvuMmyMhKJYf5XHlHFJjlLTio"
//  }
//
//  let response = await fetch("http://localhost:3001/api/collections/6607f21904dfd73155a4062e/docs", {
//    method: "GET",
//    headers: headersList
//  });
//
//  let data = await response.text();
