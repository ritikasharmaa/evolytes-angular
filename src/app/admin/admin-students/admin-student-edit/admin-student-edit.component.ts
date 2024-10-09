import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../models/authentication/student.model';
import { SchoolModel } from '../../../models/school/school.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminStudentService } from '../../../services/admin/admin-student.service';
import { SchoolAdminService } from '../../../services/admin/school-admin.service';
import { AdminStudentRelationshipService } from '../../../services/admin/admin-StudentRelationship.service';
import { AdminPasswordValidationService } from '../../admin-users/admin-passord-validation/admin-password-validation.service';
import { CountryModel } from '../../../models/localization/country.model';


@Component({
  selector: 'app-school-student-edit',
  templateUrl: './admin-student-edit.component.html',
  styleUrls: ['./admin-student-edit.component.css']
})
export class AdminStudentEditComponent implements OnInit {


  student: StudentModel = new StudentModel();
  oldStudent: StudentModel = new StudentModel();
  school: SchoolModel = new SchoolModel();
  SchoolTypes = StudentModel.SchoolTypesDropdownList;
  ListBillingStatus = StudentModel.ChargebeeSubscriptionsStatusTypesDropdownList;

  constructor(private adminStudentSv: AdminStudentService, private adminSchoolSv: SchoolAdminService, public adminPasswordValidationSv: AdminPasswordValidationService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = String(this.route.snapshot.paramMap.get('studentId'));
    this.adminStudentSv.fetchStudentById(id).subscribe((student) => {
      this.oldStudent = student;
      // @ts-ignore
      this.student = { ...this.oldStudent };

      if (this.student.schoolId) {
        this.adminSchoolSv.fetchSchoolById(this.student.schoolId).subscribe((school) => {
          this.school = school;
        });
      }
    });
  }
  onSaveClicked() {
    this.adminPasswordValidationSv.show().subscribe((adminPassword) => {
      if (adminPassword !== null && adminPassword !== undefined) {

        this.adminStudentSv.updateStudentWithAdminPassword(this.student, adminPassword).subscribe(updatedStudent => {
          // @ts-ignore
          this.student = { ...updatedStudent };
          // @ts-ignore
          this.oldStudent = { ...updatedStudent };
        });
      }
    });
  }

  onCancelClick() {
    // @ts-ignore
    this.student = { ...this.oldStudent };
  }

}
