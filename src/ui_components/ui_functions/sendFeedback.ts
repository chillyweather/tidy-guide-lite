export async function sendFeedback(issueTitle: string, issueBody: string) {
  const url = `https://gr.tidyframework.com/issues`;
  const body = {
    issueTitle: issueTitle,
    issueBody: issueBody,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resp = await response.json();
    return resp;
  } catch (error) {
    console.error(error);
    return null;
  }
}
