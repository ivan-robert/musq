import { callEdgeFunction } from "#shared/infra/requestHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

export const deleteFolder = async (
  client: SupabaseClient,
  folderId: number
) => {
  const { error } = await callEdgeFunction(
    client,
    `api/workout-templates/folder/${folderId}`,
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw new Error("Failed to delete folder");
  }
};

export const deleteTemplates = async (
  client: SupabaseClient,
  id__in: number[]
) => {
  const { error } = await callEdgeFunction(
    client,
    axios.getUri({
      url: `api/workout-templates/templates`,
      params: { id__in: id__in.join(",") },
    }),
    {
      method: "DELETE",
    }
  );

  if (error) {
    throw new Error("Failed to delete template");
  }
};
