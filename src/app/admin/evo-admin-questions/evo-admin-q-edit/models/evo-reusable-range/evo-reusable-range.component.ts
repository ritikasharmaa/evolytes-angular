import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {RangeModel} from '../../../../../models/range.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-evo-reusable-range',
  templateUrl: './evo-reusable-range.component.html',
  styleUrls: ['./evo-reusable-range.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoReusableRangeComponent),
    multi: true
  }]
})
export class EvoReusableRangeComponent implements OnInit, ControlValueAccessor {

  RangeModel = RangeModel;

  @Input() title = '';
  @Input() range = new RangeModel();

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {

  }

  writeValue(obj: any): void {

    if (obj !== null &&
      obj !== undefined &&
      obj instanceof RangeModel) {
      this.range = obj;
      this.propagateChange(this.range);
    } else {
      this.propagateChange(this.range);
    }

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

}
