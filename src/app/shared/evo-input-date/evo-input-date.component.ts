import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-evo-input-date',
  templateUrl: './evo-input-date.component.html',
  styleUrls: ['./evo-input-date.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoInputDateComponent),
    multi: true
  }]
})
export class EvoInputDateComponent implements OnInit, ControlValueAccessor {

  @Input() value: string = null;
  dateValue: Date = null;
  @Input() showTitle = true;
  @Input() title = '';
  @Input() titleColor = '#54676E';
  @Input() containerHeight = '40px';
  @Input() fontSize = '14px';
  @Input() placeholderText = null;
  @Input() dateFormat = 'dd/MM/yyyy';
  @Input() inputType = 'text';
  @Input() isDisabled = false;
  @Output() inputChangedEvent = new EventEmitter<Date>();
  @Input('currentValue')
  set currentValue(value: any) {
    this.writeValue(value);
  }

  propagateChange = (_: any) => { };

  constructor() { }

  ngOnInit() {
  }

  inputChanged(event: KeyboardEvent) {

    this.value = (<HTMLInputElement>event.target).value;

    this.updateDate();

  }

  updateDate() {

    if (this.value) {

      // Good Documentation: https://moment.github.io/luxon/docs/manual/parsing.html
      const dt = DateTime.fromFormat(this.value, this.dateFormat, { zone: 'GMT' });
      if (dt.isValid) {
        this.dateValue = dt.toJSDate();
      } else {
        this.dateValue = null;
      }

      this.propagateChange(this.dateValue);
      this.inputChangedEvent.emit(this.dateValue);

    }

  }

  inputBorderStyling(): string {

    if (this.isDisabled) {

      return '0px solid transparent';

    } if (this.value !== null && this.value !== '' && this.dateValue === null) {

      return '1px solid #D0021B';

    } else if (this.value !== null && this.value !== '' && this.dateValue !== null) {

      return '1px solid #28A745';
    }

    return '0px solid transparent';
  }

  /**
   * Getters
   */

  getTitle(): string {

    if (this.title) {
      return this.title;
    }

    return '';
  }

  getContainerHeight(): string {

    if (this.containerHeight) {
      return this.containerHeight;
    }

    return '40px';
  }

  getFontSize(): string {

    if (this.fontSize) {
      return this.fontSize;
    }

    return '16px';
  }

  getTitleColor(): string {

    if (this.titleColor) {
      return this.titleColor;
    }

    return '#ffffff';
  }

  getPlaceholder(): string {

    if (this.placeholderText !== null && this.placeholderText !== undefined) {
      return this.placeholderText;
    }

    return this.dateFormat;
  }

  /**
   * Value Accessors
   */

  writeValue(obj: any): void {

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
}
