import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {GroupModel} from '../../models/school/group.model';
import {AuthService} from '../auth.service';
import {UserModel} from '../../models/authentication/user.model';
import {map} from 'rxjs/operators';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';
import {StudentModel} from '../../models/authentication/student.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolGroupsService {

  constructor(private authSv: AuthService) { }

  fetchTeacherGroups(filter: SchoolGroupFilter): Observable<GroupModel[]> {

    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/teachers/' + UserModel.getCurrent()._id;

    url += StringExtensionModel.queryString(filter);

    return this.authSv.get(url).pipe(map((response) => {

        const groups = GroupModel.generateModels(response.data);
        return groups;

    }));

  }

  fetchStudentForGroup(groupId: string) {
    let url = '/schools/' + UserModel.getCurrent().schoolId;
    url += '/groups/' + groupId;
    url += '/teachers/' + UserModel.getCurrent()._id;
    url += '/students';

    return this.authSv.get(url).pipe(map((response) => {
      const students = StudentModel.generateModels(response.data.students);
      return students;

    }));

  }

}

export class SchoolGroupFilter {

  skip = 0;
  limit = 50;

  name: string;

  fromAge: Date;
  toAge: Date;

  /*
    By default, things are sorted in ascending order alphabetically.
    You can change htis to 1 to do so in a descending order.
   */
  sort = 1;


}
