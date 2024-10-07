import { SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_KEY = process.env.SUPABASE_KEY;


if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_KEY");
}

export const API_URL = process.env.API_URL;
export const API_KEY = process.env.API_KEY;
export const API_HOST = process.env.API_HOST;

if (!API_URL || !API_KEY || !API_HOST) {
    throw new Error("Missing API_URL, API_KEY or API_HOST");
}


export const service_client = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);
