import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auteur } from 'src/app/interfaces/auteur.interface';
import { Book } from 'src/app/interfaces/book.interface';
import { Editeur } from 'src/app/interfaces/editeur.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { HashTable } from 'src/app/interfaces/hashtable.interface';
import { NavPages } from 'src/app/interfaces/navpages.interface';
import { BookService } from 'src/app/services/book/book.service';
import { environment } from 'src/environments/environment';

interface Filters {
  checked: boolean,
  searchString: string,
  editeurs: Editeur[],
  genres: Genre[],
  auteurs: Auteur[]
}

interface Sorts {
  sortCategory: string,
  sortSense: number
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  errorMessage: string = ''

  imgBackend: string = environment.imgBackend

  refresh: number = 0
  searchValue: string = ''

  editeursChecked: HashTable<Editeur> = {}
  genresChecked: HashTable<Genre> = {}
  auteursChecked: HashTable<Auteur> = {}

  filters: Filters = {
    checked: true,
    searchString: '',
    editeurs: [],
    genres: [],
    auteurs: []
  }

  sorts: Sorts = {
    sortCategory: 'titre',
    sortSense: 1
  }

  pages: NavPages = {
    numPage: 0,
    nbRowByPage: 2,
    navFirst: 0,
    navNumber: 1,
    navPos: 0
  }

  constructor (
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.getBooksFromBdd()

  }

  searchBooks = () => {
    this.filters.searchString = this.searchValue
  }

  sortBy = (category: string) => {
    if (this.sorts.sortCategory === category) {
      this.sorts.sortSense *= -1
    }
    else {
      this.sorts.sortCategory = category
      this.sorts.sortSense = 1
    }
    this.filters.searchString = this.searchValue
    this.refresh++
  }

  checkCategory = (category: string, nom: string) => {
    switch (category) {
      case 'editeur' : {
        this.editeursChecked[nom].checked = !this.editeursChecked[nom].checked
        this.filters.checked = false
        break;
      }
      case 'genre' : {
        this.genresChecked[nom].checked = !this.genresChecked[nom].checked
        this.filters.checked = false
        break;
      }
      case 'auteur' : {
        this.auteursChecked[nom].checked = !this.auteursChecked[nom].checked
        this.filters.checked = false
        break;
      }
      default : {
        this.filters.editeurs.forEach((editeur: Editeur) => editeur.checked = false)
        this.filters.genres.forEach((genre: Genre) => genre.checked = false)
        this.filters.auteurs.forEach((auteur: Auteur) => auteur.checked = false)
        this.filters.checked = !this.filters.checked
      }
    }
    this.filters.searchString = this.searchValue
    this.refresh++
  }

  navigateTo = (index?: Number) => {

    this.router.navigate(['book'], {queryParams: {index: index}})

  }

  getBooksFromService = () => {
    return this.bookService.books
  }

  getBooksFromBdd = () => {

    this.bookService.getBooksByStatus('non_loue').subscribe({
      next: (res: Book[]) => {
        this.bookService.books = res
        this.getEditeursFromBdd()
      },
      error: (error: { error: { message: any; }; }) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header getBooks complete')
      }
    })

  }

  getEditeursFromBdd() {

    this.bookService.getEditeurs().subscribe({
      next: (res: any) => {
        console.log(res)
        this.bookService.editeurs = res
        this.getGenresFromBdd()
      },
      error: (error: { error: { message: any; }; }) => {
        alert('erreur sur get editeurs')
      },
      complete () {
        console.log(`get parameters for editeurs complete`)
      }
    })

  }

  getGenresFromBdd() {

    this.bookService.getGenres().subscribe({
      next: (res: any) => {
        console.log(res)
        this.bookService.genres = res
        this.getAuteursFromBdd()
      },
      error: (error: { error: { message: any; }; }) => {
        alert('erreur sur get genres')
      },
      complete () {
        console.log(`get parameters for genres complete`)
      }
    })

  }

  getAuteursFromBdd() {

    this.bookService.getAuteurs().subscribe({
      next: (res: any) => {
        console.log(res)
        this.bookService.auteurs = res
        this.initTemplate()
      },
      error: (error: { error: { message: any; }; }) => {
        alert('erreur sur get auteurs')
      },
      complete () {
        console.log(`get parameters for auteurs complete`)
      }
    })

  }

  initTemplate = () => {

    this.filters.editeurs = this.bookService.editeurs
    this.bookService.editeurs.forEach(element => {
      element.checked = false
      this.editeursChecked[element.nom] = element
    });
    console.log(this.filters.editeurs)
    this.filters.genres = this.bookService.genres
    this.bookService.genres.forEach(element => {
      element.checked = false
      this.genresChecked[element.nom] = element
    });
    this.filters.auteurs = this.bookService.auteurs
    this.bookService.auteurs.forEach(element => {
      element.checked = false
      this.auteursChecked[element.nom] = element
    });

  }

  managePage = (page: number) => {
    if (page >= 0 && page < this.numberPages()) {
      this.pages.numPage = page
      this.refresh++
    }
  }

  numberPages = () => {
    const numberPage = this.getBooksFromService().length % this.pages.nbRowByPage > 0 ? 1 : 0
    return Math.floor(this.getBooksFromService().length / this.pages.nbRowByPage) + numberPage
  }

}
