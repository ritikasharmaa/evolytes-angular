import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../../models/authentication/user.model';
import {SchoolTeacherAdministrationService} from '../../../../services/school/school-teacher-administration.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {StudentModel, StudentQueryModel} from '../../../../models/authentication/student.model';
import {forkJoin} from 'rxjs';
import {ModalService} from '../../../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-school-school-teacher-detail',
  templateUrl: './school-admin-teacher-detail.component.html',
  styleUrls: ['./school-admin-teacher-detail.component.css']
})
export class SchoolAdminTeacherDetailComponent implements OnInit {

  schoolAccessTypes = UserModel.SchoolAccessTypesDropdown;
  teacherId: string = null;
  teacher: UserModel = new UserModel();
  students: StudentModel[] = [];
  studentFilter = new StudentQueryModel();
  hasMoreStudentData = true;
  studentsToAdd: string[] = [];

  password = '';

  showAddStudents = false;
  showStudentFilter = false;
  studentNoRelationshipFilter = new StudentQueryModel();
  hasMoreStudentWithNoRelationshipData = true;
  studentsNoRelationshipToTeacher: StudentModel[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tSv: TranslateService,
              private schoolTeacherSv: SchoolTeacherAdministrationService,
              private modalSv: ModalService) { }

  ngOnInit() {
    this.studentNoRelationshipFilter.limit = 20;
    this.studentFilter.limit = 20;
    this.route.params.subscribe((params) => {

      this.teacherId = params.teacherId;

      if (params.teacherId) {
        this.schoolTeacherSv.fetchTeacher(params.teacherId).subscribe((teacher) => {
          this.teacher = teacher;
        });

        this.fetchStudentsForTeacher();

      }

    });
  }

  fetchStudentsForTeacher() {

    this.schoolTeacherSv.fetchStudentsForTeacher(this.teacherId, this.studentFilter).subscribe((students) => {

      if (students.length === this.studentFilter.limit) {
        this.hasMoreStudentData = true;
      } else {
        this.hasMoreStudentData = false;
      }

      this.students = students;

    });

  }

  onUpdateTeacherClicked() {

    this.schoolTeacherSv.updateTeacher(this.teacher).subscribe((updatedTeacher) => {
      this.teacher = updatedTeacher;
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('schoolAdministration.teachers.updateTeacherMessage'))
        .subscribe();
    });

  }

  onShowAddStudents() {
    this.showAddStudents = true;
    this.studentsNoRelationshipToTeacher = [];
    this.studentsToAdd = [];
    this.schoolTeacherSv.fetchStudentsWithNoRelationshipToTeacher(this.teacher._id, this.studentNoRelationshipFilter).subscribe((students) => {

      if (students.length === this.studentNoRelationshipFilter.limit) {
        this.hasMoreStudentWithNoRelationshipData = true;
      } else {
        this.hasMoreStudentWithNoRelationshipData = false;
      }

      this.studentsNoRelationshipToTeacher = students;

    });
  }

  onCloseAddStudents() {
    this.showAddStudents = false;
  }

  onAddStudents() {

    const requests = [];

    for (const studentId of this.studentsToAdd) {

      const addStudent = this.schoolTeacherSv.addStudentToTeacher(this.teacher._id, studentId);
      requests.push(addStudent);

    }

    forkJoin(requests).subscribe((students) => {
      this.showAddStudents = false;
      this.fetchStudentsForTeacher();
    });

  }

  onRemoveStudentClicked(student: StudentModel) {

    this.schoolTeacherSv.removeStudentFromTeacher(this.teacher._id, student._id).subscribe((removedStudent) => {

      // Send message that the student was successfully removed.
      this.fetchStudentsForTeacher();

    });

  }

  onDeleteTeacher() {

    this.modalSv.showChoiceModal(this.tSv.instant('reusable.warning'),
      this.tSv.instant('schoolAdministration.teachers.deleteTeacherModalWarning'))
      .subscribe((response) => {

      if (response === true) {

        this.schoolTeacherSv.deleteTeacher(this.teacherId, this.password).subscribe((success) => {

          this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
            this.tSv.instant('schoolAdministration.teachers.deleteTeacherModalMessage'))
            .subscribe(() => {
              this.router.navigate(['schooladmin', 'teachers']);
            });

        }, (err) => {
          this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), err.message);
        });

      }

    });

  }

  isStudentAdded(student: StudentModel) {

    if (this.studentsToAdd.includes(student._id)) {
      return true;
    }

    return false;

  }

  addOrRemoveStudent(student: StudentModel) {

    if (this.studentsToAdd.includes(student._id)) {
      this.studentsToAdd.splice(this.studentsToAdd.indexOf(student._id));
    } else {
      this.studentsToAdd.push(student._id);
    }

  }

  isPasswordButtonDisabled() {

    if (this.password.length >= 6) {
      return false;
    }

    return true;
  }

  isAddStudentDisabled() {

    if (this.studentsToAdd.length > 0) {
      return false;
    }

    return true;
  }

  onBirthYearChanged(value: number) {

    if (value) {
      this.studentNoRelationshipFilter.fromAge = value;
      this.studentNoRelationshipFilter.toAge = value;
    } else {
      this.studentNoRelationshipFilter.fromAge = undefined;
      this.studentNoRelationshipFilter.toAge = undefined;
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
    this.schoolTeacherSv.fetchStudentsWithNoRelationshipToTeacher(this.teacherId, this.studentNoRelationshipFilter).subscribe((students) => {

      if (students.length === this.studentNoRelationshipFilter.limit) {
        this.hasMoreStudentWithNoRelationshipData = true;
      } else {
        this.hasMoreStudentWithNoRelationshipData = false;
      }
      this.studentsNoRelationshipToTeacher = students;

    });
  }

  onClearAllFiltersPressed() {
    this.showStudentFilter = false;
    this.studentNoRelationshipFilter.isActive = undefined;
    this.studentNoRelationshipFilter.toAge = undefined;
    this.studentNoRelationshipFilter.fromAge = undefined;
    this.schoolTeacherSv.fetchStudentsWithNoRelationshipToTeacher(this.teacherId, this.studentNoRelationshipFilter).subscribe((students) => {

      if (students.length === this.studentNoRelationshipFilter.limit) {
        this.hasMoreStudentWithNoRelationshipData = true;
      } else {
        this.hasMoreStudentWithNoRelationshipData = false;
      }

      this.studentsNoRelationshipToTeacher = students;

    });
  }

  searchFilteredTeachers(searchString: string) {

    this.studentNoRelationshipFilter.name = searchString;
    this.schoolTeacherSv.fetchStudentsWithNoRelationshipToTeacher(this.teacherId, this.studentNoRelationshipFilter).subscribe((students) => {

      if (students.length === this.studentNoRelationshipFilter.limit) {
        this.hasMoreStudentWithNoRelationshipData = true;
      } else {
        this.hasMoreStudentData = false;
      }

      this.studentsNoRelationshipToTeacher = students;

    });

  }

  fetchMoreStudentsWithNoRelationship() {
    this.studentNoRelationshipFilter.skip = this.studentsNoRelationshipToTeacher.length;
    this.schoolTeacherSv.fetchStudentsWithNoRelationshipToTeacher(this.teacherId, this.studentNoRelationshipFilter).subscribe((moreStudents) => {

      if (moreStudents.length === this.studentNoRelationshipFilter.limit) {
        this.hasMoreStudentWithNoRelationshipData = true;
      } else {
        this.hasMoreStudentWithNoRelationshipData = false;
      }

      this.studentsNoRelationshipToTeacher = this.studentsNoRelationshipToTeacher.concat(moreStudents);
    });
  }

  fetchMoreStudentsForTeacher() {
    this.studentFilter.skip = this.students.length;
    this.schoolTeacherSv.fetchStudentsForTeacher(this.teacherId, this.studentFilter).subscribe((students) => {

      if (students.length === this.studentFilter.limit) {
        this.hasMoreStudentData = true;
      } else {
        this.hasMoreStudentData = false;
      }
      this.students = this.students.concat(students);

    });
  }

}
