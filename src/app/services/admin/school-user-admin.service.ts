import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/authentication/user.model';
import {AuthService} from '../auth.service';
import {map} from 'rxjs/operators';
import {StudentRelationshipModel} from '../../models/authentication/student-relationship.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolUserAdminService {

  constructor(private authSv: AuthService) { }

  fetchSchoolUsers(schoolId: string): Observable<UserModel[]> {

    return this.authSv.get('/admin/schools/' + schoolId + '/users').pipe(map((response) => {

      const users = UserModel.generateList(response.data);
      return users;

    }));

  }

  fetchSchoolUserById(schoolId: string, userId: string): Observable<UserModel> {

    return this.authSv.get('/admin/schools/' + schoolId + '/users/' + userId).pipe(map((response) => {

      const user = UserModel.generate(response.data);
      return user;

    }));

  }

  createSchoolUsers(schoolId: string, users: UserModel[]): Observable<UserModel[]> {

    const body = { users };

    return this.authSv.post('/admin/schools/' + schoolId + '/users', body).pipe(map((response) => {

      const newUsers = UserModel.generateList(response.data);
      return newUsers;

    }));

  }

  updateSchoolUser(schoolId: string, user: UserModel): Observable<UserModel> {

    const url = '/admin/school/' + schoolId + '/users/' + user._id;

    return this.authSv.patch(url, user).pipe(map((response) => {

      const newUser = UserModel.generate(response.data);
      return newUser;

    }));

  }

  fetchSchoolUserStudentRelationships(schoolId: string, userId: string): Observable<StudentRelationshipModel[]> {

    const url = '/admin/schools/' + schoolId + '/users/' + userId + '/students';

    return this.authSv.get(url).pipe(map((response) => {

      const relationships = StudentRelationshipModel.generateList(response.data);
      return relationships;

    }));

  }

  fetchSchoolUserStudentRelationshipById(schoolId: string, userId: string, studentId: string): Observable<StudentRelationshipModel> {

    const url = '/admin/schools/' + schoolId + '/users/' + userId + '/students/' + studentId;

    return this.authSv.get(url).pipe(map((response) => {

      const relationship = StudentRelationshipModel.generate(response.data);
      return relationship;

    }));

  }

  updateSchoolUserStudentRelationships(schoolId: string, userId: string, relationships: StudentRelationshipModel[]) {

    const url = '/admin/schools/' + schoolId + '/users/' + userId + '/studentRelationships';

    return this.authSv.patch(url,
      { relationships }).pipe(map((response) => {

        const updatedRelationships = StudentRelationshipModel.generateList(response.data);
        return updatedRelationships;

    }));

  }

  deleteSchoolUserStudentRelationshipByStudentId(schoolId: string, userId: string, studentId: string) {

    const url = '/admin/schools/' + schoolId + '/users/' + userId + '/studentRelationships/' + studentId;

    return this.authSv.delete(url).pipe(map((response) => {

      const relationship = StudentRelationshipModel.generate(response.data);
      return relationship;

    }));

  }

}
