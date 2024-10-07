import { getEnvVar } from "#app/environment";
import { Logger } from "#shared/service/logger.service";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = "musq-files";

const s3Client = new S3Client({
  region: "eu-west-3",
  credentials: {
    accessKeyId: getEnvVar("S3_ACCESS_KEY"),
    secretAccessKey: getEnvVar("S3_SECRET"),
  },
});

type AWSFile = {
  local_uri: string;
  bucket_key: string;
  type: string;
};

interface S3Manager {
  put(file: AWSFile): Promise<string>;
  delete(uri: string): Promise<void>;
  get(uri: string): Promise<Blob>;
  getUrl(key: string, expiresIn?: number): Promise<string>;
}

const uploadToS3 = async (params: {
  file: string;
  key: string;
  contentType?: string;
  bucket: string;
}): Promise<string> => {
  const { file, key, contentType, bucket } = params;
  const response = await fetch(file);
  const buffer = await response.arrayBuffer();

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    // @ts-expect-error -- Arraybufer works but is not typed
    Body: buffer,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    return `https://${bucket}.s3.eu-west-3.amazonaws.com/${key}`;
  } catch (error) {
    Logger.error("Error uploading file to S3:", JSON.stringify(error));
    throw error;
  }
};

const getAuthenticatedS3ObjectUrl = async (
  key: string,
  expiresIn: number = 3600
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
  return signedUrl;
};

const deleteFromS3 = async (params: {
  key: string;
  bucket: string;
}): Promise<void> => {
  const { key, bucket } = params;
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    Logger.error("Error deleting file from S3:", JSON.stringify(error));
    throw error;
  }
};

const getFromS3 = async (params: {
  key: string;
  bucket: string;
}): Promise<Blob> => {
  const { key, bucket } = params;
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    const { Body } = await s3Client.send(command);
    if (Body instanceof Blob) {
      return Body;
    } else if (Body) {
      return new Blob([await Body.transformToByteArray()]);
    } else {
      throw new Error("Failed to retrieve file from S3");
    }
  } catch (error) {
    Logger.error("Error getting file from S3:", JSON.stringify(error));
    throw error;
  }
};

// Utility function to generate pre-signed URLs for direct uploads
export const getPresignedUploadUrl = async (
  key: string,
  bucket: string,
  contentType: string,
  expiresIn = 3600
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    Logger.error("Error generating pre-signed URL:", JSON.stringify(error));
    throw error;
  }
};

export const s3: S3Manager = {
  put: async (file) => {
    return await uploadToS3({
      file: file.local_uri,
      key: file.bucket_key,
      contentType: file.type,
      bucket: BUCKET,
    });
  },

  delete: async (uri) => {
    const key = uri.split("/").pop() || "";
    await deleteFromS3({ key, bucket: BUCKET });
  },
  get: async (uri) => {
    const key = uri.split("/").pop() || "";
    return await getFromS3({ key, bucket: BUCKET });
  },
  getUrl: getAuthenticatedS3ObjectUrl,
};
