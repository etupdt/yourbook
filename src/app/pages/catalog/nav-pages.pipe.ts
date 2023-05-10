import { Pipe, PipeTransform } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';

@Pipe({
  name: 'navPages'
})
export class NavPagesPipe implements PipeTransform {

  constructor (
    private bookService: BookService
  ) {}

  transform(pages: number[], ...numbers: any[]): number[] {

      console.log('pipe pages', pages)

    return pages

  }

}
