import { Adherent } from "./adherent.interface"
import { Exemplaire } from "./exemplaire.interface"
import { Status } from "./status.interface"

export interface Emprunt {
  id?: number,
  exemplaire?: Exemplaire,
  adherent?: Adherent,
  dateEmprunt?: Date,
  dateRetour?: Date
}
