import { RequestHandler } from "#shared/infra/server/types.ts";

export const syncUsers: RequestHandler = async (request) => {
  console.log(request.headers);
  return new Response("Syncing users");
};
