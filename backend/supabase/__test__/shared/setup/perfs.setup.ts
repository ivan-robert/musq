import { supabase_service_client } from "../client.ts";
import { exoEntries } from "./exos.setup.ts";
import { seancesEntries } from "./seances.setup.ts";
import { Logger } from "#shared/service/logger.service.ts";

type DbPerf = {
  perf_id: string;
  seance_id: string;
  exo_id: string;
};

export const perfEntries = {
  perf_poids_1: {
    perf_id: "00000000-0000-0000-0000-000000000010",
    seance_id: seancesEntries.poids_stats_1.seance_id,
    exo_id: exoEntries.poids.id,
  },
  perf_poids_2: {
    perf_id: "00000000-0000-0000-0000-000000000020",
    seance_id: seancesEntries.poids_stats_2.seance_id,
    exo_id: exoEntries.poids.id,
  },
  perf_poids_3: {
    perf_id: "00000000-0000-0000-0000-000000000030",
    seance_id: seancesEntries.poids_stats_3.seance_id,
    exo_id: exoEntries.poids.id,
  },
  perf_poids_4: {
    perf_id: "00000000-0000-0000-0000-000000000040",
    seance_id: seancesEntries.poids_stats_4.seance_id,
    exo_id: exoEntries.poids.id,
  },
  perf_poids_5: {
    perf_id: "00000000-0000-0000-0000-000000000050",
    seance_id: seancesEntries.poids_stats_5.seance_id,
    exo_id: exoEntries.poids.id,
  },
  perf_reps_1: {
    perf_id: "22222222-0000-0000-0000-000000000010",
    seance_id: seancesEntries.reps_stats_1.seance_id,
    exo_id: exoEntries.reps.id,
  },
  perf_reps_2: {
    perf_id: "22222222-0000-0000-0000-000000000020",
    seance_id: seancesEntries.reps_stats_2.seance_id,
    exo_id: exoEntries.reps.id,
  },
  perf_reps_3: {
    perf_id: "22222222-0000-0000-0000-000000000030",
    seance_id: seancesEntries.reps_stats_3.seance_id,
    exo_id: exoEntries.reps.id,
  },
  perf_reps_4: {
    perf_id: "22222222-0000-0000-0000-000000000040",
    seance_id: seancesEntries.reps_stats_4.seance_id,
    exo_id: exoEntries.reps.id,
  },
  perf_reps_5: {
    perf_id: "22222222-0000-0000-0000-000000000050",
    seance_id: seancesEntries.reps_stats_5.seance_id,
    exo_id: exoEntries.reps.id,
  },
  perf_temps_1: {
    perf_id: "22222222-1111-0000-0000-000000000010",
    seance_id: seancesEntries.temps_stats_1.seance_id,
    exo_id: exoEntries.temps.id,
  },
  perf_temps_2: {
    perf_id: "22222222-1111-0000-0000-000000000020",
    seance_id: seancesEntries.temps_stats_2.seance_id,
    exo_id: exoEntries.temps.id,
  },
  perf_temps_3: {
    perf_id: "22222222-1111-0000-0000-000000000030",
    seance_id: seancesEntries.temps_stats_3.seance_id,
    exo_id: exoEntries.temps.id,
  },
  perf_temps_4: {
    perf_id: "22222222-1111-0000-0000-000000000040",
    seance_id: seancesEntries.temps_stats_4.seance_id,
    exo_id: exoEntries.temps.id,
  },
  perf_temps_5: {
    perf_id: "22222222-1111-0000-0000-000000000050",
    seance_id: seancesEntries.temps_stats_5.seance_id,
    exo_id: exoEntries.temps.id,
  },
} as const;

// Function to create perf entries
export async function createPerfEntries() {
  Logger.info("--- SETTING UP PERFS ---");
  for (let perfEntry of Object.values(perfEntries) as DbPerf[]) {
    const { error } = await supabase_service_client
      .from("perfs")
      .insert([perfEntry]);

    if (error) {
      console.error("Error creating performance entry:", error);
    }
  }
  Logger.info("\n--- PERFS SET UP COMPLETE ---");
}
