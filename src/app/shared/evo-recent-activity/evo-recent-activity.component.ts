import { Component, Input, OnInit } from '@angular/core';
import { SessionsService } from '../../services/sessions.service';
import { AnswerService } from '../../services/answer.service';
import { StringExtensionModel } from '../../models/extensions/string-extension.model';
import { AnswerModel } from '../../models/answer.model';
import { SkillService } from '../../services/skill.service';
import { SkillModel } from '../../models/skill.model';
import { TranslateService } from '@ngx-translate/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-evo-recent-activity',
  templateUrl: './evo-recent-activity.component.html',
  styleUrls: ['./evo-recent-activity.component.css']
})
export class EvoRecentActivityComponent implements OnInit {

  @Input('startDate')
  set startDate(date: Date) {
    this._startDate = date;
  }

  get startDate(): Date {
    return this._startDate;
  }

  @Input('endDate')
  set endDate(date: Date) {
    this._endDate = date;
  }

  get endDate(): Date {
    return this._endDate;
  }

  @Input() title: string;


  _startDate: Date;
  _endDate: Date;

  answers: AnswerModel[] = [];
  skills: SkillModel[] = [];

  weekDuration = 0;
  totalDuration = 0;

  weekNumAnswers = 0;
  totalNumAnswers = 0;

  constructor(private sessionSv: SessionsService,
    private answerSv: AnswerService,
    private tSv: TranslateService,
    private skillSv: SkillService) { }

  ngOnInit() {

    this.sessionSv.fetchSessionDuration(null, null).subscribe((totalDuration) => {
      this.totalDuration = totalDuration;
    });

    this.answerSv.fetchNumAnswers(null, null).subscribe((totalNumAnswers) => {
      this.totalNumAnswers = totalNumAnswers;
    });

    let currentDate = DateTime.local();
    currentDate = currentDate.minus({ days: 7 });
    currentDate = currentDate.startOf('day');
    const weekBackInTime = currentDate.toISODate();
    this.sessionSv.fetchSessionDuration(new Date(weekBackInTime), null).subscribe((duration) => {
      this.weekDuration = duration;
    });

    this.answerSv.fetchNumAnswers(new Date(weekBackInTime), null).subscribe((weekNumAnswers) => {
      this.weekNumAnswers = weekNumAnswers;
    });

    /*
    const query = new SkillQueryModel();
    query.includeHistory = true;
    query.historyOrder = -1;

    this.skillSv.fetchSkills(query).subscribe((skills) => {
      this.skills = skills;
    });*/

  }

  sessionRangeDurationString(): string {

    const hours = StringExtensionModel.hours(this.weekDuration);
    const minutes = Math.floor(StringExtensionModel.minutes(this.weekDuration) - hours * 60);

    return hours.toString(10) + this.tSv.instant('dashboard.hourDelimeter') +
      ' ' + minutes.toString(10) + this.tSv.instant('dashboard.minuteDelimeter');
  }

  sessionTotalDurationString(): string {

    const hours = StringExtensionModel.hours(this.totalDuration);
    const minutes = Math.floor(StringExtensionModel.minutes(this.totalDuration) - hours * 60);

    return hours.toString(10) + this.tSv.instant('dashboard.hourDelimeter') +
      ' ' + minutes.toString(10) + this.tSv.instant('dashboard.minuteDelimeter');
  }

  numAnswersTotalString(): string {

    return this.totalNumAnswers.toString(10);
  }

  numAnswersRangeString(): string {

    return this.weekNumAnswers.toString(10);
  }

  skillProgressTotal(): number {

    let total = 0;

    for (const skill of this.skills) {

      total += skill.mastery;

    }

    return total;

  }

  skillProgressTotalString(): string {

    return this.skillProgressTotal().toFixed(2);
  }

  skillProgressRange(): number {

    let total = 0;

    for (const skill of this.skills) {

      const mastery = skill.mastery;

      if (this.startDate) {
        // Sends the point that is < than the date, that is further back in time
        // if none is found it sends back nil
        const point = skill.closestPoint(this.startDate);
        if (point) {
          const diff = mastery - point.mastery;
          total += diff;
        } else {
          // If no point exists then we know that the mastery has not been worked
          // on in the past week
          total += mastery;
        }

      }


    }

    return total;

  }

  skillProgressRangeString(): string {

    return this.skillProgressRange().toFixed(2);
  }

}
