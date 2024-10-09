import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookModel} from '../../models/book.model';
import {StudentModel} from '../../models/authentication/student.model';
import {BookVersionModel} from '../../models/book-version.model';
import {GaService} from '../../services/ga.service';
import {UserModel} from '../../models/authentication/user.model';
import {TranslateService} from '@ngx-translate/core';
import {CountryModel} from '../../models/localization/country.model';

@Component({
  selector: 'app-select-book',
  templateUrl: './select-book.component.html',
  styleUrls: ['./select-book.component.css']
})
export class SelectBookComponent implements OnInit {

  selectedSubscription: string;
  selectedBook: BookModel;
  books: BookModel[] = [];
  filterBooks: BookModel[] = [];

  constructor(private bookSv: BookService,
              private router: Router,
              private route: ActivatedRoute,
              private tSv: TranslateService,
              private ga: GaService) { }

  ngOnInit() {

    if (UserModel.getCurrent()) {
      if (this.tSv.currentLang !== UserModel.getCurrent().culture) {
        this.tSv.use(UserModel.getCurrent().culture);
      }

      this.bookSv.fetchPublicBooks(UserModel.getCurrent().country).subscribe((books) => {

        this.books = books;
        this.filterBooks = this.filteredBooks();
        if (this.filterBooks.length === 1) {
          this.selectedBook = this.filterBooks[0];
        }

      });

    } else {

      this.bookSv.fetchPublicBooks(CountryModel.getHomepageCountry()).subscribe((books) => {

        this.books = books;
        this.filterBooks = this.filteredBooks();
        if (this.filterBooks.length === 1) {
          this.selectedBook = this.filterBooks[0];
        }

      });

    }

    this.route.queryParams.subscribe((params) => {

      this.selectedSubscription = params['subscription'];

    });



  }

  filteredBooks(): BookModel[] {

    let list: BookModel[] = [];
    for (const book of this.books) {
      if (book.country === UserModel.getCurrent().country && book.isPublished === true) {
        list.push(book);
      }
    }


    list = list.sort((a, b) => {
      return a.number - b.number;
    });


    return list;

  }

  rowsWithItemsPerRow(itemsPerRow: number): number[] {

    const list = [];

    let currentRow = 0;
    for (let i = 0; i < this.filterBooks.length; i += itemsPerRow) {
      list.push(currentRow);
      currentRow += 1;
    }

    return list;

  }

  bookAtIndex(index: number, row: number, itemsPerRow: number): BookModel {

    const i = row * itemsPerRow + index;

    if (i < this.filterBooks.length) {
      return this.filterBooks[i];
    }

    return null;
  }

  bookVersionAtIndex(index: number, row: number, itemsPerRow: number): BookVersionModel {

    const book = this.bookAtIndex(index, row, itemsPerRow);
    if (book !== null) {
      const lastVersion = book.latestVersion();

      if (lastVersion) {
        return lastVersion;
      }
    }

    return null;
  }

  onBookSelection(book: BookModel) {

    if (this.selectedBook) {
      if (this.selectedBook._id === book._id) {
        this.selectedBook = null;
      } else {
        this.ga.logEvent('select_book', GaService.Categories.sales_process, book._id);
        this.selectedBook = book;
      }
    } else {
      this.ga.logEvent('select_book', GaService.Categories.sales_process, book._id);
      this.selectedBook = book;
    }

  }

  isBookSelected(book: BookModel): boolean {

    if (this.selectedBook) {

      if (this.selectedBook._id === book._id) {
        return true;
      }

    }

    return false;
  }

  isNextDisabled(): boolean {

    if (this.selectedBook) {
      return false;
    }

    return true;
  }

  onNextClicked() {

    if (this.selectedBook) {
      this.ga.logEvent('select_book_next_clicked', GaService.Categories.sales_process, this.selectedBook._id);
      this.router.navigate(['confirmpurch'],
        {
          queryParams: {
            subscription: this.selectedSubscription,
            bookId: this.selectedBook._id,
            bookVersionId: this.selectedBook.latestVersion()._id
          }
        });
    }

  }

}
