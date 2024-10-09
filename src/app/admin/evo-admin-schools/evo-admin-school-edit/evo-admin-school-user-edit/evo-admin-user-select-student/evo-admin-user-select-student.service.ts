import {ChangeDetectorRef, Injectable} from '@angular/core';
import {SchoolUserAdminService} from '../../../../../services/admin/school-user-admin.service';
import {SchoolStudentAdminService} from '../../../../../services/admin/school-student-admin.service';
import {StudentRelationshipModel} from '../../../../../models/authentication/student-relationship.model';
import {StudentModel} from '../../../../../models/authentication/student.model';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvoAdminUserSelectStudentService {

  public isVisible = false;
  public schoolId: string;
  public userId: string;

  relationships: StudentRelationshipModel[] = [];
  students: StudentModel[] = [];

  subscriber: Subscriber<void>;

  constructor(public userSv: SchoolUserAdminService,
              public studentSv: SchoolStudentAdminService) { }

  show(schoolId: string, userId: string): Observable<void> {
    this.isVisible = true;
    this.schoolId = schoolId;
    this.userId = userId;

    this.userSv.fetchSchoolUserStudentRelationships(this.schoolId, this.userId).subscribe((relationships) => {
      this.relationships = relationships;
    });

    this.studentSv.fetchSchoolStudents(this.schoolId).subscribe((students) => {
      this.students = students;
    });

    return Observable.create((subscriber) => {
      this.subscriber = subscriber;
    });

  }

  done() {

    this.isVisible = false;
    this.schoolId = null;
    this.userId = null;

    if (this.subscriber) {
      this.subscriber.next();
      this.subscriber.complete();
    }

  }

  addRelationship(student: StudentModel) {

    const relationship = new StudentRelationshipModel();
    relationship.studentId = student._id;
    relationship.userId = this.userId;
    relationship.schoolId = this.schoolId;
    relationship.relationshipType = StudentRelationshipModel.RelationshipTypes.teacher;
    relationship.userAccessType = StudentRelationshipModel.UserAccessTypes.edit;

    this.userSv.updateSchoolUserStudentRelationships(this.schoolId, this.userId, [relationship]).subscribe((relationships) => {
      const relation = relationships[0];

      let index = -1;
      for (let i = 0; i < this.students.length; i++) {
        const object = this.students[i];
        if (object._id === student._id) {
          index = i;
          break;
        }
      }

      if (index !== -1 && relation.student !== null) {
        this.relationships.push(relation);
        this.students[index] = relation.student;
      }

    });

  }

  removeRelationship(student: StudentModel) {

    this.userSv.deleteSchoolUserStudentRelationshipByStudentId(this.schoolId, this.userId, student._id).subscribe((removedRelationship) => {

      let index = -1;
      for (let i = 0; i < this.relationships.length; i++) {

        const object = this.relationships[i];
        if (object.studentId === student._id) {
          index = i;
          break;
        }

      }

      if (index !== -1) {
        this.relationships.splice(index, 1);
        this.students = this.students.slice();
      }

    });

  }

}
