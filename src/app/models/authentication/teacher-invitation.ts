import {DateExtensionModel} from '../extensions/date-extension.model';

export class TeacherInvitationModel {

  public static SchoolAccessTypes = {
    teacher: 'teacher',
    admin: 'admin',
    list: function () {
      return [this.teacher, this.admin];
    }
  };


  public _id: string;
  public schoolId: string;
  public schoolName: string;
  public schoolAccessType: string;
  public firstName: string;
  public lastName: string;
  public sentDate: Date;
  public email: string;

  public createdAt: Date;
  public updatedAt: Date;

  static generateModel(json: any): TeacherInvitationModel {

    const user = new TeacherInvitationModel();
    user._id = json._id;
    user.schoolId = json.schoolId;
    user.schoolName = json.schoolName;
    user.schoolAccessType = json.schoolAccessType;
    user.firstName = json.firstName;
    user.lastName = json.lastName;
    user.sentDate = DateExtensionModel.date(json.sentDate);
    user.email = json.email;

    user.createdAt = DateExtensionModel.date(json.createdAt);
    user.updatedAt = DateExtensionModel.date(json.updatedAt);

    return user;

  }

  static generateModels(jsonList: any): TeacherInvitationModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(TeacherInvitationModel.generateModel(json));
    }

    return list;

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
      return this.email.substring(0, 1).toUpperCase();
    }

    return this.firstName.substring(0, 1).toUpperCase() + this.lastName.substring(0, 1).toUpperCase();

  }

  getSchoolAccessType(): string {

    if (this.schoolAccessType) {
      return this.schoolAccessType;
    }

    return TeacherInvitationModel.SchoolAccessTypes.teacher;
  }

  getExpirationStatus(): string {

    const diffHours = Math.abs(new Date().getTime() - this.sentDate.getTime()) / 36e5;

    if (diffHours >= 48) {
      return 'expired';
    }

    return 'active';
  }

  getDataChangedStatus(): boolean {

    const diffSecs = (Math.abs(this.updatedAt.getTime() - this.sentDate.getTime()) / 1e3).toFixed(1);

    return Number(diffSecs) > 5;
  }
}

export class TeacherInvitationFilter {

  skip = 0;
  limit: number = undefined;

  name: string = undefined;
  email: string = undefined;

}

