function generateUniqueId() {
  return Array.from({ length: 32 }, () =>
    Math.random().toString(16).substring(2, 3)
  ).join("");
}

export default generateUniqueId;
