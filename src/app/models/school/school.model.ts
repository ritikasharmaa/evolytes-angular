import { CountryModel } from '../localization/country.model';
import { CultureModel } from '../localization/culture.model';
import { StudentModel } from '../authentication/student.model';
import { UserModel } from '../authentication/user.model';

export class SchoolModel {

  static currentSchoolKey = 'currentSchoolKey';
  static currentSchool: SchoolModel = null;

  name: string;
  address: string;
  city: string;
  zip: string;
  schoolType: string;
  country: string;
  culture: string;
  numLicenses: number;
  pricePerStudent: number;
  currency: string;
  licenseStartsAt: Date;
  licenseExpiresAt: Date;
  createdAt: Date;
  licenseUpdatedAt: Date;
  _id: string;


  constructor() {
    this.country = CountryModel.ISL;
    this.culture = CultureModel.isIS;
  }

  static generate(json: any): SchoolModel {

    const school = new SchoolModel();
    school._id = json._id;
    school.name = json.name;
    school.address = json.address;
    school.city = json.city;
    school.zip = json.zip;
    school.country = json.country;
    school.numLicenses = json.numLicenses;
    school.pricePerStudent = json.pricePerStudent;
    school.currency = json.currency;
    school.culture = json.culture;
    school.schoolType = json.schoolType;
    if (school.schoolType === null) {
      school.schoolType = StudentModel.SchoolTypes.public;
    }

    if (json.licenseExpiresAt) {
      school.licenseExpiresAt = new Date(json.licenseExpiresAt);
    }

    if (json.licenseStartsAt) {
      school.licenseStartsAt = new Date(json.licenseStartsAt);
    }

    if (json.createdAt) {
      school.createdAt = new Date(json.createdAt);
    }
    if (json.licenseUpdatedAt) {
      school.licenseUpdatedAt = new Date(json.licenseUpdatedAt);
    }

    return school;

  }

  static generateList(jsonList: any[]): SchoolModel[] {

    const list = [];

    for (const json of jsonList) {
      const school = SchoolModel.generate(json);
      list.push(school);
    }

    return list;

  }

  static getCurrent(): SchoolModel {

    if (this.currentSchool) {
      return this.currentSchool;
    }

    const schoolJson = localStorage.getItem(SchoolModel.currentSchoolKey);
    if (schoolJson) {
      this.currentSchool = SchoolModel.generate(JSON.parse(schoolJson));
    }

    return this.currentSchool;
  }

  static setCurrent(school: SchoolModel) {

    this.currentSchool = school;

    if (this.currentSchool) {
      localStorage.setItem(this.currentSchoolKey, JSON.stringify(this.currentSchool));
    } else {
      this.removeCurrent();
    }

  }

  static removeCurrent() {
    this.currentSchool = null;
    localStorage.removeItem(this.currentSchoolKey);
  }

}

export class SchoolFilter {

  skip = 0;
  limit: number = undefined;
  country: string = undefined;
  search: string = undefined;
}
