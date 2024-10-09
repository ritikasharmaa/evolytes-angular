import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ErrorModel} from '../../../models/shared/error.model';
import {ModalService} from '../../../root/modal.service';
import {TokenModel} from '../../../models/authentication/token.model';
import {GaService} from '../../../services/ga.service';
import {TranslateService} from '@ngx-translate/core';
import {CultureModel} from '../../../models/localization/culture.model';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  token: string = null;

  constructor(private userSv: UserService,
              private modalSv: ModalService,
              private route: ActivatedRoute,
              private router: Router,
              private tSv: TranslateService,
              private ga: GaService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      this.token = params['token'];

    });

  }

  resetPasswordClicked(f: NgForm) {

    this.ga.logEvent('reset_pass_clicked', GaService.Categories.engagement);

    const password = f.value.password;
    const currentPassword = f.value.confirmPassword;

    if (TokenModel.isExpired(this.token) === true) {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('resetPassword.tokenExpired'));
      return ;
    }

    if (password !== currentPassword) {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('resetPassword.passwordsDoNotMatch'));
      return ;
    }

    this.userSv.passwordReset(this.token, password).subscribe((response) => {

      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('resetPassword.success'),
        this.tSv.instant('reusable.done')).subscribe((alertResp) => {

          this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signin']);

      });

    }, (error: ErrorModel) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'), 'An error occurred when reseting your password try again later.');
    });

  }

}
