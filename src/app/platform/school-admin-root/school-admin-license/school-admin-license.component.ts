import { Component, OnInit } from '@angular/core';
import { SchoolLicenseModel } from 'src/app/models/school/school-license.model';
import { StudentQueryModel } from 'src/app/models/authentication/student.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { SchoolLicenseAdministrationService } from 'src/app/services/school/school-license-administration.service';
import {TranslateService} from '@ngx-translate/core';
import {ChartDataSets} from 'chart.js';
import {DateTime} from 'luxon';
import {NumberExtensionModel} from '../../../models/extensions/number-extension.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {PricingModel} from '../../../models/pricing.model';

@Component({
  selector: 'app-school-school-license',
  templateUrl: './school-admin-license.component.html',
  styleUrls: ['./school-admin-license.component.css']
})
export class SchoolAdminLicenseComponent implements OnInit {

  license: SchoolLicenseModel = new SchoolLicenseModel();
  licenseHistory: SchoolLicenseModel[] = [];
  hasMoreLicenses = true;
  filter = new StudentQueryModel();
  data: UserModel = new UserModel();
  count: number;

  chartTitle = '';
  labels: string[] = [this.tSv.instant('schoolAdministration.licenses.available')];
  chartData: ChartDataSets[] = [{
    data: [0],
    backgroundColor: ['#F8F9F9']
  }];

  constructor(
    private schoolLicenseSv: SchoolLicenseAdministrationService,
    private tSv: TranslateService
  ) { }


  ngOnInit(): void {

    this.filter.limit = 20;

    this.schoolLicenseSv.fetchActiveLicenses(UserModel.getCurrent().schoolId).subscribe((response) => {

      this.license = response.license;

      if (this.license && this.license.numLicenses > 0 && this.license.activeLicenses > 0) {

        this.labels = [
          this.tSv.instant('schoolAdministration.licenses.assigned'),
          this.tSv.instant('schoolAdministration.licenses.available')
        ];

        this.chartTitle = this.license.numLicenses.toString(10);

        const activeLicenses = this.license.activeLicenses;
        let availableLicenses = this.license.numLicenses - this.license.activeLicenses;
        if (availableLicenses < 0) {
          availableLicenses = 0;
        }

        this.chartData = [{
          data: [activeLicenses, availableLicenses],
          backgroundColor: ['#79C570', '#F8F9F9']
        }];

      } else {

        this.labels = [
          this.tSv.instant('schoolAdministration.licenses.available')
        ];

        this.chartTitle = '0';

        this.chartData = [{
          data: [0],
          backgroundColor: ['#F8F9F9']
        }];

      }

    });

    this.fetchLicenseHistory();

  }

  getSchoolLicenseType(license: SchoolLicenseModel): string {

    if (license.pricePerStudent == null || license.pricePerStudent <= 0) {
      return this.tSv.instant('schoolAdministration.licenses.licenseTypes.trial');
    } else {
      return this.tSv.instant('schoolAdministration.licenses.licenseTypes.full');
    }

  }

  fetchLicenseHistory() {

    this.filter.skip = this.licenseHistory.length;
    this.schoolLicenseSv.fetchLicenceHistory(UserModel.getCurrent().schoolId, this.filter).subscribe((licenses) => {

      if (licenses.length === this.filter.limit) {
        this.hasMoreLicenses = true;
      } else {
        this.hasMoreLicenses = false;
      }

      this.licenseHistory = this.licenseHistory.concat(licenses);

      console.log('license history: ' + JSON.stringify(this.licenseHistory, null, 4));

    });

  }

  getNumActiveLicenses(): string {

    if (this.license && this.license.activeLicenses) {
      return this.license.activeLicenses.toString();
    }

    return '0';
  }

  getAvailableLicenses(): string {

    if (this.license) {

      if (this.license.numLicenses === null || this.license.numLicenses === undefined) {

        return '0';
      }

      let availableLicenses = this.license.numLicenses - this.license.activeLicenses;
      if (availableLicenses < 0) {
        availableLicenses = 0;
      }

      return availableLicenses.toString(10);
    }

    return '0';
  }

  getSchoolPricePerStudent(license: SchoolLicenseModel): string {

    if (license && license.pricePerStudent) {

      return NumberExtensionModel.delimiterSeparatedNumber(license.pricePerStudent, CultureModel.numberDelimiterForCulture(UserModel.getCurrent().culture), 0) + ' ' + PricingModel.symbolFromCurrency(license.currency);
    }

    return '0';
  }

  getSchoolTotalCost(license: SchoolLicenseModel): string {

    if (license && license.pricePerStudent && license.numLicenses) {

      const value = license.pricePerStudent * license.numLicenses;

      return NumberExtensionModel.delimiterSeparatedNumber(value, CultureModel.numberDelimiterForCulture(UserModel.getCurrent().culture)) + ' ' + PricingModel.symbolFromCurrency(this.license.currency);
    }

    return '0';
  }

  getLicenseStart(): string {

    if (this.license && this.license.licenseStartsAt) {

      const date = DateTime.fromJSDate(this.license.licenseStartsAt);

      return date.toFormat('dd / MM / yyyy');

    }

    return '';

  }

  getLicenseEnd(): string {

    if (this.license && this.license.licenseExpiresAt) {

      const date = DateTime.fromJSDate(this.license.licenseExpiresAt);

      return date.toFormat('dd / MM / yyyy');
    }

    return '';

  }

}

