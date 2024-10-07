import { useSupabaseClient } from "#app/supabaseClient";
import { Folder } from "#modules/Seance/domain/folder.types";
import { PreparedWorkout } from "#modules/Seance/domain/seance.types";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFolderMeta = (folderId: number) => {
  const client = useSupabaseClient();
  return useSuspenseQuery({
    queryKey: ["folder", "meta", folderId],
    queryFn: async () => await fetchFolderMeta(client, folderId),
  });
};

export const useUserFolders = (userId: string) => {
  const client = useSupabaseClient();

  return useSuspenseQuery({
    queryKey: ["folder", userId],
    queryFn: () => fetchUserFolders(client, userId),
  });
};

export const useFolderContent = (folderId: number) => {
  const client = useSupabaseClient();

  return useSuspenseQuery({
    queryKey: ["folder", "content", folderId],
    queryFn: () => fetchFolderContent(client, folderId),
  });
};

const fetchFolderContent = async (client: SupabaseClient, folderId: number) => {
  const { data, error } = await callEdgeFunction<PreparedWorkout[]>(
    client,
    `api/workout-templates/folder/${folderId}/content`,
    { method: "GET" }
  );

  if (error || !data) {
    if (error?.status === 403) {
      return [];
    }

    throw new Error("Failed to fetch folder content");
  }

  return data;
};

const fetchUserFolders = async (client: SupabaseClient, userId: string) => {
  const { data, error } = await callEdgeFunction<Folder[]>(
    client,
    axios.getUri({
      url: "api/workout-templates/folders",
      params: { user_id: userId },
    }),

    { method: "GET" }
  );

  if (error || !data) {
    throw new Error("Failed to fetch user folders");
  }

  return data;
};

const fetchFolderMeta = async (client: SupabaseClient, folderId: number) => {
  const { data: folder_to_return } = await callEdgeFunction<Folder>(
    client,
    axios.getUri({
      url: `api/workout-templates/folder/${folderId}/meta`,
      params: { folder_id: folderId },
    }),
    { method: "GET" }
  );

  if (!folder_to_return) {
    throw new Error("Failed to fetch folder meta");
  }

  return folder_to_return;
};
