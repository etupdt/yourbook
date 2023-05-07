import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auteur } from 'src/app/interfaces/auteur.interface';
import { Editeur } from 'src/app/interfaces/editeur.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { BookService } from 'src/app/services/book/book.service';

interface HashTable<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  errorMessage: string = ''

  listeAll: boolean = true

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

    this.editeurs = this.bookService.editeurs
    this.bookService.editeurs.forEach(element => {
      element.checked = false
      this.editeursChecked[element.nom] = element
    });
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

  checkEditeur = (nom: string) => {
    this.editeursChecked[nom].checked = !this.editeursChecked[nom].checked
    this.listeAll = false
  }

  checkGenre = (nom: string) => {
    this.genresChecked[nom].checked = !this.genresChecked[nom].checked
    this.listeAll = false
  }

  testGenres = (genres: Genre[]) => {
    let retour = false
    genres.forEach((genre: Genre) => {
      console.log('debug',genre)
      if (this.genresChecked[genre['nom']].checked) {
        retour = true
      }
    })
    return retour
  }

  checkAuteur = (nom: string) => {
    this.auteursChecked[nom].checked = !this.auteursChecked[nom].checked
    this.listeAll = false
  }

  navigateTo = (index?: Number) => {

    this.router.navigate(['book'], {queryParams: {index: index}})

  }

  getBooksFromService = () => {
    return this.bookService.books
  }

  getBooksFromBdd = () => {

    this.bookService.getBooksByStatus('non_loue').subscribe({
      next: (res: any) => {
        console.log(res)
        this.bookService.books = res
      },
      error: (error: { error: { message: any; }; }) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header getBooks complete')
      }
    })

  }

}
