import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {ShapeSingleDiscriminationCountModel} from '../../../../../models/questions/shapeSingleDiscriminationCount.model';
import {ImagePatternSingleFillModel} from '../../../../../models/questions/imagePatternSingleFill.model';
import {EvoListSelectorService} from '../../../../../shared/evo-list-selector/evo-list-selector.service';

@Component({
  selector: 'app-evo-image-pattern-single-fill',
  templateUrl: './evo-image-pattern-single-fill.component.html',
  styleUrls: ['./evo-image-pattern-single-fill.component.css']
})
export class EvoImagePatternSingleFillComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question: ImagePatternSingleFillModel;

  constructor(private selectorSv: EvoListSelectorService) { }

  ngOnInit() {
  }

  showQuestion(): boolean {

    if (this.question) {
      if (this.question.subCategory === QuestionModel.SubCategoryTypes.imagePatternSingleFill) {
        return true;
      }
    }

    return false;
  }

  questionString(): string {

    let string = '';
    for (let i = 0; i < this.question.model.numPatternValues; i++) {

      if (i === this.question.model.missingPatternIndex) {
        string += 'Unknown, ';
      } else {
        if (this.question.model.pattern.length !== 0) {
          const patternIndex = i % this.question.model.pattern.length;
          string += this.question.model.pattern[patternIndex] + ', ';
        }
      }

    }

    return string;

  }

  removePattern(index: number) {
    if (index < this.question.model.pattern.length) {
      this.question.model.pattern.splice(index, 1);
    }
  }

  showPatternSelector() {

    const imageList = QuestionModel.ShapeImageTypes.list().concat(QuestionModel.ImageTypes.list());

    this.selectorSv.showList(imageList, []).subscribe((item) => {
      if (item) {
        this.question.model.pattern.push(item);
      }
    });
  }

  removePossiblePattern(index: number) {
    if (index < this.question.model.possiblePatternImages.length) {
      this.question.model.pattern.splice(index, 1);
    }
  }

  showPossiblePatternSelector() {

    const imageList = QuestionModel.ShapeImageTypes.list().concat(QuestionModel.ImageTypes.list());

    this.selectorSv.showList(imageList, []).subscribe((item) => {
      if (item) {
        this.question.model.possiblePatternImages.push(item);
      }
    });

  }

}
