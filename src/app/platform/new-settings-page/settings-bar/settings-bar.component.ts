import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../models/authentication/user.model';
import {StudentModel} from '../../../models/authentication/student.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as url from 'url';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.css']
})
export class SettingsBarComponent implements OnInit {

  settingsSections = [
    {key: 'account', value: 'settings.accountSettings.accounts', iconURL: null},
    {key: 'auth', value: 'settings.authSettings.auth', iconURL: null}
  ];
  currentSection = this.settingsSections[0];

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    const urlParts = this.router.url.split('/');
    const lastUrl = urlParts[urlParts.length - 1];

    for (const setting of this.settingsSections) {
      if (lastUrl === setting.key) {
        this.currentSection = setting;
        break;
      }
    }

  }

  chooseRoute(route: string) {

    this.router.navigate([route], { relativeTo: this.route });

  }

}
