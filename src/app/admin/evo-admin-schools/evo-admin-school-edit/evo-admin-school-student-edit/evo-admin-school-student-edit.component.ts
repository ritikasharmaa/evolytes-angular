import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {SchoolStudentAdminService} from '../../../../services/admin/school-student-admin.service';
import {StudentModel} from '../../../../models/authentication/student.model';

@Component({
  selector: 'app-evo-school-school-student-edit',
  templateUrl: './evo-admin-school-student-edit.component.html',
  styleUrls: ['./evo-admin-school-student-edit.component.css']
})
export class EvoAdminSchoolStudentEditComponent implements OnInit {

  isEditMode = false;
  schoolId: string;
  student = new StudentModel();
  SchoolTypes = StudentModel.SchoolTypesDropdownList;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private schoolStudentService: SchoolStudentAdminService) { }

  ngOnInit() {

    this.student.country = null;
    this.student.culture = null;

    this.route.params.subscribe((params: Params) => {

      this.schoolId = params.schoolId;
      if (params.studentId) {
        this.isEditMode = true;
        this.schoolStudentService.fetchSchoolStudentById(this.schoolId, params.studentId).subscribe((student) => {
          this.student = student;
        });
      }

    });

  }

  title(): string {

    if (this.isEditMode === true) {
      return 'Update Student';
    }

    return 'Create Student';
  }

  saveButtonTitle(): string {

    if (this.isEditMode === true) {
      return 'Save';
    }

    return 'Create';
  }

  onSaveClicked() {

    this.schoolStudentService.updateSchoolStudents(this.schoolId, [this.student]).subscribe((students) => {

      this.router.navigate(['admin', 'schools', this.schoolId, 'students', students[0]._id, 'edit']);

    });

  }

}
