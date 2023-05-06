import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book.interface';
import { BookService } from 'src/app/services/livre/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: [
    './book.component.css'
  ]
})
export class BookComponent implements OnInit {

  constructor (
    private bookService: BookService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {}

  book!: Book

  ngOnInit(): void {

    this.activeRoute.queryParamMap.subscribe((params: any) => {

      if (params && params.get("index")) {
        this.book = this.bookService.books[+params.get("index")]
        console.log(this.book)
      }

    })

  }

  getBookFromService = () => {
    return this.bookService.book
  }

  navigateTo = (id?: number) => {

    //    this.router.navigate([this.libraryService.setSelected(dest)], {queryParams: {id: id}})

  }

}
