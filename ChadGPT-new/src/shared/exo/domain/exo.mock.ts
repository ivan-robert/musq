import { Exo } from "./exo.types";

const exoMock: Exo = {
  addedBy: "1",
  exoId: "1",
  exoName: "Exo mock",
  exoType: "reps",
  muscles: {},
  bodyPart: "back",
};

export const getExoMock = (exo: Partial<Exo>) => ({
  ...exoMock,
  ...exo,
});
