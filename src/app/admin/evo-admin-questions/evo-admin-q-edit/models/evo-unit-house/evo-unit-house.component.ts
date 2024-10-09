import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {UnitHouseModel} from '../../../../../models/questions/unitHouse.model';

@Component({
  selector: 'app-evo-unit-house',
  templateUrl: './evo-unit-house.component.html',
  styleUrls: ['./evo-unit-house.component.css']
})
export class EvoUnitHouseComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question: UnitHouseModel;

  constructor() { }

  ngOnInit() {
  }

  showQuestion(): boolean {

    if (this.question) {
      if (this.question.subCategory === QuestionModel.SubCategoryTypes.unitHouse) {
        return true;
      }
    }

    return false;
  }

  questionString(): string {

    return '';
  }

}
