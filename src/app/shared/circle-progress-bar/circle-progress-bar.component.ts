import { Component, Input, OnInit } from '@angular/core';
import {ChartData, ChartDataSets} from 'chart.js';

@Component({
  selector: 'app-circle-progress-bar',
  templateUrl: './circle-progress-bar.component.html',
  styleUrls: ['./circle-progress-bar.component.css']
})
export class CircleProgressBarComponent implements OnInit {

  @Input() chartTitle = '';
  @Input() chartDataLabels: string[] = [];
  @Input() chartData: ChartDataSets[] = [];

  ngOnInit() {

  }

}
