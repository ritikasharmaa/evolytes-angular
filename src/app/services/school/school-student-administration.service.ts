import { Injectable } from '@angular/core';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {StudentModel, StudentQueryModel} from '../../models/authentication/student.model';
import {UserModel} from '../../models/authentication/user.model';
import {map} from 'rxjs/operators';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolStudentAdministrationService {

  constructor(private authSv: AuthService) { }

  fetchStudents(filter: StudentQueryModel = null): Observable<StudentModel[]> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/students';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      const students = StudentModel.generateModels(response.data);
      return students;

    }));

  }

  fetchStudentById(studentId: string): Observable<StudentModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/students/' + studentId;

    return this.authSv.get(url).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

  /**
   * Only uses the firstName, middleName, lastName and birthDate values of the student to create it.
   * Uses the school associated with the currently logged in user to set other fields.
   *
   * @param student The new student to create.
   */
  createStudent(student: StudentModel): Observable<StudentModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/students';

    return this.authSv.post(url, student).pipe(map((response) => {

      const newStudent = StudentModel.generateModel(response.data);
      return newStudent;

    }));

  }

  /**
   * Only uses the firstName, middleName, lastName, birthDate and culture fields which can be updated
   * through this endpoint.
   *
   * @param student The student to update and its fields.
   */
  updateStudent(student: StudentModel): Observable<StudentModel> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/students/' + student._id;

    return this.authSv.patch(url, student).pipe(map((response) => {

      const newStudent = StudentModel.generateModel(response.data);
      return newStudent;

    }));

  }


  /**
   * Only uses the firstName, middleName, lastName, birthDate and culture fields which can be updated
   * to create student from each model.
   *
   * @param students A list of student models to be created.
   */
  importStudents(students: StudentModel[]): Observable<StudentModel[]> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/importStudents';

    return this.authSv.post(url, students).pipe(map((response) => {

      const newStudents = StudentModel.generateModels(response.data);
      return newStudents;

    }));

  }

  deleteStudent(studentId: string, password: string): Observable<boolean> {

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/students/' + studentId;
    url += '/deleteStudent';

    return this.authSv.post(url, { password }).pipe(map((response) => {

      const success = response.data;
      return success;

    }));

  }

}
