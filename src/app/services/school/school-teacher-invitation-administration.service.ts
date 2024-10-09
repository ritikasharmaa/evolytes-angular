import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {UserModel} from '../../models/authentication/user.model';
import {Observable} from 'rxjs';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';
import {map} from 'rxjs/operators';
import {TeacherInvitationFilter, TeacherInvitationModel} from '../../models/authentication/teacher-invitation';
import {TokenModel} from '../../models/authentication/token.model';
import {SchoolModel} from '../../models/school/school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolTeacherInvitationAdministrationService {

  constructor(private authSv: AuthService) {
  }

  /**
   * Invites a teacher by email, the required properties in the user model
   * are email, firstName, lastName and schoolAccessType which are used
   * for the invitation.
   *
   * @param user The information about the user to be added.
   */
  inviteTeacher(user: TeacherInvitationModel): Observable<TeacherInvitationModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/inviteTeacherNew';

    return this.authSv.post(url, user).pipe(map((response) => {

      return response.data;

    }));
  }

  fetchInvitationTeacher(schoolId: string, token: string): Observable<TeacherInvitationModel> {

    let url = '/schools/' + schoolId;
    url += '/fetchInvitation/' + token;

    return this.authSv.get(url, {}, false).pipe(map((response) => {

      return TeacherInvitationModel.generateModel(response.data);

    }));
  }

  // tslint:disable-next-line:max-line-length
  acceptTeacherInvitation(schoolId: string, token: string, password: string, firstName: string = null, lastName: string = null): Observable<{ user: UserModel, tokens: TokenModel, school: SchoolModel }> {

    let url = '/schools/' + schoolId;
    url += '/acceptInvitationV2/' + token;

    const body = {
      password,
      firstName,
      lastName,
      clientInfo: {
        client: 'web',
        clientId: UserModel.getClientId()
      }
    };

    return this.authSv.post(url, body, {}, false).pipe(map((response) => {

      const user = UserModel.generate(response.data.user);
      const tokens = TokenModel.generate(response.data.tokens);
      const school = SchoolModel.generate(response.data.school);

      return {user, tokens, school};

    }));

  }

  fetchTeachersInvitations(filter: TeacherInvitationFilter = null): Observable<TeacherInvitationModel[]> {


    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachersInvitations';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      return TeacherInvitationModel.generateModels(response.data);

    }));
  }

  /**
   * You can update the firstName, lastName and schoolAccessType for the teacherInvitation.
   *
   * @param teacherInvitation The teacherInvitation model to update.
   */
  updateTeacherInvitation(teacherInvitation: TeacherInvitationModel): Observable<TeacherInvitationModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachersInvitations/' + teacherInvitation._id;

    return this.authSv.patch(url, teacherInvitation).pipe(map((response) => {

      return TeacherInvitationModel.generateModel(response.data);

    }));

  }

  resendTeacherInvitation(teacherInvitationId: string): Observable<boolean> {


    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachersInvitations/' + teacherInvitationId;
    url += '/resend';

    return this.authSv.get(url).pipe(map((response) => {

      return response.data;

    }));
  }

  deleteTeacherInvitation(teacherInvitationId: string, password: string): Observable<boolean> {

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachersInvitations/' + teacherInvitationId;
    url += '/deleteTeacherInvitation';

    console.log(password);
    return this.authSv.post(url, {password}).pipe(map((response) => {

      return response.data;

    }));
  }

  /**
   * Only uses the amil, firstName and lastName fields which can be updated
   * to create teacher invitation from each model.
   *
   * @param teachersInvitations A list of student models to be created.
   */
  importTeachersInvitations(teachersInvitations: UserModel[]): Observable<number> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/importTeachersInvitations';

    return this.authSv.post(url, teachersInvitations).pipe(map((response) => {

      return response.data;

    }));

  }
}
