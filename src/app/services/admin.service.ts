import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {BookOrderModel} from '../models/book-order.model';
import {map} from 'rxjs/operators';
import {UserModel} from '../models/authentication/user.model';
import {StudentModel} from '../models/authentication/student.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private authSv: AuthService) { }

  fetchOrders(country: string = null): Observable<BookOrderModel[]> {

    let url = environment.evoAdminApi + '/subscriptionOrders';
    if (country) {
      url += '?country=' + country;
    }

    return this.authSv.get(url, null, true, true).pipe(map((response) => {

      const orders = BookOrderModel.generateModels(response.data);

      return orders;

    }));

  }

  fetchOrder(id: string): Observable<BookOrderModel> {

    return this.authSv.get(environment.evoAdminApi + '/subscriptionOrders/' + id, null, true, true).pipe(map((response) => {

      const order = BookOrderModel.generateModel(response.data);

      return order;

    }));

  }

  updateOrder(order: BookOrderModel): Observable<BookOrderModel> {

    return this.authSv.patch(environment.evoAdminApi + '/subscriptionOrders/' + order._id, order, null, true, true).pipe(map((response) => {

      const updatedOrder = BookOrderModel.generateModel(response.data);

      return updatedOrder;

    }));

  }

  fetchUsers(): Observable<UserModel[]> {

    return this.authSv.get(environment.evoAdminApi + '/adminUsers', null, true, true).pipe(map((response) => {

      const users = UserModel.generateList(response.data);

      return users;

    }));

  }

  fetchUser(id: string): Observable<UserModel> {

    return this.authSv.get(environment.evoAdminApi + '/adminUsers/' + id, null, true, true).pipe(map((response) => {

      const user = UserModel.generate(response.data);

      return user;

    }));

  }

  fetchStudents(): Observable<StudentModel[]> {

    return this.authSv.get(environment.evoAdminApi + '/adminStudents', null, true, true).pipe(map((response) => {

      const students = StudentModel.generateModels(response.data);
      return students;

    }));

  }

  fetchStudent(id: string): Observable<StudentModel> {

    return this.authSv.get(environment.evoAdminApi + '/adminStudents/' + id, null, true, true).pipe(map((response) => {

      const student = StudentModel.generateModel(response.data);
      return student;

    }));

  }

}
