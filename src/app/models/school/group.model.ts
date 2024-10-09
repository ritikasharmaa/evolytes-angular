import {UserModel} from '../authentication/user.model';
import {StudentModel} from '../authentication/student.model';

export class GroupModel {

  public _id: string;

  public name: string;
  public teacherIds: string[];
  public studentIds: string[];

  public students: StudentModel[] = [];
  public teachers: UserModel[] = [];

  public createdAt: Date;
  public updatedAt: Date;

  static generateModel(json: any): GroupModel {

    const group = new GroupModel();
    group._id = json._id;

    group.name = json.name;
    group.teacherIds = json.teachersId;
    group.studentIds = json.studentsId;

    if (json.createdAt) {
      group.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      group.updatedAt = new Date(json.updatedAt);
    }

    return group;
  }

  static generateModels(jsonList: any[]): GroupModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

  getTwoInitials(): string {

    if (!this.name) {
      return '';
    }

    return this.name.substring(0, 2).toUpperCase();

  }
}

export class GroupQueryModel {

  name: string;
  email: string = undefined;
  fromAge: number;
  toAge: number;
  isActive: undefined;
  skip = 0;
  limit: number = undefined;
}


