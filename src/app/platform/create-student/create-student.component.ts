import { Component, OnInit } from '@angular/core';
import {StudentModel} from '../../models/authentication/student.model';
import {StudentService} from '../../services/student.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ModalService} from '../../root/modal.service';
import {NgForm} from '@angular/forms';
import {last} from 'rxjs/operators';
import {ErrorModel} from '../../models/shared/error.model';
import {CultureModel} from '../../models/localization/culture.model';
import {CountryModel} from '../../models/localization/country.model';
import {GaService} from '../../services/ga.service';
import {UserModel} from '../../models/authentication/user.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  queryParams: Params;

  student = new StudentModel();
  schoolTypes = StudentModel.SchoolTypesDropdownList;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalSv: ModalService,
              private studentSv: StudentService,
              private tSv: TranslateService,
              private ga: GaService) { }

  ngOnInit() {

    if (UserModel.getCurrent()) {
      if (this.tSv.currentLang !== UserModel.getCurrent().culture) {
        this.tSv.use(UserModel.getCurrent().culture);
      }
    }

    this.student.country = UserModel.getCurrent().country;
    this.student.culture = UserModel.getCurrent().culture;

    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
    });

  }

  createStudent(f: NgForm) {

    this.ga.logEvent('create_student_clicked', GaService.Categories.engagement);

    const firstName = f.value.firstName;
    const lastName = f.value.lastName;
    const birthDate = f.value.birthDate;
    const schoolType = f.value.schoolType;

    if (birthDate === null || birthDate === undefined) {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('createStudent.birthDateInvalid'));
      return ;
    } else if (firstName === '' || firstName === null || firstName === undefined) {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('createStudent.firstNameRequired'));
      return ;
    } else if (lastName === '' || lastName === null || lastName === undefined) {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('createStudent.lastNameRequired'));
      return ;
    }

    this.student.firstName = firstName;
    this.student.lastName = lastName;
    this.student.birthDate = birthDate;
    this.student.schoolType = schoolType;

    this.studentSv.createStudent(this.student).subscribe((s) => {

      this.ga.logEvent('subscription_process_started', GaService.Categories.sales_process, '/createstudent');

      StudentModel.setCurrent( s );
      if (this.queryParams.subscription === '6M') {
        this.router.navigate(['selectbook'],
          { queryParams: this.queryParams });
      } else {
        this.router.navigate(['selectsub']);
      }

    }, (error: ErrorModel) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('reusable.unknownError'));
    });

  }

}
