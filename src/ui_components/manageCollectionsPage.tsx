/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import { findUserRole } from "./ui_functions/findUserRole";
import {
  IconDotsVertical,
  IconPencil,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import {
  collectionsAtom,
  collectionToEditAtom,
  collectionDocsTriggerAtom,
  currentUserIdAtom,
  showNonEmptyCollectionPopupAtom,
  usersAtom,
  tokenAtom,
} from "src/state/atoms";
import { Dispatch } from "preact/hooks";

export type FormType = "Add" | "Edit";

import { deleteCollection } from "./ui_functions/collectionHandlers";

import { StateUpdater, useEffect, useState } from "preact/hooks";
import { Button } from "@create-figma-plugin/ui";
import AddCollectionForm from "./AddCollectionForm";

function manageCollectionsPage() {
  const [collections] = useAtom(collectionsAtom);
  const [, setCollectionDocsTrigger] = useAtom(collectionDocsTriggerAtom);

  useEffect(() => {
    setCollectionDocsTrigger((n: number) => n + 1);
  }, []);

  return (
    <div className={"manage-users"}>
      <div className="delete-flex hidden"></div>
      <h2>Manage collections</h2>
      <br />
      {generateContent(collections)}
    </div>
  );
}

export default manageCollectionsPage;

function generateContent(collections: any) {
  const [showAddCollectionForm, setShowAddCollectionForm] = useState(false);
  const [currentFormType, setCurrentFormType] = useState<FormType>("Add");
  const [isAddUserError, setIsAddUserError] = useState(false);
  const [addUserMessage, setAddUserMessage] = useState("");

  const [collectionToEdit]: any = useAtom(collectionToEditAtom);

  useEffect(() => {
    console.log("collectionToEdit", collectionToEdit);
  }, [collectionToEdit]);

  return (
    <div className={"users-flex"}>
      <Button
        className={"users-button"}
        onClick={() => {
          setCurrentFormType("Add");
          setShowAddCollectionForm(true);
        }}
      >
        <IconPlus />
        Add
      </Button>
      <div className={"user-card title"}>
        <p>Name</p>
        <p>Owner</p>
        <p>Role</p>
      </div>
      {showAddCollectionForm && (
        <div className={"add-user-form-wrapper"}>
          <AddCollectionForm
            type={currentFormType}
            name={
              currentFormType === "Edit"
                ? collectionToEdit && collectionToEdit.name
                : ""
            }
            setShowForm={setShowAddCollectionForm}
            setIsAddUserError={setIsAddUserError}
            setAddUserMessage={setAddUserMessage}
          />
          <button
            onClick={() => {
              setShowAddCollectionForm(false);
              setIsAddUserError(false);
              setAddUserMessage("");
            }}
          >
            <IconX />
          </button>
          {isAddUserError && <p className={"error-msg"}>{addUserMessage}</p>}
        </div>
      )}
      {collections.map((collection: any) => {
        return generateCollectionCard(
          collection,
          setShowAddCollectionForm,
          setCurrentFormType
        );
      })}
    </div>
  );
}

function generateCollectionCard(
  collection: any,
  setShowAddCollectionForm: Dispatch<StateUpdater<boolean>>,
  setCurrentFormType: Dispatch<StateUpdater<FormType>>
) {
  const [, setShowNonEmptyCollectionPopup] = useAtom(
    showNonEmptyCollectionPopupAtom
  );
  const [, setCollectionToEdit] = useAtom(collectionToEditAtom);
  const [token] = useAtom(tokenAtom);
  const [currentUser] = useAtom(currentUserIdAtom);
  const [collectionOwnerEmail, setCollectionOwnerEmail] = useState("");
  const [users] = useAtom(usersAtom);
  const [, setCollectionDocsTrigger] = useAtom(collectionDocsTriggerAtom);
  const isOwner = collection.owner === currentUser;
  if (!token) return null;

  function triggerCollectionRefresh() {
    setCollectionDocsTrigger((n: number) => n + 1);
  }

  const userRole = findUserRole(collection, currentUser);

  function findUserEmail(users: any, userId: string) {
    const user = users.find((user: any) => user.id === userId);
    return user ? user.email : null;
  }

  useEffect(() => {
    if (users.length) {
      const ownerEmail = findUserEmail(users, collection.owner);
      setCollectionOwnerEmail(ownerEmail);
    }
  }, [users]);

  return (
    <div className={"user-card-wrapper"}>
      <div className={"collection-card"}>
        <p>{collection.name}</p>
        <p>{collectionOwnerEmail}</p>

        <div
          className={"tag " + userRole}
          style={{ marginRight: "18px" }}
        ></div>
        {userRole !== "Viewer" && (
          <details>
            <summary>
              <button>
                <IconDotsVertical />
              </button>
            </summary>
            <div className="edit-collection-menu">
              <div
                className="edit-collection-item"
                onClick={() => {
                  setCurrentFormType("Edit");
                  setCollectionToEdit(collection);
                  setShowAddCollectionForm(true);
                }}
              >
                <IconPencil />
                Edit
              </div>
              {isOwner && (
                <div
                  className="edit-collection-item"
                  onClick={async () => {
                    if (collection.documentations.length) {
                      setShowNonEmptyCollectionPopup(true);
                    } else {
                      await deleteCollection(token, collection._id);
                      triggerCollectionRefresh();
                    }
                  }}
                >
                  <IconTrash />
                  Remove
                </div>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
