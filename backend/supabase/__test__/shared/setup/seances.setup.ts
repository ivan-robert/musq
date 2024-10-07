import { supabase_service_client } from "../client.ts";
import { get_user_id, loginUser } from "./auth.setup.ts";
import { sallesEntries } from "./salles.setup.ts";
import { Logger } from "#shared/service/logger.service.ts";

type DbSeance = {
  seance_id: string;
  user_id: string;
  start_date: string;
  seance_types: string[];
  salle_id: string;
  end_date: string;
};

type Seance = {
  seance_id: string;
  start_date: string;
  seance_types: string[];
  salle_id: string;
  end_date: string;
};

export const seancesEntries: Record<string, Seance> = {
  // Seances with poids pr
  poids_pr_1: {
    seance_id: "00000000-0000-0000-0000-000000000211",
    start_date: new Date("2022-01-15").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-15").toISOString(),
  },
  poids_pr_2: {
    seance_id: "00000000-0000-0000-0000-000000000212",
    start_date: new Date("2023-01-10").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-16").toISOString(),
  },

  // Seances with reps pr
  reps_pr_1: {
    seance_id: "11111111-0000-0000-0000-000000000001",
    start_date: new Date("2022-01-15").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-15").toISOString(),
  },
  reps_pr_2: {
    seance_id: "11111111-0000-0000-0000-000000000002",
    start_date: new Date("2023-01-10").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-16").toISOString(),
  },

  // Seances with temps pr
  temps_pr_1: {
    seance_id: "22222222-0000-0000-0000-000000000001",
    start_date: new Date("2022-01-15").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-15").toISOString(),
  },
  temps_pr_2: {
    seance_id: "22222222-0000-0000-0000-000000000002",
    start_date: new Date("2023-01-10").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-16").toISOString(),
  },

  // Seances for poids stats test
  poids_stats_1: {
    seance_id: "00000000-0000-0000-0000-000000000111",
    start_date: new Date("2022-01-11").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-15").toISOString(),
  },
  poids_stats_2: {
    seance_id: "00000000-0000-0000-0000-000000000112",
    start_date: new Date("2022-01-15").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-03-10").toISOString(),
  },
  poids_stats_3: {
    salle_id: sallesEntries.basic.salle_id,
    seance_id: "00000000-0000-0000-0000-000000000113",
    start_date: new Date("2022-06-30").toISOString(),
    seance_types: ["back"],
    end_date: new Date("2022-07-01").toISOString(),
  },
  poids_stats_4: {
    seance_id: "00000000-0000-0000-0000-000000000114",
    start_date: new Date("2023-01-10").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2023-01-16").toISOString(),
  },
  poids_stats_5: {
    seance_id: "00000000-0000-0000-0000-000000000115",
    start_date: new Date("2023-01-11").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2024-07-01").toISOString(),
  },

  // Seances for reps stats test
  reps_stats_1: {
    seance_id: "11111111-0000-0000-0000-000000000111",
    start_date: new Date("2022-01-11").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-15").toISOString(),
  },
  reps_stats_2: {
    seance_id: "11111111-0000-0000-0000-000000000112",
    start_date: new Date("2022-01-15").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-03-10").toISOString(),
  },
  reps_stats_3: {
    seance_id: "11111111-0000-0000-0000-000000000113",
    start_date: new Date("2022-06-30").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-07-01").toISOString(),
  },
  reps_stats_4: {
    seance_id: "11111111-0000-0000-0000-000000000114",
    start_date: new Date("2023-01-10").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2023-01-16").toISOString(),
  },
  reps_stats_5: {
    seance_id: "11111111-0000-0000-0000-000000000115",
    start_date: new Date("2023-01-11").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2024-07-01").toISOString(),
  },

  // Seances for temps stats test
  temps_stats_1: {
    seance_id: "22222222-0000-0000-0000-000000000111",
    start_date: new Date("2022-01-11").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-01-15").toISOString(),
  },
  temps_stats_2: {
    seance_id: "22222222-0000-0000-0000-000000000112",
    start_date: new Date("2022-01-15").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-03-10").toISOString(),
  },
  temps_stats_3: {
    seance_id: "22222222-0000-0000-0000-000000000113",
    start_date: new Date("2022-06-30").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2022-07-01").toISOString(),
  },
  temps_stats_4: {
    seance_id: "22222222-0000-0000-0000-000000000114",
    start_date: new Date("2023-01-10").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2023-01-16").toISOString(),
  },
  temps_stats_5: {
    seance_id: "22222222-0000-0000-0000-000000000115",
    start_date: new Date("2023-01-11").toISOString(),
    seance_types: ["back"],
    salle_id: sallesEntries.basic.salle_id,
    end_date: new Date("2024-07-01").toISOString(),
  },
} as const;

export const create_all_seances = async () => {
  Logger.info("🔨 ---Creating seances--- 🔨");

  const user_id = await get_user_id(loginUser.email);
  for (const seanceType in seancesEntries) {
    const seanceToAdd = { ...seancesEntries[seanceType], user_id };
    await supabase_service_client.from("seances").insert(seanceToAdd);
  }
  Logger.info("✅ Seances created! ✅");
};
