import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderComponent } from './components/layout-components/header/header.component';
import { SectionHeroComponent } from './components/layout-components/section-hero/section-hero.component';
import { SectionHpPresentationComponent } from './components/layout-components/section-hp-presentation/section-hp-presentation.component';
import { TitleComponent } from './components/ui-components/title/title.component';
import { SectionSampleBooksComponent } from './components/layout-components/section-sample-books/section-sample-books.component';
import { BtnBorrowComponent } from './components/ui-components/btn-borrow/btn-borrow.component';
import { CardBookLgComponent } from './components/ui-components/card-book-lg/card-book-lg.component';
import { BadgeCategoryComponent } from './components/ui-components/badge-category/badge-category.component';
import { SectionTestimonialComponent } from './components/layout-components/section-testimonial/section-testimonial.component';
import { CardTestimonialComponent } from './components/ui-components/card-testimonial/card-testimonial.component';
import { FooterComponent } from './components/layout-components/footer/footer.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BookFilterPipe } from './pages/catalog/book-filter.pipe';
import { FormsModule } from '@angular/forms';
import { NavPagesPipe } from './pages/catalog/nav-pages.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    SectionHeroComponent,
    SectionHpPresentationComponent,
    TitleComponent,
    SectionSampleBooksComponent,
    BtnBorrowComponent,
    CardBookLgComponent,
    BadgeCategoryComponent,
    SectionTestimonialComponent,
    CardTestimonialComponent,
    FooterComponent,
    CatalogComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    BookFilterPipe,
    NavPagesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
