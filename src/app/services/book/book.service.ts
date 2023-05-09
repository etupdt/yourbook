import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Auteur } from 'src/app/interfaces/auteur.interface';
import { Book } from 'src/app/interfaces/book.interface';
import { Editeur } from 'src/app/interfaces/editeur.interface';
import { Genre } from 'src/app/interfaces/genre.interface';
import { NavPages } from 'src/app/interfaces/navpages.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService implements OnInit{

  book: Book = {
    id: 0,
    isbn: '',
    description: '',
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
    image_name: '',
    genres: []
  }

  editeurs: Editeur[] = []
  genres: Genre[] = []
  auteurs: Auteur[] = []

  pages: NavPages = {
    numberPages: 0,
    navFirst: 0,
    navNumber: 1,
    nbRowByPage: 0,
    numPage: 0
  }

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
      environment.useBackend + `/book/${book.id}`,
      book
    )

  }

  postBook(book: Book): Observable<any> {

    let bookSansId = book

    delete bookSansId.id

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

    return this.http.get(
      environment.useBackend + `/editeur/`
    )

  }

  getGenres() {

    return this.http.get(
      environment.useBackend + `/genre/`
    )

  }

  getAuteurs() {

    return this.http.get(
      environment.useBackend + `/auteur/`
    )

  }

}
