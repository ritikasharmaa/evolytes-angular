import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {CountShapesModel} from '../../../../../models/questions/countShapes.model';
import {ShapeNameFromImageModel} from '../../../../../models/questions/shapeNameFromImage.model';
import {EvoListSelectorService} from '../../../../../shared/evo-list-selector/evo-list-selector.service';

@Component({
  selector: 'app-evo-shape-name-from-image',
  templateUrl: './evo-shape-name-from-image.component.html',
  styleUrls: ['./evo-shape-name-from-image.component.css']
})
export class EvoShapeNameFromImageComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question: ShapeNameFromImageModel;

  constructor(private selectorSv: EvoListSelectorService) { }

  ngOnInit() {
  }

  removeShape(index: number) {
    if (index < this.question.model.possibleAnswers.length) {
      this.question.model.possibleAnswers.splice(index, 1);
    }
  }

  showQuestion(): boolean {

    if (this.question) {
      if (this.question.subCategory === QuestionModel.SubCategoryTypes.shapeNameFromImage) {
        return true;
      }
    }

    return false;
  }

  showSelector() {
    this.selectorSv.showList(QuestionModel.ShapeTypes.list(), this.question.model.possibleAnswers).subscribe((item) => {
      if (item) {
        this.question.model.possibleAnswers.push(item);
      }
    });
  }

}
