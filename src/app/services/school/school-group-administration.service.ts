import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {GroupModel, GroupQueryModel} from '../../models/school/group.model';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/authentication/user.model';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';
import {map} from 'rxjs/operators';
import {StudentModel, StudentQueryModel} from 'src/app/models/authentication/student.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolGroupAdministrationService {

  constructor(private authSv: AuthService) {
  }

  fetchGroups(filter: GroupQueryModel = null): Observable<GroupModel[]> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      return GroupModel.generateModels(response.data);

    }));

  }

  fetchGroupGroup(groupId: string): Observable<GroupModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId + '/group';

    return this.authSv.get(url).pipe(map((response) => {

      return GroupModel.generateModel(response.data);

    }));
  }

  /**
   * Only use the name value of the group to create it.
   * Uses the school associated with the currently logged in user to set other fields.
   *
   * @param group The new group to create.
   */
  createGroup(group: GroupModel): Observable<GroupModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups';

    return this.authSv.post(url, group).pipe(map((response) => {
      return GroupModel.generateModel(response.data);
    }));
  }

  /**
   * Only use the name field which can be updated
   * through this endpoint.
   *
   * @param group The group to update and it field.
   */
  updateGroup(group: GroupModel): Observable<GroupModel> {
    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }
    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + group._id;

    return this.authSv.patch(url, group).pipe(map((response) => {

      return GroupModel.generateModel(response.data);

    }));
  }

  deleteGroup(groupId: string, password: string): Observable<boolean> {

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId;
    url += '/deleteGroup';

    return this.authSv.post(url, {password}).pipe(map((response) => {
      return response.data;

    }));

  }

  fetchGroupStudents(filter: GroupQueryModel = null, groupId: string): Observable<StudentModel[]> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId + '/students';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      return StudentModel.generateModels(response.data.students);

    }));
  }

  fetchStudentsWithNoRelationshipToGroup(groupId: string, filter: GroupQueryModel = null): Observable<StudentModel[]> {

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId;
    url += '/notIncludedStudents';

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      return StudentModel.generateModels(response.data.students);

    }));
  }

  addStudentToGroup(groupId: string, studentId: string): Observable<StudentModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId;
    url += '/addStudent/' + studentId;

    return this.authSv.patch(url, {}).pipe(map((response) => {

      return StudentModel.generateModel(response.data);

    }));
  }

  removeStudentFromGroup(groupId: string, studentId: string): Observable<StudentModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId;
    url += '/deleteStudent/' + studentId;

    return this.authSv.patch(url, {}).pipe(map((response) => {

      return StudentModel.generateModel(response.data);

    }));
  }

  fetchGroupTeachers(filter: GroupQueryModel = null, groupId: string): Observable<UserModel[]> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId + '/teachers';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      return UserModel.generateList(response.data.teachers);

    }));
  }

  fetchTeachersWithNoRelationshipToGroup(groupId: string, filter: GroupQueryModel = null): Observable<UserModel[]> {

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId;
    url += '/notIncludedTeachers';

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      return UserModel.generateList(response.data.teachers);

    }));
  }

  addTeacherToGroup(groupId: string, teacherId: string): Observable<UserModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId;
    url += '/addTeacher/' + teacherId;

    return this.authSv.patch(url, {}).pipe(map((response) => {

      return UserModel.generate(response.data);

    }));
  }

  removeTeacherFromGroup(groupId: string, teacherId: string): Observable<UserModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId;
    url += '/deleteTeacher/' + teacherId;

    return this.authSv.patch(url, {}).pipe(map((response) => {

      return UserModel.generate(response.data);

    }));
  }
}
