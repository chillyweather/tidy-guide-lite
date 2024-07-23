export async function login(email: string, password: string) {
  const path = "https://api.tidyframework.com/api/users/login";
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function createNewAccount(
  name: string,
  email: string,
  password: string,
  company: string,
  rank: string
) {
  const path = "https://api.tidyframework.com/api/users/";
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, company, rank }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function deleteAccount(token: string, id: string) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await fetch(
    `https://api.tidyframework.com/api/users/${id}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );

  try {
    const data = await response.text();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getMyAccountData(token: string) {
  const path = "https://api.tidyframework.com/api/users/me";
  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getUsers(token: string) {
  const path = "https://api.tidyframework.com/api/users";
  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getPasswordResetToken(email: string) {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email: `${email}`,
  });

  const response = await fetch(
    "https://api.tidyframework.com/api/users/forgetpassword",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function resetPassword(
  email: string,
  token: string,
  newPassword: string,
  confirmPassword: string
) {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email: `${email}`,
    token: `${token}`,
    newPassword: `${newPassword}`,
    confirmPassword: `${confirmPassword}`,
  });

  const response = await fetch(
    "https://api.tidyframework.com/api/users/resetpassword",
    {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.text();
  return data;
}
