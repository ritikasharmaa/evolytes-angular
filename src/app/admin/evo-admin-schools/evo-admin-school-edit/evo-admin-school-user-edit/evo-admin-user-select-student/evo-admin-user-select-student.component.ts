import {Component, OnInit} from '@angular/core';
import {EvoAdminUserSelectStudentService} from './evo-admin-user-select-student.service';
import {StudentModel} from '../../../../../models/authentication/student.model';

@Component({
  selector: 'app-evo-admin-user-select-student',
  templateUrl: './evo-admin-user-select-student.component.html',
  styleUrls: ['./evo-admin-user-select-student.component.css']
})
export class EvoAdminUserSelectStudentComponent implements OnInit {

  constructor(public sv: EvoAdminUserSelectStudentService) { }

  ngOnInit() {

  }

  hasRelationship(student: StudentModel): boolean {

    for (const relationship of this.sv.relationships) {

      if (relationship.studentId === student._id) {

        return true;
      }

    }

    return false;
  }

  getButtonTitle(student: StudentModel): string {

    if (this.hasRelationship(student) === false) {

      return 'Add';
    }

    return 'Remove';
  }

  onStudentButtonClicked(student: StudentModel) {

    if (this.hasRelationship(student)) {
      this.sv.removeRelationship(student);
    } else {
      this.sv.addRelationship(student);
    }

  }

}
