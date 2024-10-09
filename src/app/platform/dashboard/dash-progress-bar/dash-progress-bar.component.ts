import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '../../../services/question.service';
import {SkillService} from '../../../services/skill.service';
import {QuestionModel} from '../../../models/question.model';
import {SkillModel, SkillQueryModel} from '../../../models/skill.model';
import {forkJoin} from 'rxjs';
import {DateTime} from 'luxon';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dash-progress-bar',
  templateUrl: './dash-progress-bar.component.html',
  styleUrls: ['./dash-progress-bar.component.css']
})
export class DashProgressBarComponent implements OnInit {

  @Input() rowContainerHeight = '60px';
  @Input() rowHeight = '40px';

  @Input('startDate')
  set startDate(date: Date) {
    this._startDate = date;
  }

  get startDate(): Date {
    return this._startDate;
  }

  _startDate;

  colorOrder: string[] = ['#7bcae2', '#fbe27f', '#b8dfb4', '#f4af8d', '#c9a9d7', '#e37d8a'];
  lightColorOrder: string[] = ['#b3e0ee', '#fdf1c1', '#daeed8', '#f8d0bb', '#dfcce7', '#eca7b0'];
  colorDarkOrder: string[] = ['#009ccc', '#ffcb05', '#79c570', '#f26522', '#9b59b6', '#d0021b'];

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{ticks: {stepSize: 10, max: 100, beginAtZero: true}}],
      yAxes: [{ticks: {fontSize: 14, fontFamily: 'Montserrat', fontStyle: '600'}}]
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return tooltipItems.xLabel + ' %';
        }
      }
    }

  };
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = false;

  datasets: ChartDataSets[] = [{
    label: null,
    data: [],
    backgroundColor: [],
    borderColor: [],
    hoverBackgroundColor: [],
    hoverBorderColor: [],
    borderWidth: 1
  }];
  barChartLabels: Label[] = [];


  questions: QuestionModel[] = [];
  skills: SkillModel[] = [];

  constructor(private questionSv: QuestionService, private skillSv: SkillService, private tsv: TranslateService) {
  }

  ngOnInit() {

    // Default value for the start date
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    this._startDate = weekAgo;

    const query = new SkillQueryModel();
    query.includeHistory = false;
    query.historyOrder = 1;

    const fetchS = this.skillSv.fetchSkills(query);

    forkJoin([fetchS]).subscribe((data) => {
      this.skills = data[0];
      this.setupBarData();
    });

  }

  setupBarData() {

    this.datasets[0].label = this.tsv.instant('dashboard.columnProgressTitle');

    QuestionModel.CategoryTypes.list().forEach((category, i) => {

      const model = new CategoryProgressBarModel();
      model.category = category;
      model.title = model.category;
      model.skills = this.skillsForCategory(this.skills, category);

      (this.datasets[0].data as number[]).push(model.firstBarMasteryPercentage(this._startDate));
      this.barChartLabels.push(this.tsv.instant('categories.' + model.title));

      // Setup colors
      const color = this.barColor(i);
      const lightColor = this.barLightColor(i);
      (this.datasets[0].backgroundColor as string[]).push(lightColor);
      (this.datasets[0].borderColor as string[]).push(color);
      (this.datasets[0].hoverBackgroundColor as string[]).push(color);
      (this.datasets[0].hoverBorderColor as string[]).push(lightColor);

    });

  }

  skillsForCategory(skills: SkillModel[], category: string): SkillModel[] {

    const list = [];

    for (const skill of skills) {

      if (skill.category === category) {
        list.push(skill);
      }

    }

    return list;

  }

  barColor(index: number): string {

    const i = index % this.colorOrder.length;

    return this.colorOrder[i];
  }

  barLightColor(index: number): string {

    const i = index % this.lightColorOrder.length;

    return this.lightColorOrder[i];
  }

  barColorDarker(index: number): string {

    const i = index % this.colorDarkOrder.length;

    return this.colorDarkOrder[i];

  }

}

export class CategoryProgressBarModel {

  public category: string;
  public title: string;

  public skills: SkillModel[] = [];
  public questions: QuestionModel[] = [];

  firstBarSkillMastery(date: Date): number {

    let value = 0;

    for (const s of this.skills) {

      const lastSkillChange = DateTime.fromJSDate(s.updatedAt);
      const diff = lastSkillChange.diffNow('days');

      if (Math.abs(diff.days) < 7) {
        const previousPoint = s.closestPoint(date);
        if (previousPoint !== null) {
          value += previousPoint.mastery;
        }
      } else {
        value += s.mastery;
      }

    }

    return value;

  }

  firstBarMasteryPercentage(date: Date): number {

    let mastery = this.firstBarSkillMastery(date);

    if (this.skills.length === 0) {

      return 0;
    }

    mastery = mastery / this.skills.length * 100;


    return Math.round(mastery);

  }

  secondBarSkillMastery(date: Date): number {

    let value = 0;

    for (const s of this.skills) {
      value += s.mastery;
    }

    value = Math.abs(value - this.firstBarSkillMastery(date));

    return value;

  }

  secondBarMasteryPercentage(date: Date): number {

    let mastery = this.secondBarSkillMastery(date);

    if (this.skills.length === 0) {
      return 0;
    }

    mastery = mastery / this.skills.length * 100;

    return mastery;

  }

}
