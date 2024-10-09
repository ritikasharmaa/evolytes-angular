import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import {CountryModel} from '../../models/localization/country.model';
import {UserModel} from '../../models/authentication/user.model';
import {BookModel} from '../../models/book.model';
import {BookVersionModel} from '../../models/book-version.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-school-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  books: BookModel[] = [];

  constructor(public bookSv: BookService,
              private router: Router) { }

  ngOnInit() {
    this.bookSv.fetchPublicBooks(UserModel.getAdminCountry()).subscribe((books) => {
      this.books = books;
    });
  }

  onAddBookClicked() {

    this.router.navigate(['admin', 'books', 'create']);

  }

  onBookClicked(book: BookModel) {

    this.router.navigate(['admin', 'books', book._id, 'edit']);

  }

  onAddBookVersionClicked(book: BookModel) {

    this.router.navigate(['admin', 'books', book._id, 'versions', 'create']);

  }

  onBookVersionClicked(book: BookModel, bookVersion: BookVersionModel) {

    this.router.navigate(['admin', 'books', book._id, 'versions', bookVersion._id, 'edit']);;

  }

}
