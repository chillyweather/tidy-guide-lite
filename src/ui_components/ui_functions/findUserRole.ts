/* eslint-disable @typescript-eslint/no-explicit-any */
function findUserRole(collection: any, userId: string) {
  if (!collection || !collection.users) return null;
  if (collection.owner === userId) return "Admin";
  const user = collection.users.find((user: any) => user.user === userId);
  return user ? user.permission : null;
}

export { findUserRole };
