import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {StudentModel} from '../models/authentication/student.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private authSv: AuthService) {
  }

  createStudent(student: StudentModel): Observable<StudentModel> {


    return this.authSv.post('/students', student).pipe(map((response) => {

      const newStudent = StudentModel.generateModel(response.data);
      return newStudent;

    }));

  }

  fetchStudents(): Observable<StudentModel[]> {

    return this.authSv.get('/students').pipe(map((response) => {

      const students = StudentModel.generateModels(response.data);
      return students;

    }));

  }

  fetchStudent(studentId: string): Observable<StudentModel> {

    return this.authSv.get('/students/' + studentId).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

  updateStudent(student: StudentModel): Observable<StudentModel> {

    return this.authSv.patch('/students/' + student._id, student).pipe(map((response) => {

      const updatedStudent = StudentModel.generateModel(response.data);
      return updatedStudent;

    }));

  }

  deleteStudent(studentId: string): Observable<StudentModel> {

    return this.authSv.delete('/students/' + studentId).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

}
