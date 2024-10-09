import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-evo-multiple-switch',
  templateUrl: './evo-multiple-switch.component.html',
  styleUrls: ['./evo-multiple-switch.component.css']
})
export class EvoMultipleSwitchComponent implements OnInit {

  @Input() list: { key: string, value: any, iconURL: string }[] = [];

  @Input() showTitle = true;
  @Input() title = '';
  @Input() titleColor = '#54676E';
  /**
   * @description The height of the container around the dropdown element
   * where you can see the currently selected value.
   */
  @Input() containerHeight = '42px';
  @Input() leftIndent = '20px';
  @Input() fontSize = '14px';
  @Input() isDisabled = false;
  @Output() valueChangedEvent = new EventEmitter<string>();

  _currentValue: { key: string, value: string, iconURL: string } = null;

  constructor() { }

  ngOnInit() {
  }

  propagateChange = (_: any) => {};

  @Input('currentValue')
  set currentValue(value: { key: string, value: string, iconURL: string }) {
    this._currentValue = value;
  }

  getCursor(): string {

    if (this.isDisabled) {

      return 'default';
    }

    return 'pointer';
  }

  getCurrentValue(): { key: string | boolean, value: string, iconURL: string } {

    if (this._currentValue) {
      return this._currentValue;
    }

    return null;
  }

  getTitleColor(): string {

    if (this.titleColor) {
      return this.titleColor;
    }

    return '#000000';
  }

  onButtonClicked(value: { key: string, value: string, iconURL: string }) {

    this._currentValue = value;

    if (this.valueChangedEvent) {
      this.valueChangedEvent.emit(this._currentValue.key);
      this.propagateChange(this._currentValue.key);
    }

  }

}
