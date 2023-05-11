import { Auteur } from "./auteur.interface";
import { Editeur } from "./editeur.interface";
import { Genre } from "./genre.interface";
import { Titre } from "./titre.interface";

export interface Filters {
  checked: boolean,
  searchString: string,
  editeurs: Editeur[],
  genres: Genre[],
  auteurs: Auteur[],
  titres: Titre[],
  refreshFilters: number,
  nbSelected: number,
  nbFiltred: number
}

