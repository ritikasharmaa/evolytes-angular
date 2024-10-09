import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-evo-checkmark',
  templateUrl: './evo-checkmark.component.html',
  styleUrls: ['./evo-checkmark.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoCheckmarkComponent),
    multi: true
  }]
})

export class EvoCheckmarkComponent implements OnInit, ControlValueAccessor {

  @Input() isChecked = false;
  @Output() valueChanged = new EventEmitter<boolean>();

  /**
   * @description Available option are blue and green for the checkmark.
   */
  @Input() type = 'blue';

  @Input() checkmarkHeight = '80%';
  @Input() checkmarkWidth = '80%';
  @Input() borderRadius = '2px';

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  checkmarkImage() {

    if (this.type === 'green') {

      return '../../../assets/icons/checkmark-green.png';
    }

    return '../../../assets/icons/checkmark-blue.png';
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
