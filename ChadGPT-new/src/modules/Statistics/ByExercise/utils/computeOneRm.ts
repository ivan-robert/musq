export const computeOneRm = (weight: number, reps: number): number => {
  return Math.round(weight * (1 + reps / 30));
};
