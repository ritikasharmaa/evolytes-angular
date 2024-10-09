import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {StudentModel, StudentQueryModel} from '../../models/authentication/student.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStudentService {

  constructor(private authSv: AuthService) {}


  fetchStudents(filter: StudentQueryModel): Observable<StudentModel []> {
    let url = '/admin/students';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url.toString()).pipe(map((response) => {
      return StudentModel.generateModels(response.data);
    }));
  }

  fetchStudentById(studentId: string): Observable<StudentModel> {
    return this.authSv.get('/admin/students/' + studentId).pipe(map((studentReceived) => {
      const student = StudentModel.generateModel(studentReceived.data);
      return student;
    }));
  }

  updateStudentWithAdminPassword(studentInfo: StudentModel, password: string): Observable<StudentModel> {
    return this.authSv.patch('/admin/students', {infoStudent: studentInfo, password: password}).pipe(map((studentUpdated) => {
      const student = StudentModel.generateModel(studentUpdated.data);
      return student;
    }));
  }
}

