async function logoutDataHandler() {
  const keys = await figma.clientStorage.keysAsync();
  for (const key of keys) {
    await figma.clientStorage.deleteAsync(key);
  }
}

export { logoutDataHandler };
