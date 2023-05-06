import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/livre/book.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  errorMessage: string = ''

  constructor (
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.getBooksFromBdd()

  }

  navigateTo = (index?: Number) => {

    this.router.navigate(['book'], {queryParams: {index: index}})

  }

  getBooksFromService = () => {
    return this.bookService.books
  }

  getBooksFromBdd = () => {

    this.bookService.getBooks().subscribe({
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
