import { Component, OnInit } from '@angular/core';
import {StudentModel} from '../../../../models/authentication/student.model';
import {SchoolStudentAdministrationService} from '../../../../services/school/school-student-administration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../../root/modal.service';
import {ErrorModel} from '../../../../models/shared/error.model';

@Component({
  selector: 'app-school-school-student-detail',
  templateUrl: './school-admin-student-detail.component.html',
  styleUrls: ['./school-admin-student-detail.component.css']
})
export class SchoolAdminStudentDetailComponent implements OnInit {

  student: StudentModel = new StudentModel();
  password = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tSv: TranslateService,
              private modalSv: ModalService,
              private studentSv: SchoolStudentAdministrationService) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      if (params.studentId) {
        this.studentSv.fetchStudentById(params.studentId).subscribe((student) => {
          this.student = student;
        });
      }
    });

  }

  onUpdateStudentClicked() {
    this.studentSv.updateStudent(this.student).subscribe(() => {
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('schoolAdministration.students.updateStudentMessage')).subscribe();
    });
  }

  onDeleteStudentClicked() {

    this.modalSv.showChoiceModal(this.tSv.instant('reusable.success'),
      this.tSv.instant('schoolAdministration.students.deleteStudentModalWarning')).subscribe((response) => {
        if (response === true) {
          this.studentSv.deleteStudent(this.student._id, this.password).subscribe(() => {
            this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
              this.tSv.instant('schoolAdministration.students.deleteStudentModalSuccess')).subscribe(() => {
                this.router.navigate(['schooladmin', 'students']);
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

}
