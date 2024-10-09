import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {UserModel} from '../../models/authentication/user.model';
import {Observable} from 'rxjs';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';
import {map} from 'rxjs/operators';
import {TeacherInvitationFilter, TeacherInvitationModel} from '../../models/authentication/teacher-invitation';

@Injectable({
  providedIn: 'root'
})
export class SchoolUserInvitationAdminService {

  constructor(private authSv: AuthService) {
  }

  /**
   * Invites a teacher by email, the required properties in the user model
   * are email, firstName, lastName and schoolAccessType which are used
   * for the invitation.
   *
   * @param userInvitation The information about the user to be added.
   */
  inviteTeacher(userInvitation: TeacherInvitationModel, schoolId: string): Observable<TeacherInvitationModel> {

    if (!UserModel.getCurrent() || !UserModel.getCurrent().isAdmin) {
      // User has to have a school Id
    }

    let url = '/admin/schools/' + schoolId;
    url += '/inviteUser';

    return this.authSv.post(url, userInvitation).pipe(map((response) => {

      return response.data;

    }));
  }

  fetchUsersInvitations(filter: TeacherInvitationFilter = null, schoolId: string): Observable<TeacherInvitationModel[]> {

    if (!UserModel.getCurrent() || !UserModel.getCurrent().isAdmin) {
      // User has to have a school Id
    }

    let url = '/admin/schools/' + schoolId;
    url += '/usersInvitations';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      return TeacherInvitationModel.generateModels(response.data);

    }));
  }

  /**
   * You can update the firstName, lastName and schoolAccessType for the userInvitation.
   *
   * @param userInvitation The user invitation model to update.
   * @param schoolId The school id
   */
  updateUserInvitation(userInvitation: TeacherInvitationModel, schoolId: string): Observable<TeacherInvitationModel> {

    if (!UserModel.getCurrent() || !UserModel.getCurrent().isAdmin) {
      // User has to have a school Id
    }

    let url = '/admin/schools/' + schoolId;
    url += '/usersInvitations/' + userInvitation._id;

    return this.authSv.patch(url, userInvitation).pipe(map((response) => {

      return TeacherInvitationModel.generateModel(response.data);

    }));

  }

  resendUserInvitation(userInvitationId: string, schoolId: string): Observable<boolean> {

    if (!UserModel.getCurrent() || !UserModel.getCurrent().isAdmin) {
      // User has to have a school Id
    }

    let url = '/admin/schools/' + schoolId;
    url += '/usersInvitations/' + userInvitationId;
    url += '/resend';

    return this.authSv.get(url).pipe(map((response) => {

      return response.data;

    }));
  }

  deleteUserInvitation(userInvitationId: string, password: string, schoolId: string): Observable<boolean> {

    if (!UserModel.getCurrent() || !UserModel.getCurrent().isAdmin) {
      // User has to have a school Id
    }

    let url = '/admin/schools/' + schoolId;
    url += '/usersInvitations/' + userInvitationId;
    url += '/deleteUserInvitation';

    console.log(password);
    return this.authSv.post(url, {password}).pipe(map((response) => {

      return response.data;

    }));
  }

  /**
   * Only uses the email, firstName and lastName fields which can be updated
   * to create user invitation from each model.
   *
   * @param usersInvitations A list of user models that need to be invited
   * @param schoolId The school id
   */
  importUsersInvitations(usersInvitations: TeacherInvitationModel[], schoolId: string): Observable<number> {

    if (!UserModel.getCurrent() || !UserModel.getCurrent().isAdmin) {
      // User has to have a school Id
    }

    let url = '/school/schools/' + schoolId;
    url += '/importUsersInvitations';

    return this.authSv.post(url, usersInvitations).pipe(map((response) => {

      return response.data;

    }));

  }
}
