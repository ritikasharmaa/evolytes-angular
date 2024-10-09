import { Component, OnInit } from '@angular/core';
import {CultureModel} from '../../../../models/localization/culture.model';
import {UserModel} from '../../../../models/authentication/user.model';
import {CsvImportService} from '../../../../services/csv-import.service';
import {SchoolModel} from '../../../../models/school/school.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SchoolAdminService} from '../../../../services/admin/school-admin.service';
import {SchoolUserAdminService} from '../../../../services/admin/school-user-admin.service';
import {ModalService} from '../../../../root/modal.service';
import {ErrorModel} from '../../../../models/shared/error.model';
import {last} from 'rxjs/operators';

@Component({
  selector: 'app-evo-school-school-upload-users',
  templateUrl: './evo-admin-school-upload-users.component.html',
  styleUrls: ['./evo-admin-school-upload-users.component.css']
})
export class EvoAdminSchoolUploadUsersComponent implements OnInit {

  defaultPassword: string;
  defaultCulture = CultureModel.isIS;

  school: SchoolModel;

  users: UserModel[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private schoolSv: SchoolAdminService,
              private userSv: SchoolUserAdminService,
              private modalSv: ModalService,
              private csvSv: CsvImportService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      if (params.schoolId) {
        this.schoolSv.fetchSchoolById(params.schoolId).subscribe((school) => {
          this.school = school;
          this.defaultCulture = this.school.culture;
        });

      }

    });
  }

  onFileChanged(event) {

    if (event.target.files.length > 0) {

      const currentFile = event.target.files[0];

      const properties = ['fullName', 'email', 'phone'];
      this.csvSv.importCSV(currentFile, properties).subscribe((objects) => {

        this.users = [];
        for (const userBody of objects) {
          const user = new UserModel();
          for (const property of properties) {
            if (property === 'fullName') {
              const fullName: string = userBody[property];
              const splitNames = fullName.split(' ');

              let firstName = splitNames[0];

              for (let i = 1; i < splitNames.length - 1; i++) {
                firstName += ' ';
                firstName += splitNames[i];
              }

              user.firstName = firstName;
              user.lastName = splitNames[splitNames.length - 1];

            } else {
              user[property] = userBody[property];
            }
          }
          if (this.defaultPassword !== null || this.defaultPassword !== '') {
            user.password = this.defaultPassword;
          }
          user.culture = this.defaultCulture;

          if (user.firstName && user.lastName && user.culture && user.email) {
            this.users.push(user);
          }

        }

      });

    }

  }

  onPasswordChanged(pass: string) {
    this.defaultPassword = pass;
    if (pass === null || pass === '') {
      for (const user of this.users) {
        user.password = null;
      }
    } else {
      for (const user of this.users) {
        user.password = pass;
      }
    }

  }

  onCultureChanged(culture: string) {

    for (const user of this.users) {
      user.culture = culture;
    }

  }

  onUploadClicked() {

    this.userSv.createSchoolUsers(this.school._id, this.users).subscribe(() => {

      this.modalSv.showAlertModal('Success', 'Users were successfully created').subscribe(() => {
        this.router.navigate(['admin', 'schools', this.school._id, 'edit']);
      });

    }, (err: ErrorModel) => {
      this.modalSv.showErrorModal('Error', err.message);
    });

  }

}
