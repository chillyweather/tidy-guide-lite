/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useState } from "preact/hooks";

import { useAtom } from "jotai";
import {
  userToEditAtom,
  showEditUserFormAtom,
  tokenAtom,
} from "src/state/atoms";
import {
  addCollectionUser,
  changeUserPermissions,
} from "./ui_functions/collectionHandlers";
import { Button } from "@create-figma-plugin/ui";

export default function AddUserForm({
  collectionId,
  setTrigger,
  type = "Add",
  userEmail = "",
  userId = "",
  setIsAddUserError,
  setAddUserMessage,
}: {
  collectionId: string;
  setTrigger: any;
  type?: "Add" | "Edit";
  userEmail?: string;
  userId?: string;
  setIsAddUserError: any;
  setAddUserMessage: any;
}): any {
  const [token] = useAtom(tokenAtom);
  if (!token) return null;
  // const [selectedCollection]: any = useAtom(selectedCollectionAtom);
  const [userToEdit]: any = useAtom(userToEditAtom);
  const [email, setEmail] = useState(userEmail || "");
  const [role, setRole] = useState(userToEdit ? userToEdit.rank : "Viewer");
  const [, setUserToEdit] = useAtom(userToEditAtom);
  const [, setShowForm] = useAtom(showEditUserFormAtom);

  const handleSubmit = async (e: any) => {
    if (type === "Add") {
      e.preventDefault();
      const response = await addCollectionUser(
        token,
        collectionId,
        email,
        role
      );
      const message = response.message;
      switch (message) {
        case "User already exists in the collection":
          setIsAddUserError(true);
          setAddUserMessage("User already exists in this collection");
          break;
        case "User or collection not found":
          setIsAddUserError(true);
          setAddUserMessage("This user does not exist in the system");
          break;
        case "User added to collection":
          setIsAddUserError(false);
          setAddUserMessage("User added");
          setShowForm(false);
          break;
        default:
          setIsAddUserError(true);
          setAddUserMessage("Something went wrong, please try again later");
          break;
      }
      setTrigger((prevTrigger: number) => prevTrigger + 1);
    } else if (type === "Edit") {
      e.preventDefault();
      await changeUserPermissions(token, userId, collectionId, role);
      setUserToEdit(null);
      setTrigger((prevTrigger: number) => prevTrigger + 1);
      setShowForm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={"add-user-form"}>
      <input
        type="text"
        id="mailInput"
        value={email}
        placeholder={"Email"}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        disabled={type === "Edit"}
      />

      <select
        value={role}
        onChange={(e) => setRole((e.target as HTMLSelectElement).value)}
      >
        <option value="Viewer">Viewer</option>
        <option value="Editor">Editor</option>
      </select>

      <Button
        type="submit"
        className={"users-button no-margin add-user-button"}
      >
        {type === "Edit" ? "Change" : "Add"}
      </Button>
    </form>
  );
}
