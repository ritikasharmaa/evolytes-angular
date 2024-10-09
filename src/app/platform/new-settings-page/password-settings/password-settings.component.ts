import {Component, OnInit} from '@angular/core';
import {ErrorModel} from '../../../models/shared/error.model';
import {UserService} from '../../../services/user.service';
import {ModalService} from '../../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css']
})
export class PasswordSettingsComponent implements OnInit {
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';

  constructor(private userSv: UserService,
              private modalSv: ModalService,
              private tSv: TranslateService) {
  }

  ngOnInit() {
  }

  isSavePasswordDisabled(): boolean {

    return !(this.currentPassword !== '' && this.newPassword !== '' &&
      this.confirmNewPassword !== '' && this.newPassword === this.confirmNewPassword);
  }

  onChangePassword() {

    if (this.newPassword !== this.confirmNewPassword && this.newPassword !== '' && this.confirmNewPassword !== '') {
      this.modalSv.showErrorModal('reusable.error', 'signup.passwordsDoNotMatch');
    }

    this.userSv.changePassword(this.currentPassword, this.newPassword).subscribe((response) => {
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'), this.tSv.instant('reusable.success'));
    }, (e: ErrorModel) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'), e.message);
    });

  }

}
