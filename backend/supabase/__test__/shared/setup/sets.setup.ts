// Import necessary utilities from your client and auth setup
import { supabase_service_client } from "../client.ts";
import { Logger } from "#shared/service/logger.service.ts";
import { perfEntries } from "./perfs.setup.ts";
import { Tables } from "#shared/infra/types/db/database.types.ts";

type Entries = {
  before_both_pr: Tables<"sets">[];
  between_pr: Tables<"sets">[];
  after_both_pr: Tables<"sets">[];
};

// Object holding different series_poids entries
export const seriesPoidsEntries: Entries = {
  before_both_pr: [
    {
      set_id: "00000000-0000-0000-0000-000000000021",
      time_in_seconds: null,
      weight: 90.0,
      reps: 8,
      failure: false,
      is_dropset: false,
      is_warmup: false,
      index: 1,
      rest_in_seconds: 1,
      perf_id: perfEntries.perf_poids_1.perf_id,
      exercise_id: null,
    },
  ],
  between_pr: [
    {
      set_id: "00000000-0000-0000-0000-000000000022",
      weight: 95.0,
      reps: 8,
      failure: false,
      index: 1,
      rest_in_seconds: 2,
      perf_id: perfEntries.perf_poids_2.perf_id,
      exercise_id: null,
      time_in_seconds: null,
      is_dropset: false,
      is_warmup: false,
    },
    {
      set_id: "00000000-0000-0000-0000-000000000023",
      weight: 100.0,
      reps: 6,
      failure: false,
      index: 1,
      rest_in_seconds: 3,
      perf_id: perfEntries.perf_poids_3.perf_id,
      time_in_seconds: null,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
  ],
  after_both_pr: [
    {
      set_id: "00000000-0000-0000-0000-000000000024",
      weight: 110.0,
      reps: 5,
      failure: false,
      index: 1,
      rest_in_seconds: 4,
      perf_id: perfEntries.perf_poids_4.perf_id,
      time_in_seconds: null,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
    {
      set_id: "00000000-0000-0000-0000-000000000025",
      weight: 115.0,
      reps: 4,
      failure: false,
      index: 1,
      rest_in_seconds: 5,
      perf_id: perfEntries.perf_poids_5.perf_id,
      time_in_seconds: null,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
  ],
} as const;

export const seriesRepsEntries: Entries = {
  before_both_pr: [
    {
      set_id: "33333333-3333-0000-0000-000000000001",
      reps: 8,
      failure: false,
      index: 1,
      rest_in_seconds: 1,
      perf_id: perfEntries.perf_reps_1.perf_id,
      time_in_seconds: null,
      weight: null,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
  ],
  between_pr: [
    {
      set_id: "33333333-3333-0000-0000-000000000002",
      reps: 8,
      failure: false,
      index: 1,
      rest_in_seconds: 2,
      time_in_seconds: null,
      weight: null,
      perf_id: perfEntries.perf_reps_2.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
    {
      set_id: "33333333-3333-0000-0000-000000000003",
      reps: 6,
      failure: false,
      time_in_seconds: null,
      weight: null,
      index: 1,
      rest_in_seconds: 3,
      perf_id: perfEntries.perf_reps_3.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
  ],
  after_both_pr: [
    {
      set_id: "33333333-3333-0000-0000-000000000004",
      reps: 5,
      failure: false,
      index: 1,
      rest_in_seconds: 4,
      time_in_seconds: null,
      weight: null,
      perf_id: perfEntries.perf_reps_4.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
    {
      set_id: "33333333-3333-0000-0000-000000000005",
      reps: 4,
      failure: false,
      index: 1,
      time_in_seconds: null,
      weight: null,
      rest_in_seconds: 5,
      perf_id: perfEntries.perf_reps_5.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
  ],
} as const;

export const seriesTempsEntries: Entries = {
  before_both_pr: [
    {
      set_id: "44444444-4444-0000-0000-000000000001",
      index: 1,
      time_in_seconds: 8, // Assuming 'time_in_seconds' is measured in seconds or a similar unit
      rest_in_seconds: 1,
      failure: false,
      reps: null,
      weight: null,
      perf_id: perfEntries.perf_temps_1.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
  ],
  between_pr: [
    {
      set_id: "44444444-4444-0000-0000-000000000002",
      index: 1,
      time_in_seconds: 8,
      failure: false,
      reps: null,
      weight: null,
      rest_in_seconds: 2,
      perf_id: perfEntries.perf_temps_2.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
    {
      set_id: "44444444-4444-0000-0000-000000000003",
      index: 1,
      time_in_seconds: 6,
      rest_in_seconds: 3,
      failure: false,
      reps: null,
      weight: null,
      perf_id: perfEntries.perf_temps_3.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
  ],
  after_both_pr: [
    {
      set_id: "44444444-4444-0000-0000-000000000004",
      index: 1,
      time_in_seconds: 5,
      failure: false,
      reps: null,
      weight: null,
      rest_in_seconds: 4,
      perf_id: perfEntries.perf_temps_4.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
    {
      set_id: "44444444-4444-0000-0000-000000000005",
      index: 1,
      time_in_seconds: 4,
      rest_in_seconds: 5,
      failure: false,
      reps: null,
      weight: null,
      perf_id: perfEntries.perf_temps_5.perf_id,
      exercise_id: null,
      is_dropset: false,
      is_warmup: false,
    },
  ],
} as const;

// Function to create all series_poids entries
export const createSetEntries = async () => {
  Logger.info("🔨 ---Creating series_poids--- 🔨");

  // Iterate over each key in the seriesPoidsEntries object
  for (const key in seriesPoidsEntries) {
    await supabase_service_client
      .from("sets")
      //@ts-expect-error string indexing
      .insert(seriesPoidsEntries[key]);
  }
  for (const key in seriesRepsEntries) {
    await supabase_service_client
      .from("sets")
      //@ts-expect-error string indexing
      .insert(seriesRepsEntries[key]);
  }
  for (const key in seriesTempsEntries) {
    await supabase_service_client
      .from("sets")
      //@ts-expect-error string indexing
      .insert(seriesTempsEntries[key]);
  }
  Logger.info("\n✅ sets created! ✅");
};
