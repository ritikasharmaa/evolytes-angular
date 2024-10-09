import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SchoolModel } from '../../../models/school/school.model';
import { SchoolAdminService } from '../../../services/admin/school-admin.service';
import { EvoLangDropdownComponent } from '../../../shared/evo-lang-dropdown/evo-lang-dropdown.component';
import { UserModel } from '../../../models/authentication/user.model';
import { SchoolUserAdminService } from '../../../services/admin/school-user-admin.service';
import { StudentModel } from '../../../models/authentication/student.model';
import { SchoolStudentAdminService } from '../../../services/admin/school-student-admin.service';
import { ModalService } from '../../../root/modal.service';
import { LicenseService } from 'src/app/services/license.service';
import { SchoolLicenseModel } from 'src/app/models/school/school-license.model';
import { TranslateService } from '@ngx-translate/core';
import { CommonModalService } from 'src/app/shared/common-modal/common-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PricingModel} from '../../../models/pricing.model';



@Component({
  selector: 'app-evo-school-school-edit',
  templateUrl: './evo-admin-school-edit.component.html',
  styleUrls: ['./evo-admin-school-edit.component.css']
})
export class EvoAdminSchoolEditComponent implements OnInit {

  CultureTypes = EvoLangDropdownComponent.Types;
  isEditMode = false;
  school: SchoolModel = new SchoolModel();
  users: UserModel[] = [];
  students: StudentModel[] = [];
  license: SchoolLicenseModel[] = [];
  schoolId: string
  showTeacherInvite = false;
  AccessTypes = UserModel.SchoolAccessTypesDropdown;
  teachersToInvite: UserModel[] = [];
  createdAt: any;
  licenseExpiresAt: any;

  PricingModel = PricingModel;

  constructor(private schoolSv: SchoolAdminService,
    private userSv: SchoolUserAdminService,
    private studentSv: SchoolStudentAdminService,
    private adminSv: SchoolUserAdminService,
    private licenseSv: LicenseService,
    private modalSv: ModalService,
    private tSv: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private Service: CommonModalService) {
  }
  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      if (params.schoolId) {

        this.isEditMode = true;
        this.schoolSv.fetchSchoolById(params.schoolId).subscribe((school) => {
          this.school = school;

          this.createdAt = (this.school.createdAt).toDateString()

          if (this.school.licenseExpiresAt) {
            this.licenseExpiresAt = (this.school.licenseExpiresAt).toDateString()

          }
        });

        this.userSv.fetchSchoolUsers(params.schoolId).subscribe((users) => {
          this.users = users;
        });

        this.studentSv.fetchSchoolStudents(params.schoolId).subscribe((students) => {
          this.students = students;
        });
      }
    });

  }

  saveButtonTitle(): string {

    if (this.isEditMode) {
      return 'Save';
    }

    return 'Create';
  }

  onSaveClicked() {

    this.schoolSv.updateSchool(this.school).subscribe((school) => {
      this.router.navigate(['admin', 'schools', school._id, 'edit']);

    });

  }
  onUserClicked(user: UserModel) {

    if (user === null) {
      this.router.navigate(['admin', 'schools', this.school._id, 'users', 'create']);
    } else {
      this.router.navigate(['admin', 'schools', this.school._id, 'users', user._id, 'edit']);
    }

  }

  onImportUsersClicked() {
    this.router.navigate(['admin', 'schools', this.school._id, 'users', 'import']);
  }

  onInvitationsClicked() {
    this.router.navigate(['admin', 'schools', this.school._id, 'invitations']);
  }

  onStudentClicked(student: StudentModel) {

    if (student === null) {
      this.router.navigate(['admin', 'schools', this.school._id, 'students', 'create']);
    } else {
      this.router.navigate(['admin', 'schools', this.school._id, 'students', student._id, 'edit']);
    }

  }

  onImportStudentsClicked() {
    this.router.navigate(['admin', 'schools', this.school._id, 'students', 'import']);
  }

}
