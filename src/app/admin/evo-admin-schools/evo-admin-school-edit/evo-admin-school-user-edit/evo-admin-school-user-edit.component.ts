import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {SchoolUserAdminService} from '../../../../services/admin/school-user-admin.service';
import {UserModel} from '../../../../models/authentication/user.model';
import {SchoolStudentAdminService} from '../../../../services/admin/school-student-admin.service';
import {StudentRelationshipModel} from '../../../../models/authentication/student-relationship.model';
import {EvoAdminUserSelectStudentService} from './evo-admin-user-select-student/evo-admin-user-select-student.service';

@Component({
  selector: 'app-evo-school-school-user-edit',
  templateUrl: './evo-admin-school-user-edit.component.html',
  styleUrls: ['./evo-admin-school-user-edit.component.css']
})
export class EvoAdminSchoolUserEditComponent implements OnInit {

  isEditMode = false;
  schoolId: string;
  userId: string;
  user: UserModel = new UserModel();
  students: StudentRelationshipModel[] = [];
  studentSearchString = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private schoolUserAdminService: SchoolUserAdminService,
              private selectStudentSv: EvoAdminUserSelectStudentService,
              private schoolStudentAdminService: SchoolStudentAdminService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      this.schoolId = params.schoolId;
      this.userId = params.userId;

      if (this.userId) {
        this.isEditMode = true;
        this.schoolUserAdminService.fetchSchoolUserById(this.schoolId,  this.userId).subscribe((user) => {
          this.user = user;
        });

        this.schoolUserAdminService.fetchSchoolUserStudentRelationships(this.schoolId, this.userId).subscribe((relationships) => {
          this.students = relationships;
        });

      }

    });

  }

  title(): string {

    if (this.isEditMode === true) {

      return 'Update User';
    }

    return 'Create User';
  }

  saveButtonTitle(): string {

    if (this.isEditMode === true) {

      return 'Save';
    }

    return 'Create';
  }

  searchStudents(searchString: string) {

  }

  onStudentClicked(studentId: string) {
    this.router.navigate(['admin', 'schools', this.schoolId, 'students', studentId, 'edit']);
  }

  onSaveClicked() {

    if (this.isEditMode === true) {
      this.schoolUserAdminService.updateSchoolUser(this.schoolId, this.user).subscribe((user) => {
        this.router.navigate(['admin', 'schools', user.schoolId, 'users', user._id, 'edit']);
      });
    } else {
      this.schoolUserAdminService.createSchoolUsers(this.schoolId, [this.user]).subscribe((users) => {
        const user = users[0];
        this.router.navigate(['admin', 'schools', user.schoolId, 'users', user._id, 'edit']);
      });
    }

  }

  onAddStudent() {
    this.selectStudentSv.show(this.schoolId, this.user._id).subscribe(() => {
      this.schoolUserAdminService.fetchSchoolUserStudentRelationships(this.schoolId, this.userId).subscribe((relationships) => {
        this.students = relationships;
      });
    });
  }

}
