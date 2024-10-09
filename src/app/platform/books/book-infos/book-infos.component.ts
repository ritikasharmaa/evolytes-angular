import {Component, Input, OnInit} from '@angular/core';
import {BookVersionIntegrationModel, BookVersionModel} from '../../../models/book-version.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksComponent} from '../books/books.component';

@Component({
  selector: 'app-book-infos',
  templateUrl: './book-infos.component.html',
  styleUrls: ['./book-infos.component.css']
})
export class BookInfosComponent implements OnInit {

  _bookVersion: BookVersionModel = null;

  @Input('bookVersion')
  set bookVersion(version: BookVersionModel) {
    this._bookVersion = version;

  }

  get bookVersion(): BookVersionModel {
    return this._bookVersion;
  }
  @Input() includeShadow = true;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  }
  currentBookProgress(): string {

    if (this._bookVersion) {

      const fraction = this._bookVersion.chaptersFinishedFraction() * 100;

      return fraction.toFixed(0);
    }

    return null;
  }

  hasCurrentBookProgress(): boolean {

    if (this._bookVersion && this._bookVersion.chaptersFinishedFraction() > 0) {

      return true;
    }

    return false;
  }

}
