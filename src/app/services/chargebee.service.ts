import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {StudentModel} from '../models/authentication/student.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChargebeeService {

  constructor(private authSv: AuthService) { }

  startFreeTrial(studentId = StudentModel.getCurrent()._id): Observable<StudentModel> {

    return this.authSv.post('/students/' + studentId + '/startFreeTrial', {}).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

  newSubscriptionCheckout(data: any, studentId = StudentModel.getCurrent()._id) {

    return this.authSv.post('/students/' + studentId + '/checkout', data).pipe(map((response) => {
      return response.data;
    })).toPromise();
  }

  manageSubscriptionCheckout(studentId = StudentModel.getCurrent()._id) {

    return this.authSv.post('/students/' + studentId + '/manageSubscription', {}).pipe(map((response) => {

      return response.data;
    })).toPromise();

  }

  updateStudentSubscriptionStatus(studentId: string = StudentModel.getCurrent()._id): Observable<StudentModel> {

    return this.authSv.patch('/students/' + studentId + '/updateSubscriptionStatus', {}).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

}
