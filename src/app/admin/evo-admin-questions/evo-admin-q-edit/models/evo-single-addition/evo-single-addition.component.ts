import {Component, Input, OnInit} from '@angular/core';
import {SingleAdditionModel} from '../../../../../models/questions/singleAddition.model';
import {QuestionModel} from '../../../../../models/question.model';

@Component({
  selector: 'app-evo-single-addition',
  templateUrl: './evo-single-addition.component.html',
  styleUrls: ['./evo-single-addition.component.css']
})
export class EvoSingleAdditionComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new SingleAdditionModel();

  constructor() { }

  ngOnInit() {
  }

  getOutcomeString(): string {

    const minOutcome = this.question.model.firstRange.minValue() + this.question.model.secondRange.minValue();
    const maxOutcome = this.question.model.secondRange.maxValue() + this.question.model.secondRange.maxValue();

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
