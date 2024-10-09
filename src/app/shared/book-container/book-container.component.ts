import { Component, Input, OnInit } from '@angular/core';
import { BookVersionIntegrationModel, BookVersionModel } from '../../models/book-version.model';
import { BooksComponent } from '../../platform/books/books/books.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CultureModel } from '../../models/localization/culture.model';

@Component({
  selector: 'app-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.css']
})
export class BookContainerComponent implements OnInit {

  _bookVersion: BookVersionModel = null;
  filteredIntegrations: BookVersionIntegrationModel[] = [];

  @Input() containerHeight = '435px';
  @Input('bookVersion')
  set bookVersion(version: BookVersionModel) {
    this._bookVersion = version;
    this.filterIntegrations();
  }

  get bookVersion(): BookVersionModel {
    return this._bookVersion;
  }

  @Input() includeShadow = true;
  _showOnlyAttemptedIntegrations = false;
  @Input('showOnlyAttemptedIntegrations')
  set showOnlyAttemptedIntegrations(value: boolean) {
    this._showOnlyAttemptedIntegrations = value;
    this.filterIntegrations();
  }

  get showOnlyAttemptedIntegrations(): boolean {
    return this._showOnlyAttemptedIntegrations;
  }

  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
  }

  filterIntegrations() {

    this.filteredIntegrations = this._bookVersion.integrations;
    if (this.showOnlyAttemptedIntegrations) {
      this.filteredIntegrations = this._bookVersion.integrations.filter((integration) => {
        return integration.attempts.length > 0 && integration.type === BookVersionIntegrationModel.IntegrationTypes.Exam;
      });

    }
  }

  BookFinishedDate(currentBook: BookVersionModel): Date {
    // Push in the array the integrations with finished
    let finishedAttemptArray = currentBook.integrations.map(function (integration) {
      if (integration.successfulAttempt) {
        return integration;
      }
    });

    // Sort the integrations by latest finish in a descending order
    finishedAttemptArray = finishedAttemptArray.sort((attemptOne, attemptTwo) => {
      // tslint:disable-next-line:max-line-length
      return BooksComponent.getTime(attemptTwo.successfulAttempt.finishedAt) - BooksComponent.getTime(attemptOne.successfulAttempt.finishedAt);
    });
    return finishedAttemptArray[0].successfulAttempt.finishedAt;
  }

  isBookFinished(currentBook: BookVersionModel): boolean {
    if (currentBook.chaptersFinishedFraction() >= 1) {
      return true;
    }

    return false;
  }

  currentBookProgress(currentBook: BookVersionModel) {

    if (currentBook) {

      const fraction = currentBook.chaptersFinishedFraction() * 100;

      return fraction.toFixed(0);
    }

    return null;
  }

  hasCurrentBookProgress(currentBook: BookVersionModel): boolean {

    if (currentBook && currentBook.chaptersFinishedFraction() > 0) {

      return true;
    }

    return false;
  }

  getBookName(currentBook: BookVersionModel): string {
    const bookName = currentBook.name.split(' - ');
    return !bookName[1] ? bookName[0] : bookName[1];
  }

  goToDetail() {
    this.router.navigate(['platform', 'books', this._bookVersion._id]);
  }
  goToAttempt(integration: BookVersionIntegrationModel) {
    if (integration.attempts.length > 0) {
      this.router.navigate(['platform', 'books', this._bookVersion._id], { queryParams: { chapter: integration._id, attempt: integration.attempts[0]._id } });
    }
  }
}
