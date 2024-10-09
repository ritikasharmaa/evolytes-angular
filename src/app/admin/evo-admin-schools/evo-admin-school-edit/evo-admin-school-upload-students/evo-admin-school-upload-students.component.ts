import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SchoolAdminService} from '../../../../services/admin/school-admin.service';
import {CsvImportService} from '../../../../services/csv-import.service';
import {SchoolModel} from '../../../../models/school/school.model';
import {StudentModel} from '../../../../models/authentication/student.model';
import {DateTime} from 'luxon';
import {StudentRelationshipModel} from '../../../../models/authentication/student-relationship.model';
import {SchoolStudentAdminService} from '../../../../services/admin/school-student-admin.service';
import {ModalService} from '../../../../root/modal.service';
import {ErrorModel} from '../../../../models/shared/error.model';
import {split} from 'ts-node';

@Component({
  selector: 'app-evo-school-school-upload-students',
  templateUrl: './evo-admin-school-upload-students.component.html',
  styleUrls: ['./evo-admin-school-upload-students.component.css']
})
export class EvoAdminSchoolUploadStudentsComponent implements OnInit {

  SchoolTypes = StudentModel.SchoolTypes;
  SchoolTypesList = [{ key: this.SchoolTypes.public, value: this.SchoolTypes.public, iconURL: null },
    { key: this.SchoolTypes.private, value: this.SchoolTypes.private, iconURL: null }];
  RelationUserAccessTypes = StudentRelationshipModel.UserAccessTypes.dropdownList();
  RelationTypes = StudentRelationshipModel.RelationshipTypes.dropdownList();
  defaultCulture: string;
  defaultSchoolType: string;

  school: SchoolModel;
  students: StudentModel[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private schoolSv: SchoolAdminService,
              private studentSv: SchoolStudentAdminService,
              private modalSv: ModalService,
              private csvSv: CsvImportService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      if (params.schoolId) {
        this.schoolSv.fetchSchoolById(params.schoolId).subscribe((school) => {
          this.school = school;
          this.defaultCulture = this.school.culture;
          this.defaultSchoolType = this.school.schoolType;
          if (this.defaultSchoolType === null || this.defaultSchoolType === undefined) {
            this.defaultSchoolType = this.SchoolTypes.public;
          }
        });

      }

    });
  }

  onFileChanged(event) {

    if (event.target.files.length > 0) {

      const currentFile = event.target.files[0];

      const properties = ['fullName', 'birthDate', 'email1', 'email2', 'email3', 'email4'];
      this.csvSv.importCSV(currentFile, properties).subscribe((objects) => {

        this.students = [];
        for (const studentBody of objects) {

          const student = new StudentModel();
          student.relationships = [];

          for (const property of properties) {

            if (property === 'birthDate') {

              const value: string = studentBody[property];
              if (value) {
                const day = value.substring(0, 2);
                const month = value.substring(2, 4);
                const year = value.substring(4, 6);
                const dateString = `${day}/${month}/${year}`;
                const dateTime = DateTime.fromFormat(dateString, 'd/M/yy');
                student[property] = dateTime.toJSDate();
              }

            } else if (property === 'email1' || property === 'email2' || property === 'email3' || property === 'email4') {

              const value: string = studentBody[property];
              if (value !== null && value !== undefined && value !== '') {

                // Add relationships
                const relationship = new StudentRelationshipModel();
                relationship.email = value;
                relationship.userAccessType = StudentRelationshipModel.UserAccessTypes.view;
                relationship.relationshipType = StudentRelationshipModel.RelationshipTypes.teacher;
                student.relationships.push(relationship);

              }

            } else if (property === 'fullName') {

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

            student.culture = this.school.culture;
            if (student.culture === null || student.culture === undefined) {
              student.culture = this.defaultCulture;
            }

            student.schoolType = this.school.schoolType;
            if (student.schoolType === null || student.schoolType === undefined) {
              student.schoolType = this.defaultSchoolType;
            }

          }

          if (student.firstName && student.lastName && student.birthDate && student.culture && student.schoolType) {
            this.students.push(student);
          }

        }

      });

    }

  }

  onDefaultCultureChanged(culture: string) {

    this.defaultCulture = culture;

    for (const student of this.students) {
      student.culture = culture;
    }

  }

  onDefaultSchoolTypeChanged(schoolType: string) {

    this.defaultSchoolType = schoolType;

    for (const student of this.students) {
      student.schoolType = schoolType;
    }

  }

  onUploadClicked() {

    this.studentSv.createSchoolStudentsAndRelationships(this.school._id, this.students).subscribe((students) => {
      this.modalSv.showAlertModal('Success', 'Students succesfully created').subscribe((() => {
        this.router.navigate(['admin', 'schools', this.school._id, 'edit']);
      }));
    }, (err: ErrorModel) => {
      this.modalSv.showAlertModal('Error', err.message);
    });

  }


}
