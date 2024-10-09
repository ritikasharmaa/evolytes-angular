import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../../models/authentication/user.model';
import {ModalService} from '../../../../root/modal.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TeacherInvitationFilter, TeacherInvitationModel} from '../../../../models/authentication/teacher-invitation';
import {SchoolUserInvitationAdminService} from '../../../../services/admin/school-user-invitation-admin.service';

@Component({
  selector: 'app-evo-school-school-users-invitations',
  templateUrl: './evo-admin-school-users-invitations.component.html',
  styleUrls: ['./evo-admin-school-users-invitations.component.css']
})
export class EvoAdminSchoolUsersInvitationsComponent implements OnInit {

  public userInvitationFilter = new TeacherInvitationFilter();
  public hasMoreData = true;
  public usersInvitations: TeacherInvitationModel[] = [];

  password = '';

  schoolId: string = null;
  public showUserInvite = false;
  public showUserInvitationDetail = false;
  public userInvitation: TeacherInvitationModel = null;
  public usersToInvite: TeacherInvitationModel[] = [];
  public AccessTypes = UserModel.SchoolAccessTypesDropdown;

  constructor(private userInvitationSv: SchoolUserInvitationAdminService,
              private modalSv: ModalService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.schoolId) {
        this.schoolId = params.schoolId;
      }
    });
    this.userInvitationFilter.limit = 20;
    this.refreshUsersInvitations();
  }

  refreshUsersInvitations() {
    this.userInvitationSv.fetchUsersInvitations(this.userInvitationFilter, this.schoolId).subscribe((usersInvitations) => {
      if (usersInvitations.length === this.userInvitationFilter.limit) {
        this.hasMoreData = true;
      } else {
        this.hasMoreData = false;
      }
      this.usersInvitations = usersInvitations;
    });
  }

  searchFilteredUsersInvitations(searchString: string) {
    this.userInvitationFilter.skip = 0;
    this.userInvitationFilter.name = searchString;
    this.userInvitationFilter.email = searchString;
    this.hasMoreData = true;
    this.userInvitationSv.fetchUsersInvitations(this.userInvitationFilter, this.schoolId).subscribe((filteredUsersInvitations) => {

      if (filteredUsersInvitations.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.usersInvitations = filteredUsersInvitations;

    });
  }

  onFetchMoreUsersInvitations() {
    this.userInvitationFilter.skip = this.usersInvitations.length;
    this.userInvitationSv.fetchUsersInvitations(this.userInvitationFilter, this.schoolId).subscribe((usersInvitations) => {
      if (usersInvitations.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.usersInvitations = this.usersInvitations.concat(usersInvitations);
    });
  }

  showUserInvites() {
    this.showUserInvite = true;
    if (this.usersToInvite.length === 0) {

      const user = new TeacherInvitationModel();
      user.schoolAccessType = UserModel.SchoolAccessTypes.teacher;
      this.usersToInvite.push(user);

    }
  }

  addUser() {
    const user = new TeacherInvitationModel();
    user.schoolAccessType = UserModel.SchoolAccessTypes.teacher;
    this.usersToInvite.push(user);
  }

  removeUser(index: number) {
    this.usersToInvite.splice(index, 1);
  }

  closeInviteUsers() {
    this.showUserInvite = false;
  }

  sendUserInvites() {
    this.showUserInvite = false;
    let numResponses = 0;
    for (const invite of this.usersToInvite) {
      this.userInvitationSv.inviteTeacher(invite, this.schoolId).subscribe((user) => {
        numResponses++;
        if (numResponses === this.usersToInvite.length) {
          this.refreshUsersInvitations();
          this.modalSv.showAlertModal('Success', 'Users successfully invited');
        }
      }, (err) => {
        numResponses++;
        this.modalSv.showErrorModal('Error', err.message);
      });
    }
  }

  onImportClicked() {
    this.router.navigate(['admin', 'schools', this.schoolId, 'invitations', 'import']);
  }

  onTeacherInvitationClicked(teacherInvitation: TeacherInvitationModel) {
    this.userInvitation = teacherInvitation;
    this.showUserInvitationDetail = true;
  }

  closeEditTeacherInvitationClicked() {
    this.showUserInvitationDetail = false;
  }

  editTeacherInvitationClicked() {
    this.userInvitationSv.updateUserInvitation(this.userInvitation, this.schoolId).subscribe((updatedTeacherInvitation) => {
      this.refreshUsersInvitations();
      this.showUserInvitationDetail = false;
      this.modalSv.showAlertModal('Success',
        'The user invitation information has been successfully updated.')
        .subscribe();
    });
  }

  onResendTeacherInvitation() {
    this.showUserInvitationDetail = false;

    this.modalSv.showChoiceModal('Warning',
      'You are about to resend an invitation email to a user, this action cannot be undone.')
      .subscribe((response) => {

        if (response === true) {

          this.userInvitationSv.resendUserInvitation(this.userInvitation._id, this.schoolId).subscribe((success) => {

            this.modalSv.showAlertModal('Success',
              'The user invitation have been successfully resent.')
              .subscribe(() => {
                this.refreshUsersInvitations();
                this.showUserInvitationDetail = false;
              });

          }, (err) => {
            this.modalSv.showAlertModal('Error', err.message).subscribe(() => {
              this.showUserInvitationDetail = true;
            });
          });

        } else {
          this.showUserInvitationDetail = true;
        }
      });
  }

  onDeleteTeacherInvitation() {
    this.showUserInvitationDetail = false;

    this.modalSv.showChoiceModal('Warning',
      'You are about to delete a user invitation, this action cannot be undone.')
      .subscribe((response) => {

        if (response === true) {

          this.userInvitationSv.deleteUserInvitation(this.userInvitation._id, this.password, this.schoolId).subscribe((success) => {

            this.modalSv.showAlertModal('Success',
              'The user invitation have been successfully deleted.')
              .subscribe(() => {
                this.refreshUsersInvitations();
                this.showUserInvitationDetail = false;
              });

          }, (err) => {
            this.modalSv.showAlertModal('Error', err.message).subscribe(() => {
              this.showUserInvitationDetail = true;
            });
          });

        } else {
          this.showUserInvitationDetail = true;
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
