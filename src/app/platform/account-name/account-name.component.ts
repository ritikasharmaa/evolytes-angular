import {Component, Input, OnInit} from '@angular/core';
import {StudentModel} from '../../models/authentication/student.model';

@Component({
  selector: 'app-account-name',
  templateUrl: './account-name.component.html',
  styleUrls: ['./account-name.component.css']
})
export class AccountNameComponent implements OnInit {

  @Input() student: StudentModel = new StudentModel();

  constructor() { }

  ngOnInit() {
  }

}
