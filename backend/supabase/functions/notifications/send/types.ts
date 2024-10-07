import { Tables } from "#shared/infra/types/db/database.types.ts";

export type NotificationObject = {
  to: string;
  sound: "default";
  body: string;
  title: string;
};

export interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Tables<"notifications">;
  schema: "public";
  old_record: null | Tables<"notifications">;
}
