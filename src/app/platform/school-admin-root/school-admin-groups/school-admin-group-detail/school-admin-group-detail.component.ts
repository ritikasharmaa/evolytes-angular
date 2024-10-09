import {Component, OnInit} from '@angular/core';
import {GroupModel, GroupQueryModel} from '../../../../models/school/group.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SchoolGroupAdministrationService} from '../../../../services/school/school-group-administration.service';
import {StudentModel, StudentQueryModel} from 'src/app/models/authentication/student.model';
import {UserModel} from 'src/app/models/authentication/user.model';
import {ErrorModel} from '../../../../models/shared/error.model';
import {ModalService} from '../../../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-school-school-group-detail',
  templateUrl: './school-admin-group-detail.component.html',
  styleUrls: ['./school-admin-group-detail.component.css']
})
export class SchoolAdminGroupDetailComponent implements OnInit {

  group: GroupModel = new GroupModel();
  groupId: string = null;
  password = '';

  students: StudentModel[] = [];
  hasMoreStudents = true;
  studentsFilter = new GroupQueryModel();
  showAddStudents = false;
  showStudentFilter = false;
  showStudentNoRelationshipFilter = false;
  studentsNoRelationshipFilter = new GroupQueryModel();
  hasMoreStudentsWithNoRelationshipData = true;
  studentsNoRelationshipToGroup: StudentModel[] = [];
  studentsToAdd: string[] = [];


  teachers: UserModel[] = [];
  hasMoreTeachers = true;
  teachersFilter = new GroupQueryModel();
  showAddTeachers = false;
  teachersNoRelationshipFilter = new GroupQueryModel();
  hasMoreTeachersWithNoRelationshipData = true;
  teachersNoRelationshipToGroup: UserModel[] = [];
  teachersToAdd: string[] = [];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalSv: ModalService,
              private tSv: TranslateService,
              private groupSv: SchoolGroupAdministrationService) {
  }

  ngOnInit() {
    this.studentsFilter.limit = 20;
    this.teachersFilter.limit = 20;

    this.route.params.subscribe((params) => {
      if (params.groupId) {
        this.groupId = params.groupId;
        this.groupSv.fetchGroupGroup(params.groupId).subscribe((group) => {
          this.group = group;
        });
        this.fetchStudentsForGroup();
        this.fetchTeachersForGroup();
      }
    });
  }

  getTeacherAccessType(user: UserModel) {

    if (user.schoolAccessType === UserModel.SchoolAccessTypes.admin) {
      return this.tSv.instant('schoolAccessTypes.school');
    }

    return this.tSv.instant('schoolAccessTypes.teacher');
  }

  onUpdateGroupClicked() {
    this.groupSv.updateGroup(this.group).subscribe(() => {
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('schoolAdministration.groups.updateGroupMessage')).subscribe();
    });
  }

  onDeleteGroupClicked() {
    this.modalSv.showChoiceModal(this.tSv.instant('reusable.success'),
      this.tSv.instant('schoolAdministration.groups.deleteGroupModalWarning')).subscribe((response) => {
      if (response === true) {
        this.groupSv.deleteGroup(this.groupId, this.password).subscribe(() => {
          this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
            this.tSv.instant('schoolAdministration.groups.deleteGroupModalSuccess')).subscribe(() => {
            this.router.navigate(['schooladmin', 'groups']);
          });
        }, (err: ErrorModel) => {
          this.modalSv.showErrorModal(this.tSv.instant('reusable.error'), err.message);
        });
      }
    });
  }

  isPasswordButtonDisabled() {

    if (this.password.length >= 6) {
      return false;
    }

    return true;
  }


  /* Part of students management in the group */

  // Get all the students in the group
  fetchStudentsForGroup() {
    this.groupSv.fetchGroupStudents(this.studentsFilter, this.groupId).subscribe((students) => {

      if (students.length === this.studentsFilter.limit) {
        this.hasMoreStudents = true;
      } else {
        this.hasMoreStudents = false;
      }
      this.students = students;
    });
  }

  // Get the next 20 students in the group.
  fetchMoreStudentsForGroup() {
    this.studentsFilter.skip = this.students.length;
    this.groupSv.fetchGroupStudents(this.studentsFilter, this.groupId).subscribe((students) => {

      if (students.length === this.studentsFilter.limit) {
        this.hasMoreStudents = true;
      } else {
        this.hasMoreStudents = false;
      }
      this.students = this.students.concat(students);
    });
  }

  onStudentClicked(student: StudentModel) {
    this.router.navigate(['schooladmin', 'students', student._id]);
  }

  // Display the modal for adding students and call the function to retrieve the students who are not in the group
  onShowAddStudents() {
    this.showAddStudents = true;
    this.studentsNoRelationshipToGroup = [];
    this.studentsToAdd = [];
    this.fetchStudentsWithNoRelationshipToGroup();
  }

  // Close the modal for adding students
  onCloseAddStudents() {
    this.showAddStudents = false;
  }

  // Get the first 20 students who are not included in the group.
  fetchStudentsWithNoRelationshipToGroup() {
    this.groupSv.fetchStudentsWithNoRelationshipToGroup(this.groupId, this.studentsNoRelationshipFilter).subscribe((students) => {

      if (students.length === this.studentsNoRelationshipFilter.limit) {
        this.hasMoreStudentsWithNoRelationshipData = true;
      } else {
        this.hasMoreStudentsWithNoRelationshipData = false;
      }

      this.studentsNoRelationshipToGroup = students;
    });
  }

  // Get the next 20 students who are not included in the group.
  fetchMoreStudentsWithNoRelationship() {

    this.studentsNoRelationshipFilter.skip = this.studentsNoRelationshipToGroup.length;
    this.groupSv.fetchStudentsWithNoRelationshipToGroup(this.groupId, this.studentsNoRelationshipFilter).subscribe((moreStudents) => {

      if (moreStudents.length === this.studentsNoRelationshipFilter.limit) {
        this.hasMoreStudentsWithNoRelationshipData = true;
      } else {
        this.hasMoreStudentsWithNoRelationshipData = false;
      }

      this.studentsNoRelationshipToGroup = this.studentsNoRelationshipToGroup.concat(moreStudents);

    });

  }

  // Display birth date filter on click.
  onFilterPressed() {
    this.showStudentFilter = !this.showStudentFilter;
  }

  // Close the birth date filter.
  onCancelFilter() {
    this.showStudentFilter = false;
  }

  // Add the selected date of birth to the query .
  onBirthYearChanged(value: number) {
    if (value) {
      this.studentsFilter.fromAge = value;
      this.studentsFilter.toAge = value;
    } else {
      this.studentsFilter.fromAge = undefined;
      this.studentsFilter.toAge = undefined;
    }
  }

  // Clear all the filters.
  onClearAllFiltersPressed() {
    this.showStudentFilter = false;
    this.studentsFilter.isActive = undefined;
    this.studentsFilter.toAge = undefined;
    this.studentsFilter.fromAge = undefined;

    this.fetchStudentsForGroup();
  }

  // Apply the filters to the query.
  onApplyFilter() {
    this.showStudentFilter = false;
    this.fetchStudentsForGroup();
  }

  // Returns if the student is selected to be added or not.
  isStudentAdded(student: StudentModel) {
    if (this.studentsToAdd.includes(student._id)) {
      return true;
    }
    return false;
  }

  // Add or remove the student from the list of students to be added.
  addOrRemoveStudent(student: StudentModel) {
    if (this.studentsToAdd.includes(student._id)) {
      this.studentsToAdd.splice(this.studentsToAdd.indexOf(student._id));
    } else {
      this.studentsToAdd.push(student._id);
    }
  }

  // Check if there are any student to add;
  isAddStudentDisabled() {
    if (this.studentsToAdd.length > 0) {
      return false;
    }
    return true;
  }

  // Display birth date filter on click.
  onNoRelationshipFilterPressed() {
    this.showStudentNoRelationshipFilter = !this.showStudentNoRelationshipFilter;
  }

  // Close the birth date filter.
  onNoRelationshipCancelFilter() {
    this.showStudentNoRelationshipFilter = false;
  }

  // Add the selected date of birth to the query .
  onNoRelationshipBirthYearChanged(value: number) {
    if (value) {
      this.studentsNoRelationshipFilter.fromAge = value;
      this.studentsNoRelationshipFilter.toAge = value;
    } else {
      this.studentsNoRelationshipFilter.fromAge = undefined;
      this.studentsNoRelationshipFilter.toAge = undefined;
    }
  }

  // Clear all the filters and close the filter modal.
  onClearAllNoRelationshipFiltersPressed() {
    this.showStudentNoRelationshipFilter = false;
    this.studentsNoRelationshipFilter.isActive = undefined;
    this.studentsNoRelationshipFilter.toAge = undefined;
    this.studentsNoRelationshipFilter.fromAge = undefined;

    this.fetchStudentsWithNoRelationshipToGroup();
  }

  // Apply the filters to the query and close the filter modal.
  onApplyNoRelationshipFilter() {
    this.showStudentNoRelationshipFilter = false;
    this.fetchStudentsWithNoRelationshipToGroup();
  }

  // Add each student from the list to the group.
  onAddStudents() {
    const requests = [];
    for (const studentId of this.studentsToAdd) {

      const addStudent = this.groupSv.addStudentToGroup(this.groupId, studentId);
      requests.push(addStudent);
    }


    forkJoin(requests).subscribe((students) => {
      this.showAddStudents = false;
      this.fetchStudentsForGroup();
    });
  }

  // Remove student from the group.
  onRemoveStudentClicked(student: StudentModel) {
    this.groupSv.removeStudentFromGroup(this.groupId, student._id).subscribe((removedStudent) => {

      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('schoolAdministration.groups.deleteStudentFromGroupModalSuccess')).subscribe();
      this.fetchStudentsForGroup();
    });
  }

  // Apply the filters to the query and execute the request to find a student in the group by name.
  searchFilteredStudents(searchString: string) {
    if (searchString !== null && searchString.length > 0) {
      this.studentsFilter.name = searchString;
    } else {
      this.studentsFilter.name = undefined;
    }

    this.studentsFilter.skip = 0;
    this.fetchStudentsForGroup();
  }

  // Apply the filters to the query and execute the request to find students not included in the group by name.
  searchFilteredNoRelationshipStudents(searchString: string) {
    if (searchString !== null && searchString.length > 0) {
      this.studentsNoRelationshipFilter.name = searchString;
    } else {
      this.studentsNoRelationshipFilter.name = undefined;
    }

    this.studentsNoRelationshipFilter.skip = 0;
    this.fetchStudentsWithNoRelationshipToGroup();
  }

  /* End of the students part */


  /* Part of teachers management in the group */

  // Get all the teachers in the group
  fetchTeachersForGroup() {
    this.groupSv.fetchGroupTeachers(this.teachersFilter, this.groupId).subscribe((teachers) => {

      if (teachers.length === this.teachersFilter.limit) {
        this.hasMoreTeachers = true;
      } else {
        this.hasMoreTeachers = false;
      }
      this.teachers = teachers;
    });
  }

  // Get the next 20 teachers in the group.
  fetchMoreTeachersForGroup() {
    this.teachersFilter.skip = this.teachers.length;
    this.groupSv.fetchGroupTeachers(this.teachersFilter, this.groupId).subscribe((teachers) => {

      if (teachers.length === this.teachersFilter.limit) {
        this.hasMoreTeachers = true;
      } else {
        this.hasMoreTeachers = false;
      }
      this.teachers = this.teachers.concat(teachers);
    });
  }

  onTeacherClicked(teacher: UserModel) {
    this.router.navigate(['schooladmin', 'teachers', teacher._id]);
  }

  // Display the modal for adding teachers and call the function to retrieve the students who are not in the group
  onShowAddTeachers() {
    this.showAddTeachers = true;
    this.teachersNoRelationshipToGroup = [];
    this.teachersToAdd = [];
    this.fetchTeachersWithNoRelationshipToGroup();
  }

  // Close the modal for adding teachers
  onCloseAddTeachers() {
    this.showAddTeachers = false;
  }

  // Get the first 20 teachers who are not included in the group.
  fetchTeachersWithNoRelationshipToGroup() {
    this.groupSv.fetchTeachersWithNoRelationshipToGroup(this.groupId, this.teachersNoRelationshipFilter).subscribe((teachers) => {

      if (teachers.length === this.teachersNoRelationshipFilter.limit) {
        this.hasMoreTeachersWithNoRelationshipData = true;
      } else {
        this.hasMoreTeachersWithNoRelationshipData = false;
      }

      this.teachersNoRelationshipToGroup = teachers;
    });
  }

  // Get the next 20 students who are not included in the group.
  fetchMoreTeachersWithNoRelationship() {
    this.teachersNoRelationshipFilter.skip = this.teachersNoRelationshipToGroup.length;
    this.groupSv.fetchTeachersWithNoRelationshipToGroup(this.groupId, this.teachersNoRelationshipFilter).subscribe((moreTeachers) => {

      if (moreTeachers.length === this.teachersNoRelationshipFilter.limit) {
        this.hasMoreTeachersWithNoRelationshipData = true;
      } else {
        this.hasMoreTeachersWithNoRelationshipData = false;
      }

      this.teachersNoRelationshipToGroup = this.teachersNoRelationshipToGroup.concat(moreTeachers);
    });
  }

  // Returns if the teacher is selected to be added or not.
  isTeacherAdded(teacher: UserModel) {
    if (this.teachersToAdd.includes(teacher._id)) {
      return true;
    }
    return false;
  }

  // Add or remove the teacher from the list of teachers to be added.
  addOrRemoveTeacher(teacher: UserModel) {
    if (this.teachersToAdd.includes(teacher._id)) {
      this.teachersToAdd.splice(this.teachersToAdd.indexOf(teacher._id));
    } else {
      this.teachersToAdd.push(teacher._id);
    }
  }

  // Check if there are any teacher to add;
  isAddTeacherDisabled() {
    if (this.teachersToAdd.length > 0) {
      return false;
    }
    return true;
  }


  // Add each teacher from the list to the group.
  onAddTeachers() {
    const requests = [];
    for (const teacherId of this.teachersToAdd) {

      const addTeacher = this.groupSv.addTeacherToGroup(this.groupId, teacherId);
      requests.push(addTeacher);
    }


    forkJoin(requests).subscribe((students) => {
      this.showAddTeachers = false;
      this.fetchTeachersForGroup();
    });
  }

  // Remove teacher from the group.
  onRemoveTeacherClicked(teacher: UserModel) {
    this.groupSv.removeTeacherFromGroup(this.groupId, teacher._id).subscribe((removedStudent) => {

      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('schoolAdministration.groups.deleteTeacherFromGroupModalSuccess')).subscribe();
      this.fetchTeachersForGroup();
    });
  }

  // Apply the filters to the query and execute the request to find a teacher in the group by name.
  searchFilteredTeachers(searchString: string) {
    if (searchString !== null && searchString.length > 0) {
      this.teachersFilter.name = searchString;
      this.teachersFilter.email = searchString;
    } else {
      this.teachersFilter.name = undefined;
      this.teachersFilter.email = undefined;
    }

    this.teachersFilter.skip = 0;
    this.fetchTeachersForGroup();
  }

  // Apply the filters to the query and execute the request to find teachers not included in the group by name.
  searchFilteredNoRelationshipTeachers(searchString: string) {
    if (searchString !== null && searchString.length > 0) {
      this.teachersNoRelationshipFilter.name = searchString;
      this.teachersNoRelationshipFilter.email = searchString;
    } else {
      this.teachersNoRelationshipFilter.name = undefined;
      this.teachersNoRelationshipFilter.email = undefined;
    }

    this.teachersNoRelationshipFilter.skip = 0;
    this.fetchTeachersWithNoRelationshipToGroup();
  }
}
