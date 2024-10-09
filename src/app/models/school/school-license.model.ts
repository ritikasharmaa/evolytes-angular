import { CultureModel } from '../localization/culture.model';
import { UserModel } from '../authentication/user.model';
import {SchoolModel} from './school.model';

export class SchoolLicenseModel {
  static currentKey = 'currentLicenseKey';
  static currentLicense: SchoolLicenseModel = null;
  constructor() {
    this.culture = CultureModel.isIS;
  }
  userId: string;
  pricePerStudent: number;
  numLicenses: number;
  currency: string;
  licenseStartsAt: Date;
  licenseExpiresAt: Date;
  changedAt: Date;
  _id: string;
  schoolId: string;
  licenseCreatedAt: Date;
  licenseUpdatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  culture: string = CultureModel.enGB;
  user: UserModel;
  school: SchoolModel;
  activeLicenses: number;


  static generate(json: any): SchoolLicenseModel {

    const license = new SchoolLicenseModel();

    license._id = json._id;
    license.pricePerStudent = json.pricePerStudent;
    license.numLicenses = json.numLicenses;
    license.currency = json.currency;
    license.userId = json.userId;
    license.schoolId = json.schoolId;
    license.culture = json.culture;
    license.activeLicenses = json.activeStudents;


    if (typeof json.userId === 'string') {
      license.userId = json.userId;
    } else if (typeof json.userId === 'object') {
      license.user = UserModel.generate(json.userId);
      license.userId = license.user._id;
    }

    if (typeof json.schoolId === 'string') {
      license.schoolId = json.schoolId;
    } else if (typeof json.schoolId === 'object') {
      license.school = SchoolModel.generate(json.schoolId);
      license.schoolId = license.school._id;
    }

    if (json.user) {
      license.user = UserModel.generate(json.user);
    }

    if (json.school) {
      license.school = SchoolModel.generate(json.school);
    }



    if (json.licenseStartsAt) {
      license.licenseStartsAt = new Date(json.licenseStartsAt);
    }

    if (json.licenseExpiresAt) {
      license.licenseExpiresAt = new Date(json.licenseExpiresAt);
    }

    if (json.changedAt) {
      license.changedAt = new Date(json.changedAt);
    }

    if (json.licenseCreatedAt) {
      license.licenseCreatedAt = new Date(json.licenseCreatedAt);
    }

    if (json.createdAt) {
      license.createdAt = new Date(json.createdAt);
    }

    if (json.licenseUpdatedAt) {
      license.licenseUpdatedAt = new Date(json.licenseUpdatedAt);
    }

    return license;

  }
  static generateList(jsonList: any[]): SchoolLicenseModel[] {

    const list = [];

    for (const json of jsonList) {
      const license = SchoolLicenseModel.generate(json);
      list.push(license);
    }

    return list;

  }
  static getCurrent(): SchoolLicenseModel {

    if (this.currentLicense) {
      return this.currentLicense;
    }

    const licenseJson = localStorage.getItem(SchoolLicenseModel.currentKey);
    if (licenseJson) {
      this.currentLicense = SchoolLicenseModel.generate(JSON.parse(licenseJson));
    }

    return this.currentLicense;
  }

}
export class LicenseFilter {

  skip = 0;
  limit: number = undefined;
  country: string = undefined;

}
