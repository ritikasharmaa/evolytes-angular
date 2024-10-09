import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-evo-circle-checkmark',
  templateUrl: './evo-circle-checkmark.component.html',
  styleUrls: ['./evo-circle-checkmark.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoCircleCheckmarkComponent),
    multi: true
  }]
})
export class EvoCircleCheckmarkComponent implements OnInit {

  @Input() text = '';
  /**  Can be OnlyTrue, OnlyFalse, Switch **/
  @Input() type = 'Switch';
  value = false;
  @Input('currentValue')
  set currentValue(value: boolean) {
    this.writeValue(value);
  }

  @Output() valueChanged = new EventEmitter<boolean>();

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  onClicked() {

    if (this.type === 'OnlyTrue') {
      this.value = true;
    } else if (this.type === 'OnlyFalse') {
      this.value = false;
    } else {
      this.value = !this.value;
    }

    this.propagateChange(this.value);
    if (this.valueChanged) {
      this.valueChanged.emit(this.value);
    }
  }

  // Control Value Accessor

  writeValue(obj: any): void {

    if (obj !== null && obj !== undefined) {
      if (typeof obj === 'boolean') {
        this.value = obj;
      }
    } else {
      this.value = false;
    }

    this.propagateChange(this.value);

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

}
