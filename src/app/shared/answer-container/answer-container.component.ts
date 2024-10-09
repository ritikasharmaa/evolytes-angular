import {Component, Input, OnInit} from '@angular/core';
import {AnswerModel} from '../../models/answer.model';
import {QuestionModel} from '../../models/question.model';

@Component({
  selector: 'app-answer-container',
  templateUrl: './answer-container.component.html',
  styleUrls: ['./answer-container.component.css']
})
export class AnswerContainerComponent implements OnInit {

  @Input() answer: AnswerModel;

  constructor() {
  }

  ngOnInit() {
  }

  isCorrectIconURL(): any {

    if (this.answer) {
      return this.answer.isCorrectIconURL();
    }

    return null;
  }

  answerTypeIconURL(): string {

    if (this.answer) {
      return this.answer.answerTypeIconURL();
    }

    return null;
  }

  answerString(): string {

    if (this.answer) {
      return this.answer.questionString();
    }
    return '';
  }

  answerCategory(): string {

    if (this.answer) {

      return 'categories.' + this.answer.category;
    }

    return null;
  }

  answerType(): string {

    if (this.answer) {
      return 'answerTypes.' + this.answer.answerType;
    }

    return null;
  }
}
