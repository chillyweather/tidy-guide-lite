"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from "preact";
import {
  IconDotsVertical,
  IconX,
  IconPencil,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import {
  getCollectionUsers,
  deleteCollectionUser,
} from "src/ui_components/ui_functions/collectionHandlers";
import { useEffect, useState } from "preact/hooks";
import { Button } from "@create-figma-plugin/ui";
import CollectionsInSettingsDropdown from "./CollectionsInSettingsDropdown";
import AddUserForm from "./AddUserForm";

import {
  collectionDocsTriggerAtom,
  collectionsAtom,
  selectedCollectionAtom,
  selectedCollectionInSettingsAtom,
  showEditUserFormAtom,
  userToEditAtom,
  tokenAtom,
} from "src/state/atoms";

function manageUsersPage() {
  const [collections] = useAtom(collectionsAtom);
  const [selectedCollectionInSettings]: any = useAtom(
    selectedCollectionInSettingsAtom
  );
  const [, setCollectionDocsTrigger] = useAtom(collectionDocsTriggerAtom);
  function triggerCollectionRefresh() {
    setCollectionDocsTrigger((n: number) => n + 1);
  }

  useEffect(() => {
    triggerCollectionRefresh();
  }, []);

  return (
    <div className={"manage-users"}>
      <div className="delete-flex hidden"></div>
      <h2>Manage members</h2>
      <br />
      {/* <h3>Collections:</h3> */}
      <CollectionsInSettingsDropdown options={collections} />
      <div>
        {selectedCollectionInSettings &&
          renderUsers(selectedCollectionInSettings._id)}
      </div>
      ;
    </div>
  );
}

export default manageUsersPage;

function renderUsers(collectionId: string) {
  const [collectionUsers, setCollectionUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  //NOTE: problem with atoms
  const [showEditUserForm, setShowEditUserForm] = useAtom(showEditUserFormAtom);
  const [userToEdit, setUserToEdit]: any = useAtom(userToEditAtom);
  const [isAddUserError, setIsAddUserError] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState("");
  const [trigger, setTrigger] = useState(0);

  const [token] = useAtom(tokenAtom);
  useEffect(() => {
    async function fetchCollectionUsers() {
      try {
        if (!token) return null;
        const data = await getCollectionUsers(token, collectionId);
        setCollectionUsers(data);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchCollectionUsers();
  }, [collectionId, trigger]);

  return (
    <div className={"users-flex"}>
      <Button
        className={"users-button"}
        onClick={() => {
          setShowAddUserForm(true);
          setTimeout(function () {
            document.getElementById("mailInput")?.focus();
          }, 100);
        }}
        disabled={showAddUserForm}
      >
        <IconPlus />
        Add
      </Button>
      <div className={"user-card title"}>
        <p>Name</p>
        <p>Email</p>
        <p>Role</p>
      </div>
      {showAddUserForm && (
        <div className="add-user-form-and-validation-wrapper">
          <div className={"add-user-form-wrapper"}>
            <AddUserForm
              collectionId={collectionId}
              setTrigger={setTrigger}
              setAddUserMessage={setAddErrorMessage}
              setIsAddUserError={setIsAddUserError}
            />
            <button
              onClick={() => {
                setShowAddUserForm(false);
                setIsAddUserError(false);
                setAddErrorMessage("");
              }}
            >
              <IconX />
            </button>
            {isAddUserError && <p className={"error-msg"}>{addErrorMessage}</p>}
          </div>
        </div>
      )}
      {showEditUserForm && (
        <div className={"add-user-form-wrapper"}>
          <AddUserForm
            collectionId={collectionId}
            setTrigger={setTrigger}
            type="Edit"
            userEmail={userToEdit?.email}
            userId={userToEdit?.id}
            setAddUserMessage={setAddErrorMessage}
            setIsAddUserError={setIsAddUserError}
          />
          <button
            onClick={() => {
              setShowEditUserForm(false);
              setUserToEdit(null);
            }}
          >
            <IconX />
          </button>
        </div>
      )}
      {collectionUsers &&
        collectionUsers.length &&
        collectionUsers.map((user: any) => {
          if (user) {
            return generateUserCard(user, collectionId, setTrigger);
          }
        })}
    </div>
  );
}

function generateUserCard(user: any, collectionId: string, setTrigger: any) {
  const [token] = useAtom(tokenAtom);
  const [, setShowEditUserForm] = useAtom(showEditUserFormAtom);
  const [userToEdit, setUserToEdit]: any = useAtom(userToEditAtom);
  const [selectedCollection]: any = useAtom(selectedCollectionAtom);
  const isOwner = selectedCollection?.owner === user.id;
  if (!token) return null;
  function colorMe(a: any, b: any) {
    const colorList = [
      "#F584AD",
      "#AC93F0",
      "#D1423F",
      "#DC1677",
      "#C233A0",
      "#6163E1",
      "#246DB6",
      "#008290",
      "#7BA100",
      "#9355D2",
      "#6D8391",
      "#3B814F",
      "#8190EA",
      "#50CE71",
      "#F2BA3B",
      "#030303",
      "#E38072",
      "#543150",
      "#F8970C",
      "#285736",
      "#00BFA5",
      "#FF7BAD",
      "#84CE29",
      "#FF6D00",
      "#FF372B",
      "#304FFE",
    ];

    let selectedColorIndex =
      a.charCodeAt(0) - 97 + 1 - (b.charCodeAt(0) - 97 + 1);
    if (selectedColorIndex < 0) {
      selectedColorIndex *= -1;
    }

    return colorList[selectedColorIndex];
  }
  return (
    <div className={"user-card-wrapper"}>
      {user.id !== userToEdit?.id && (
        <div key={user._id} className={"user-card"}>
          <div
            className={"user-tag"}
            first-letter={user.email.slice(0, 1)}
            last-letter={user.email.slice(
              user.email.lastIndexOf("@") - 1,
              user.email.lastIndexOf("@")
            )}
            style={{
              backgroundColor: colorMe(
                user.email.slice(0, 1),
                user.email.slice(
                  user.email.lastIndexOf("@") - 1,
                  user.email.lastIndexOf("@")
                )
              ),
            }}
          >
            {user.email.slice(0, 1)}
          </div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>
            <div className={"tag " + user.rank}></div>
          </p>
          {!isOwner && (
            <details>
              <summary>
                <button>
                  <IconDotsVertical />
                </button>
              </summary>
              <div className="user-menu">
                <div
                  className="user-item"
                  onClick={() => {
                    setShowEditUserForm(true);
                    setUserToEdit(user);
                  }}
                >
                  <IconPencil />
                  Edit
                </div>
                <div
                  className="user-item"
                  onClick={async () => {
                    await deleteCollectionUser(token, collectionId, user.email);
                    setTrigger((prevTrigger: number) => prevTrigger + 1);
                  }}
                >
                  <IconTrash />
                  Remove
                </div>
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
