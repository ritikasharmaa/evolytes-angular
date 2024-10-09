import { Component, OnInit } from '@angular/core';
import { BookVersionIntegrationModel, BookVersionModel } from '../../../models/book-version.model';
import { BookExamsService } from '../../../services/book-exams.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  dropDownList: any[] = [];
  bookName: string[] = [];
  bookVersions: BookVersionModel[] = [];
  currentBookVersion: BookVersionModel = null;
  integrationExamAttempts: BookVersionIntegrationModel[] = [];
  lastExamAttemptFinished: BookVersionIntegrationModel = null;
  lastExamAttemptFailed: BookVersionIntegrationModel = null;
  nextExamAttempt: BookVersionIntegrationModel = null;

  constructor(private bookExamSv: BookExamsService, private translate: TranslateService, private router: Router) {
  }

  public static getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  ngOnInit() {
    this.bookExamSv.fetchBookExamsGrouped().subscribe((bookExams) => {
      this.bookVersions = bookExams;
      this.bookVersions = bookExams.sort((bookOne, bookTwo) => {
        return bookTwo.bookNumber - bookOne.bookNumber;
      });
      if (this.bookVersions.length === 0) {
        // Fetch books and promote one

      } else {
        // Sort the integrations by chapter in a descending order
        this.bookVersions.forEach((book, i) => {
          this.bookVersions[i].integrations = book.integrations.sort((intOne, intTwo) => {
            return intTwo.chapter - intOne.chapter;
          });
        });

        this.currentBookVersion = this.bookVersions[0];
        this.bookName = this.currentBookVersion.name.split(' - ');

        // Array of the integrations with no attempts
        const integrationExamNoAttempts = [];

        // We only want the chapters which have been attempted or no no attempted in other array.
        for (const integration of this.currentBookVersion.integrations) {
          if (integration.attempts.length > 0) {
            integration.attempts = integration.attempts.sort((attemptOne, attemptTwo) => {
              return BooksComponent.getTime(attemptTwo.finishedAt) - BooksComponent.getTime(attemptOne.finishedAt);
            });
            this.integrationExamAttempts.push(integration);
          } else if (integration.attempts.length === 0) {
            integrationExamNoAttempts.push(integration);
          }
        }

        integrationExamNoAttempts.sort((first, second) => {
          return first.chapter - second.chapter;
        });

        if (integrationExamNoAttempts.length > 0) {
          this.nextExamAttempt = integrationExamNoAttempts[0];
        }

        // Array of the integrations with failed attempts
        let integrationsFailedAttempts = [];
        // Array of the integrations with finished attempts
        let integrationsFinishedAttempts = [];

        // Push in the first array the integrations with finished attempts and in second the failed attempts
        this.integrationExamAttempts.map(function (integration) {
          if (integration.successfulAttempt) {
            return integrationsFinishedAttempts.push(integration);
          } else if (!integration.successfulAttempt) {
            return integrationsFailedAttempts.push(integration);
          }
        });

        // Sort the integrations by latest finish in a descending order
        integrationsFinishedAttempts = integrationsFinishedAttempts.sort(
          (attemptOne, attemptTwo) => {
            // tslint:disable-next-line:max-line-length
            return BooksComponent.getTime(attemptTwo.successfulAttempt.finishedAt) - BooksComponent.getTime(attemptOne.successfulAttempt.finishedAt);
          });

        // Sort the integrations by latest failed in a descending order
        integrationsFailedAttempts = integrationsFailedAttempts.sort(
          (attemptOne, attemptTwo) => {
            // tslint:disable-next-line:max-line-length
            return BooksComponent.getTime(attemptTwo.attempts[0].finishedAt) - BooksComponent.getTime(attemptOne.attempts[0].finishedAt);
          });

        if (integrationsFinishedAttempts.length > 0) {
          this.lastExamAttemptFinished = integrationsFinishedAttempts[0];
        }

        if (integrationsFailedAttempts.length > 0) {
          this.lastExamAttemptFailed = integrationsFailedAttempts[0];
        }
      }
    });

    this.dropDownList.push({
      key: 'finished',
      value: this.translate.instant('reusable.finished'),
      iconURL: './assets/icons/correct-green-icon.png'
    });
    this.dropDownList.push({
      key: 'unfinished',
      value: this.translate.instant('reusable.unfinished'),
      iconURL: './assets/icons/wrong-red-icon.png'
    });

  }

  currentBookProgress(): string {

    if (this.currentBookVersion) {

      const fraction = this.currentBookVersion.chaptersFinishedFraction() * 100;

      return fraction.toFixed(0);
    }

    return null;
  }

  hasCurrentBookProgress(): boolean {

    if (this.currentBookVersion && this.currentBookVersion.chaptersFinishedFraction() > 0) {

      return true;
    }

    return false;
  }

  goToDetail() {
    this.router.navigate(['platform', 'books', this.currentBookVersion._id]);
  }
  goToAttempt(integration: BookVersionIntegrationModel) {
    if (integration.attempts.length > 0) {
      this.router.navigate(['platform', 'books', this.currentBookVersion._id], { queryParams: { chapter: integration._id, attempt: integration.attempts[0]._id } });
    }
  }
}
