import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {UserFilter, UserModel} from '../../models/authentication/user.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private authSv: AuthService) {
  }

  fetchUsers(filter: UserFilter): Observable<UserModel[]> {
    let url = '/admin/users';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url.toString()).pipe(map((response) => {
      return UserModel.generateList(response.data);
    }));
  }

  fetchUserById(userId: string) {
    return this.authSv.get('/admin/users/' + userId).pipe(map((userReceived) => {
      const user = UserModel.generate(userReceived.data);
      return user;
    }));
  }

  updateUserWithAdminPassword(userInfo: UserModel, password: string) {
    return this.authSv.patch('/admin/users', {infoUser: userInfo, password: password}).pipe(map((userUpdated) => {
      const user = UserModel.generate(userUpdated.data);
      return user;
    }));
  }
}
