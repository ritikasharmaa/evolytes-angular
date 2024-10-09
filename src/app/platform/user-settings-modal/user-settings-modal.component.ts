import { Component, OnInit } from '@angular/core';
import {UserSettingsModalService} from './user-settings-modal.service';
import {UserModel} from '../../models/authentication/user.model';

@Component({
  selector: 'app-user-settings-modal',
  templateUrl: './user-settings-modal.component.html',
  styleUrls: ['./user-settings-modal.component.css']
})
export class UserSettingsModalComponent implements OnInit {

  settingsSections = [
    {key: 'profile', value: 'settings.profileSettings.profile', iconURL: null},
    {key: 'pass', value: 'settings.passwordSettings.password', iconURL: null},
    {key: 'billing', value: 'settings.newBillingSettings.billing', iconURL: null}
  ];
  currentSection = this.settingsSections[0];

  constructor(public userSettingsModalSv: UserSettingsModalService) { }

  ngOnInit() {

    // You should not have billing as a teacher
    if (UserModel.getCurrent().schoolId) {
      this.settingsSections = [
        {key: 'profile', value: 'settings.profileSettings.profile', iconURL: null},
        {key: 'pass', value: 'settings.passwordSettings.password', iconURL: null},
      ];
    } else {
      this.settingsSections = [
        {key: 'profile', value: 'settings.profileSettings.profile', iconURL: null},
        {key: 'pass', value: 'settings.passwordSettings.password', iconURL: null},
        {key: 'billing', value: 'settings.newBillingSettings.billing', iconURL: null}
      ];
    }

  }

  onCloseIcon() {

    this.userSettingsModalSv.onHide();

  }

  onSectionChanged(key: string) {

    for (const section of this.settingsSections) {
      if (section.key === key) {
        this.currentSection = section;
        break;
      }
    }

  }

}
