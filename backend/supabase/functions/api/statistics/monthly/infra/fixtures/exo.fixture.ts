import { ExerciseDTO } from "#functions/api/exercises/fetch-exos/infra/types/exercise.dto.ts";

export const exoFixture: ExerciseDTO = {
  bodyPart: "waist",
  equipment: "body weight",
  gifUrl: "https://v2.exercisedb.io/image/zy05NdiuvbWoO8",
  id: "0003",
  name: "air bike",
  target: "abs",
  secondaryMuscles: ["calves", "hamstrings", "quads"],
  instructions: [
    "Lie flat on your back with your hands placed behind your head.",
    "Lift your legs off the ground and bend your knees at a 90-degree angle.",
    "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
    "Return to the starting position and repeat the movement on the opposite side, bringing your left elb",
    "Continue alternating sides in a pedaling motion for the desired number of repetitions.",
  ],
};

export const exo1Fixture: ExerciseDTO = {
  bodyPart: "waist",
  equipment: "body weight",
  gifUrl: "https://v2.exercisedb.io/image/zy05NdiuvbWoO8",
  id: "0001",
  name: "super exo",
  target: "biceps",
  secondaryMuscles: ["cardiovascular system", "quads"],
  instructions: [
    "Lie flat on your back with your hands placed behind your head.",
    "Lift your legs off the ground and bend your knees at a 90-degree angle.",
    "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
    "Return to the starting position and repeat the movement on the opposite side, bringing your left elb",
    "Continue alternating sides in a pedaling motion for the desired number of repetitions.",
  ],
};

export const exo2Fixture: ExerciseDTO = {
  bodyPart: "shoulders",
  equipment: "cable",
  gifUrl: "https://v2.exercisedb.io/image/zy05NdiuvbWoO8",
  id: "0002",
  name: "exercice 2",
  target: "biceps",
  secondaryMuscles: ["delts", "quads"],
  instructions: [
    "Lie flat on your back with your hands placed behind your head.",
    "Lift your legs off the ground and bend your knees at a 90-degree angle.",
    "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
    "Return to the starting position and repeat the movement on the opposite side, bringing your left elb",
    "Continue alternating sides in a pedaling motion for the desired number of repetitions.",
  ],
};
