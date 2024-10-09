import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {UserModel} from '../models/authentication/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authSv: AuthService) { }

  verifyEmail(token: string): Observable<UserModel> {

    const url = '/users/me/verify/' + token;

    return this.authSv.get( url, {}, false).pipe(map((response) => {

      const updatedUser = UserModel.generate( response.data );
      return updatedUser;

    }));

  }

  updateUser(user: UserModel): Observable<UserModel> {

    return this.authSv.patch('/users/me', user).pipe(map((response) => {

      const uUser = UserModel.generate(response.data);
      UserModel.setCurrent(uUser);

      return uUser;

    }));

  }

  resendVerificationEmail(email: string): Observable<{}> {

    return this.authSv.post('/users/me/resendVerificationEmail', {}).pipe(map((response) => {

      return {};

    }));

  }

  passwordReset(token: string, newPassword: string): Observable<{}> {

    const url = '/users/me/resetPassword/' + token;

    return this.authSv.post(url, { newPassword: newPassword }, {}, false).pipe(map((response) => {

      return {};

    }));

  }

  forgotPasswordEmail(email: string): Observable<{}> {

    return this.authSv.post('/users/me/forgotPassword', { email }, {}, false).pipe(map((response) => {

      return {};

    }));

  }


  changePassword(password: string, newPassword: string): Observable<UserModel> {

    const body = { password, newPassword };

    return this.authSv.patch('/users/password', body).pipe(map((response) => {

      const user = UserModel.generate(response.data);
      return user;

    }));

  }


}
