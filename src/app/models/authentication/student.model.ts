import {SubscriptionModel} from '../subscription.model';
import {CountryModel} from '../localization/country.model';
import {CultureModel} from '../localization/culture.model';
import {StudentRelationshipModel} from './student-relationship.model';

export class StudentModel {

  private static storageKey = 'student';
  private static currentStudent: StudentModel = null;

  constructor() {
    this.evolytesProfile = new EvolytesProfile();
  }

  public static SubscriptionStatusTypes = {
    Active: 'Active',
    BillingFailed: 'BillingFailed',
    FirstBillingFailed: 'FirstBillingFailed',
    NotSetup: 'NotSetup',
    Test: 'Test'
  };

  static ChargebeeSubscriptionsStatusTypes = {
    future: 'future',
    inTrial: 'in_trial',
    active: 'active',
    nonRenewing: 'non_renewing',
    paused: 'paused',
    cancelled: 'cancelled',
    notSubscribed: 'not_subscribed',
    list: function () {
      return [this.future, this.inTrial, this.active, this.nonRenewing, this.nonRenewing, this.paused, this.cancelled, this.notSubscribed];
    }
  };

  public static SchoolTypes = {
    public: 'public',
    private: 'private',
    home: 'home',
    list: function () {
      return [this.public, this.private, this.home];
    }
  };

  public static SchoolTypesDropdownList = [{
    key: 'public',
    value: 'schoolTypes.public',
    iconURL: null
  }, {
    key: 'private',
    value: 'schoolTypes.private',
    iconURL: null
  }, {
    key: 'home',
    value: 'schoolTypes.home',
    iconURL: null
  }];

  public static ChargebeeSubscriptionsStatusTypesDropdownList = [{
    key: 'in_trial',
    value: 'inTrial',
    iconURL: null
  }, {
    key: 'future',
    value: 'future',
    iconURL: null
  },
    {
      key: 'active',
      value: 'active',
      iconURL: null
    },
    {
      key: 'non_renewing',
      value: 'nonRenewing',
      iconURL: null
    },
    {
      key: 'paused',
      value: 'paused',
      iconURL: null
    },
    {
      key: 'cancelled',
      value: 'cancelled',
      iconURL: null
    },
    {
      key: 'not_subscribed',
      value: 'notSubscribed',
      iconURL: null
    }
  ];

  public _id: string;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public birthDate: Date;
  public country: string = CountryModel.ISL;
  public culture: string = CultureModel.enGB;
  public schoolType: string = StudentModel.SchoolTypes.public;
  public schoolLicenseExpiresAt: Date;
  public schoolId: string;
  public teacherId: string;
  public evolytesProfile: EvolytesProfile;
  public billingStatus: string;
  public trialEndDate: Date;
  public _creator: string;
  public qrCodePassword: string;

  // Authentication
  isQRCodeAuthEnabled: boolean;
  isPinAuthEnabled: boolean;
  isEmailAuthEnabled: boolean;

  public createdAt: Date;
  public updatedAt: Date;

  public subscription: SubscriptionModel = null;
  public relationships: StudentRelationshipModel[] = [];

  static getCurrent(): StudentModel {

    if (this.currentStudent) {
      return this.currentStudent;
    }

    const currentStudentJson = localStorage.getItem(this.storageKey);
    if (currentStudentJson) {
      this.currentStudent = this.generateModel(JSON.parse(currentStudentJson));
      return this.currentStudent;
    }

    return null;

  }

  static setCurrent(student: StudentModel) {
    this.currentStudent = student;
    if (this.currentStudent) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.currentStudent));
    } else {
      this.removeCurrent();
    }

  }

  static removeCurrent() {

    localStorage.removeItem(this.storageKey);

  }

  /**
   * Creates a student model from the json
   *
   * @param json The json object.
   */
  static generateModel(json: any): StudentModel {

    const student = new StudentModel();
    student._id = json._id;
    student.firstName = json.firstName;
    student.middleName = json.middleName;
    student.lastName = json.lastName;
    student.country = json.country;
    student.culture = json.culture;
    student.schoolType = json.schoolType;
    student.schoolId = json.schoolId;
    student.teacherId = json.teacherId;
    student.billingStatus = json.billingStatus;
    student._creator = json._creator;
    student.qrCodePassword = json.qrCodePassword;

    student.isQRCodeAuthEnabled = json.isQRCodeAuthEnabled;
    student.isPinAuthEnabled = json.isPinAuthEnabled;
    student.isEmailAuthEnabled = json.isEmailAuthEnabled;

    if (json.schoolLicenseExpiresAt) {
      student.schoolLicenseExpiresAt = new Date(json.schoolLicenseExpiresAt);
    }

    if (json.birthDate) {
      const birthDate = new Date(json.birthDate);
      student.birthDate = birthDate;
    }

    if (json.createdAt) {
      const createdAt = new Date(json.createdAt);
      student.createdAt = createdAt;
    }

    if (json.updatedAt) {
      const updatedAt = new Date(json.updatedAt);
      student.updatedAt = updatedAt;
    }

    if (json.trialEndDate) {
      student.trialEndDate = new Date(json.trialEndDate);
    }

    if (json.subscription) {
      student.subscription = SubscriptionModel.generateModel(json.subscription);
    }

    if (json.evolytesProfile) {
      student.evolytesProfile = EvolytesProfile.generateModel(json.evolytesProfile);
    }

    return student;

  }

  static generateModels(jsonList: any[]): StudentModel[] {

    const list = [];

    for (const json of jsonList) {
      const student = this.generateModel(json);
      list.push(student);
    }

    return list;

  }

  isTrialExpired() {

    if (this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.inTrial) {
      if (this.trialEndDate && this.trialEndDate.getTime() > Date.now()) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }

  fullName(): string {

    let name = this.firstName;

    if (this.middleName) {
      name += ' ';
      name += this.middleName;
    }

    if (this.lastName) {
      name += ' ';
      name += this.lastName;
    }

    return name;

  }

  ageYears(): number {

    if (this.birthDate) {

      const nowDate = new Date();
      const yearDiff = nowDate.getFullYear() - this.birthDate.getFullYear();

      return yearDiff;

    }

    // If we cannot calculate the age
    return -1;
  }

  subscriptionStatus(): string {

    if (this.subscription) {

      return this.subscription.status;
    }

    return StudentModel.SubscriptionStatusTypes.NotSetup;

  }

  isBillingActive(): boolean {

    if (this.schoolId && this.schoolLicenseExpiresAt) {

      if (this.schoolLicenseExpiresAt.getTime() >= Date.now()) {
        return true;
      }

    } else if (this.subscription && this.subscription.status === StudentModel.SubscriptionStatusTypes.Active) {

      return true;

    } else if (this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.active ||
      this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.nonRenewing) {

      return true;

    } else if (this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.inTrial && this.trialEndDate) {
      if (this.trialEndDate.getTime() >= Date.now()) {
        return true;
      }
    }

    return false;
  }

  isBillingPaused(): boolean {

    if (this.schoolId) {
      return false;
    } else if (this.subscription &&
      this.subscription.status === StudentModel.SubscriptionStatusTypes.NotSetup) {
      return true;
    } else if (this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.paused ||
      this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.notSubscribed) {
      return true;
    } else if (!this.subscription) {
      return true;
    }

    return false;
  }

  isBillingCancelled(): boolean {

    if (this.schoolId && this.schoolLicenseExpiresAt && this.schoolLicenseExpiresAt.getTime() < Date.now()) {
      return true;
    } else if (this.subscription &&
      (this.subscription.status === StudentModel.SubscriptionStatusTypes.FirstBillingFailed ||
        this.subscription.status === StudentModel.SubscriptionStatusTypes.BillingFailed) &&
      (!this.billingStatus || this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.notSubscribed)) {
      return true;
    } else if (this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.cancelled) {
      return true;
    } else if (this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.inTrial && this.trialEndDate) {
      if (this.trialEndDate.getTime() < Date.now()) {
        return true;
      }
    }

    return false;
  }

  /**
   * in_trial is also considered an active state
   * future is also considered an active state
   * non_renewing is also considered an active state
   */
  studentStatus(): string {

    if (this.schoolId) {

      if (this.schoolLicenseExpiresAt && this.schoolLicenseExpiresAt.getTime() >= Date.now()) {
        return 'selectStudent.statusActive';
      }

      return 'selectStudent.licenseExpired';

    } else if ((this.subscription && this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.notSubscribed) ||
      (this.subscription && !this.billingStatus)) {

      if (this.subscription.status === StudentModel.SubscriptionStatusTypes.NotSetup || !this.subscription) {

        return 'selectStudent.statusNotSetup';

      } else if (this.subscription.status === StudentModel.SubscriptionStatusTypes.BillingFailed ||
        this.subscription.status === StudentModel.SubscriptionStatusTypes.FirstBillingFailed) {

        return 'selectStudent.statusFailed';

      }

      return 'selectStudent.statusActive';

    } else if (this.billingStatus === StudentModel.ChargebeeSubscriptionsStatusTypes.inTrial &&
      this.trialEndDate &&
      this.trialEndDate.getTime() < Date.now()) {

      return 'selectStudent.trial_over';

    } else if (this.billingStatus) {

      return 'selectStudent.' + this.billingStatus;

    } else if (!this.subscription) {

      return 'selectStudent.statusFailed';
    }

  }

}

export class EvolytesProfile {

  static CharacterTypes = {
    eva: 'Eva',
    sara: 'Sara',
    lucas: 'Lucas',
    oliver: 'Oliver'
  };

  character: string;
  coins: number;
  map: string;
  mapType: string;
  location = {x: 0, y: 0};
  crystalMap: string;
  crystalMapType: string;
  crystalLocation = {x: 0, y: 0};
  isSetup = false;

  static generateModel(json: any): EvolytesProfile {

    const profile = new EvolytesProfile();
    profile.character = json.character;
    profile.coins = json.coins;
    profile.map = json.map;
    profile.mapType = json.mapType;
    profile.location.x = json.location.x;
    profile.location.y = json.location.y;
    profile.crystalMap = json.crystalMap;
    profile.crystalMapType = json.crystalMapType;
    profile.crystalLocation.x = json.crystalLocation.x;
    profile.crystalLocation.y = json.crystalLocation.y;
    profile.isSetup = json.isSetup;

    return profile;

  }

  profileImage(): string {

    if (this.character) {
      return './assets/student/' + this.character + 'Profile.png';
    }

    return './assets/student/BackgroundProfile.png';

  }

  profileOutlineColor(): string {

    if (this.character === EvolytesProfile.CharacterTypes.eva) {

      return '#9B59B6';
    } else if (this.character === EvolytesProfile.CharacterTypes.lucas) {

      return '#D72121';
    } else if (this.character === EvolytesProfile.CharacterTypes.oliver) {

      return '#009CCC';
    } else if (this.character === EvolytesProfile.CharacterTypes.sara) {

      return '#28A745';
    }

    return '#28A745';

  }

}

export class StudentQueryModel {

  name: string;
  fromAge: number;
  toAge: number;
  isActive: undefined;
  skip = 0;
  limit: number = undefined;

  country: string = undefined;
}
