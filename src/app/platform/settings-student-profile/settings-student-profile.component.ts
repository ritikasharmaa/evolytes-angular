import {Component, Input, OnInit} from '@angular/core';
import {EvoLangDropdownComponent} from '../../shared/evo-lang-dropdown/evo-lang-dropdown.component';
import {StudentModel} from '../../models/authentication/student.model';
import {StudentService} from '../../services/student.service';
import {DateTime} from 'luxon';
import {response} from 'express';
import {ModalService} from '../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-settings-student-profile',
  templateUrl: './settings-student-profile.component.html',
  styleUrls: ['./settings-student-profile.component.css']
})
export class SettingsStudentProfileComponent implements OnInit {
  @Input() student: StudentModel;


  CultureTypes = EvoLangDropdownComponent.Types;

  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: Date;
  country: string;
  culture: string;

  constructor(private studentSv: StudentService,
              private tSv: TranslateService,
              private modalSv: ModalService) {
  }

  ngOnInit() {
    this.firstName = this.student.firstName;
    this.middleName = this.student.middleName;
    this.lastName = this.student.lastName;
    this.birthDate = this.student.birthDate;
    this.country = this.student.country;
    this.culture = this.student.culture;
  }
  isSaveDisabledFirstInfo() {

    const s = this.student;

    const currentBirthdate = DateTime.fromJSDate(this.student.birthDate).toLocaleString(DateTime.DATE_SHORT);
    const inputBirthdate = DateTime.fromJSDate(this.birthDate).toLocaleString(DateTime.DATE_SHORT);

    return !(this.firstName !== s.firstName || this.lastName !== s.lastName || this.middleName !== s.middleName ||
      inputBirthdate !== currentBirthdate);
  }

  isSaveDisabledLanguage() {

    const s = this.student;
    return !(this.country !== s.country || this.culture !== s.culture);
  }

  onSaveClickedFirstInfo() {

    const uStudent = new StudentModel();
    uStudent._id = this.student._id;
    uStudent.firstName = this.firstName;
    uStudent.middleName = this.middleName;
    uStudent.lastName = this.lastName;


    if (this.birthDate) {
      uStudent.birthDate = new Date(this.birthDate);
    }
    this.studentSv.updateStudent(uStudent).subscribe((s) => {

      if (StudentModel.getCurrent() !== null && this.student._id === StudentModel.getCurrent()._id) {

        StudentModel.setCurrent(s);
        this.student = StudentModel.getCurrent();

        this.firstName = StudentModel.getCurrent().firstName;
        this.middleName = StudentModel.getCurrent().middleName;
        this.lastName = StudentModel.getCurrent().lastName;
        this.birthDate = StudentModel.getCurrent().birthDate;
        this.country = StudentModel.getCurrent().country;
        this.culture = StudentModel.getCurrent().culture;

        this.modalSv.showAlertModal(this.tSv.instant('reusable.success'), this.tSv.instant('reusable.success'));

      }
    });
  }

  onSaveClickedLanguages() {

    const uStudent = new StudentModel();
    uStudent._id = this.student._id;
    uStudent.country = this.country;
    uStudent.culture = this.culture;

    this.studentSv.updateStudent(uStudent).subscribe((s) => {

      if (StudentModel.getCurrent() !== null && this.student._id === StudentModel.getCurrent()._id) {

        StudentModel.setCurrent(s);
        this.student = StudentModel.getCurrent();

        this.firstName = StudentModel.getCurrent().firstName;
        this.middleName = StudentModel.getCurrent().middleName;
        this.lastName = StudentModel.getCurrent().lastName;
        this.birthDate = StudentModel.getCurrent().birthDate;
        this.country = StudentModel.getCurrent().country;
        this.culture = StudentModel.getCurrent().culture;

        this.modalSv.showAlertModal(this.tSv.instant('reusable.success'), this.tSv.instant('reusable.success'));

      }
    });
  }

  updateName() {
    let name = this.firstName;

    if (this.lastName) {
      name += ' ';
      name += this.lastName;
    }

    return name;
  }

}
