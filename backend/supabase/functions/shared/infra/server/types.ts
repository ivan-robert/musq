import { User } from "@clerk/backend";
export type PermissionChecker = (
  request: Request,
  user: User | null,
  kwargs: Map<string, string | number>
) => Promise<boolean> | boolean;

export type RequestHandler = (
  req: Request,
  user: User,
  kwargs: Map<string, string | number>
) => Promise<Response>;
