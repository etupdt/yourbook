import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auteur } from 'src/app/interfaces/auteur.interface';
import { Book } from 'src/app/interfaces/book.interface';
import { Editeur } from 'src/app/interfaces/editeur.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { HashTable } from 'src/app/interfaces/hashtable.interface';
import { BookService } from 'src/app/services/book/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  errorMessage: string = ''

  imgBackend: string = environment.imgBackend

  checked: boolean = true
  refresh: number = 0
  sortCategory: string = 'titre'
  sortSense: number = 1

  editeurs!: Editeur[]
  editeursChecked: HashTable<Editeur> = {}
  genres!: Genre[]
  genresChecked: HashTable<Genre> = {}
  auteurs!: Auteur[]
  auteursChecked: HashTable<Auteur> = {}

  constructor (
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.getBooksFromBdd()

  }

  sortBy = (category: string) => {
    if (this.sortCategory === category)
      this.sortSense *= -1
    else
      this.sortCategory = category
  }

  checkAll = () => {
    this.editeurs.forEach((editeur: Editeur) => editeur.checked = false)
    this.genres.forEach((genre: Genre) => genre.checked = false)
    this.auteurs.forEach((auteur: Auteur) => auteur.checked = false)
    this.checked = !this.checked
  }

  checkEditeur = (nom: string) => {

    this.checked = false
    this.refresh++
  }

  checkGenre = (nom: string) => {

    this.checked = false
    this.refresh++
  }

  checkCategory = (category: string, nom: string) => {
    switch (category) {
      case 'editeur' : {
        this.editeursChecked[nom].checked = !this.editeursChecked[nom].checked
        break;
      }
      case 'genre' : {
        this.genresChecked[nom].checked = !this.genresChecked[nom].checked
        this.checked = false
        break;
      }
      case 'auteur' : {
        this.auteursChecked[nom].checked = !this.auteursChecked[nom].checked
        this.checked = false
        break;
      }
      default : {
        this.editeurs.forEach((editeur: Editeur) => editeur.checked = false)
        this.genres.forEach((genre: Genre) => genre.checked = false)
        this.auteurs.forEach((auteur: Auteur) => auteur.checked = false)
        this.checked = !this.checked
      }
    }
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

    this.editeurs = this.bookService.editeurs
    this.bookService.editeurs.forEach(element => {
      element.checked = false
      this.editeursChecked[element.nom] = element
    });
    console.log(this.editeurs)
    this.genres = this.bookService.genres
    this.bookService.genres.forEach(element => {
      element.checked = false
      this.genresChecked[element.nom] = element
    });
    this.auteurs = this.bookService.auteurs
    this.bookService.auteurs.forEach(element => {
      element.checked = false
      this.auteursChecked[element.nom] = element
    });

  }

}
