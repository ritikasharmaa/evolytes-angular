import { Component, OnInit } from '@angular/core';
import {MobileMenuService} from '../mobile-menu.service';
import {UserModel} from '../../models/authentication/user.model';
import {StudentModel} from '../../models/authentication/student.model';
import {TokenModel} from '../../models/authentication/token.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CultureModel} from '../../models/localization/culture.model';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {

  constructor(public mobileSv: MobileMenuService,
              private authSv: AuthService,
              private router: Router) { }

  ngOnInit() {

  }

  onDashClicked() {
    this.mobileSv.isVisible = false;
  }

  onBooksClicked() {
    this.mobileSv.isVisible = false;
  }

  onAnswersClicked() {
    this.mobileSv.isVisible = false;
  }

  onHelpClicked() {
    this.mobileSv.isVisible = false;
  }

  onSettingsClicked() {
    this.mobileSv.isVisible = false;
  }

  onLogoutClicked() {

    UserModel.setCurrent( null );
    StudentModel.setCurrent( null );
    TokenModel.setCurrent( null );

    // Send a signout request.
    this.authSv.signOut().subscribe();
    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'landing']);
    }

  }

}
