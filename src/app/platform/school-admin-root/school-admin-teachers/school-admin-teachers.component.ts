import {Component, OnInit} from '@angular/core';
import {SchoolTeacherAdministrationService} from '../../../services/school/school-teacher-administration.service';
import {UserFilter, UserModel} from '../../../models/authentication/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-school-school-teachers',
  templateUrl: './school-admin-teachers.component.html',
  styleUrls: ['./school-admin-teachers.component.css']
})
export class SchoolAdminTeachersComponent implements OnInit {

  public teacherFilter = new UserFilter();
  public hasMoreData = true;
  public teachers: UserModel[] = [];


  public teachersToInvite: UserModel[] = [];
  public AccessTypes = UserModel.SchoolAccessTypesDropdown;

  constructor(private teacherSv: SchoolTeacherAdministrationService,
              private router: Router) {
  }

  ngOnInit() {
    this.teacherFilter.limit = 20;
    this.teacherSv.fetchTeachers(this.teacherFilter).subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  searchFilteredTeachers(searchString: string) {

    this.teacherFilter.skip = 0;
    this.teacherFilter.name = searchString;
    this.teacherFilter.email = searchString;
    this.hasMoreData = true;
    this.teacherSv.fetchTeachers(this.teacherFilter).subscribe((filteredTeachers) => {

      if (filteredTeachers.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.teachers = filteredTeachers;

    });
  }

  onFetchMoreTeachers() {

    this.teacherFilter.skip = this.teachers.length;
    this.teacherSv.fetchTeachers(this.teacherFilter).subscribe((teachers) => {
      if (teachers.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.teachers = this.teachers.concat(teachers);
    });
  }

  onInvitationsClicked() {
    this.router.navigate(['schooladmin', 'invitations']);
  }

  onTeacherClicked(teacher: UserModel) {

    this.router.navigate(['schooladmin', 'teachers', teacher._id]);

  }
}
