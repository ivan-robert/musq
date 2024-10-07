import { PermissionChecker } from "#shared/infra/server/types.ts";

export const isAuthenticated: PermissionChecker = (request, user) => {
  return !!user;
};

/**
 * Check if the user who performed the request corresponds to the id specified in query params
 */
export const isSelf: PermissionChecker = (request, user) => {
  const id =
    new URL(request.url).searchParams.get("id") ??
    new URL(request.url).searchParams.get("user_id");
  if (!id || !user) {
    return false;
  }
  return user.id === id;
};
