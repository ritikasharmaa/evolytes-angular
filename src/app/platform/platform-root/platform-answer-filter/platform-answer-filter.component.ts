import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnswerQueryModel} from '../../../models/answer.model';
import {QuestionModel} from '../../../models/question.model';

@Component({
  selector: 'app-platform-answer-filter',
  templateUrl: './platform-answer-filter.component.html',
  styleUrls: ['./platform-answer-filter.component.css']
})
export class PlatformAnswerFilterComponent implements OnInit {

  @Input() filter = new AnswerQueryModel();
  @Output() valueChanged = new EventEmitter<AnswerQueryModel>();

  dateFilterList = [{
    key: 'NoFilter',
    value: 'answers.filters.noFilter',
    iconURL: null
  }, {
    key: 'DateRange',
    value: 'answers.filters.dateRange',
    iconURL: null
  }, {
    key: 'StartDate',
    value: 'answers.filters.startDate',
    iconURL: null
  }, {
    key: 'EndDate',
    value: 'answers.filters.endDate',
    iconURL: null
  }];
  currentDateFilter = this.dateFilterList[0].key;

  categoryFilterList = QuestionModel.categoryDropdownList();
  currentCategory = this.categoryFilterList[0].key;

  isCorrectFilterList = [{
    key: 'None',
    value: 'answerCorrect.none',
    iconURL: null
  }, {
    key: 'Correct',
    value: 'answerCorrect.correct',
    iconURL: null
  }, {
    key: 'False',
    value: 'answerCorrect.wrong',
    iconURL: null
  }];
  currentIsCorrect = this.isCorrectFilterList[0].key;

  answerTypeFilterList = QuestionModel.answerTypeDropdownList();
  currentAnswerType = this.answerTypeFilterList[0].key;

  currentStartDate: Date = null;
  currentEndDate: Date = null;

  constructor() { }

  ngOnInit() {
  }

  onFilterClicked() {

    this.valueChanged.emit(this.filter);

  }

  updateDateFilter(key: string) {

    /* We have to check what kind of date range
    * we had selected beforehand to make sur we reset the
    * dates appropriately or the filter will not work
    */
    if (this.currentDateFilter === 'DateRange') {

      if (key === 'StartDate') {
        this.currentEndDate = null;
      } else if (key === 'EndDate') {
        this.currentStartDate = null;
      }

    } else if (this.currentDateFilter === 'StartDate') {

      if (key === 'NoFilter') {
        this.currentStartDate = null;
      }

    } else if (this.currentDateFilter === 'EndDate') {

      if (key === 'NoFilter') {
        this.currentEndDate = null;
      }

    }

    this.currentDateFilter = key;

  }

  updateCurrentCategory(key: string) {
    this.currentCategory = key;
  }

  updateIsCorrect(key: string) {
    this.currentIsCorrect = key;
  }

  updateAnswerType(key: string) {
    this.currentAnswerType = key;
  }

  updateStartDate(date: Date) {
    this.currentStartDate = date;
  }

  updateEndDate(date: Date) {
    this.currentEndDate = date;
  }

  updateFilter() {

    const filter = new AnswerQueryModel();

    if (this.currentIsCorrect === 'Correct') {
      filter.isCorrect = true;
    } else if (this.currentIsCorrect === 'False') {
      filter.isCorrect = false;
    } else {
      filter.isCorrect = null;
    }

    if (this.currentCategory === 'none') {
      filter.category = null;
    } else {
      filter.category = this.currentCategory;
    }

    if (this.currentAnswerType === 'none') {
      filter.answerType = null;
    } else {
      filter.answerType = this.currentAnswerType;
    }

    filter.fromDate = this.currentStartDate;
    filter.toDate = this.currentEndDate;

    filter.skip = 0;

    this.filter = filter;

  }

  clearFilter() {

    this.currentDateFilter = 'NoFilter';
    this.currentIsCorrect = 'None';
    this.currentCategory = 'none';
    this.currentAnswerType = 'none';

    this.currentStartDate = null;
    this.currentEndDate = null;

    this.updateFilter();
    this.valueChanged.emit(this.filter);

  }

  showStartDate(): boolean {

    if (this.currentDateFilter === this.dateFilterList[2].key ||
      this.currentDateFilter === this.dateFilterList[1].key) {

      return true;
    }

    return false;
  }

  showEndDate(): boolean {

    if (this.currentDateFilter === this.dateFilterList[3].key ||
      this.currentDateFilter === this.dateFilterList[1].key) {

      return true;
    }

    return false;
  }

}
