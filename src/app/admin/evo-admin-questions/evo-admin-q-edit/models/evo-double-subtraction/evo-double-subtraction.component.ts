import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {DoubleAdditionModel} from '../../../../../models/questions/doubleAddition.model';

@Component({
  selector: 'app-evo-double-subtraction',
  templateUrl: './evo-double-subtraction.component.html',
  styleUrls: ['./evo-double-subtraction.component.css']
})
export class EvoDoubleSubtractionComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new DoubleAdditionModel();

  constructor() { }

  ngOnInit() {
  }

  getOutcomeString(): string {

    let minOutcomeOne = this.question.model.firstRange.minValue() - this.question.model.secondRange.maxValue();
    let maxOutcomeOne = this.question.model.firstRange.maxValue() - this.question.model.secondRange.minValue();

    if (this.question.model.firstMinOutcome !== null) {

      minOutcomeOne = this.question.model.firstMinOutcome;

    }

    if (this.question.model.firstMaxOutcome !== null) {

      maxOutcomeOne = this.question.model.firstMaxOutcome;

    }

    let outcomePartOne = '[' + minOutcomeOne.toString(10) + ', ';
    outcomePartOne += maxOutcomeOne + ']';

    let minOutcomeTwo = minOutcomeOne - this.question.model.thirdRange.maxValue();
    let maxOutcomeTwo = maxOutcomeOne - this.question.model.thirdRange.minValue();

    if (this.question.model.secondMinOutcome !== null) {
      minOutcomeTwo = this.question.model.secondMinOutcome;
    }

    if (this.question.model.secondMaxOutcome !== null) {
      maxOutcomeTwo = this.question.model.secondMaxOutcome;
    }

    let outcomePartTwo = '[' + minOutcomeTwo + ', ';
    outcomePartTwo += maxOutcomeTwo + ']';

    return outcomePartOne + ' - [' + this.question.model.thirdRange.getRange()
      + '] = ' + outcomePartTwo;
  }


}
