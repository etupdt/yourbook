import { Pipe, PipeTransform } from '@angular/core';
import { Auteur } from 'src/app/interfaces/auteur.interface';
import { Book } from 'src/app/interfaces/book.interface';
import { Editeur } from 'src/app/interfaces/editeur.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { HashTable } from 'src/app/interfaces/hashtable.interface';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  editeursChecked: HashTable<Editeur> = {}

  categorieTypes: HashTable<{otherSelected: boolean, checkedNames: string[]}> = {}

  transform(books: Book[], ...checks: any[]): Book[] {

    this.categorieTypes['EDITEUR'] = {otherSelected: false, checkedNames: []}
    this.categorieTypes['GENRES'] = {otherSelected: false, checkedNames: []}
    this.categorieTypes['AUTEUR'] = {otherSelected: false, checkedNames: []}

    checks[1].forEach((editeur: Editeur) => {
      if (editeur.checked)
        this.categorieTypes['EDITEUR'].checkedNames.push(editeur.nom)
    })
    checks[2].forEach((genre: Genre) => {
      if (genre.checked)
        this.categorieTypes['GENRES'].checkedNames.push(genre.nom)
    })
    checks[3].forEach((auteur: Auteur) => {
      if (auteur.checked)
        this.categorieTypes['AUTEUR'].checkedNames.push(auteur.nom)
    })

    let index = 0

    return books
      .filter(book => {

        book.index = index
        index++

        this.categorieTypes['EDITEUR'].otherSelected = this.categorieTypes['EDITEUR'].checkedNames.length > 0 && !this.categorieTypes['EDITEUR'].checkedNames.includes(book.editeur.nom)
        this.categorieTypes['GENRES'].otherSelected = this.categorieTypes['GENRES'].checkedNames.length > 0 && !(book.genres.filter(genre => this.categorieTypes['GENRES'].checkedNames.includes(genre.genre.nom)).length > 0)
        this.categorieTypes['AUTEUR'].otherSelected = (this.categorieTypes['AUTEUR'].checkedNames.length > 0) && (!this.categorieTypes['AUTEUR'].checkedNames.includes(book.auteur.nom))

        return checks[0] || this.isBookSelected(['EDITEUR', 'GENRES', 'AUTEUR'])

      })
      .sort((a: Book, b: Book) => {
        switch (checks[4]) {
          case 'editeur' : return a.editeur.nom.localeCompare(b.editeur.nom) * checks[5]
          case 'genre' : return a.genres[0].genre.nom.localeCompare(b.genres[0].genre.nom) * checks[5]
          case 'auteur' : return a.auteur.nom.localeCompare(b.auteur.nom) * checks[5]
          default : return a.titre.toUpperCase().localeCompare(b.titre.toUpperCase()) * checks[5]
        }
      })

  }

  isBookSelected (categories: string[]): boolean {
    if (categories.length === 1)
      return !this.categorieTypes[categories[0]].otherSelected
    let retour: boolean = true
    categories.forEach(category => {
      const sousCategory: string[] = categories.filter(c => c !== category)
      retour = retour && this.isBookSelected(sousCategory)
    })
    return retour
  }

}
