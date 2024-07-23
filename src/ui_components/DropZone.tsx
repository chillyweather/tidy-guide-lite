/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerticalSpace } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useAtom } from "jotai";
import { loggedInUserAtom } from "src/state/atoms";
import { uploadFileToServer } from "src/ui_components/ui_functions/fileManagementFunctions";
import { useEffect } from "react";
import imageLoader from "../images/loader-spinner.png";
import { IconCloudUpload } from "@tabler/icons-react";

export function DropZone(
  setRemoteImageLink: any,
  setIsImageLoading: (state: boolean) => void,
  isImageLoading: boolean,
  remoteImageLink: string
) {
  const [loggedInUser] = useAtom(loggedInUserAtom);

  async function handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/svg+xml")
    ) {
      setIsImageLoading(true);
      const path = await uploadFileToServer(file, loggedInUser!);
      setRemoteImageLink(path);
    } else {
      alert("Please upload a valid image file");
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  useEffect(() => {
    if (remoteImageLink) {
      setIsImageLoading(false);
    }
  }, [remoteImageLink]);

  function getImageSizes(
    file: File
  ): Promise<{ width: number; height: number; sizeInBytes: number }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = new Image();
        image.onload = function () {
          const imageSizes = {
            width: image.width,
            height: image.height,
            sizeInBytes: file.size,
          };
          resolve(imageSizes);
        };
        image.onerror = function () {
          reject(new Error("Failed to load image."));
        };
        image.src = e.target!.result as string;
      };
      reader.onerror = function () {
        reject(new Error("Failed to read file."));
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div
      className={"drop-zone"}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isImageLoading ? (
        <div className={"loader image-loader"}>
          <div className={"rotatingBucket"}>
            <img src={imageLoader} />
          </div>
        </div>
      ) : (
        <div className={"drop-text"}>
          <div>
            <b>Drop a file here or click to upload image </b>
            <br />
            Maximum resolution 4096 x 4096 pixels
            <br />
            <u>Up to 1MB in size</u>
          </div>
          <VerticalSpace space="small" />
          <label htmlFor="file-input" className={"drop-button second"}>
            <IconCloudUpload />
            Upload Image
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={async (event) => {
              const file = (event.target as HTMLInputElement)?.files?.[0];
              if (!file) return;
              const { width, height, sizeInBytes } = await getImageSizes(file);
              if (
                file &&
                (file.type === "image/jpeg" ||
                  file.type === "image/png" ||
                  file.type === "image/svg+xml") &&
                sizeInBytes < 1024000 &&
                width < 4096 &&
                height < 4096
              ) {
                setIsImageLoading(true);
                uploadFileToServer(file, loggedInUser!).then((path) => {
                  setIsImageLoading(false);
                  setRemoteImageLink(path);
                });
              } else {
                alert("Please upload a valid image file");
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
