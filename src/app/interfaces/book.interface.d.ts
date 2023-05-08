import { Auteur } from "./auteur.interface";
import { Editeur } from "./editeur.interface";
import { Genre } from "./genre.interface";

export interface Book {
  id?: number,
  isbn: string,
  description: string,
  titre: string,
  auteur: Auteur,
  editeur: Editeur,
  image_name: string,
  genres: {genre: Genre}[],
  index?: number
}
