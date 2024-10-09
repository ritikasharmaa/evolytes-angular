import { Injectable } from '@angular/core';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {StudentModel} from '../../models/authentication/student.model';
import {map} from 'rxjs/operators';
import {SchoolModel} from '../../models/school/school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolStudentAdminService {

  constructor(private authSv: AuthService) { }

  fetchSchoolStudents(schoolId: string): Observable<StudentModel[]> {

    return this.authSv.get('/admin/schools/' + schoolId + '/students').pipe(map((response) => {

      const students = StudentModel.generateModels(response.data);
      return students;

    }));

  }

  fetchSchoolStudentById(schoolId: string, studentId: string): Observable<StudentModel> {

    return this.authSv.get('/admin/schools/' + schoolId + '/students/' + studentId).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

  updateSchoolStudents(schoolId: string, students: StudentModel[]): Observable<StudentModel[]> {

    return this.authSv.patch('/admin/schools/' + schoolId + '/students', { students }).pipe(map((response) => {

      const newStudents = StudentModel.generateModels(response.data);

      return newStudents;

    }));

  }

  createSchoolStudentsAndRelationships(schoolId: string, students: object[]): Observable<StudentModel[]> {

    return this.authSv.post('/admin/schools/' + schoolId + '/studentsAndRelationships', { students }).pipe(map((response) => {

      const createdStudents = StudentModel.generateModels(response.data);
      return createdStudents;

    }));

  }

  deleteSchoolStudents(schoolId: string, studentId: string): Observable<StudentModel> {

    return this.authSv.delete('/admin/schools/' + schoolId + '/students/' + studentId).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

}
