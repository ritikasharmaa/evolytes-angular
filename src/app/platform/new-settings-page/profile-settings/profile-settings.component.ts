import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../models/authentication/user.model';
import {UserService} from '../../../services/user.service';
import {EvoLangDropdownComponent} from '../../../shared/evo-lang-dropdown/evo-lang-dropdown.component';
import {TranslateService} from '@ngx-translate/core';
import {StudentModel} from '../../../models/authentication/student.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  CultureTypes = EvoLangDropdownComponent.Types;

  firstName: string = UserModel.getCurrent().firstName;
  lastName: string = UserModel.getCurrent().lastName;
  phone: string = UserModel.getCurrent().phone;
  culture: string = UserModel.getCurrent().culture;
  country: string = StudentModel.getCurrent().country;

  currentPassword = '';

  constructor(private userSv: UserService, private tSv: TranslateService) {
  }

  ngOnInit() {
  }

  getUserEmail(): string {

    return UserModel.getCurrent().email;
  }

  isSaveButtonDisabled(): boolean {

    if (this.firstName !== UserModel.getCurrent().firstName ||
      this.lastName !== UserModel.getCurrent().lastName ||
      this.phone !== UserModel.getCurrent().phone) {

      return false;
    }

    return true;
  }

  isSaveButtonDisabledLanguages(): boolean {

    return this.culture === UserModel.getCurrent().culture;
  }

  isSaveButtonDisabledDelete(): boolean {
    return this.currentPassword === '';
  }

  onSaveUserInformation() {

    const uUser = new UserModel();
    uUser.firstName = this.firstName;
    uUser.lastName = this.lastName;
    uUser.phone = this.phone;
    uUser.culture = this.culture;

    this.userSv.updateUser(uUser).subscribe((user) => {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.phone = user.phone;
      this.culture = user.culture;
      this.tSv.use(user.culture);
    });

  }

  onSaveUserInformationLanguages() {

    const uUser = new UserModel();
    uUser.culture = this.culture;

    this.userSv.updateUser(uUser).subscribe((user) => {
      this.culture = user.culture;
      this.tSv.use(user.culture);
    });

  }

}
