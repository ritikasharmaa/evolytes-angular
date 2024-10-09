import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-evo-dropdown',
  templateUrl: './evo-dropdown.component.html',
  styleUrls: ['./evo-dropdown.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoDropdownComponent),
    multi: true
  }]
})
export class EvoDropdownComponent implements OnInit, ControlValueAccessor {

  @Input() showTitle = true;

  /**
   * @description Whether we should show an icon with the dropdown.
   */
  @Input() showIcon = false;
  @Input() iconContainerWidth = '40px;';
  @Input() semibold = false;
  @Input() iconStyle: { [p: string]: string} = { 'width': '20px', 'height': '20px' };

  /**
   * The key represents what we store on the backend
   * While the value is a human readable string
   * For the key en-US we have the value English (United States).
   */
  @Input() list: { key: string, value: any, iconURL: string }[] = [];
  @Input() title = '';
  @Input() titleColor = '#54676E';
  /**
   * @description The height of the container around the dropdown element
   * where you can see the currently selected value.
   */
  @Input() containerHeight = '42px';
  /**
   * @description The height of each row in the dropdown. Same as the
   * container height.
   */
  @Input() rowHeight = '42px';
  @Input() leftIndent = '20px';
  @Input() fontSize = '14px';
  @Input() placeholderText = '';
  @Input() isDisabled = false;
  @Input() dropdownHeight: string = null;
  @Output() valueChangedEvent = new EventEmitter<any>();
  @Input() layoutAlign = 'start center';
  @Input() textColor = 'blackColor';

  _currentValue: { key: string, value: string, iconURL: string } = null;
  isOpen = false;

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  @Input('currentValue')
  set currentValue(value: any) {
    this.writeValue(value);
  }

  getCursor(): string {

    if (this.isDisabled) {

      return 'default';
    }

    return 'pointer';
  }

  getCurrentValue(): string {

    if (this._currentValue) {
      return this._currentValue.value;
    }

    return '';
  }

  getTitleColor(): string {

    if (this.titleColor) {
      return this.titleColor;
    }

    return '#000000';
  }

  getCurrentIconURL() {

    if (this._currentValue) {

      return this._currentValue.iconURL;
    }

    return null;
  }

  getOverflowY(): string {

    if (this.dropdownHeight) {

      return 'scroll';
    }

    return 'auto';
  }

  getDropdownHeight(): string {

    if (this.dropdownHeight) {
      return this.dropdownHeight;
    }

    return 'auto';
  }

  onContainerClicked() {

    if (this.isDisabled) {
      return ;
    }

    this.isOpen = !this.isOpen;

  }

  onRowClicked(value: { key: string, value: string, iconURL: string }) {

    this.isOpen = false;
    this._currentValue = value;

    if (this.valueChangedEvent) {
      this.valueChangedEvent.emit(this._currentValue.key);
      this.propagateChange(this._currentValue.key);
    }

  }

  /**
   * @description Value Accessor Methods
   *
   */
  writeValue(obj: any): void {

    if (obj !== null && obj !== undefined) {

      if (typeof (obj) === 'number') {

        const index = <number>obj;

        if (index < this.list.length) {
          this._currentValue = this.list[index];
          this.propagateChange(this._currentValue.key);
        } else {
          this.propagateChange(null);
        }

      } else if (typeof (obj) === 'string') {

        const key = <string>obj;
        let index = -1;

        let counter = 0;
        for (const el of this.list) {
          if (el.key === key) {
            index = counter;
            break;
          }
          counter += 1;
        }

        if (index !== -1) {
          this._currentValue = this.list[index];
          this.propagateChange(this._currentValue.key);
        } else {
          this.propagateChange(null);
        }

      } else if (typeof (obj) === 'object') {

        let index = -1;

        let counter = 0;
        for (const el of this.list) {

          if (el.key === obj.key) {
            index = counter;
          }

          counter += 1;
        }

        if (index !== -1) {
          this._currentValue = this.list[index];
          this.propagateChange(this._currentValue.key);
        } else {
          this.propagateChange(null);
        }

      }

    } else {
      this._currentValue = null;
    }

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }


}
