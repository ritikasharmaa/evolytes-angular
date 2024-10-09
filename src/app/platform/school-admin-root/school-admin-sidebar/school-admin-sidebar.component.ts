import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../models/authentication/user.model';
import {SchoolModel} from '../../../models/school/school.model';
import {SchoolService} from '../../../services/school.service';

@Component({
  selector: 'app-school-admin-sidebar',
  templateUrl: './school-admin-sidebar.component.html',
  styleUrls: ['./school-admin-sidebar.component.css']
})
export class SchoolAdminSidebarComponent implements OnInit {

  constructor(private schoolSv: SchoolService) { }

  ngOnInit() {

    this.schoolSv.fetchSchool().subscribe((school) => {
      SchoolModel.setCurrent(school);
    });

  }

  isPartOfSchool(): boolean {

    // TODO Implemented school check

    return true;
  }

  userFullName(): string {

    if (UserModel.getCurrent()) {

      return UserModel.getCurrent().firstName + ' ' + UserModel.getCurrent().lastName;
    }

    return '';
  }

  userEmail(): string {

    if (UserModel.getCurrent()) {
      return UserModel.getCurrent().email;
    }

    return '';

  }

  schoolName(): string {

    if (SchoolModel.getCurrent()) {
      return SchoolModel.getCurrent().name;
    }

    return null;
  }

}
