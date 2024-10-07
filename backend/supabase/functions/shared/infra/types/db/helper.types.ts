import { Tables } from "#shared/infra/types/db/database.types.ts";

export type NestedRawWorkout = Tables<"seances"> & {
  salles: Tables<"salles"> | null;
  perfs: (Tables<"perfs"> & { sets: Tables<"sets">[] })[];
};
