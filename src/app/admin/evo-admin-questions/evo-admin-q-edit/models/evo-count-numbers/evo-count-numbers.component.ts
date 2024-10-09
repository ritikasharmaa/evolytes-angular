import {Component, Input, OnInit} from '@angular/core';
import {CountNumbersModel} from '../../../../../models/questions/countNumbers.model';
import {RangeModel} from '../../../../../models/range.model';
import {QuestionModel} from '../../../../../models/question.model';

@Component({
  selector: 'app-evo-count-numbers',
  templateUrl: './evo-count-numbers.component.html',
  styleUrls: ['./evo-count-numbers.component.css']
})
export class EvoCountNumbersComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question: CountNumbersModel = new CountNumbersModel();

  constructor() { }

  ngOnInit() {
  }

}
