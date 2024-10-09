import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { SchoolFilter, SchoolModel } from '../../models/school/school.model';
import { map } from 'rxjs/operators';
import { StringExtensionModel } from '../../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolAdminService {

  constructor(private authSv: AuthService) {
  }

  fetchSchools(filter?: SchoolFilter): Observable<SchoolModel[]> {

    let url = '/admin/schools';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {
      return SchoolModel.generateList(response.data.schools);

    }));

  }

  fetchSchoolById(schoolId: string): Observable<SchoolModel> {
    return this.authSv.get('/admin/schools/' + schoolId).pipe(map((response) => {

      const school = SchoolModel.generate(response.data);

      return school;

    }));

  }

  updateSchool(school: SchoolModel): Observable<SchoolModel> {

    return this.authSv.patch('/admin/schools', school).pipe(map((response) => {

      const createdSchool = SchoolModel.generate(response.data);

      return createdSchool;

    }));

  }


}
