import { Auteur } from "./auteur.interface";
import { Editeur } from "./editeur.interface";
import { Genre } from "./genre.interface";

export interface Book {
  id?: number,
  isbn: string,
  titre: string,
  auteur: Auteur,
  editeur: Editeur,
  genres: {genre: Genre}[]
}
