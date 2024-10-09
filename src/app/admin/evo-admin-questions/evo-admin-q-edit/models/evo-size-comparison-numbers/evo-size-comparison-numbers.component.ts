import {Component, Input, OnInit} from '@angular/core';
import {SizeComparisonNumbersModel} from '../../../../../models/questions/sizeComparisonNumbers.model';
import {QuestionModel} from '../../../../../models/question.model';

@Component({
  selector: 'app-evo-size-comparison-numbers',
  templateUrl: './evo-size-comparison-numbers.component.html',
  styleUrls: ['./evo-size-comparison-numbers.component.css']
})
export class EvoSizeComparisonNumbersComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new SizeComparisonNumbersModel();

  constructor() { }

  ngOnInit() {
  }

  getSymbol() {

    if (this.question.model.symbol === 'greater') {

      if (this.question.model.leftSideUnknown === true) {
        return '>';
      } else {
        return '<';
      }

    } else if (this.question.model.symbol === 'less') {

      if (this.question.model.leftSideUnknown === true) {
        return '<';
      } else {
        return '>';
      }

    } else if (this.question.model.symbol === 'equal') {

      return '=';

    }

  }

  getFirstRange() {

    if (this.question.model.leftSideUnknown === true) {
      return this.question.model.firstRange.getRange();
    } else {
      return this.question.model.possibleAnswers.getRange();
    }

  }

  getSecondRange() {

    if (this.question.model.leftSideUnknown === true) {
      return this.question.model.possibleAnswers.getRange();
    } else {
      return this.question.model.firstRange.getRange();
    }

  }



}
