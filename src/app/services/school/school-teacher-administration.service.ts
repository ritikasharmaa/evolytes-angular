import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {UserFilter, UserModel} from '../../models/authentication/user.model';
import {StudentModel, StudentQueryModel} from '../../models/authentication/student.model';
import {map} from 'rxjs/operators';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolTeacherAdministrationService {

  constructor(private authSv: AuthService) {
  }

  fetchTeachers(filter: UserFilter = null): Observable<UserModel[]> {


    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachers';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      const teachers = UserModel.generateList(response.data);
      return teachers;

    }));

  }

  fetchTeacher(teacherId: string): Observable<UserModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachers/' + teacherId;

    return this.authSv.get(url).pipe(map((response) => {

      const teacher = UserModel.generate(response.data);
      return teacher;

    }));

  }

  findTeacher(teacherEmail: string): Observable<boolean> {

    const url = '/schools/teacher/find/' + teacherEmail;

    return this.authSv.get(url, {}, false).pipe(map((response) => {

      return response.data;

    }));
  }

  /**
   * You can update the firstName, lastName, schoolAccessType and culture for the teacher.
   *
   * @param teacher The teacher model to update.
   */
  updateTeacher(teacher: UserModel): Observable<UserModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachers/' + teacher._id;

    return this.authSv.patch(url, teacher).pipe(map((response) => {

      const updatedTeacher = UserModel.generate(response.data);
      return updatedTeacher;

    }));

  }

  fetchStudentsForTeacher(teacherId: string, filter: StringExtensionModel = null): Observable<StudentModel[]> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachers/' + teacherId;
    url += '/students';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      const students = StudentModel.generateModels(response.data);
      return students;

    }));

  }

  fetchStudentsWithNoRelationshipToTeacher(teacherId: string, filter: StudentQueryModel = null): Observable<StudentModel[]> {

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachers/' + teacherId;
    url += '/notIncludedStudents';

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      const students = StudentModel.generateModels(response.data);
      return students;

    }));

  }

  addStudentToTeacher(teacherId: string, studentId: string): Observable<StudentModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachers/' + teacherId;
    url += '/addStudent/' + studentId;

    return this.authSv.post(url, {}).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

  removeStudentFromTeacher(teacherId: string, studentId: string): Observable<StudentModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachers/' + teacherId;
    url += '/removeStudent/' + studentId;

    return this.authSv.delete(url).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

  deleteTeacher(teacherId: string, password: string): Observable<boolean> {

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/teachers/' + teacherId;
    url += '/deleteTeacher';

    return this.authSv.post(url, {password}).pipe(map((response) => {

      const success = response.data;
      return success;

    }));

  }

}
