import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringExtensionModel } from '../models/extensions/string-extension.model';
import { LicenseFilter, SchoolLicenseModel } from 'src/app/models/school/school-license.model';
import { UserModel } from '../models/authentication/user.model';
import { SchoolModel } from '../models/school/school.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  schoolId: string
  constructor(private authSv: AuthService) {
  }



  getLicenseHistoryBySchoolId(schoolId: string, filter: LicenseFilter): Observable<SchoolLicenseModel[]> {
    let url = `/admin/school/license-history/${schoolId}`
    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }
    return this.authSv.get(url.toString()).pipe(map((response) => {

      const licensesHistory = SchoolLicenseModel.generateList(response.data);

      return licensesHistory;
    }));
  }
}






