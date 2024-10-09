import {Component, Input, OnInit} from '@angular/core';
import {SingleSubtractionModel} from '../../../../../models/questions/singleSubtraction.model';
import {QuestionModel} from '../../../../../models/question.model';

@Component({
  selector: 'app-evo-single-subtraction',
  templateUrl: './evo-single-subtraction.component.html',
  styleUrls: ['./evo-single-subtraction.component.css']
})
export class EvoSingleSubtractionComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new SingleSubtractionModel();

  constructor() { }

  ngOnInit() {
  }

  getOutcomeString(): string {

    const maxOutcome = this.question.model.firstRange.minValue() - this.question.model.secondRange.maxValue();
    const minOutcome = this.question.model.secondRange.maxValue() - this.question.model.secondRange.minValue();

    if (this.question.model.maxOutcome !== null &&
      this.question.model.minOutcome !== null) {

      return '[' + this.question.model.minOutcome.toString(10) + ', ' +
        this.question.model.maxOutcome.toString(10) + ']';

    } else if (this.question.model.minOutcome !== null) {

      return '[' + this.question.model.minOutcome.toString(10) + ', ' +
        maxOutcome + ']';

    } else if (this.question.model.maxOutcome !== null) {

      return '[' + minOutcome + ', ' +
        this.question.model.maxOutcome.toString(10) + ']';

    }

    let outcome = '[' + minOutcome.toString(10) + ', ';
    outcome += maxOutcome + ']';

    return outcome;
  }


}
