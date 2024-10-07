import { Salle } from "../domain/salle.types";
import { SalleDTO } from "./salles.dto";

export const adaptSalle = (salle: SalleDTO): Salle => {
  return {
    id: salle.salle_id,
    nom: salle.salle_nom,
  };
};

export const adaptSallePost = (salle: Salle): SalleDTO => {
  return {
    salle_id: salle.id,
    salle_nom: salle.nom,
  };
};
