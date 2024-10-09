import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-evo-input',
  templateUrl: './evo-input.component.html',
  styleUrls: ['./evo-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoInputComponent),
    multi: true
  }]
})
export class EvoInputComponent implements OnInit, ControlValueAccessor {

  @Input() value: any;
  @Input() showTitle = true;
  @Input() title = '';
  @Input() titleColor = '#54676E';
  @Input() containerHeight = '42px';
  @Input() fontSize = '14px';
  @Input() placeholderText = '';
  @Input() inputType = 'text';
  @Input() isDisabled = false;
  @Output() inputChangedEvent = new EventEmitter<any>();
  @Input() autoCapitalize: string = undefined;
  @Input() autoComplete: string = undefined;

  @Input() needAll: Boolean = true;

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  inputChanged(event: KeyboardEvent) {

    this.value = (<HTMLInputElement>event.target).value;

    if (this.inputType === 'number' && this.value !== null) {
      if (this.value === '') {
        this.value = null;
      } else {
        this.value = parseInt(this.value, 10);
      }

    }

    this.propagateChange(this.value);
    this.inputChangedEvent.emit(this.value);

  }

  /**
   * Getters
   */

  getValue(): string {

    if (this.value !== null && this.value !== undefined) {

      return this.value;
    }

    return '';
  }

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

  getPlaceholderText(): string {

    if (this.placeholderText) {
      return this.placeholderText;
    }

    return '';
  }

  /**
   * Value Accessors
   */

  writeValue(obj: any): void {
    if (obj !== null && obj !== undefined) {
      this.value = obj;
      this.propagateChange(this.value);
    } else {
      this.value = null;
      this.propagateChange(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

}
