import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {DateTime} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class EvoDatePickerService {

  subscriber: Subscriber<Date>;
  isVisible = false;

  date: DateTime;
  selectedDate: DateTime;
  yearWithOffset: number;
  year: number;
  month: number;
  day: number;

  // Thee wekday for the first day of the month
  startDayOfMonth = 0;
  // The number of days for the current month
  currentMonthNumDays = 0;
  numRows = 6;

  previousMonthDate: DateTime;
  previousMonthNumDays = 0;

  futureYears = 0;
  numYearValues = 120;

  constructor() {

  }

  showDatePicker(date: Date = null, selectedDate: Date = null, futureYears: number = 0): Observable<Date> {

    this.setupDateInformation(date, selectedDate, futureYears);

    const observer = new Observable((sub: Subscriber<Date>) => {
      this.subscriber = sub;
    });

    return observer;

  }

  /**
   * Shows a date picker to select a date
   *
   * @param date The reference date to know which month/year to start in. Null by default and uses the current date.
   * @param selectedDate If we want to have a selection populated for the date to show in the picker.
   */
  setupDateInformation(date: Date = null, selectedDate: Date = null, futureYears: number = 0) {

    if (!date) {
      date = new Date();
    }

    this.isVisible = true;
    this.date = DateTime.fromJSDate(date);
    this.selectedDate = DateTime.fromJSDate(selectedDate);
    this.year = date.getFullYear();
    // make index begin on 1 not 0
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.yearWithOffset = this.year + futureYears;
    this.futureYears = futureYears;
    this.numYearValues = 120 + this.futureYears;

    const firstDayOfMonth = new Date(this.date.year, this.date.month - 1, 1);
    this.startDayOfMonth = DateTime.fromJSDate(firstDayOfMonth).weekday;

    this.currentMonthNumDays = this.date.daysInMonth;

    this.previousMonthDate = this.date.minus({ month: 1 });
    this.previousMonthNumDays = this.previousMonthDate.daysInMonth;

  }

  onDateSelected(date: Date) {

    this.isVisible = false;
    if (this.subscriber) {
      this.subscriber.next(date);
    }

  }

  onClose() {
    this.isVisible = false;
  }

  changeMonth(month: number) {

    this.date = this.date.set({ month: month });
    this.setupDateInformation(this.date.toJSDate(), this.selectedDate.toJSDate(), this.futureYears);

  }

  getRows() {
    return [0, 1, 2, 3, 4, 5];
  }

  getWeekdays() {
    return [1, 2, 3, 4, 5, 6, 7];
  }

}
