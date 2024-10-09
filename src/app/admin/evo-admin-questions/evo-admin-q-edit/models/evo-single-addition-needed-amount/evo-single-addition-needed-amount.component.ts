import {Component, Input, OnInit} from '@angular/core';
import {SingleAdditionNeededAmountModel} from '../../../../../models/questions/singleAdditionNeededAmount.model';
import {QuestionModel} from '../../../../../models/question.model';

@Component({
  selector: 'app-evo-single-addition-needed-amount',
  templateUrl: './evo-single-addition-needed-amount.component.html',
  styleUrls: ['./evo-single-addition-needed-amount.component.css']
})
export class EvoSingleAdditionNeededAmountComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new SingleAdditionNeededAmountModel();

  constructor() { }

  ngOnInit() {
  }

  getOutcomeString(): string {

    let minOutcome = this.question.model.total.minValue() - this.question.model.firstRange.maxValue();
    let maxOutcome = this.question.model.total.maxValue() - this.question.model.firstRange.minValue();


    if (this.question.model.minOutcome !== null) {
      // The minimum value which can occur which is 1 + minOutcome = x,
      // If x is in the range we know we can create such a range that satisfies
      // the constrains, if not we keep the original values computed and do not alter
      // the min outcome.
      const outcomeWithAdjustment = this.question.model.minOutcome + this.question.model.firstRange.minValue();

      if (outcomeWithAdjustment >= this.question.model.total.minValue() &&
        outcomeWithAdjustment <= this.question.model.total.maxValue()) {
        minOutcome = outcomeWithAdjustment;
      }
    }

    if (this.question.model.maxOutcome !== null) {

      // The maximum value which can occur which is 1 + minOutcome = x,
      // If x is in the range we know we can create such a range that satisfies
      // the constrains, if not we keep the original values computed and do not alter
      // the max outcome.
      const outcomeWithAdjustment = this.question.model.maxOutcome + this.question.model.firstRange.maxValue();

      if (outcomeWithAdjustment >= this.question.model.total.minValue() &&
        outcomeWithAdjustment <= this.question.model.total.maxValue()) {
        maxOutcome = outcomeWithAdjustment;
      }

    }
    

    let outcome = '[' + minOutcome.toString(10) + ', ';
    outcome += maxOutcome + ']';

    return outcome;
  }


}
