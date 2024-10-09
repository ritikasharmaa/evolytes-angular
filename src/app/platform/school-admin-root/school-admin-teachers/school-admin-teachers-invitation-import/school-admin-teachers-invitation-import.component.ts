import {Component, OnInit} from '@angular/core';
import {CsvImportService} from '../../../../services/csv-import.service';
import {TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../../root/modal.service';
import {Router} from '@angular/router';
import {TeacherInvitationModel} from 'src/app/models/authentication/teacher-invitation';
import {UserModel} from '../../../../models/authentication/user.model';
import {SchoolTeacherInvitationAdministrationService} from '../../../../services/school/school-teacher-invitation-administration.service';

@Component({
  selector: 'app-school-school-teachers-invitation-import',
  templateUrl: './school-admin-teachers-invitation-import.component.html',
  styleUrls: ['./school-admin-teachers-invitation-import.component.css']
})
export class SchoolAdminTeachersInvitationImportComponent implements OnInit {

  teachersToInvite: UserModel[] = [];
  currentUser = UserModel.getCurrent();
  isDisabled = false;
  public AccessTypes = UserModel.SchoolAccessTypesDropdown;

  constructor(private csvSv: CsvImportService,
              private tSv: TranslateService,
              private modalSv: ModalService,
              private teacherInvitationSv: SchoolTeacherInvitationAdministrationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onFileChanged(event) {

    if (event.target.files.length > 0) {

      const currentFile = event.target.files[0];

      const properties = ['Email', 'Full Name'];
      this.csvSv.importCSV(currentFile, properties).subscribe((objects) => {

        this.teachersToInvite = [];
        for (const teacherToInviteBody of objects) {

          const teacherToInvite = new UserModel();

          for (const property of properties) {

            if (property === 'Email') {

              teacherToInvite.email = teacherToInviteBody[property];

            } else if (property === 'Full Name') {

              const fullName: string = teacherToInviteBody[property];
              if (fullName) {
                const splitNames = fullName.split(' ');
                const firstName = splitNames[0];
                let lastName = splitNames[1];

                if (splitNames.length >= 3) {

                  lastName = splitNames[1] + ' ' + splitNames[2];

                  for (let i = 3; i < splitNames.length; i++) {
                    lastName += ' ' + splitNames[i];
                  }
                }

                teacherToInvite.firstName = firstName;
                teacherToInvite.lastName = lastName;
              }

            } else {

              teacherToInvite[property] = teacherToInviteBody[property];

            }

            teacherToInvite.schoolId = this.currentUser.schoolId;
            teacherToInvite.schoolAccessType = TeacherInvitationModel.SchoolAccessTypes.teacher;
          }

          if (teacherToInvite.email || teacherToInvite.firstName || teacherToInvite.lastName) {
            this.teachersToInvite.push(teacherToInvite);
          }
        }
      });
    }
  }

  onCancelClicked() {
    this.router.navigate(['schooladmin', 'invitations']);
  }

  onCreateClicked() {
    this.isDisabled = true;
    this.teacherInvitationSv.importTeachersInvitations(this.teachersToInvite).subscribe((teachersInvitationsCount) => {
      this.isDisabled = false;
      this.modalSv.showAlertModal('Success', teachersInvitationsCount + ' users successfully invited').subscribe(() => {
        this.router.navigate(['schooladmin', 'invitations']);
      });
    }, (err) => {
      this.isDisabled = false;
      this.modalSv.showErrorModal('Error', err.message).subscribe(() => {
        this.router.navigate(['schooladmin', 'invitations']);
      });
    });
  }
}
