import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent implements OnInit {
  model: NgbDateStruct;
  @Input() value: any = '';
  @Output() inputChangedEvent = new EventEmitter<Date>();
  @Input() isDisabled = false;
  constructor() { }

  ngOnInit() {
    let date = new Date(this.value);

    this.model = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    }
  }
  updateMyDate(formattedDate: Date) {
    this.value = formattedDate;
    this.inputChangedEvent.emit(this.value);
  }
}