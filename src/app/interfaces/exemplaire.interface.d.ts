import { Book } from "./book.interface";
import { Stock } from "./stock.interface";
import { Usure } from "./usure.interface";

export interface Exemplaire {
  id?: number,
  usure?: Usure,
  stock?: Stock,
  book?: Book,
  archive?: boolean,
  delete?: boolean
}
