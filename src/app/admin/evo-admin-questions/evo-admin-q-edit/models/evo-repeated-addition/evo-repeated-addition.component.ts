import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {RepeatedAdditionModel} from '../../../../../models/questions/repeatedAddition.model';

@Component({
  selector: 'app-evo-repeated-addition',
  templateUrl: './evo-repeated-addition.component.html',
  styleUrls: ['./evo-repeated-addition.component.css']
})
export class EvoRepeatedAdditionComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question: RepeatedAdditionModel;

  constructor() { }

  ngOnInit() {
  }

  showQuestion(): boolean {

    if (this.question.subCategory === QuestionModel.SubCategoryTypes.repeatedAddition) {

      return true;
    }

    return false;
  }

  questionString(): string {

    if (this.question) {

      return `(${this.question.model.multipliedValueRange.getRange()}) * (${this.question.model.multiplierRange.getRange()})`;
    }

    return null;
  }

}
