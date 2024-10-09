import {Component, OnInit} from '@angular/core';
import {QuestionModel} from '../../models/question.model';
import {AnswerQueryModel} from '../../models/answer.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  filter = new AnswerQueryModel();

  isFiltersVisible = false;

  constructor() {
  }

  ngOnInit() {

  }

  imageType(): string {

    if (this.isFiltersVisible === true) {

      return './assets/icons/up-arrow.svg';
    }

    return './assets/icons/down-arrow.svg';
  }

  onButtonClick() {
    this.isFiltersVisible = !this.isFiltersVisible;
  }

}
