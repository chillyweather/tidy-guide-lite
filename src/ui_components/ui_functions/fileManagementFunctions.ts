/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import envConfig from "../../envConfig";
import { generateUniqueId } from "./generateUniqueId";

export async function uploadFileToServer(file: File, loggedInUser: string) {
  if (loggedInUser) {
    const currentUserName = loggedInUser!.split("@")[0];
    const uid = generateUniqueId();
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileNameWithoutExtension = file.name
      .split(".")
      .slice(0, -1)
      .join(".");

    const s3Client = new S3Client({
      endpoint: "https://nyc3.digitaloceanspaces.com",
      forcePathStyle: false,
      region: "us-east-1",
      credentials: {
        accessKeyId: "DO00D77GXR7EE6JEHJQ7",
        secretAccessKey: envConfig.DO_SECRET,
      },
    });

    const params = {
      Bucket: "tidy-guide-resources",
      Key: `images/${fileNameWithoutExtension}_${currentUserName}_${uid}.${fileExtension}`,
      Body: file,
      ACL: "public-read",
      Metadata: {
        image: `${file.name}`,
      },
    };

    const uploadObject = async () => {
      try {
        // console.log("loading");
        //@ts-ignore
        const data = await s3Client.send(new PutObjectCommand(params));
        if (data) {
          // console.log("loaded");
        }
        const url = `https://tidy-guide-resources.nyc3.digitaloceanspaces.com/images/${fileNameWithoutExtension}_${currentUserName}_${uid}.${fileExtension}`;
        return url;
      } catch (err) {
        console.log("Error", err);
      }
    };

    const data = uploadObject();
    return data;
  }
}

export async function deleteFileFromServer(url: string) {
  const s3Client = new S3Client({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    forcePathStyle: false,
    region: "us-east-1",
    credentials: {
      accessKeyId: "DO00D77GXR7EE6JEHJQ7",
      secretAccessKey: envConfig.DO_SECRET,
    },
  });

  const params = {
    Bucket: "tidy-guide-resources",
    Key: url.split("tidy-guide-resources.nyc3.digitaloceanspaces.com/")[1],
  };

  const deleteObject = async () => {
    try {
      const data = await s3Client.send(new DeleteObjectCommand(params));
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  };

  const result = await deleteObject();
  return result;
}

export async function deleteMultipleFilesFromServer(urls: string[]) {
  const s3Client = new S3Client({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    forcePathStyle: false,
    region: "us-east-1",
    credentials: {
      accessKeyId: "DO00D77GXR7EE6JEHJQ7",
      secretAccessKey: envConfig.DO_SECRET,
    },
  });

  const deleteResults = await Promise.all(
    urls.map(async (url) => {
      const params = {
        Bucket: "tidy-guide-resources",
        Key: url.split("tidy-guide-resources.nyc3.digitaloceanspaces.com/")[1],
      };

      try {
        const data = await s3Client.send(new DeleteObjectCommand(params));
        return { url, status: "success", data };
      } catch (err: any) {
        return { url, status: "error", error: err.message };
      }
    })
  );

  return deleteResults;
}
