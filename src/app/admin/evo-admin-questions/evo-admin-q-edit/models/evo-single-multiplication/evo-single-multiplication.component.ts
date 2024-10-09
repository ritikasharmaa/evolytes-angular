import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {SingleMultiplicationModel} from '../../../../../models/questions/singleMultiplication.model';

@Component({
  selector: 'app-evo-single-multiplication',
  templateUrl: './evo-single-multiplication.component.html',
  styleUrls: ['./evo-single-multiplication.component.css']
})
export class EvoSingleMultiplicationComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new SingleMultiplicationModel();

  constructor() { }

  ngOnInit() {
  }

  getOutcomeString(): string {

    const minOutcome = this.question.model.firstRange.minValue() * this.question.model.secondRange.minValue();
    const maxOutcome = this.question.model.firstRange.maxValue() * this.question.model.secondRange.maxValue();

    return `[${minOutcome}, ${maxOutcome}]`;

  }

  showQuestion(): boolean {

    if (this.question.subCategory === QuestionModel.SubCategoryTypes.singleMultiplication) {

      return true;
    }

    return false;
  }

}
