export type WebhookPayload<T> = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: T;
  schema: "public";
  old_record: null | T;
};
