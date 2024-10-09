import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../models/authentication/user.model';
import {Router} from '@angular/router';
import {StudentModel} from '../../../models/authentication/student.model';
import {GaService} from '../../../services/ga.service';
import {TokenModel} from '../../../models/authentication/token.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {AuthService} from '../../../services/auth.service';
import {SchoolModel} from '../../../models/school/school.model';
import {MobileMenuService} from '../../../mobile/mobile-menu.service';

@Component({
  selector: 'app-school-admin-header',
  templateUrl: './school-admin-header.component.html',
  styleUrls: ['./school-admin-header.component.css']
})
export class SchoolAdminHeaderComponent implements OnInit {

  @Input() hideHamburgerIcon = false;

  openUserDropdown = false;
  showStudent = false;

  constructor(private router: Router,
              public mobileMenuSv: MobileMenuService,
              private authSv: AuthService, private ga: GaService) {
  }

  ngOnInit() {
  }

  userInitials(): string {

    if (UserModel.getCurrent()) {

      let initials = '';
      if (UserModel.getCurrent().firstName) {
        initials += UserModel.getCurrent().firstName.substring(0, 1).toUpperCase();
      }

      if (UserModel.getCurrent().lastName) {
        initials += UserModel.getCurrent().lastName.substring(0, 1).toUpperCase();
      }

      return initials;

    }

    return '';
  }

  userName(): string {

    if (UserModel.getCurrent()) {

      return UserModel.getCurrent().firstName + ' ' + UserModel.getCurrent().lastName;
    }

    return '';
  }

  isSchoolAdmin(): boolean {

    if (UserModel.getCurrent().schoolAccessType === UserModel.SchoolAccessTypes.admin) {
      return true;
    }

    return false;
  }

  navigateHome() {

    this.openUserDropdown = false;
    if (StudentModel.getCurrent()) {
      this.router.navigate(['platform', 'dash']);
    } else {
      this.router.navigate(['selectstudent']);
    }

  }

  userClicked() {
    this.openUserDropdown = !this.openUserDropdown;
  }

  onMobileMenuClicked() {

    if (this.mobileMenuSv.isVisible === true) {
      this.mobileMenuSv.isVisible = false;
    } else {
      this.mobileMenuSv.isVisible = true;
    }

  }

  schoolAdminClicked() {
    this.openUserDropdown = false;
    this.router.navigate(['schooladmin', 'teachers']);
  }

  onSwitchStudentClicked() {

    this.ga.logEvent('navigate_select_student_clicked', GaService.Categories.platform_engagement);
    this.openUserDropdown = false;
    this.router.navigate(['selectstudent']);

  }

  settingsClicked() {
    this.openUserDropdown = false;
  }

  logoutClicked() {
    this.openUserDropdown = false;

    this.ga.logEvent('signout_clicked', GaService.Categories.platform_engagement);

    // Send a signout request.
    this.authSv.signOut().subscribe();
    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'landing']);
    }

    UserModel.setCurrent(null);
    StudentModel.setCurrent(null);
    SchoolModel.setCurrent(null);
    TokenModel.setCurrent(null);

  }

}
