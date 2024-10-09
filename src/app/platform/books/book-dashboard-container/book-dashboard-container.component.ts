import { Component, OnInit } from '@angular/core';
import {BookVersionIntegrationModel, BookVersionModel} from '../../../models/book-version.model';
import {BookExamsService} from '../../../services/book-exams.service';
import {UserModel} from '../../../models/authentication/user.model';
import {BookExamAttemptModel} from '../../../models/book-exam-attempt.model';

@Component({
  selector: 'app-book-dashboard-container',
  templateUrl: './book-dashboard-container.component.html',
  styleUrls: ['./book-dashboard-container.component.css']
})
export class BookDashboardContainerComponent implements OnInit {

  bookVersions: BookVersionModel[] = [];
  currentBookVersion: BookVersionModel = null;

  constructor(private bookExamSv: BookExamsService) { }

  ngOnInit() {
    this.bookExamSv.fetchBookExamsGrouped().subscribe((bookExams) => {
      this.bookVersions = bookExams;
      this.bookVersions = bookExams.sort((bookOne, bookTwo) => {
        return bookTwo.bookNumber - bookOne.bookNumber;
      });

      if (this.bookVersions.length === 0) {
        // Fetch books and promote one

      } else {

        this.currentBookVersion = this.bookVersions[0];

        // Order the integrations by when they were completed
        // We then filter out the unanswered integrations in the book component
        // It uses the integrations in the same order they are received.
        this.currentBookVersion.integrations = this.currentBookVersion.integrations.sort((intOne, intTwo) => {
          return this.getLatestAttempt(intTwo).getTime() - this.getLatestAttempt(intOne).getTime();
        });

      }
    });
  }

  getLatestAttempt(integration: BookVersionIntegrationModel): Date {

    if (integration.attempts.length > 0 && integration.type === BookVersionIntegrationModel.IntegrationTypes.Exam) {

      let finishedAtDate = integration.attempts[0].finishedAt;

      for (let i = 1; i < integration.attempts.length; i++) {
        const comparisonDate = integration.attempts[i].finishedAt;
        if (finishedAtDate.getTime() < comparisonDate.getTime()) {
          finishedAtDate = comparisonDate;
        }
      }

      return finishedAtDate;

    }

    return new Date();

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

  integrationName(integration: BookVersionIntegrationModel): string {

    if (UserModel.getCurrent()) {

      return integration.monitorNames.stringForCulture(UserModel.getCurrent().culture);
    }

    return null;
  }

  integrationCorrectAnswers(integration: BookVersionIntegrationModel): number {

    if (integration.successfulAttempt) {

      return integration.successfulAttempt.numCorrect;
    } else if (integration.attempts.length > 0) {

      return integration.attempts[0].numCorrect;
    }

    return 0;

  }

  integrationExamNumAttempts(integration: BookVersionIntegrationModel) {

    return integration.attempts.length.toString(10);
  }

  integrationExamPassed(integration: BookVersionIntegrationModel): boolean {

    if (integration.successfulAttempt) {
      return true;
    }

    return false;
  }

}
