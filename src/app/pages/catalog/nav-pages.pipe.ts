import { Pipe, PipeTransform } from '@angular/core';
import { NavPages } from 'src/app/interfaces/navpages.interface';

@Pipe({
  name: 'navPages'
})
export class NavPagesPipe implements PipeTransform {

  transform(navpages: NavPages, ...numbers: any[]): number [] {

    console.log(navpages)
    const nbPages = this.numberPages(numbers[0], navpages.nbRowByPage)

    navpages.navFirst = Math.max(0, navpages.numPage - navpages.navNumber)

    let array: number[] = []

    for (
      let i: number = navpages.navFirst;
      i < Math.min(nbPages, navpages.numPage + navpages.navNumber + 1);
      i++
    ) array.push(i)

    return array

  }

  numberPages = (nbBooks: number, nbRowByPage: number) => {
    const numberPage = nbBooks % nbRowByPage > 0 ? 1 : 0
    return Math.floor(nbBooks / nbRowByPage) + numberPage
  }

}
