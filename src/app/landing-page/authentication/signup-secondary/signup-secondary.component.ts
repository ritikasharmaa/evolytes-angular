import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserModel} from '../../../models/authentication/user.model';
import {ErrorModel} from '../../../models/shared/error.model';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {ModalService} from '../../../root/modal.service';
import {AuthService} from '../../../services/auth.service';
import {GaService} from '../../../services/ga.service';
import {TranslateService} from '@ngx-translate/core';
import {CultureModel} from '../../../models/localization/culture.model';
import {CountryModel} from '../../../models/localization/country.model';

@Component({
  selector: 'app-signup-secondary',
  templateUrl: './signup-secondary.component.html',
  styleUrls: ['./signup-secondary.component.css']
})
export class SignupSecondaryComponent implements OnInit {

  queryParams: Params;
  user = new UserModel();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalSv: ModalService,
              private authSv: AuthService,
              private ga: GaService,
              private tSv: TranslateService) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
    });

    this.user.culture = CultureModel.getHomepageCulture();
    this.user.country = CountryModel.getHomepageCountry();

  }

  onSignupClicked(form: NgForm) {

    this.ga.logEvent('signup_clicked', GaService.Categories.engagement, '/signup');

    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if (password !== confirmPassword) {
      // Show an error

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('signup.passwordsDoNotMatch'),
        this.tSv.instant('reusable.done'));
      return ;

    } else if (password === null || password === '') {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('signup.passwordMissing'),
        this.tSv.instant('reusable.done'));
      return ;

    } else if (password.length < 7) {

      // Password needs to be 7 characters or longer
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('signup.passwordNotLongEnough'),
        this.tSv.instant('reusable.done'));
      return;

    } else if (password.match(new RegExp(/[A-Za-z]/)) === null) {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('signup.passwordMustIncludeAlpha'),
        this.tSv.instant('reusable.done'));
      return ;

    } else if (password.match(new RegExp(/[0-9]/)) === null) {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('signup.passwordMustIncludeNumeric'),
        this.tSv.instant('reusable.done'));
      return ;

    }

    if (this.user.country === null || this.user.country === undefined) {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('signup.selectCountry'),
        this.tSv.instant('reusable.done'));
      return ;

    }

    if (this.user.culture === null || this.user.culture === undefined)  {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('signup.selectLanguage'),
        this.tSv.instant('reusable.done'));
      return ;

    }

    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.email = email;

    if (this.user.email) {
      this.user.email = this.user.email.toLowerCase();
    }

    this.authSv.signUp(this.user, password).subscribe((response) => {

      this.tSv.use(response.user.culture);
      CultureModel.setHomepageCulture(response.user.culture);
      CountryModel.setHomepageCountry(response.user.country);
      this.router.navigate(['createstudent'], { queryParams: this.queryParams });

    }, (error: ErrorModel) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('reusable.unknownError'),
        this.tSv.instant('reusable.done'));
    });


  }

  onEULAClicked() {

    this.ga.logEvent('tc_clicked', GaService.Categories.engagement, '/signup')
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'tc']);


  }

  onPrivacyPolicyClicked() {

    this.ga.logEvent('privacy_policy_clicked', GaService.Categories.engagement, '/signup');
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'privacy']);

  }

  onSignInClicked() {

    this.ga.logEvent('navigate_signin_clicked', GaService.Categories.engagement, '/signup');
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signin']);


  }

}
