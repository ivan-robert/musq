export type NotificationDTO = {
  id: string;
  created_at: string;
  user_clerk_id: string;
  read_at: string | null;
  data: Record<string, unknown>;
  title: string;
  body: string;
};
