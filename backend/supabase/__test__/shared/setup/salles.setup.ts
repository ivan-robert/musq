import { supabase_service_client } from "../client.ts";
import { Logger } from "#shared/service/logger.service.ts";

export const sallesEntries = {
  basic: {
    salle_id: "8aed3f49-24c9-41eb-98c7-3e8d11bb03a5",
    salle_nom: "Basic fit",
  },
} as const;

async function createSalleEntry(salleKey: keyof typeof sallesEntries) {
  return await supabase_service_client
    .from("salles")
    .insert({ ...sallesEntries[salleKey] });
}

export const createSalleEntries = async () => {
  Logger.info("--- SETTING UP SALLES ---");
  Logger.info("\n");
  for (const salle in sallesEntries) {
    //@ts-expect-error string indexing
    await createSalleEntry(salle);
    Logger.info("--- SALLES SET UP COMPLETE ---");
  }
};
