import {Component, Input, OnInit} from '@angular/core';
import {CountMultipleNumbersModel} from '../../../../../models/questions/countMultipleNumbers.model';
import {QuestionModel} from '../../../../../models/question.model';

@Component({
  selector: 'app-evo-count-multiple-numbers',
  templateUrl: './evo-count-multiple-numbers.component.html',
  styleUrls: ['./evo-count-multiple-numbers.component.css']
})
export class EvoCountMultipleNumbersComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new CountMultipleNumbersModel();

  constructor() { }

  ngOnInit() {
  }

}
