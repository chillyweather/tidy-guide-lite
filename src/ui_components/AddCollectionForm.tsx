/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { Button } from "@create-figma-plugin/ui";
import { FormType } from "./manageCollectionsPage";
import { useAtom } from "jotai";
import {
  collectionsAtom,
  collectionToEditAtom,
  collectionDocsTriggerAtom,
  tokenAtom,
} from "src/state/atoms";
import {
  addNewCollection,
  renameCollection,
} from "./ui_functions/collectionHandlers";

export default function AddCollectionForm({
  type = "Add",
  name = "",
  setShowForm,
  setIsAddUserError,
  setAddUserMessage,
}: {
  type?: FormType;
  name?: string;
  setShowForm: any;
  setIsAddUserError: any;
  setAddUserMessage: any;
}): any {
  const [token] = useAtom(tokenAtom);
  if (!token) return null;
  const [collectionName, setCollectionName] = useState(name || "");
  const [isNameUsed, setIsNameUsed] = useState(false);
  const [collections]: any = useAtom(collectionsAtom);
  const [collectionToEdit]: any = useAtom(collectionToEditAtom);
  const [, setCollectionDocsTrigger] = useAtom(collectionDocsTriggerAtom);

  function triggerCollectionRefresh() {
    setCollectionDocsTrigger((n: number) => n + 1);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (type === "Edit" && token) {
      console.log("collectionName rename", collectionName);
      if (collectionToEdit) {
        await renameCollection(token, collectionToEdit._id, collectionName);
        triggerCollectionRefresh();
        setShowForm(false);
      }
      console.log(`collection ${collectionName} is renamed`);
    } else if (type === "Add" && token) {
      console.log("collectionName add", collectionName);
      await addNewCollection(token, collectionName);
      triggerCollectionRefresh();
      console.log(`collection ${collectionName} is added`);
      setShowForm(false);
    }
    setShowForm(false);
  }

  useEffect(() => {
    if (isNameUsed) {
      setIsAddUserError(true);
      setAddUserMessage("Collection with this name already exists");
    } else {
      setIsAddUserError(false);
      setAddUserMessage("");
    }
  }, [isNameUsed]);

  useEffect(() => {
    if (collectionName && collections.length > 0 && type === "Add") {
      const isNameUsed = collections.some(
        (collection: any) => collection.name === collectionName
      );
      if (isNameUsed) {
        setIsNameUsed(true);
      } else {
        setIsNameUsed(false);
      }
    }
  }, [collectionName]);

  return (
    <form onSubmit={handleSubmit} className={"add-user-form"}>
      <input
        type="text"
        id="mailInput"
        value={collectionName}
        placeholder={"Collection name"}
        onChange={(e) => {
          setCollectionName((e.target as HTMLInputElement).value);
        }}
      />

      <Button
        type="submit"
        className={"users-button no-margin add-user-button"}
        disabled={isNameUsed}
      >
        {type === "Edit" ? "Change" : "Add"}
      </Button>
    </form>
  );
}
