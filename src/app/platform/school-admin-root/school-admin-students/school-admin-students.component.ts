import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudentModel, StudentQueryModel} from '../../../models/authentication/student.model';
import {SchoolStudentAdministrationService} from '../../../services/school/school-student-administration.service';
import {SchoolModel} from '../../../models/school/school.model';
import {ModalService} from '../../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {ErrorModel} from '../../../models/shared/error.model';

@Component({
  selector: 'app-school-school-students',
  templateUrl: './school-admin-students.component.html',
  styleUrls: ['./school-admin-students.component.css']
})
export class SchoolAdminStudentsComponent implements OnInit {

  showCreateStudent = false;
  students: StudentModel[] = [];

  showStudentFilter = false;
  hasMoreStudents = true;
  filter = new StudentQueryModel();

  student = new StudentModel();


  constructor(private router: Router,
              private modalSv: ModalService,
              private tSv: TranslateService,
              private studentSv: SchoolStudentAdministrationService) { }

  ngOnInit() {
    this.filter.limit = 20;
    this.refreshStudents();
    if (SchoolModel.getCurrent()) {
      this.student.culture = SchoolModel.getCurrent().culture;
    }
  }

  refreshStudents() {

    this.studentSv.fetchStudents(this.filter).subscribe((students) => {

      if (students.length === this.filter.limit) {
        this.hasMoreStudents = true;
      } else {
        this.hasMoreStudents = false;
      }
      this.students = students;

    });

  }

  searchFilteredStudents(searchString: string) {

    if (searchString !== null && searchString.length > 0) {
      this.filter.name = searchString;
    } else {
      this.filter.name = undefined;
    }

    this.filter.skip = 0;
    this.studentSv.fetchStudents(this.filter).subscribe((students) => {
      if (students.length === this.filter.limit) {
        this.hasMoreStudents = true;
      } else {
        this.hasMoreStudents = false;
      }
      this.students = students;

    });

  }

  onImportClicked() {
    this.router.navigate(['schooladmin', 'importStudents']);
  }

  onStudentClicked(student: StudentModel) {
    this.router.navigate(['schooladmin', 'students', student._id]);
  }

  closeCreateStudentClicked() {
    this.showCreateStudent = false;
  }

  createStudentClicked() {
    this.showCreateStudent = false;
    this.studentSv.createStudent(this.student).subscribe((newStudent) => {
      this.refreshStudents();
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'), this.tSv.instant('reusable.success'));
    }, (err: ErrorModel) => {
      this.modalSv.showTranslatedErrorModal(ErrorModel.GetError(err.name, this.tSv));
    });
  }

  onBirthYearChanged(value: number) {

    if (value) {
      this.filter.fromAge = value;
      this.filter.toAge = value;
    } else {
      this.filter.fromAge = undefined;
      this.filter.toAge = undefined;
    }

  }

  onFilterPressed() {
    this.showStudentFilter = !this.showStudentFilter;
  }

  onCancelFilter() {

    this.showStudentFilter = false;

  }

  onApplyFilter() {
    this.showStudentFilter = false;
    this.studentSv.fetchStudents(this.filter).subscribe((students) => {

      if (students.length === this.filter.limit) {
        this.hasMoreStudents = true;
      } else {
        this.hasMoreStudents = false;
      }
      this.students = students;

    });
  }

  onClearAllFiltersPressed() {
    this.showStudentFilter = false;
    this.filter.isActive = undefined;
    this.filter.toAge = undefined;
    this.filter.fromAge = undefined;
    this.studentSv.fetchStudents(this.filter).subscribe((students) => {

      if (students.length === this.filter.limit) {
        this.hasMoreStudents = true;
      } else {
        this.hasMoreStudents = false;
      }
      this.students = students;

    });
  }

  fetchMoreStudents() {
    this.filter.skip = this.students.length;
    this.studentSv.fetchStudents(this.filter).subscribe((students) => {

      if (students.length === this.filter.limit) {
        this.hasMoreStudents = true;
      } else {
        this.hasMoreStudents = false;
      }
      this.students = this.students.concat(students);

    });
  }

}
