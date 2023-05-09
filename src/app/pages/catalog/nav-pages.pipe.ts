import { Pipe, PipeTransform } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Pipe({
  name: 'navPages'
})
export class NavPagesPipe implements PipeTransform {

  constructor (
    private bookService: BookService
  ) {}

  transform(refresh: number, ...numbers: any[]): number [] {

    console.log('pipe pages')

    this.bookService.pages.navFirst = Math.max(0, this.bookService.pages.numPage - this.bookService.pages.navNumber)

    let array: number[] = []

    for (
      let i: number = this.bookService.pages.navFirst;
      i < Math.min(this.bookService.pages.numberPages, this.bookService.pages.numPage + this.bookService.pages.navNumber + 1);
      i++
    ) array.push(i)

    return array

  }

}
