import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SchoolModel} from '../models/school/school.model';
import {AuthService} from './auth.service';
import {UserModel} from '../models/authentication/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private authSv: AuthService) { }

  fetchSchool(): Observable<SchoolModel> {

    return this.authSv.get('/schools/' + UserModel.getCurrent().schoolId).pipe(map((response) => {

      const school = SchoolModel.generate(response.data);
      return school;

    }));
  }

}
