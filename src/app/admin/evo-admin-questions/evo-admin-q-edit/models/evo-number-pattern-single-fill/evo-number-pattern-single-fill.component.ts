import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {ImagePatternSingleFillModel} from '../../../../../models/questions/imagePatternSingleFill.model';
import {NumberPatternSingleFillModel} from '../../../../../models/questions/numberPatternSingleFill.model';

@Component({
  selector: 'app-evo-number-pattern-single-fill',
  templateUrl: './evo-number-pattern-single-fill.component.html',
  styleUrls: ['./evo-number-pattern-single-fill.component.css']
})
export class EvoNumberPatternSingleFillComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question: NumberPatternSingleFillModel;


  constructor() { }

  ngOnInit() {
  }

  showQuestion(): boolean {

    if (this.question.subCategory === QuestionModel.SubCategoryTypes.numberPatternSingleFill) {
      return true;
    }

    return false;
  }

  questionString(): string {


    return `(${this.question.model.firstRange.getRange()}) ${this.question.model.patternOpType} (${this.question.model.patternValue.getRange()}) * ${this.question.model.numPatternValues}`;

  }

}
