import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ModalService} from '../../../root/modal.service';
import {UserService} from '../../../services/user.service';
import {NgForm} from '@angular/forms';
import {ErrorModel} from '../../../models/shared/error.model';
import {GaService} from '../../../services/ga.service';
import {TranslateService} from '@ngx-translate/core';
import {CultureModel} from '../../../models/localization/culture.model';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor(private authSv: AuthService,
              private userSv: UserService,
              private router: Router,
              private modalSv: ModalService,
              private tSv: TranslateService,
              private ga: GaService) { }

  ngOnInit() {
  }

  onForgotPassClicked(form: NgForm) {

    let email = form.value.email;
    if (email) {
      email = email.toLowerCase();
    }

    this.ga.logEvent('forgot_pass_clicked', GaService.Categories.engagement);
    this.userSv.forgotPasswordEmail(email).subscribe((response) => {
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('forgotPassword.success') + email)
        .subscribe((resp) => {

        this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signin']);

      });
    }, (error: ErrorModel) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('reusable.unknownError'));
    });
  }

  onSignInClicked() {
    this.ga.logEvent('navigate_signin_clicked', GaService.Categories.engagement);

    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signin']);

  }

  onSignupClicked() {
    this.ga.logEvent('navigate_signup_clicked', GaService.Categories.engagement);

    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup']);

  }

}
