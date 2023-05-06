import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interfaces/book.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

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
      id: 0
    },
    genres: []
  }

  modified = false

  books: Book[] = []

  constructor(
    private http: HttpClient,
  ) { }

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

}
