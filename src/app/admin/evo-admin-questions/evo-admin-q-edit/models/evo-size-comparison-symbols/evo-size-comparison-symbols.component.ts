import {Component, Input, OnInit} from '@angular/core';
import {SizeComparisonSymbolsModel} from '../../../../../models/questions/sizeComparisonSymbols.model';
import {QuestionModel} from '../../../../../models/question.model';

@Component({
  selector: 'app-evo-size-comparison-symbols',
  templateUrl: './evo-size-comparison-symbols.component.html',
  styleUrls: ['./evo-size-comparison-symbols.component.css']
})
export class EvoSizeComparisonSymbolsComponent implements OnInit {

  QuestionModel = QuestionModel;
  @Input() question = new SizeComparisonSymbolsModel();

  constructor() { }

  ngOnInit() {
  }

}
