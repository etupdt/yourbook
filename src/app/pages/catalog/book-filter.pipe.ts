import { Pipe, PipeTransform } from '@angular/core';
import { Auteur } from 'src/app/interfaces/auteur.interface';
import { Book } from 'src/app/interfaces/book.interface';
import { Editeur } from 'src/app/interfaces/editeur.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { HashTable } from 'src/app/interfaces/hashtable.interface';
import { BookService } from 'src/app/services/book/book.service';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  constructor (
    private bookService: BookService
  ) {}

  editeursChecked: HashTable<Editeur> = {}

  categorieTypes: HashTable<{otherSelected: boolean, checkedNames: string[]}> = {}

  transform(books: Book[], ...checks: any[]): Book[] {

    console.log('pipe filter')

    const checked = checks[0].checked
    const editeurs = checks[0].editeurs
    const genres = checks[0].genres
    const auteurs = checks[0].auteurs
    const searchString = checks[0].searchString

    const sortCategory = checks[1].sortCategory
    const sortSense = checks[1].sortSense

    const numPage = this.bookService.pages.numPage
    const nbRowByPage = this.bookService.pages.nbRowByPage

    this.categorieTypes['EDITEUR'] = {otherSelected: false, checkedNames: []}
    this.categorieTypes['GENRES'] = {otherSelected: false, checkedNames: []}
    this.categorieTypes['AUTEUR'] = {otherSelected: false, checkedNames: []}

    editeurs.forEach((editeur: Editeur) => {
      if (editeur.checked)
        this.categorieTypes['EDITEUR'].checkedNames.push(editeur.nom)
    })
    genres.forEach((genre: Genre) => {
      if (genre.checked)
        this.categorieTypes['GENRES'].checkedNames.push(genre.nom)
    })
    auteurs.forEach((auteur: Auteur) => {
      if (auteur.checked)
        this.categorieTypes['AUTEUR'].checkedNames.push(auteur.nom)
    })

    let index = 0

    const booksOut = books
      .filter(book => {
        let retour = false
        if (searchString === '' ||
          book.titre.toLowerCase().indexOf(searchString) >= 0 ||
          book.isbn.toLowerCase().indexOf(searchString) >= 0 ||
          book.editeur.nom.toLowerCase().indexOf(searchString) >= 0 ||
          book.titre.toLowerCase().indexOf(searchString) >= 0 ||
          book.auteur.prenom.toLowerCase().indexOf(searchString) >= 0 ||
          book.auteur.nom.toLowerCase().indexOf(searchString) >= 0)
          retour = true
        book.genres.forEach(genre => {
          retour = retour || genre.genre.nom.toLowerCase().indexOf(searchString) >= 0
        })
        return retour
      })
      .filter(book => {

      book.index = index
      index++

      this.categorieTypes['EDITEUR'].otherSelected = this.categorieTypes['EDITEUR'].checkedNames.length > 0 && !this.categorieTypes['EDITEUR'].checkedNames.includes(book.editeur.nom)
      this.categorieTypes['GENRES'].otherSelected = this.categorieTypes['GENRES'].checkedNames.length > 0 && !(book.genres.filter(genre => this.categorieTypes['GENRES'].checkedNames.includes(genre.genre.nom)).length > 0)
      this.categorieTypes['AUTEUR'].otherSelected = (this.categorieTypes['AUTEUR'].checkedNames.length > 0) && (!this.categorieTypes['AUTEUR'].checkedNames.includes(book.auteur.nom))

      return checked || this.isBookSelected(['EDITEUR', 'GENRES', 'AUTEUR'])

    })
    .sort((a: Book, b: Book) => {
      switch (sortCategory) {
        case 'editeur' : return a.editeur.nom.localeCompare(b.editeur.nom) * sortSense
        case 'genre' : return a.genres[0].genre.nom.localeCompare(b.genres[0].genre.nom) * sortSense
        case 'auteur' : return a.auteur.nom.localeCompare(b.auteur.nom) * sortSense
        default : return a.titre.toUpperCase().localeCompare(b.titre.toUpperCase()) * sortSense
      }
    })

    const numberPage = booksOut.length % nbRowByPage > 0 ? 1 : 0
    this.bookService.pages.numberPages = Math.floor(booksOut.length / nbRowByPage) + numberPage
    console.log(booksOut)
    return booksOut.slice(numPage * nbRowByPage, (numPage + 1) * nbRowByPage)

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
