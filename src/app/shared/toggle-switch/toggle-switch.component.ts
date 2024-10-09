import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
  }]
})
export class ToggleSwitchComponent implements OnInit, ControlValueAccessor {
  @Input() isChecked = false;
  @Output() valueChanged = new EventEmitter<boolean>();
  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }
  onClick() {

    this.isChecked = !this.isChecked;
    this.propagateChange(this.isChecked);
    if (this.valueChanged) {
      this.valueChanged.emit(this.isChecked);
    }

  }

  /**
   * Value Accessors
   */

  writeValue(obj: any): void {

    if (typeof obj === 'boolean') {
      this.isChecked = obj;
    }

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

}
