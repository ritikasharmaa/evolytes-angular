import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../models/authentication/user.model';
import {AdminUserService} from '../../../services/admin/admin-user.service';
import {EvoLangDropdownComponent} from '../../../shared/evo-lang-dropdown/evo-lang-dropdown.component';
import {SchoolModel} from '../../../models/school/school.model';
import {StudentModel} from '../../../models/authentication/student.model';
import {SchoolAdminService} from '../../../services/admin/school-admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminPasswordValidationService} from '../admin-passord-validation/admin-password-validation.service';
import {AdminStudentRelationshipService} from '../../../services/admin/admin-StudentRelationship.service';

@Component({
  selector: 'app-school-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit {

  oldUser: UserModel = new UserModel();
  user: UserModel = new UserModel();
  school: SchoolModel = new SchoolModel();
  students: StudentModel[] = [];

  CultureTypes = EvoLangDropdownComponent.Types;

  constructor(
    private adminUserSrv: AdminUserService,
    private adminSchoolSrv: SchoolAdminService,
    private adminStudentRelationshipSrv: AdminStudentRelationshipService,
    public adminPasswordValidationSrv: AdminPasswordValidationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const userId: string = String(this.route.snapshot.paramMap.get('userId'));
    this.adminUserSrv.fetchUserById(userId).subscribe((user) => {
      this.oldUser = user;
      this.user = UserModel.generate(JSON.parse(JSON.stringify(user)));
      if (this.user.schoolId) {
        this.adminSchoolSrv.fetchSchoolById(this.user.schoolId).subscribe((school) => {
          this.school = school;
        });
      }
    });
    this.adminStudentRelationshipSrv.fetchRelationshipByUserIdWithStudent(userId).subscribe((studentRelationShips) => {
      studentRelationShips.forEach(sr => this.students.push(sr.student));
    });
  }

  onSaveClicked() {
    this.adminPasswordValidationSrv.show().subscribe((adminPassword) => {
      if (adminPassword !== null && adminPassword !== undefined) {
        this.adminUserSrv.updateUserWithAdminPassword(this.user, adminPassword).subscribe(updatedUser => {
          this.user = updatedUser;
          this.oldUser = UserModel.generate(JSON.parse(JSON.stringify(updatedUser)));
        });
      }
    });
  }

  onCancelClick() {
    this.user = UserModel.generate(JSON.parse(JSON.stringify(this.oldUser)));
  }

  onSchoolClicked() {
    this.router.navigate(['admin', 'schools', this.school._id, 'edit']);
  }

  onStudentClicked(student: StudentModel) {
    this.router.navigate(['admin', 'students', student._id, 'edit']);
  }

  isVerified(): string {
    return this.user.isEmailVerified ? 'is verified' : 'is not verified';
  }

  isVerifiedColor(): string {
    return this.user.isEmailVerified ? 'greenButton' : 'redButton';
  }

  isAdmin(): string {
    return this.user.isAdmin ? 'is school' : 'is not school';
  }

  isAdminColor(): string {
    return this.user.isAdmin ? 'greenButton' : 'redButton';
  }

}
