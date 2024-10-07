import { WorkoutDTO } from "#shared/infra/types/seance.dto.ts";
import { PreparedWorkout } from "#shared/infra/types/seance.dto.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { get_public_user } from "#functions/api/profile/fetch-public-user.ts";
import { z } from "@zod";
import {
  GenericPerf,
  PreparedPerf,
  preparedPerfSchema,
} from "#shared/infra/types/perf.dto.ts";
import { CircuitSet, Serie } from "#shared/infra/types/set.dto.ts";
import { PreparedClassicSet } from "#shared/infra/types/set.dto.ts";
import { PreparedCircuitSet } from "#shared/infra/types/set.dto.ts";
import { get_workouts } from "#functions/api/workouts/fetch-workouts/infra/api/fetch-workouts.ts";
import { User } from "@clerk/backend";

export const fetch_prepared_workout_from_workout = async (
  req: Request,
  user: User
) => {
  const full_url = new URL(req.url);
  const workout_id = full_url.searchParams.get("workout_id");
  if (!workout_id) {
    return new Response("No workout_id provided", { status: 400 });
  }
  const workout = await get_workouts([workout_id]);
  if (workout.length === 0) {
    return new Response("No workout found", { status: 404 });
  }
  return await get_prepared_workout_from_workout(workout[0], user);
};

export const get_prepared_workout_from_workout = async (
  workout: WorkoutDTO,
  querying_user: User
): Promise<PreparedWorkout> => {
  if (workout.template_id) {
    const { data: template } = await supabase_client
      .from("workout_templates")
      .select("*")
      .eq("id", workout.template_id)
      .single()
      .throwOnError();

    if (!template) {
      throw new Error("No template found");
    }

    const parsedTemplate = z.array(preparedPerfSchema).parse(template.content);

    const public_user = await get_public_user(
      template.creator_clerk_id,
      querying_user
    );

    const out: PreparedWorkout = {
      id: template.id,
      title: template.title,
      description: template.description ?? undefined,
      created_at: new Date().toISOString(),
      creator: public_user,
      content: parsedTemplate,
    };
    return out;
  }

  const public_user = await get_public_user(workout.userId, querying_user);

  const prepared_workout: PreparedWorkout = {
    id: null,
    title: "Workout copied from " + public_user.username,
    description: "",
    created_at: new Date().toISOString(),
    creator: public_user,
    content: workout.perfs.map(get_prepared_perf_from_perf),
  };

  return prepared_workout;
};

const get_prepared_perf_from_perf = (perf: GenericPerf): PreparedPerf => {
  if (perf.perfType === "CLASSIC") {
    return {
      perfType: "CLASSIC",
      exo: perf.exo,
      series: perf.series.map(prepare_classic_set),
      rest: perf.rest,
      description: undefined,
    };
  }
  return {
    perfType: "CIRCUIT",
    exos: perf.exos,
    series: perf.series.map((circuit) => {
      return {
        rest: circuit.rest,
        subsets: circuit.subsets.map(prepare_circuit_set),
      };
    }),
    rest: perf.restTime,
    description: undefined,
  };
};

const prepare_classic_set = (set: Serie): PreparedClassicSet => {
  if (set.type === "DROPSET") {
    return {
      type: "DROPSET",
      sets: set.sets.map((set) => ({ reps: set.reps, echec: true })),
    };
  }
  if (set.type === "POIDS") {
    return {
      type: "POIDS",
      reps: set.reps,
      echec: set.echec,
      isWarmup: set.isWarmup,
    };
  }
  if (set.type === "REPS") {
    return {
      type: "REPS",
      reps: set.reps,
      echec: set.echec,
    };
  }
  return {
    type: "TEMPS",
    time: set.temps,
  };
};

const prepare_circuit_set = (set: CircuitSet): PreparedCircuitSet => {
  return { exercise: set.exercise, set: prepare_classic_set(set.set) };
};
