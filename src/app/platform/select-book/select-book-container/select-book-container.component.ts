import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookModel} from '../../../models/book.model';
import {BookVersionModel} from '../../../models/book-version.model';
import {CountryModel} from '../../../models/localization/country.model';
import {UserModel} from '../../../models/authentication/user.model';

@Component({
  selector: 'app-select-book-container',
  templateUrl: './select-book-container.component.html',
  styleUrls: ['./select-book-container.component.css']
})
export class SelectBookContainerComponent implements OnInit {

  @Input() book: BookModel;
  @Input() bookVersion: BookVersionModel;
  @Input() isSelected = false;
  @Output() click = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  getAgeRange(): string {

    if (this.book) {

      return this.book.ageRange;
    }

    return '';
  }

  getDescription(): string {

    if (this.bookVersion) {

      return this.bookVersion.translatedDescription.stringForCulture(UserModel.getCurrent().culture);
    }

    return '';
  }

  getBookVersionName(): string {

    if (this.bookVersion) {

      return this.bookVersion.name;
    }

    return '';
  }

  hasBookImgURL(): boolean {

    if (this.bookVersion) {

      return this.bookVersion.imgType != null;
    }

    return false;
  }

  getBookImgURL(): string {

    if (this.bookVersion) {
      return this.bookVersion.bookVersionImgURL();
    }

    return null;
  }

  getCountryImage(): string {

    if (this.book) {
      return CountryModel.iconURL(this.book.country);
    }

    return null;
  }

  getCountryCulture(): string {

    if (this.book) {
      return CountryModel.cultureTitle(this.book.country);
    }

    return null;
  }

}
