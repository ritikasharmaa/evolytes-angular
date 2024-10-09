import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {DoubleAdditionModel} from '../../../../../models/questions/doubleAddition.model';

@Component({
  selector: 'app-evo-double-addition',
  templateUrl: './evo-double-addition.component.html',
  styleUrls: ['./evo-double-addition.component.css']
})
export class EvoDoubleAdditionComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new DoubleAdditionModel();

  constructor() { }

  ngOnInit() {
  }

  getOutcomeString(): string {

    let minOutcomeOne = this.question.model.firstRange.minValue() + this.question.model.secondRange.minValue();
    let maxOutcomeOne = this.question.model.firstRange.maxValue() + this.question.model.secondRange.maxValue();

    if (this.question.model.firstMinOutcome !== null) {

      minOutcomeOne = this.question.model.firstMinOutcome;

    }

    if (this.question.model.firstMaxOutcome !== null) {

      maxOutcomeOne = this.question.model.firstMaxOutcome;

    }

    let outcomePartOne = '[' + minOutcomeOne.toString(10) + ', ';
    outcomePartOne += maxOutcomeOne + ']';

    let minOutcomeTwo = minOutcomeOne + this.question.model.thirdRange.minValue();
    let maxOutcomeTwo = maxOutcomeOne + this.question.model.thirdRange.maxValue();

    if (this.question.model.secondMinOutcome !== null) {
      minOutcomeTwo = this.question.model.secondMinOutcome;
    }

    if (this.question.model.secondMaxOutcome !== null) {
      maxOutcomeTwo = this.question.model.secondMaxOutcome;
    }

    let outcomePartTwo = '[' + minOutcomeTwo + ', ';
    outcomePartTwo += maxOutcomeTwo + ']';

    return outcomePartOne + ' + [' + this.question.model.thirdRange.getRange()
      + '] = ' + outcomePartTwo;
  }


}
