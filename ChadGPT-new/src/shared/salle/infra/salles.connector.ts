import { SupabaseClient } from "@supabase/supabase-js";
import { Salle } from "../domain/salle.types";
import { adaptSalle } from "./salles.adapter";

export const sallesConnector = async (
  supabaseClient: SupabaseClient
): Promise<Salle[]> => {
  const { data, error } = await supabaseClient.from("salles").select("*");
  if (error) throw error;
  const sallesRaw = data;
  return sallesRaw.map(adaptSalle);
};
