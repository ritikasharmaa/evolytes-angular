import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../../services/answer.service';
import {AnswerModel, AnswerQueryModel, AnswersGroupedModel} from '../../models/answer.model';
import {DateExtensionModel} from '../../models/extensions/date-extension.model';
import {first} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css']
})
export class AnswersListComponent implements OnInit {

  static GroupByTypes = {
    day: 'day',
  };

  @Input() fxLayout = 'row';
  @Input() fxFlex = '50';
  @Input() fxLayoutLtLg = 'column';
  @Input() fxFlexLtLg = '100';
  @Input() fxLayoutLtMd = 'column';
  @Input() fxFlexLtMd = '100';

  groupedAnswers: AnswersGroupedModel[] = [];

  @Input('filterQuery')
  set filterQuery(query: AnswerQueryModel) {
    this._filterQuery = query;

    if (this._filterQuery.groupBy === null || this._filterQuery.groupBy === undefined) {
      this._filterQuery.groupBy = AnswersListComponent.GroupByTypes.day;
    }
    this.loadData();

  }

  _filterQuery: AnswerQueryModel;

  constructor(private answerSv: AnswerService,
              private tSv: TranslateService) {
  }

  ngOnInit() {

  }

  loadData() {

    this.answerSv.fetchGroupedAnswers(this._filterQuery).subscribe((answers) => {
      this.groupedAnswers = answers;
    });
  }

  loadMore() {

    this._filterQuery.skip += this._filterQuery.limit;

    this.answerSv.fetchGroupedAnswers(this._filterQuery).subscribe((answers) => {

      if (answers.length > 0) {

        const firstAnswerGroup = answers[0];
        if (this.groupedAnswers.length > 0) {

          const group = this.groupedAnswers[this.groupedAnswers.length - 1];

          let isEqual = true;
          for (const key of Object.keys(group._id)) {
            if (group._id[key] !== firstAnswerGroup._id[key]) {
              isEqual = false;
              break;
            }
          }

          if (isEqual) {
            group.answers = group.answers.concat(firstAnswerGroup.answers);
          }

        }

        for (let i = 1; i < answers.length; i++) {
          const newGroup = answers[i];
          this.groupedAnswers.push(newGroup);
        }

      }

    });
  }

  dateString(group: AnswersGroupedModel): string {

    if (group._id.year && group._id.month && group._id.dayOfMonth) {
      return group._id.dayOfMonth.toString(10) + '. ' + this.tSv.instant('months.' + DateExtensionModel.monthName(group._id.month - 1)) + ' ' + group._id.year;
    }

    return '';
  }

  doubleIndexes(group: AnswersGroupedModel): number[] {

    const list = [];

    for (let i = 0; i < group.answers.length; i += 2) {

      list.push(i);

    }

    return list;

  }

  answer(group: AnswersGroupedModel, index: number): AnswerModel {

    if (index < group.answers.length) {

      return group.answers[index];
    }

    return null;
  }

  totalNumAnswers(): number {

    let total = 0;

    for (const group of this.groupedAnswers) {
      total += group.answers.length;
    }

    return total;

  }

  hasMoreData(): Boolean {

    if (this._filterQuery) {
      if (this._filterQuery.limit) {
        if (this.totalNumAnswers() < (this._filterQuery.skip + this._filterQuery.limit)) {
          return false;
        }
      }
    }

    return true;

  }

}
