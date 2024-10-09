import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-evo-select-mutliple-choice',
  templateUrl: './evo-select-mutliple-choice.component.html',
  styleUrls: ['./evo-select-mutliple-choice.component.css']
})
export class EvoSelectMutlipleChoiceComponent implements OnInit {

  @Input() showTitle = true;

  /**
   * @description Whether we should show an icon with the dropdown.
   */
  @Input() showIcon = false;
  @Input() iconContainerWidth = '40px;';
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
  @Output() valueChangedEvent = new EventEmitter<string[]>();

  _currentValues: { key: string, value: string, iconURL: string }[] = [];
  isOpen = false;

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  @Input('currentValues')
  set currentValues(values: string[]) {
    if (values.length === 0) {
      this._currentValues = [];
    }
  }

  getCursor(): string {

    if (this.isDisabled) {

      return 'default';
    }

    return 'pointer';
  }

  getCurrentValues(): string {
    const tab = [];
    this._currentValues.forEach(cv => {
        tab.push(cv.value);
      }
    );
    const res = tab.join(' / ');
    return res;
  }

  getTitleColor(): string {

    if (this.titleColor) {
      return this.titleColor;
    }

    return '#000000';
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

    if (this._currentValues.includes(value)) {
      this._currentValues = this._currentValues.filter(cv => cv.key !== value.key);
    } else {
      this._currentValues.push(value);
    }

    const res: string[] = [];
    this._currentValues.forEach(cv => res.push(cv.key));

    if (this.valueChangedEvent) {
      this.valueChangedEvent.emit(res);
      this.propagateChange(res);
    }

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

}
