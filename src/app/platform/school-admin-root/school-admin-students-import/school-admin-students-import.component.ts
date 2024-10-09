import { Component, OnInit } from '@angular/core';
import {StudentModel} from '../../../models/authentication/student.model';
import {CsvImportService} from '../../../services/csv-import.service';
import {DateTime} from 'luxon';
import {StudentRelationshipModel} from '../../../models/authentication/student-relationship.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {Router} from '@angular/router';
import {SchoolStudentAdministrationService} from '../../../services/school/school-student-administration.service';
import {ModalService} from '../../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {ErrorModel} from '../../../models/shared/error.model';

@Component({
  selector: 'app-school-school-students-import',
  templateUrl: './school-admin-students-import.component.html',
  styleUrls: ['./school-admin-students-import.component.css']
})
export class SchoolAdminStudentsImportComponent implements OnInit {

  students: StudentModel[] = [];
  defaultCulture = CultureModel.isIS;
  defaultSchoolType = 'public';

  constructor(private csvSv: CsvImportService,
              private tSv: TranslateService,
              private modalSv: ModalService,
              private studentSv: SchoolStudentAdministrationService,
              private router: Router) { }

  ngOnInit() {
  }

  onFileChanged(event) {

    if (event.target.files.length > 0) {

      const currentFile = event.target.files[0];

      const properties = ['Full Name', 'Birth Date', 'Email 1', 'Email 2', 'Email 3', 'Email 4'];
      this.csvSv.importCSV(currentFile, properties).subscribe((objects) => {

        this.students = [];
        for (const studentBody of objects) {

          const student = new StudentModel();
          student.relationships = [];

          for (const property of properties) {

            if (property === 'Birth Date') {

              let value: string = studentBody[property];

              // Remove empty spaces.
              const regExp = / /gi;
              const regExp2 = new RegExp(String.fromCharCode(160), 'gi');
              value = value.replace(regExp, '');
              value = value.replace(regExp2, '');

              if (value) {
                let dateTime = DateTime.fromFormat(value, 'dd/MM/yyyy');
                if (dateTime.isValid) {
                  student.birthDate = dateTime.toJSDate();
                } else {
                  dateTime = DateTime.fromFormat(value, 'ddMMyy');
                  student.birthDate = dateTime.toJSDate();
                }

              }

            } else if (property === 'Email 1' || property === 'Email 2' || property === 'Email 3' || property === 'Email 4') {

              const value: string = studentBody[property];
              if (value !== null && value !== undefined && value !== '') {

                // Add relationships
                const relationship = new StudentRelationshipModel();
                relationship.email = value;
                relationship.userAccessType = StudentRelationshipModel.UserAccessTypes.view;
                relationship.relationshipType = StudentRelationshipModel.RelationshipTypes.teacher;
                student.relationships.push(relationship);

              }

            } else if (property === 'Full Name') {

              const fullName: string = studentBody[property];
              const splitNames = fullName.split(' ');
              const firstName = splitNames[0];
              let middleName = null;
              let lastName = splitNames[1];

              if (splitNames.length >= 3) {

                middleName = splitNames[1];
                lastName = splitNames[2];

                for (let i = 3; i < splitNames.length; i++) {
                  lastName += ' ' + splitNames[i];
                }

              }

              student.firstName = firstName;
              student.middleName = middleName;
              student.lastName = lastName;

            } else {

              student[property] = studentBody[property];

            }

            student.culture = this.defaultCulture;
            student.schoolType = this.defaultSchoolType;

          }

          if (student.firstName || student.middleName || student.lastName || student.birthDate) {
            this.students.push(student);
          }

        }

      });

    }

  }

  onCancelClicked() {
    this.router.navigate(['schooladmin', 'students']);
  }

  onCreateClicked() {

    this.studentSv.importStudents(this.students).subscribe((students) => {
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('schoolAdministration.students.studentsCreatedModalMessage'))
        .subscribe(() => {
        this.router.navigate(['schooladmin', 'students']);
      });
    }, (err) => {
      this.modalSv.showTranslatedErrorModal(ErrorModel.GetError(err.name, this.tSv));
    });

  }

}
