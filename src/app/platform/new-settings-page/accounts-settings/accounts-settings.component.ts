import {Component, OnInit} from '@angular/core';
import {StudentModel} from '../../../models/authentication/student.model';

@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styleUrls: ['./accounts-settings.component.css']
})
export class AccountsSettingsComponent implements OnInit {
  student: StudentModel = StudentModel.getCurrent();

  constructor() {
  }

  ngOnInit() {
  }

}
