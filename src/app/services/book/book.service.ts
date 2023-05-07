import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Auteur } from 'src/app/interfaces/auteur.interface';
import { Book } from 'src/app/interfaces/book.interface';
import { Editeur } from 'src/app/interfaces/editeur.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService implements OnInit{

  book: Book = {
    livre_id: 0,
    isbn: '',
    titre: '',
    auteur: {
      id: 0,
      nom: '',
      prenom: ''
    },
    editeur: {
      id: 0,
      nom: ''
    },
    genres: []
  }

  editeurs: Editeur[] = []
  genres: Genre[] = []
  auteurs: Auteur[] = []

  modified = false

  books: Book[] = []

  constructor(
    private http: HttpClient,
  ) {
    this.getEditeurs()
    this.getGenres()
    this.getAuteurs()
  }

  ngOnInit(): void {
  }

  getBookById(id: Number): Observable<any> {

    return this.http.get(
      environment.useBackend + `/book/${id}`
    )

  }

  deleteBookById(id: Number): Observable<any> {

    return this.http.delete(
      environment.useBackend + `/book/${id}`
    )

  }

  putBookById(book: Book): Observable<any> {

    return this.http.put(
      environment.useBackend + `/book/${book.livre_id}`,
      book
    )

  }

  postBook(book: Book): Observable<any> {

    let bookSansId = book

    delete bookSansId.livre_id

    return this.http.post(
      environment.useBackend + `/book/`,
      bookSansId
    )

  }

  getBooks(): Observable<any> {

    return this.http.get(
      environment.useBackend + `/book/`
    )

  }

  getBooksByStatus(statut: string): Observable<any> {

    return this.http.get(
      environment.useBackend + `/book/${statut}`
    )

  }

  getBooksByKeyWord(keyword: string): Observable<any> {

    return this.http.get(
      environment.useBackend + `/book/keyword`,
      {params: new HttpParams().append('keyword', keyword)}
    )

  }

  getBooksByAuteurId(id: number): Observable<any> {

    return this.http.get(
      environment.useBackend + `/book/auteur/${id}`
    )

  }

  getEditeurs() {

    this.http.get(
      environment.useBackend + `/editeur/`
    ).subscribe({
      next: (res: any) => {
        console.log(res)
        this.editeurs = res
      },
      error: (error: { error: { message: any; }; }) => {
        alert('erreur sur get editeurs')
      },
      complete () {
        console.log(`get parameters for editeurs complete`)
      }
    })

  }

  getGenres() {

    this.http.get(
      environment.useBackend + `/genre/`
    ).subscribe({
      next: (res: any) => {
        console.log(res)
        this.genres = res
      },
      error: (error: { error: { message: any; }; }) => {
        alert('erreur sur get genres')
      },
      complete () {
        console.log(`get parameters for genres complete`)
      }
    })

  }

  getAuteurs() {

    this.http.get(
      environment.useBackend + `/auteur/`
    ).subscribe({
      next: (res: any) => {
        console.log(res)
        this.auteurs = res
      },
      error: (error: { error: { message: any; }; }) => {
        alert('erreur sur get auteurs')
      },
      complete () {
        console.log(`get parameters for auteurs complete`)
      }
    })

  }

}