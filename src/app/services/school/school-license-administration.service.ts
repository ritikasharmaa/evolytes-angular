import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { LicenseFilter, SchoolLicenseModel } from 'src/app/models/school/school-license.model';
import { ErrorModel } from 'src/app/models/shared/error.model';
import { StringExtensionModel } from 'src/app/models/extensions/string-extension.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { AuthService } from '../auth.service';
import {SchoolModel} from '../../models/school/school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolLicenseAdministrationService {

  constructor(private authSv: AuthService) { }

  fetchLicenceHistory(schoolId: string, filter: LicenseFilter): Observable<SchoolLicenseModel[]> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }

    let url = `/schools/` + UserModel.getCurrent().schoolId;
    url += `/licenseHistory`;
    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url.toString()).pipe(map((response) => {

      const license = SchoolLicenseModel.generateList(response.data);

      return license;
    }));

  }

  fetchActiveLicenses(schoolId: string): Observable<{ license: SchoolLicenseModel, school: SchoolModel }> {

    if (!UserModel.getCurrent().schoolId ||
      UserModel.getCurrent().schoolAccessType !== UserModel.SchoolAccessTypes.admin) {
      // User has to have a school Id
    }
    if (schoolId) {
      let url = `/schools/` + UserModel.getCurrent().schoolId;
      url += '/activeStudentLicenses';

      return this.authSv.get(url.toString()).pipe(map((response) => {

        const data = {
          ...response.data.school,
          activeStudents: response.data.activeStudents
        };

        const license = SchoolLicenseModel.generate(data);
        const school = SchoolModel.generate(response.data.school);

        return {
          school,
          license
        };

      }));

    }
  }

}
