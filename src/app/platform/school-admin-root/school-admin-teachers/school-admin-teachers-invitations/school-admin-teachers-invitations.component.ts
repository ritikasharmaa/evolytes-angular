import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../../models/authentication/user.model';
import {ModalService} from '../../../../root/modal.service';
import {Router} from '@angular/router';
import {SchoolTeacherInvitationAdministrationService} from '../../../../services/school/school-teacher-invitation-administration.service';
import {TeacherInvitationFilter, TeacherInvitationModel} from '../../../../models/authentication/teacher-invitation';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-school-school-teachers-invitations',
  templateUrl: './school-admin-teachers-invitations.component.html',
  styleUrls: ['./school-admin-teachers-invitations.component.css']
})
export class SchoolAdminTeachersInvitationsComponent implements OnInit {

  public teacherInvitationFilter = new TeacherInvitationFilter();
  public hasMoreData = true;
  public teachersInvitations: TeacherInvitationModel[] = [];

  password = '';

  public showTeacherInvite = false;
  public showTeacherInvitationDetail = false;
  public teacherInvitation: TeacherInvitationModel = null;
  public teachersToInvite: TeacherInvitationModel[] = [];
  public AccessTypes = UserModel.SchoolAccessTypesDropdown;

  constructor(private teacherInvitationSv: SchoolTeacherInvitationAdministrationService,
              private modalSv: ModalService,
              private tSv: TranslateService,
              private router: Router) {
  }

  ngOnInit() {
    this.teacherInvitationFilter.limit = 20;
    this.refreshTeachersInvitations();
  }

  refreshTeachersInvitations() {
    this.teacherInvitationSv.fetchTeachersInvitations(this.teacherInvitationFilter).subscribe((teachersInvitations) => {
      if (teachersInvitations.length === this.teacherInvitationFilter.limit) {
        this.hasMoreData = true;
      } else {
        this.hasMoreData = false;
      }
      this.teachersInvitations = teachersInvitations;
    });
  }

  searchFilteredTeachersInvitations(searchString: string) {

    this.teacherInvitationFilter.skip = 0;
    this.teacherInvitationFilter.name = searchString;
    this.teacherInvitationFilter.email = searchString;
    this.hasMoreData = true;
    this.teacherInvitationSv.fetchTeachersInvitations(this.teacherInvitationFilter).subscribe((filteredTeachersInvitations) => {

      if (filteredTeachersInvitations.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.teachersInvitations = filteredTeachersInvitations;

    });

  }

  onFetchMoreTeachersInvitations() {

    this.teacherInvitationFilter.skip = this.teachersInvitations.length;
    this.teacherInvitationSv.fetchTeachersInvitations(this.teacherInvitationFilter).subscribe((teachersInvitations) => {
      if (teachersInvitations.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.teachersInvitations = this.teachersInvitations.concat(teachersInvitations);
    });

  }

  showTeacherInvites() {
    this.showTeacherInvite = true;
    if (this.teachersToInvite.length === 0) {

      const teacher = new TeacherInvitationModel();
      teacher.schoolAccessType = UserModel.SchoolAccessTypes.teacher;
      this.teachersToInvite.push(teacher);

    }
  }

  addTeacher() {

    const teacher = new TeacherInvitationModel();
    teacher.schoolAccessType = UserModel.SchoolAccessTypes.teacher;
    this.teachersToInvite.push(teacher);

  }

  removeTeacher(index: number) {
    this.teachersToInvite.splice(index, 1);
  }

  closeInviteTeachers() {
    this.showTeacherInvite = false;
  }

  sendTeacherInvites() {
    this.showTeacherInvite = false;
    let numResponses = 0;
    for (const invite of this.teachersToInvite) {
      this.teacherInvitationSv.inviteTeacher(invite).subscribe((teacher) => {
        numResponses++;
        if (numResponses === this.teachersToInvite.length) {
          this.refreshTeachersInvitations();
          this.modalSv.showAlertModal('Success', 'Users successfully invited');
        }
      }, (err) => {
        numResponses++;
        this.modalSv.showErrorModal('Error', err.message);
      });
    }
  }

  onImportClicked() {
    this.router.navigate(['schooladmin', 'importInvitations']);
  }

  onTeacherInvitationClicked(teacherInvitation: TeacherInvitationModel) {
    this.teacherInvitation = teacherInvitation;
    this.showTeacherInvitationDetail = true;
  }

  closeEditTeacherInvitationClicked() {
    this.showTeacherInvitationDetail = false;
  }

  editTeacherInvitationClicked() {
    this.teacherInvitationSv.updateTeacherInvitation(this.teacherInvitation).subscribe((updatedTeacherInvitation) => {
      this.refreshTeachersInvitations();
      this.showTeacherInvitationDetail = false;
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('schoolAdministration.teachersInvitations.updateTeacherInvitationMessage'))
        .subscribe();
    });
  }

  onResendTeacherInvitation() {
    this.showTeacherInvitationDetail = false;

    this.modalSv.showChoiceModal(this.tSv.instant('reusable.warning'),
      this.tSv.instant('schoolAdministration.teachersInvitations.resendTeacherInvitationModalWarning'))
      .subscribe((response) => {

        if (response === true) {

          this.teacherInvitationSv.resendTeacherInvitation(this.teacherInvitation._id).subscribe((success) => {

            this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
              this.tSv.instant('schoolAdministration.teachersInvitations.resendTeacherInvitationModalMessage'))
              .subscribe(() => {
                this.refreshTeachersInvitations();
                this.showTeacherInvitationDetail = false;
              });

          }, (err) => {
            this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), err.message).subscribe(() => {
              this.showTeacherInvitationDetail = true;
            });
          });

        } else {
          this.showTeacherInvitationDetail = true;
        }

      });
  }

  onDeleteTeacherInvitation() {
    this.showTeacherInvitationDetail = false;

    this.modalSv.showChoiceModal(this.tSv.instant('reusable.warning'),
      this.tSv.instant('schoolAdministration.teachersInvitations.deleteTeacherInvitationModalWarning'))
      .subscribe((response) => {

        if (response === true) {

          this.teacherInvitationSv.deleteTeacherInvitation(this.teacherInvitation._id, this.password).subscribe((success) => {

            this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
              this.tSv.instant('schoolAdministration.teachersInvitations.deleteTeacherInvitationModalMessage'))
              .subscribe(() => {
                this.refreshTeachersInvitations();
                this.showTeacherInvitationDetail = false;
              });

          }, (err) => {
            this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), err.message).subscribe(() => {
              this.showTeacherInvitationDetail = true;
            });
          });

        } else {
          this.showTeacherInvitationDetail = true;
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
