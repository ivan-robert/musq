import { S3Client, DeleteObjectCommand, GetObjectCommand } from "@aws-s3";
import { getEnvVariable } from "#functions/environment.ts";
import { getSignedUrl } from "@aws-s3-presigner";
import { Logger } from "#shared/service/logger.service.ts";

const BUCKET = "musq-files";

const s3Client = new S3Client({
  region: "eu-west-3",
  credentials: {
    accessKeyId: getEnvVariable("S3_ACCESS_KEY"),
    secretAccessKey: getEnvVariable("S3_SECRET"),
  },
});

interface S3Manager {
  delete(uri: string): Promise<void>;
  get(uri: string): Promise<Blob>;
  getUrl(key: string, expiresIn?: number): Promise<string>;
}

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

const deleteFromS3 = async (params: { key: string }): Promise<void> => {
  const { key } = params;
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    Logger.error("Error deleting file from S3:", JSON.stringify(error));
    throw error;
  }
};

const getFromS3 = async (params: { key: string }): Promise<Blob> => {
  const { key } = params;
  const command = new GetObjectCommand({
    Bucket: BUCKET,
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

export const s3: S3Manager = {
  delete: async (uri) => {
    const key = uri.split("/").pop() || "";
    await deleteFromS3({ key });
  },
  get: async (uri) => {
    const key = uri.split("/").pop() || "";
    return await getFromS3({ key });
  },
  getUrl: getAuthenticatedS3ObjectUrl,
};
