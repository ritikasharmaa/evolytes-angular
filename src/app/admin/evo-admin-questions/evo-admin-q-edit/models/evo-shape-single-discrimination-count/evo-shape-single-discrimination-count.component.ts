import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {ShapeNameFromImageModel} from '../../../../../models/questions/shapeNameFromImage.model';
import {ShapeSingleDiscriminationCountModel} from '../../../../../models/questions/shapeSingleDiscriminationCount.model';
import {EvoListSelectorService} from '../../../../../shared/evo-list-selector/evo-list-selector.service';

@Component({
  selector: 'app-evo-shape-single-discrimination-count',
  templateUrl: './evo-shape-single-discrimination-count.component.html',
  styleUrls: ['./evo-shape-single-discrimination-count.component.css']
})
export class EvoShapeSingleDiscriminationCountComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question: ShapeSingleDiscriminationCountModel;


  constructor(private selectorSv: EvoListSelectorService) { }

  ngOnInit() {
  }

  removeShape(index: number) {
    if (index < this.question.model.otherShapes.length) {
      this.question.model.otherShapes.splice(index, 1);
    }
  }

  showQuestion(): boolean {

    if (this.question) {
      if (this.question.subCategory === QuestionModel.SubCategoryTypes.shapeSingleDiscriminationCount) {
        return true;
      }
    }

    return false;
  }

  showSelector() {
    this.selectorSv.showList(QuestionModel.ShapeTypes.list(), this.question.model.otherShapes).subscribe((item) => {
      if (item) {
        this.question.model.otherShapes.push(item);
      }
    });
  }

}
