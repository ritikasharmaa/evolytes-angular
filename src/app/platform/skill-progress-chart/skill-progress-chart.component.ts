import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-skill-progress-chart',
  templateUrl: './skill-progress-chart.component.html',
  styleUrls: ['./skill-progress-chart.component.css']
})
export class SkillProgressChartComponent implements OnInit {
  optionsTime = [{key: 'thisW', value: this.tsv.instant('dashboard.chart.thisWeek'), iconURL: null}, {key: 'lastW', value: this.tsv.instant('dashboard.chart.lastWeek'), iconURL: null}, {key: 'lastM', value: this.tsv.instant('dashboard.chart.lastMonth'), iconURL: null}, {key: 'thisM', value: this.tsv.instant('dashboard.chart.thisMonth'), iconURL: null}];
  optionTimeSelected: { key: string, value: any, iconURL: null };
  constructor(private tsv: TranslateService) { }

  ngOnInit() {
    this.optionTimeSelected = this.optionsTime[0];
  }
  changeOptionTime(optionCode: string) {
    if (this.optionTimeSelected.key !== optionCode ) {
      this.optionTimeSelected = this.optionsTime.find((option) => {
        return option.key === optionCode;
      });
    }
  }

}
