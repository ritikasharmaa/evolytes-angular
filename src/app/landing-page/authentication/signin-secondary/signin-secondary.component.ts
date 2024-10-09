import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {StudentModel} from '../../../models/authentication/student.model';
import {UserModel} from '../../../models/authentication/user.model';
import {ErrorModel} from '../../../models/shared/error.model';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {ModalService} from '../../../root/modal.service';
import {StudentService} from '../../../services/student.service';
import {GaService} from '../../../services/ga.service';
import {TranslateService} from '@ngx-translate/core';
import {CultureModel} from '../../../models/localization/culture.model';
import {CountryModel} from '../../../models/localization/country.model';

@Component({
  selector: 'app-signin-secondary',
  templateUrl: './signin-secondary.component.html',
  styleUrls: ['./signin-secondary.component.css']
})
export class SigninSecondaryComponent implements OnInit {

  @Input() fromInvitation = false;

  constructor(private router: Router,
              private authSv: AuthService,
              private studentSv: StudentService,
              private modalSv: ModalService,
              private tSv: TranslateService,
              private ga: GaService) {
  }

  ngOnInit() {
  }

  onSignInClicked(form: NgForm) {

    this.ga.logEvent('signin_clicked', GaService.Categories.engagement);

    let email = form.value.email;
    if (email) {
      email = email.toLowerCase();
    }

    const password = form.value.password;

    this.authSv.signIn(email, password).subscribe((response) => {

      StudentModel.setCurrent(null);
      CultureModel.setHomepageCulture(response.user.culture);
      CountryModel.setHomepageCountry(response.user.country);
      this.tSv.use(response.user.culture);

      if (this.fromInvitation) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      } else {
        if (UserModel.getCurrent().isEmailVerified === false) {
          this.router.navigate(['home/' + CultureModel.getHomepageCulture(), 'verifyEmail']);
        } else {
          this.router.navigate(['selectstudent']);
        }
      }

    }, (error: ErrorModel) => {

      if (error.name === 'ObjectNotFoundError' || error.name === 'PasswordIncorrect') {
        this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
          this.tSv.instant('signin.signinWrong'),
          this.tSv.instant('reusable.done'));
      } else {
        this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
          this.tSv.instant('reusable.unknownError'),
          this.tSv.instant('reusable.done'));
      }

    });

  }

  onSignupClicked() {

    this.ga.logEvent('navigate_signup_clicked', GaService.Categories.engagement);

    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup']);


  }

  onForgotPassClicked() {

    this.ga.logEvent('navigate_forgot_password_clicked', GaService.Categories.engagement);

    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'forgotpass']);


  }

}
