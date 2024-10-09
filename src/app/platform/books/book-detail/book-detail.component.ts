import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookVersionIntegrationModel, BookVersionModel } from '../../../models/book-version.model';
import { BookSelectedService } from '../../../services/book-selected.service';
import { BookExamAttemptModel } from '../../../models/book-exam-attempt.model';
import { AnswerQueryModel } from '../../../models/answer.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  version: string;
  currentIntegration: BookVersionIntegrationModel = null;
  currentBookVersion: BookVersionModel = null;
  currentAttempts: BookExamAttemptModel[] = [];
  // currentAttempts = [{_id: '629dd157ab341700310b736d', bookExamId: '629dd133bb021c463a95fe87', bookId: '5e74c47fd0d7c40026197118', bookVersionId: '61f2c65cd72bf4001ff86fa0', finishedAt: new Date(2022,6,6,10,5,11), integrationId: '61f2c6d4d72bf4001ff8702d', numAnswers: 5, numCorrect:5, sessionId: 'hfQsxHxEu5HbIVpP', studentId: '629dcc88a469b7015097ef3e', success: true}];
  currentAttempt: BookExamAttemptModel = null;
  notEmptyAttempts: Boolean = false;
  notEmptyAnswers: Boolean = false;
  notEmpty: Boolean = false;
  filter = new AnswerQueryModel();

  constructor(private route: ActivatedRoute, private router: Router, private bookSelectSv: BookSelectedService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.version = params.bookVersion;
    });
    this.bookSelectSv.fetchBookSelected(this.version).subscribe((bookSelected) => {
      this.currentBookVersion = bookSelected;
      this.currentBookVersion.integrations = bookSelected.integrations.sort((intOne, intTwo) => {
        return intOne.chapter - intTwo.chapter;
      });
      if (this.currentBookVersion !== null) {
        this.notEmpty = true;
      }
      this.route.queryParams.subscribe((params: Params) => {
        if (params.chapter !== undefined) {
          if (this.currentBookVersion !== undefined) {
            this.showAttemptsOfChapter(params.chapter);
            this.updateFilter(params.attempt);
            this.showAnswersOfChapter();
          }
        }
      });
    });

  }

  goBackBooks() {
    this.router.navigate(['platform', 'books']);
  }

  showAnswersOfChapter() {
    this.notEmptyAnswers = true;
  }

  showAttemptsOfChapter(chapter: string) {
    this.notEmptyAnswers = false;
    this.notEmptyAttempts = false;
    this.currentAttempt = null;
    this.currentAttempts = [];
    this.currentIntegration = this.currentBookVersion.integrations.find((integration) => {
      return integration._id === chapter;
    });
    if (this.currentIntegration.attempts.length > 0) {
      this.currentAttempts = this.currentIntegration.attempts;
      this.notEmptyAttempts = true;

    }
  }

  updateFilter(attemptId: string) {

    const filter = new AnswerQueryModel();
    filter.skip = 0;
    if (this.currentIntegration.attempts.length > 0) {
      this.currentAttempt = this.currentIntegration.attempts.find((attempt) => {
        return attempt._id === attemptId;
      });
      if (this.currentIntegration !== null) {
        filter.integrationId = this.currentIntegration._id;
        filter.sessionId = this.currentAttempt.sessionId;
      }
    }
    this.filter = filter;
  }
}
