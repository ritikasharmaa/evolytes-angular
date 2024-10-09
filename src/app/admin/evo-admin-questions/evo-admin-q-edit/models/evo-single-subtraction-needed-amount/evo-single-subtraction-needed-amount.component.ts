 import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {SingleSubtractionNeededAmountModel} from '../../../../../models/questions/singleSubtractionNeededAmount.model';
import {min} from 'rxjs/operators';

@Component({
  selector: 'app-evo-single-subtraction-needed-amount',
  templateUrl: './evo-single-subtraction-needed-amount.component.html',
  styleUrls: ['./evo-single-subtraction-needed-amount.component.css']
})
export class EvoSingleSubtractionNeededAmountComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new SingleSubtractionNeededAmountModel();

  constructor() { }

  ngOnInit() {
  }

  getOutcomeString(): string {

    let minOutcome = this.question.model.total.maxValue() - this.question.model.firstRange.minValue();
    let maxOutcome = this.question.model.firstRange.maxValue() - this.question.model.total.minValue();


    if (this.question.model.minOutcome !== null) {

      if (minOutcome <= this.question.model.minOutcome &&
        maxOutcome >= this.question.model.minOutcome) {
        minOutcome = this.question.model.minOutcome;
      }
    }

    if (this.question.model.maxOutcome !== null) {

      if (minOutcome <= this.question.model.maxOutcome &&
        maxOutcome >= this.question.model.maxOutcome) {
        maxOutcome = this.question.model.maxOutcome;
      }

    }


    let outcome = '[' + minOutcome.toString(10) + ', ';
    outcome += maxOutcome + ']';

    return outcome;
  }

  showQuestion(): boolean {

    if (this.question) {
      if (this.question.subCategory === QuestionModel.SubCategoryTypes.singleSubtractionNeededAmount) {
        return true;
      }
    }

    return false;
  }

}
