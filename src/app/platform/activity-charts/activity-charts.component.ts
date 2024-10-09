import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionsService} from '../../services/sessions.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {TranslateService} from '@ngx-translate/core';
import {SessionActivityModel} from '../../models/session.model';
import {forkJoin} from 'rxjs';
import {BaseChartDirective, Label} from 'ng2-charts';
import {StudentModel} from '../../models/authentication/student.model';

@Component({
  selector: 'app-activity-charts',
  templateUrl: './activity-charts.component.html',
  styleUrls: ['./activity-charts.component.css']
})
export class ActivityChartsComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  today: Date = new Date();
  firstDay: Date = new Date();
  lastDay: Date = new Date();
  nbDaysToShow: number = null;
  sessions: SessionActivityModel[] = [];

  optionsTime = [{
    key: 'thisW',
    value: this.tsv.instant('dashboard.chart.thisWeek'),
    iconURL: null
  }, {
    key: 'lastW',
    value: this.tsv.instant('dashboard.chart.lastWeek'),
    iconURL: null
  }, {
    key: 'lastM',
    value: this.tsv.instant('dashboard.chart.lastMonth'),
    iconURL: null
  }, {
    key: 'thisM',
    value: this.tsv.instant('dashboard.chart.thisMonth'),
    iconURL: null
  }];

  optionsActivity = [{key: 'time', value: this.tsv.instant('dashboard.chart.timeSpent'), iconURL: null}];
  optionTimeSelected: { key: string, value: any, iconURL: null };
  optionActivitySelected: { key: string, value: any, iconURL: null };
  maxScale: number;

  constructor(private sessionSv: SessionsService, private tsv: TranslateService) {
  }

  datasets: ChartDataSets[] = [{
    label: this.tsv.instant('dashboard.chart.school'),
    data: [],
    backgroundColor: '#b3e0ee',
    borderColor: '#7bcae2',
    hoverBackgroundColor: '#7bcae2',
    hoverBorderColor: '#b3e0ee',
    borderWidth: 1
  }, {
    label: this.tsv.instant('dashboard.chart.home'),
    data: [],
    backgroundColor: '#daeed8',
    borderColor: '#b8dfb4',
    hoverBackgroundColor: '#b8dfb4',
    hoverBorderColor: '#daeed8',
    borderWidth: 1
  }];
  barChartType: ChartType = 'bar';
  barChartLabels: Label[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        boxWidth: 25,
        fontFamily: '"Montserrat", sans-serif',
        fontStyle: '600',
        fontColor: '#80949A',
        fontSize: 10
      }
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          color: '#D8D7D7',
          zeroLineWidth: 2
        },
        ticks: {fontSize: 10, fontFamily: '"Montserrat", sans-serif', fontStyle: '600', fontColor: '#80949A'}
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          color: '#D8D7D7',
          zeroLineColor: '#D8D7D7',
          zeroLineWidth: 2
        },
        ticks: {
          stepSize: this.maxScale / 5,
          max: 40,
          beginAtZero: true,
          fontFamily: '"Montserrat", sans-serif',
          fontStyle: '600',
          fontColor: '#80949A',
          fontSize: 10,
          padding: 4
        }
      }]
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return tooltipItems.yLabel + ' min';
        }
      }
    }
  };

  ngOnInit() {
    this.setupButtons();
    this.setupSessions();
  }

  setupDates() {

    this.firstDay = new Date();
    this.lastDay = new Date();
    // By default, we show the equivalent of one week of data
    // The week days start at 0 so the value should be <= 6
    this.nbDaysToShow = 7;

    if (this.optionTimeSelected.key === 'thisW') {

      // We want to start at the beginning of the week, so we subtract the days of the week which
      // start at 0 so we have to add one to make it start ona monday
      this.firstDay.setDate(this.today.getDate() - this.today.getDay() + 1);
      // Do the same thing but find the end of that same week
      this.lastDay.setDate((this.today.getDate() + 7) - this.today.getDay() + 1);

    } else if (this.optionTimeSelected.key === 'lastW') {

      // Same logic as before but 7 days behind as it is the week before.
      this.firstDay.setDate((this.today.getDate() - 7) - this.today.getDay() + 1);
      this.lastDay.setDate(this.today.getDate() - this.today.getDay() + 1);

    } else if (this.optionTimeSelected.key === 'lastM') {

      // first day of the last month
      this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1);
      // We go to the next month and set the date component to 0 to find the last day of the month before
      // to know how many days are in that month.
      this.nbDaysToShow = (new Date(this.lastDay.getFullYear(), this.today.getMonth(), 0)).getDate();
      // Set the last day
      this.lastDay = new Date(this.firstDay.getFullYear(), this.today.getMonth() - 1, this.nbDaysToShow);

    } else if (this.optionTimeSelected.key === 'thisM') {

      // Get the first day of the current month
      this.firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
      // Gets the number of days in the month by setting the date component to 0 for the next month
      this.nbDaysToShow = (new Date(this.lastDay.getFullYear(), this.today.getMonth() + 1, 0)).getDate();
      // Set the last day to the end of the current month
      this.lastDay = new Date(this.firstDay.getFullYear(), this.today.getMonth(), this.nbDaysToShow);

    }

    // Set the hour, minute and second components.
    this.firstDay.setHours(0, 0, 0);
    this.lastDay.setHours(23, 59, 59);

  }

  setupSessions() {
    this.setupDates();
    this.reInit();
    const fetchS = this.sessionSv.fetchSessionInformation(SessionActivityModel.SessionIntervals.Day, this.firstDay, this.lastDay, 1);
    forkJoin([fetchS]).subscribe((data) => {
      this.sessions = data[0];
      this.setupBarData();
    });
  }

  setupBarData() {
    // dynamic scale
    this.initScale();

    this.barChartOptions.scales.yAxes[0].ticks.max = this.maxScale;
    this.barChartOptions.scales.yAxes[0].ticks.stepSize = this.maxScale / 5;

    const currentDate = new Date();
    for (let i = 0; i < this.nbDaysToShow; i++) {

      currentDate.setDate(this.firstDay.getDate() + i);

      const sessionToAdd = this.sessions.find((session) => {
        return session._id.year === currentDate.getFullYear() &&
          session._id.month === currentDate.getMonth() + 1 &&
          session._id.dayOfMonth === currentDate.getDate();
      });

      if (sessionToAdd === undefined) {
        (this.datasets[1].data as number[]).push(0);
        (this.datasets[0].data as number[]).push(0);
      } else {
        if ((sessionToAdd.date.getDay() === 6 ||
          sessionToAdd.date.getDay() === 0) &&
          StudentModel.getCurrent().schoolId !== undefined) {
          (this.datasets[1].data as number[]).push(Number((sessionToAdd.sum / 60.0).toFixed(2)));
          (this.datasets[0].data as number[]).push(0);
        } else {
          (this.datasets[0].data as number[]).push(Number((sessionToAdd.sum / 60.0).toFixed(2)));
          (this.datasets[1].data as number[]).push(0);
        }
      }

      if (this.optionTimeSelected.key === 'lastM' || this.optionTimeSelected.key === 'thisM') {
        this.barChartLabels.push(String(currentDate.getDate()));
      }

    }

    if (StudentModel.getCurrent().schoolId !== undefined) {
      this.datasets[0].label = this.tsv.instant('dashboard.chart.school');
      this.datasets[1].label = this.tsv.instant('dashboard.chart.home');
    } else {
      this.datasets[1].label = this.tsv.instant('dashboard.chart.school');
      this.datasets[0].label = this.tsv.instant('dashboard.chart.home');
    }

    if (this.optionTimeSelected.key === 'thisW' || this.optionTimeSelected.key === 'lastW') {
      this.barChartLabels = [
        this.tsv.instant('reusable.dayNames.1'),
        this.tsv.instant('reusable.dayNames.2'),
        this.tsv.instant('reusable.dayNames.3'),
        this.tsv.instant('reusable.dayNames.4'),
        this.tsv.instant('reusable.dayNames.5'),
        this.tsv.instant('reusable.dayNames.6'),
        this.tsv.instant('reusable.dayNames.7')
      ];
    }

    this.chart.chart.options = this.barChartOptions;
    this.chart.update();
  }

  changeOptionTime(optionCode: string) {
    if (this.optionTimeSelected.key !== optionCode) {
      this.optionTimeSelected = this.optionsTime.find((option) => {
        return option.key === optionCode;
      });
      this.setupSessions();
    }
  }

  setupButtons() {
    this.optionTimeSelected = this.optionsTime[0];
    this.optionActivitySelected = this.optionsActivity[0];
  }

  reInit() {
    this.datasets[0].data = [];
    this.datasets[1].data = [];
    this.barChartLabels = [];
    this.sessions = [];
  }

  initScale() {
    this.maxScale = 40;
    this.sessions.forEach(session => {
      if ((session.sum / 60.0) > this.maxScale) {
        this.maxScale = Math.ceil(((session.sum / 60) / 10)) * 10;
      }
    });
  }
}
