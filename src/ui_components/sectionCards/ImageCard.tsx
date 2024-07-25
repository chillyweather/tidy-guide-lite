/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, FunctionComponent } from "preact";
import { textBoxElement } from "../textBoxElement";
import { useState } from "preact/hooks";
import { IconX } from "@tabler/icons-react";
import { deleteFileFromServer } from "../ui_functions/fileManagementFunctions";

const ImageCard: FunctionComponent<{
  remoteImageLink: string;
  setRemoteImageLink: any;
}> = ({ remoteImageLink, setRemoteImageLink }) => {
  const [, setIsImageLoading] = useState(false);

  function setContent() {
    {
      return !remoteImageLink ? (
        <div className={"image-container"}>
          <div className={"bold-me"}>Add URL</div>
          {textBoxElement(remoteImageLink, setRemoteImageLink, "Add link")}
        </div>
      ) : (
        <div className={"outer-image"}>
          <div className="dropZoneHeader">
            <button
              onClick={async () => {
                setRemoteImageLink("");
                const result = await deleteFileFromServer(remoteImageLink);
                if (result) {
                  setIsImageLoading(false);
                }
              }}
            >
              <IconX size={16} />
            </button>
          </div>
          <img className={"loaded-image"} src={remoteImageLink} />
          {textBoxElement(remoteImageLink, setRemoteImageLink, "Link")}
        </div>
      );
    }
  }

  return <div style={{ width: "100%" }}>{setContent()}</div>;
};

export default ImageCard;
