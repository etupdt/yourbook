import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscribable, Subscription, from } from 'rxjs';
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

  searchValue: string = ''

  refreshPagesSubcription!: Subscription
  refreshPages: number = 0
  pages: number[] = []

  editeursChecked: HashTable<Editeur> = {}
  genresChecked: HashTable<Genre> = {}
  auteursChecked: HashTable<Auteur> = {}

  constructor (
    private bookService: BookService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.getEditeursFromBdd()
  }

  ngOnInit(): void {

//    this.bookService.getBooksFromBdd()

    this.refreshPagesSubcription = new Observable(observer => {
      this.bookService.refreshPages = observer
    }).subscribe(val => {
      console.log('numpage', this.bookService.pages.numPage)
      console.log('numberpages', this.bookService.pages.numberPages)
      console.log('navFirst', this.bookService.pages.navFirst)
      console.log('navnumber', this.bookService.pages.navNumber)
      console.log('min', Math.min(this.bookService.pages.numberPages, this.bookService.pages.numPage + this.bookService.pages.navNumber + 1))

      this.pages = []

      for (let i = this.bookService.pages.navFirst;
        i < Math.min(this.bookService.pages.numberPages, this.bookService.pages.numPage + this.bookService.pages.navNumber + 1);
        i++
        ) {
          console.log('i', i)
        this.pages.push(i)
      }
//      this.pages = pagesInter
      console.log('pages', this.pages)
//      this.changeDetectorRef.detectChanges()
    })

  }

  searchBooks = () => {
    this.bookService.pages.numPage = 0
    this.bookService.filters.searchString = this.searchValue
    this.bookService.filters.refreshFilters++
  }

  sortBy = (category: string) => {
    if (this.bookService.sorts.sortCategory === category) {
      this.bookService.sorts.sortSense *= -1
    }
    else {
      this.bookService.sorts.sortCategory = category
      this.bookService.sorts.sortSense = 1
    }
    this.bookService.pages.numPage = 0
    this.bookService.filters.searchString = this.searchValue
    this.bookService.filters.refreshFilters++
  }

  checkCategory = (category: string, nom: string) => {
    console.log('nom', nom, 'category', category)
    switch (category) {
      case 'editeur' : {
        this.editeursChecked[nom].checked = !this.editeursChecked[nom].checked
        this.bookService.filters.titres[0].checked = false
        break;
      }
      case 'genre' : {
        this.genresChecked[nom].checked = !this.genresChecked[nom].checked
        this.bookService.filters.titres[0].checked = false
        break;
      }
      case 'auteur' : {
        this.auteursChecked[nom].checked = !this.auteursChecked[nom].checked
        this.bookService.filters.titres[0].checked = false
        break;
      }
      case 'titre' : {
        if (nom === 'tous') {
          this.bookService.filters.editeurs.forEach((editeur: Editeur) => editeur.checked = false)
          this.bookService.filters.genres.forEach((genre: Genre) => genre.checked = false)
          this.bookService.filters.auteurs.forEach((auteur: Auteur) => auteur.checked = false)
          this.bookService.filters.titres[0].checked = true
          this.bookService.filters.titres[1].checked = false
        } else {
          this.bookService.filters.titres[0].checked = false
          this.bookService.filters.titres[1].checked = true
        }

      }
    }
    this.bookService.pages.numPage = 0
    this.bookService.filters.searchString = this.searchValue
    this.bookService.filters.refreshFilters++
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

    this.bookService.filters.editeurs = this.bookService.editeurs
    this.bookService.editeurs.forEach(element => {
      element.checked = false
      this.editeursChecked[element.nom] = element
    });
    console.log(this.bookService.filters.editeurs)
    this.bookService.filters.genres = this.bookService.genres
    this.bookService.genres.forEach(element => {
      element.checked = false
      this.genresChecked[element.nom] = element
    });
    this.bookService.filters.auteurs = this.bookService.auteurs
    this.bookService.auteurs.forEach(element => {
      element.checked = false
      this.auteursChecked[element.nom] = element
    });
//    this.getBooksFromBdd()

//    this.setNbRowByPage()
//    this.refreshFilter++

  }

  managePage = (page: number) => {
    console.log(page)
    if (page >= 0 && page < this.bookService.pages.numberPages) {
      this.bookService.pages.numPage = page
      this.bookService.filters.refreshFilters++
    }
  }

  setNbRowByPage = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    if (+value < 1)
      this.bookService.pages.nbRowByPage = 1
    else {
      this.bookService.pages.nbRowByPage = +value
      this.bookService.pages.numPage = 0
    }
//      this.changeDetectorRef.detectChanges()
    this.bookService.filters.refreshFilters++
  }

  getTitres = () => {
    return this.bookService.filters.titres
  }

  getNumberPages = () => {
    return this.bookService.pages.numberPages
  }

  getNumPage = () => {
    return this.bookService.pages.numPage
  }

  getNbRowByPage = () => {
    return this.bookService.pages.nbRowByPage
  }

  getRefreshPages = () => {
    return this.bookService.pages.refreshPages
  }

  getEditeurs = () => {
    return this.bookService.filters.editeurs
  }

  getAuteurs = () => {
    return this.bookService.filters.auteurs
  }

  getGenres = () => {
    return this.bookService.filters.genres
  }

  getNbSelected = () => {
    return this.bookService.filters.nbSelected
  }

  getNbFiltred = () => {
    return this.bookService.filters.nbFiltred
  }

  getRefreshFilters = () => {
    return this.bookService.filters.refreshFilters
  }

  getSortCategory = () => {
    return this.bookService.sorts.sortCategory
  }

  getSortSense = () => {
    return this.bookService.sorts.sortSense
  }

  select = (index: number, sens: number) => {
    this.bookService.filters.nbSelected += sens
    this.bookService.books[index].selected = ! this.bookService.books[index].selected
    if (this.bookService.filters.titres[1].checked && !this.bookService.books[index].selected)
      this.bookService.filters.refreshFilters++
  }

  validLocations = () => {
    this.bookService.books.filter(book => {
      return book.selected
    })
    .forEach(book => {
      this.bookService.postEmpruntLivre(book).subscribe({
        next: (res: any) => {
          this.bookService.books.splice(book.index!, 1)
          this.bookService.filters.nbSelected--
          this.bookService.filters.refreshFilters++
          console.log(res)
        },
        error: (error: { error: { message: any; }; }) => {
          alert('erreur sur post emprunt')
        },
        complete () {
          console.log(`post emprunt complete`)
        }
      })

    })
  }

}
