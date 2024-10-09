import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {BookModel} from '../../../models/book.model';
import {CountryModel} from '../../../models/localization/country.model';
import {UserModel} from '../../../models/authentication/user.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {ModalService} from '../../../root/modal.service';
import {ErrorModel} from '../../../models/shared/error.model';

@Component({
  selector: 'app-school-book-edit',
  templateUrl: './admin-book-edit.component.html',
  styleUrls: ['./admin-book-edit.component.css']
})
export class AdminBookEditComponent implements OnInit {

  isEditMode = false;
  book: BookModel = new BookModel();
  CultureModel = CultureModel;

  constructor(private route: ActivatedRoute,
              private bookSv: BookService,
              private modalSv: ModalService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {

      const bookId = params.bookId;
      if (bookId) {
        this.isEditMode = true;
        this.bookSv.fetchAdminBookById(bookId).subscribe((book) => {
          this.book = book;
        });
      } else {
        this.book.subject = 'math';
        this.book.country = UserModel.getAdminCountry();
        this.book.culture = CountryModel.cultureForCountry(UserModel.getAdminCountry());
      }

    });
  }

  getTitle() {

    if (this.isEditMode)  {
      return 'Save';
    }

    return 'Create';
  }

  getIsPublished() {

    if (this.book) {
      return this.book.isPublished;
    }

    return false;
  }

  getPublishTitle() {

    if (this.book) {
      if (this.book.isPublished) {
        return 'Unpublish';
      }

      return 'Publish';
    }

    return '';
  }

  onPublish() {

    this.book.isPublished = !this.book.isPublished;
    this.bookSv.updateAdminBook(this.book).subscribe((book) => {
      this.book = book;
    }, (err: ErrorModel) => {
      this.modalSv.showErrorModal('Error', err.message);
    });

  }

  onSave() {

    if (!this.isEditMode) {
      this.bookSv.createAdminBook(this.book).subscribe((book) => {
        this.modalSv.showAlertModal('Success', 'The book was successfully created').subscribe(() => {
          this.router.navigate(['admin', 'books', book._id, 'edit']);
        });
      }, (err: ErrorModel) => {
        this.modalSv.showAlertModal('Error', err.message);
      });
    } else {
      this.bookSv.updateAdminBook(this.book).subscribe((book) => {
        this.book = book;
        this.modalSv.showAlertModal('Success', 'Book has been updated');
      }, (err: ErrorModel) => {
        this.modalSv.showAlertModal('Error', err.message);
      });
    }

  }

  onDelete() {

    this.modalSv.showChoiceModal('Warning', 'You are about to permanently delete a book, are you sure you want to proceed?').subscribe((response) => {

      if (response) {
        this.bookSv.deleteAdminBook(this.book).subscribe((book) => {
          this.router.navigate(['admin', 'books']);
        }, (err: ErrorModel) => {
          this.modalSv.showAlertModal('Error', err.message);
        });
      }

    });

  }

}
