export function generateUniqueId() {
  const randomString = Math.random().toString(36).substring(2, 11);
  return randomString;
}
