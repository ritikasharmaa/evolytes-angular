import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../../models/authentication/user.model';
import {CsvImportService} from '../../../../services/csv-import.service';
import {ModalService} from '../../../../root/modal.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TeacherInvitationModel} from '../../../../models/authentication/teacher-invitation';
import {SchoolUserInvitationAdminService} from '../../../../services/admin/school-user-invitation-admin.service';

@Component({
  selector: 'app-evo-school-school-upload-users-invitations',
  templateUrl: './evo-admin-school-upload-users-invitations.component.html',
  styleUrls: ['./evo-admin-school-upload-users-invitations.component.css']
})
export class EvoAdminSchoolUploadUsersInvitationsComponent implements OnInit {

  usersToInvite: TeacherInvitationModel[] = [];
  schoolId: string = null;
  isDisabled = false;
  public AccessTypes = UserModel.SchoolAccessTypesDropdown;

  constructor(private csvSv: CsvImportService,
              private modalSv: ModalService,
              private route: ActivatedRoute,
              private userInvitationSv: SchoolUserInvitationAdminService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.schoolId) {
        this.schoolId = params.schoolId;
      }
    });
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {

      const currentFile = event.target.files[0];

      const properties = ['Email', 'Full Name'];
      this.csvSv.importCSV(currentFile, properties).subscribe((objects) => {

        this.usersToInvite = [];
        for (const userToInviteBody of objects) {

          const userToInvite = new TeacherInvitationModel();

          for (const property of properties) {

            if (property === 'Email') {

              userToInvite.email = userToInviteBody[property];

            } else if (property === 'Full Name') {

              const fullName: string = userToInviteBody[property];
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

                userToInvite.firstName = firstName;
                userToInvite.lastName = lastName;
              }

            } else {

              userToInvite[property] = userToInviteBody[property];

            }

            userToInvite.schoolId = this.schoolId;
            userToInvite.schoolAccessType = TeacherInvitationModel.SchoolAccessTypes.teacher;
          }

          if (userToInvite.email || userToInvite.firstName || userToInvite.lastName) {
            this.usersToInvite.push(userToInvite);
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
    this.userInvitationSv.importUsersInvitations(this.usersToInvite, this.schoolId).subscribe((usersInvitationsCount) => {
      this.isDisabled = false;
      this.modalSv.showAlertModal('Success', usersInvitationsCount + ' users successfully invited').subscribe(() => {
        this.router.navigate(['admin', 'schools', this.schoolId, 'invitations']);
      });
    }, (err) => {
      this.isDisabled = false;
      this.modalSv.showErrorModal('Error', err.message).subscribe(() => {
        this.router.navigate(['admin', 'schools', this.schoolId, 'invitations']);
      });
    });
  }

}
