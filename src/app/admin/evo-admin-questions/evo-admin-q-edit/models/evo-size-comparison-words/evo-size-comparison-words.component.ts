import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../../models/question.model';
import {SizeComparisonWordsModel} from '../../../../../models/questions/sizeComparisonWords.model';

@Component({
  selector: 'app-evo-size-comparison-words',
  templateUrl: './evo-size-comparison-words.component.html',
  styleUrls: ['./evo-size-comparison-words.component.css']
})
export class EvoSizeComparisonWordsComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new SizeComparisonWordsModel();

  constructor() { }

  ngOnInit() {
  }

}
