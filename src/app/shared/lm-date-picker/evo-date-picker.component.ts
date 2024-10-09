import {Component, OnInit} from '@angular/core';
import {EvoDatePickerService} from './evo-date-picker.service';
import {DateTime} from 'luxon';
import {DropdownModel} from '../../models/component/dropdown.model';

@Component({
  selector: 'app-evo-date-picker',
  templateUrl: './evo-date-picker.component.html',
  styleUrls: ['./evo-date-picker.component.css']
})
export class EvoDatePickerComponent implements OnInit {

  monthsDropdown = [
    new DropdownModel('1', 'reusable.monthNames.1', null),
    new DropdownModel('2', 'reusable.monthNames.2', null),
    new DropdownModel('3', 'reusable.monthNames.3', null),
    new DropdownModel('4', 'reusable.monthNames.4', null),
    new DropdownModel('5', 'reusable.monthNames.5', null),
    new DropdownModel('6', 'reusable.monthNames.6', null),
    new DropdownModel('7', 'reusable.monthNames.7', null),
    new DropdownModel('8', 'reusable.monthNames.8', null),
    new DropdownModel('9', 'reusable.monthNames.9', null),
    new DropdownModel('10', 'reusable.monthNames.10', null),
    new DropdownModel('11', 'reusable.monthNames.11', null),
    new DropdownModel('12', 'reusable.monthNames.12', null)
  ];

  yearSelection = false;
  currentYear: number;

  constructor(public dateSv: EvoDatePickerService) { }

  ngOnInit() {
    this.currentYear = DateTime.fromJSDate(new Date()).year;
  }

  /**
   * Returns 0 if it is the current day
   */
  isCurrentDay(row: number, day: number): boolean {

    // Calculates the day based on the row and index
    const numDays = day + row * 7;

    // Calculates where we are compared to the first day of the month
    // we sometimes show some days before it
    const distanceFromFirstOfMonth = numDays - this.dateSv.startDayOfMonth + 1;

    if (this.dateSv.selectedDate) {

      if (distanceFromFirstOfMonth === this.dateSv.selectedDate.day &&
        this.dateSv.date.month === this.dateSv.selectedDate.month &&
        this.dateSv.date.year === this.dateSv.selectedDate.year) {

        return true;
      }
    }

    return false;

  }

  isPreviousMonth(row: number, day: number): boolean {

    // Calculates the day based on the row and index
    const numDays = day + row * 7;

    // Calculates where we are compared to the first day of the month
    // we sometimes show some days before it
    const distanceFromFirstOfMonth = numDays - this.dateSv.startDayOfMonth;

    if (distanceFromFirstOfMonth < 0) {
      return true;
    }

    return false;
  }

  isCurrentMonth(row: number, day: number): boolean {

    // Calculates the day based on the row and index
    const numDays = day + row * 7;

    // Calculates where we are compared to the first day of the month
    // we sometimes show some days before it
    const distanceFromFirstOfMonth = numDays - this.dateSv.startDayOfMonth;

    if (distanceFromFirstOfMonth >= 0 && distanceFromFirstOfMonth < this.dateSv.currentMonthNumDays) {
      return true;
    }

    return false;

  }

  isNextMonth(row: number, day: number): boolean {
    // Calculates the day based on the row and index
    const numDays = day + row * 7;

    // Calculates where we are compared to the first day of the month
    // we sometimes show some days before it
    const distanceFromFirstOfMonth = numDays - this.dateSv.startDayOfMonth;

    if (distanceFromFirstOfMonth >= this.dateSv.currentMonthNumDays) {
      return true;
    }

    return false;
  }

  getDayOfMonth(row: number, day: number) {

    // Calculates the day based on the row and index
    const numDays = day + row * 7;

    // Calculates where we are compared to the first day of the month
    // we sometimes show some days before it
    const distanceFromFirstOfMonth = numDays - this.dateSv.startDayOfMonth;
    if (distanceFromFirstOfMonth < 0) {
      const dayInPreviousMonth = this.dateSv.previousMonthNumDays + distanceFromFirstOfMonth + 1;
      return dayInPreviousMonth.toString();
    } else if (distanceFromFirstOfMonth >= 0 && distanceFromFirstOfMonth < this.dateSv.currentMonthNumDays) {
      return distanceFromFirstOfMonth + 1;
    } else {
      return distanceFromFirstOfMonth - this.dateSv.currentMonthNumDays + 1;
    }

  }

  onMonthChanged(value: string) {

    this.dateSv.changeMonth(parseInt(value, 10));

  }

  onClick(row: number, day: number) {

    // Calculates the day based on the row and index
    const numDays = day + row * 7;

    // Calculates where we are compared to the first day of the month
    // we sometimes show some days before it
    const distanceFromFirstOfMonth = numDays - this.dateSv.startDayOfMonth;

    if (distanceFromFirstOfMonth < 0) {
      const dayInPreviousMonth = this.dateSv.previousMonthNumDays + distanceFromFirstOfMonth + 1;
      dayInPreviousMonth.toString();

      const selectedDate = this.dateSv.date.minus({ month: 1 }).set({ day: dayInPreviousMonth });
      const jsDate = selectedDate.toJSDate();

      this.dateSv.onDateSelected(jsDate);

    } else if (distanceFromFirstOfMonth >= 0 && distanceFromFirstOfMonth < this.dateSv.currentMonthNumDays) {

      const dayInCurrentMonth = distanceFromFirstOfMonth + 1;

      const selectedDate = this.dateSv.date.set({ day: dayInCurrentMonth });
      const jsDate = selectedDate.toJSDate();

      this.dateSv.onDateSelected(jsDate);

    } else {

      const dayInNextMonth = distanceFromFirstOfMonth - this.dateSv.currentMonthNumDays + 1;

      const selectedDate = this.dateSv.date.set({ day: dayInNextMonth });
      const jsDate = selectedDate.toJSDate();

      this.dateSv.onDateSelected(jsDate);

    }

  }

  onYearTitleClicked() {
    this.yearSelection = true;
  }

  getYear(row: number, numElementsPerRow: number, offset: number): string {

    return (this.dateSv.yearWithOffset - (row * numElementsPerRow + offset)).toString(10);

  }

  getYearRows(numElementsPerRow: number) {

    const rows = [];

    for (let i = 0; i < Math.ceil((this.dateSv.numYearValues) / numElementsPerRow); i++) {
      rows.push(i);
    }

    return rows;

  }

  onYearSelected(row: number, numElementsPerRow: number, offset: number) {
    this.yearSelection = false;
    const newYear = this.dateSv.yearWithOffset - (row * numElementsPerRow + offset);
    this.dateSv.date = this.dateSv.date.set({ year: newYear });
    this.currentYear = newYear;
  }

  onBackgroundClicked(event: Event) {

    this.dateSv.onClose();

  }

}
