import {DateExtensionModel} from '../extensions/date-extension.model';
import {StringExtensionModel} from '../extensions/string-extension.model';
import {TokenModel} from './token.model';
import {CountryModel} from '../localization/country.model';
import {CultureModel} from '../localization/culture.model';

export class UserModel {

  private static currentUser: UserModel = null;
  private static currentAdminCountry: string = null;
  private static storageKey = 'user';
  private static clientIdStorageKey = 'clientId';
  private static adminCountryStorageKey = 'adminCountry';

  public static SchoolAccessTypes = {
    teacher: 'teacher',
    admin: 'admin',
    list: function() {
      return [this.teacher, this.admin];
    }
  };

  public static SchoolAccessTypesDropdown = [{
    key: 'teacher',
    iconURL: null,
    value: 'schoolAccessTypes.teacher'
  }, {
    key: 'admin',
    iconURL: null,
    value: 'schoolAccessTypes.admin'
  }];

  public _id: string;
  public schoolId: string;
  public schoolAccessType: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public culture: string;
  public country: string;
  public phone: string;

  public password: string;

  public isEmailVerified: boolean;
  public isAdmin: boolean;

  public createdAt: Date;
  public updatedAt: Date;

  static generate(json: any): UserModel {

    const user = new UserModel();
    user._id = json._id;
    user.schoolId = json.schoolId;
    user.schoolAccessType = json.schoolAccessType;
    user.firstName = json.firstName;
    user.lastName = json.lastName;
    user.email = json.email;
    user.culture = json.culture;
    user.country = json.country;
    user.phone = json.phone;

    user.isEmailVerified = json.isEmailVerified;
    user.isAdmin = json.isAdmin;

    user.createdAt = DateExtensionModel.date(json.createdAt);
    user.updatedAt = DateExtensionModel.date(json.updatedAt);

    return user;

  }

  static generateList(jsonList: any): UserModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(UserModel.generate(json));
    }

    return list;

  }

  /**
   * @description Gets the currently cached user, if none is cached, we check if there is one
   * in the local storage and create a user instance from the stored json. Otherwise we return null.
   */
  static getCurrent(): UserModel {

    if (this.currentUser) {
      return this.currentUser;
    }

    const currentUserJson = localStorage.getItem(this.storageKey);
    if (currentUserJson) {
      this.currentUser = this.generate(JSON.parse(currentUserJson));
      return this.currentUser;
    }

    return null;
  }

  /**
   * @description Updates the current user who is logged in and making requests.
   *
   * @param user the new user object.
   */
  static setCurrent(user: UserModel) {

    this.currentUser = user;

    if (user) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } else {
      this.removeCurrent();
    }

  }

  /**
   * @description Removes the currently cached user who is logged in.
   */
  static removeCurrent() {
    this.currentUser = null;
    localStorage.removeItem(this.storageKey);
  }

  /**
   * @description Creates a clientId for the web if none exists or sends
   * a new one if none currently exists and stores it in local storage.
   */
  static getClientId(): string {

    let clientId = localStorage.getItem(this.clientIdStorageKey);
    if (clientId === null || clientId === undefined) {
      // Create a new client Id
      clientId = StringExtensionModel.randomString(12);
      localStorage.setItem(this.clientIdStorageKey, clientId);
    }

    return clientId;

  }

  /**
   * @description A method which indicates whether a current user exists and tokens which can be refreshed
   * so that the user can log into the dashboard.
   */
  static isLoggedIn(): boolean {

    if (TokenModel.getCurrent() && UserModel.getCurrent()) {

      if (TokenModel.getCurrent().isRefreshTokenExpired() === false) {
        return true;
      }

    }

    return false;
  }

  static getAdminCountry(): string {

    if (UserModel.currentAdminCountry) {

      return UserModel.currentAdminCountry;
    }

    const adminCountry = localStorage.getItem(UserModel.adminCountryStorageKey);
    if (adminCountry === null || adminCountry === undefined) {
      UserModel.currentAdminCountry = CountryModel.ISL;
    } else {
      UserModel.currentAdminCountry = adminCountry;
    }

    return UserModel.currentAdminCountry;

  }

  static setAdminCountry(country: string) {

    if (country) {
      UserModel.currentAdminCountry = country;
      localStorage.setItem(this.adminCountryStorageKey, country);
    } else {
      this.removeAdminCountry();
    }

  }

  static removeAdminCountry() {

    localStorage.removeItem(this.adminCountryStorageKey);

  }

  getFullName(): string {

    let fullName = '';
    if (this.firstName) {
      fullName += this.firstName;
      fullName += ' ';
    }

    if (this.lastName) {
      fullName += this.lastName;
    }

    return fullName;

  }

  getTwoInitials(): string {

    if (!this.firstName || !this.lastName) {
      return '';
    }

    return this.firstName.substring(0, 1).toUpperCase() + this.lastName.substring(0, 1).toUpperCase();

  }

  getSchoolAccessType(): string {

    if (this.schoolAccessType) {
      return this.schoolAccessType;
    }

    return UserModel.SchoolAccessTypes.teacher;
  }


}

export class UserFilter {

  skip = 0;
  limit: number = undefined;

  name: string = undefined;
  email: string = undefined;

  country: string = undefined;
}
