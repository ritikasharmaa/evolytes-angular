import { Injectable } from '@angular/core';
import {AuthService} from '../auth.service';
import {StudentModel} from '../../models/authentication/student.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {StudentRelationshipModel} from '../../models/authentication/student-relationship.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStudentRelationshipService {

  constructor(private authSv: AuthService) {}

  fetchRelationshipByUserIdWithStudent(userId: string) {
    return this.authSv.get('/userStudents/' + userId).pipe(map((relationShipsReceived) => {
      const relationShipsJSON = relationShipsReceived.data;
      relationShipsJSON.map(rs => {
        rs.student = rs.studentId;
        rs.studentId = rs.student._id;
      });
      const relationShips = StudentRelationshipModel.generateList(relationShipsJSON);
      return relationShips;
    }));
  }
}

