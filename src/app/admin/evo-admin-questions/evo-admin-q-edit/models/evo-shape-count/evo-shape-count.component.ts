import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {CountShapesModel} from '../../../../../models/questions/countShapes.model';

@Component({
  selector: 'app-evo-shape-count',
  templateUrl: './evo-shape-count.component.html',
  styleUrls: ['./evo-shape-count.component.css']
})
export class EvoShapeCountComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question: CountShapesModel;

  constructor() { }

  ngOnInit() {
  }

  showQuestion(): boolean {

    if (this.question) {
      if (this.question.subCategory === QuestionModel.SubCategoryTypes.countShapes) {
        return true;
      }
    }

    return false;
  }

}
