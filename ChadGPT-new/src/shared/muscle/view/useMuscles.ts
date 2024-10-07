import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchMuscleConnector } from "../infra/muscles.api";
import { Muscle } from "#shared/muscle/domain/muscle.types";

const muscleQueryOptions: UseSuspenseQueryOptions<Muscle[]> = {
  queryKey: ["muscles"],
  queryFn: fetchMuscleConnector,
  staleTime: Infinity,
};

export const useMuscles = () => {
  return useSuspenseQuery(muscleQueryOptions);
};
