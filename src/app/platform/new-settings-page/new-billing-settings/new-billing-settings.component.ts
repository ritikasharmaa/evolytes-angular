import {Component, OnInit} from '@angular/core';
import {ErrorModel} from '../../../models/shared/error.model';
import {StudentService} from '../../../services/student.service';
import {ModalService} from '../../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {StudentModel} from '../../../models/authentication/student.model';
import {UserModel} from '../../../models/authentication/user.model';

@Component({
  selector: 'app-new-billing-settings',
  templateUrl: './new-billing-settings.component.html',
  styleUrls: ['./new-billing-settings.component.css']
})
export class NewBillingSettingsComponent implements OnInit {

  public students: StudentModel[] = [];

  constructor(private studentSv: StudentService, private modalSv: ModalService,
              private tSv: TranslateService) {
  }

  ngOnInit() {

    this.studentSv.fetchStudents().subscribe((students) => {

      this.students = this.students.filter((s) => {
        return s._creator === UserModel.getCurrent()._id;
      });

      this.students = students.sort((a, b) => {

        if (a.fullName() > b.fullName()) {
          return 1;
        }

        if (a.fullName() < b.fullName()) {
          return -1;
        }

        return 0;
      });
    }, (error: ErrorModel) => {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('reusable.unknownError'));

    });
  }

}
