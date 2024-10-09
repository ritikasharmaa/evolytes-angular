import {StudentModel} from './student.model';
import {Observable} from 'rxjs';

export class StudentRelationshipModel {

  static RelationshipTypes = {
    parent: 'parent',
    teacher: 'teacher',
    list: function () {

      return [this.parent, this.teacher];
    },
    dropdownList: function () {

      return [{ key: this.parent, value: this.parent, iconURL: null },
        { key: this.teacher, value: this.teacher, iconURL: null }];
    }
  };

  static UserAccessTypes = {
    owner: 'owner',
    admin: 'admin',
    edit: 'edit',
    view: 'view',
    list: function() {
      return [this.owner, this.view, this.admin, this.view];
    },
    dropdownList: function () {

      return [{ key: this.owner, value: this.owner, iconURL: null },
        { key: this.admin, value: this.admin, iconURL: null },
        { key: this.edit, value: this.edit, iconURL: null },
        { key: this.view, value: this.view, iconURL: null }];
    }
  };

  public _id: string;
  public studentId: string;
  public userId: string;
  public schoolId: string;
  public relationshipType: string;
  public userAccessType: string;
  public student: StudentModel;

  // used when importing students from csv.
  public email: string;

  static generate(json: any): StudentRelationshipModel {

    const relationship = new StudentRelationshipModel();
    relationship._id = json._id;
    relationship.studentId = json.studentId;
    relationship.userId = json.userId;
    relationship.relationshipType = json.relationshipType;
    relationship.userAccessType = json.userAccessType;

    if (json.student) {
      relationship.student = StudentModel.generateModel(json.student);
    }

    return relationship;

  }

  static generateList(jsonList: any[]): StudentRelationshipModel[] {

    const list = [];

    for (const json of jsonList) {
      const relationship = StudentRelationshipModel.generate(json);
      list.push(relationship);
    }

    return list;

  }

}
