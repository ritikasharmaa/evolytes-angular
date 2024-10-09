import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentModel} from '../../models/authentication/student.model';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../models/authentication/user.model';
import {TokenModel} from '../../models/authentication/token.model';
import {MobileMenuService} from '../../mobile/mobile-menu.service';
import {GaService} from '../../services/ga.service';
import {CultureModel} from '../../models/localization/culture.model';
import {SchoolModel} from '../../models/school/school.model';
import {UserSettingsModalService} from '../../platform/user-settings-modal/user-settings-modal.service';

@Component({
  selector: 'app-evo-header',
  templateUrl: './evo-header.component.html',
  styleUrls: ['./evo-header.component.css']
})
export class EvoHeaderComponent implements OnInit {

  /**
   * Can be of type student or logout
   */
  @Input() type = 'student';
  @Input() hideHamburgerIcon = false;

  openUserDropdown = false;
  show = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authSv: AuthService,
              private userSettingsSv: UserSettingsModalService,
              public mobileMenuSv: MobileMenuService,
              private ga: GaService) {
  }

  ngOnInit() {
    if (this.router.url.includes('/selectstudent')) {
      this.show = true;
    }
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

    this.ga.logEvent('navigate_header_home_clicked', GaService.Categories.platform_engagement);

    if (StudentModel.getCurrent()) {
      this.router.navigate(['platform', 'dash']);
    } else {
      this.router.navigate(['selectstudent']);
    }
  }


  currentStudent(): StudentModel {

    return StudentModel.getCurrent();
  }

  onStudentButtonClicked() {

    if (this.router.url.includes('selectstudent')) {
      if (this.currentStudent()) {
        this.router.navigate(['platform', 'dash']);
      }
    } else {
      this.ga.logEvent('navigate_select_student_clicked', GaService.Categories.platform_engagement);
      this.openUserDropdown = false;
      this.router.navigate(['selectstudent']);
    }

  }

  onSwitchStudentClicked() {

    this.ga.logEvent('navigate_select_student_clicked', GaService.Categories.platform_engagement);
    this.openUserDropdown = false;
    this.router.navigate(['selectstudent']);

  }

  onMobileMenuClicked() {

    if (this.mobileMenuSv.isVisible === true) {
      this.mobileMenuSv.isVisible = false;
    } else {
      this.mobileMenuSv.isVisible = true;
    }

  }

  onUserClicked() {
    this.openUserDropdown = !this.openUserDropdown;
  }

  onSchoolAdminClicked() {
    this.openUserDropdown = false;
    this.router.navigate(['schooladmin', 'teachers']);
  }

  onLogoutClicked() {
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

  goToSettings() {
    this.openUserDropdown = false;
    this.userSettingsSv.onShow();
  }

}
