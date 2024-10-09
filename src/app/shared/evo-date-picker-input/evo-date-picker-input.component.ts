import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {DateTime} from 'luxon';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EvoDatePickerService} from '../lm-date-picker/evo-date-picker.service';

@Component({
  selector: 'app-evo-date-input',
  templateUrl: './evo-date-picker-input.component.html',
  styleUrls: ['./evo-date-picker-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoDatePickerInputComponent),
    multi: true
  }]
})
export class EvoDatePickerInputComponent implements OnInit, ControlValueAccessor {

  @Input() showTitle = true;
  @Input() showIcon = true;
  @Input() title = '';
  @Input() value = '';
  @Input() delimeter = '/';
  @Input() iconURL: string;
  @Input() dateFormat = 'dd / MM / yyyy';
  @Input() placeholder = 'dd / MM / yyyy';
  @Input() isDisabled = false;
  @Input() fontSize = '12px';
  @Input() showDatePicker = true;
  @Output() valueChangedEvent = new EventEmitter<Date>();
  @Input() showUpcomingYears = 0;
  @Input('currentValue')
  set currentValue(value: any) {
    this.writeValue(value);
  }

  get currentValue(): any {

    return this.dateValue;
  }

  dateValue: Date;
  isFocused = false;

  propagateChange = (_: any) => {};

  constructor(private dateSv: EvoDatePickerService) { }

  ngOnInit() {
  }

  getTitle(): string {

    return this.title;
  }

  getPlaceholder() {

    if (this.placeholder != null) {
      return this.placeholder;
    }

    return null;

  }

  inputChanged(event: KeyboardEvent) {

    const value = (<HTMLInputElement>event.target).value;

    if (value.length < 15) {
      this.value = value;
    }

    this.updateDate();

  }


  updateDate() {

    if (this.value)  {

      if (this.value.length === 2) {
        this.value += ' / ';
      } else if (this.value.length === 7) {
        this.value += ' / ';
      }

      // Good Documentation: https://moment.github.io/luxon/docs/manual/parsing.html
      const dt = DateTime.fromFormat(this.value, this.dateFormat, { zone: 'GMT' });

      if (dt.isValid) {
        this.dateValue = dt.toJSDate();
      } else {
        this.dateValue = null;
      }

    } else {
      this.dateValue = null;
    }

    this.propagateChange(this.dateValue);
    this.valueChangedEvent.emit(this.dateValue);

  }

  isDateValid(): boolean {

    if (this.dateValue !== null && this.dateValue !== undefined) {

      return true;
    }

    return false;
  }

  isLengthValid(): boolean {

    if (this.value && this.value.length === this.dateFormat.length) {

      return true;
    }

    return false;
  }

  getIcon(): string {

    if (this.isDateValid()) {
      return './assets/icons/calendar-icon.png';
    } else if (this.isDateValid() === false && this.isLengthValid()) {
      return './assets/icons/cancel-red.svg';
    }

    return './assets/icons/calendar-icon-gray.png';
  }


  writeValue(obj: any) {

    if (obj !== null && obj !== undefined) {

      if (obj instanceof Date) {

        this.dateValue = obj;
        const dt = DateTime.fromJSDate(this.dateValue);

        if (dt.isValid) {
          this.value = dt.toFormat(this.dateFormat);
        } else {
          this.dateValue = null;
          this.value = null;
        }

        this.propagateChange(this.dateValue);
        this.valueChangedEvent.emit(this.dateValue);

      } else if (typeof obj === 'string') {
        this.value = obj;
        this.updateDate();
      } else {
        this.propagateChange(this.dateValue);
      }

    } else {
      this.propagateChange(this.dateValue);
    }

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  onInputFocus() {

    let futureYears = 0;
    if (this.showUpcomingYears) {
      futureYears = 12;
    }

    this.dateSv.showDatePicker(this.dateValue, this.dateValue, this.showUpcomingYears).subscribe( (date) => {
      this.writeValue(date);
    });
  }

}
