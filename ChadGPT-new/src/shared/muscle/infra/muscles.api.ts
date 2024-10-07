import { getEnvVar } from "#app/environment";
import { MuscleDTO } from "#shared/exo/infra/muscles.dto";
import { Muscle } from "#shared/muscle/domain/muscle.types";
import axios from "axios";

export const fetchMusclesAPI = async (): Promise<MuscleDTO[]> => {
  const options = {
    method: "GET",
    url: `${getEnvVar("BASE_EXERCISE_URL")}/exercises/targetList`,
    headers: {
      "X-RapidAPI-Key": getEnvVar("EXERCISE_API_KEY"),
      "X-RapidAPI-Host": getEnvVar("EXERCISE_API_HOST"),
    },
  };

  const res = await axios.request(options);
  return res.data;
};

export const fetchMuscleConnector = async (): Promise<Muscle[]> => {
  const muscles = await fetchMusclesAPI();
  return muscles.map((muscle) => ({
    muscle_id: muscle,
    muscle_name: muscle,
  }));
};
