import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Token} from '@angular/compiler';
import {TokenModel} from '../../../models/authentication/token.model';
import {UserService} from '../../../services/user.service';
import {catchError} from 'rxjs/operators';
import {ErrorModel} from '../../../models/shared/error.model';
import {ModalService} from '../../../root/modal.service';
import {UserModel} from '../../../models/authentication/user.model';
import {GaService} from '../../../services/ga.service';
import {TranslateService} from '@ngx-translate/core';
import {CultureModel} from '../../../models/localization/culture.model';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  disabled = true;
  message: string = null;

  constructor(private userSv: UserService,
              private modalSv: ModalService,
              private route: ActivatedRoute,
              private router: Router,
              private ga: GaService,
              private tSv: TranslateService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      const token = params['token'];

      const expired = TokenModel.isExpired(token);

      if (expired === true) {

        this.message = 'verifyEmail.subtitleError';
        this.disabled = false;
        return ;
      }

      this.userSv.verifyEmail(token).subscribe((user) => {

        this.ga.logEvent('email_verified_success', GaService.Categories.engagement);

        this.disabled = false;
        this.message = 'verifyEmail.successMessage';
        this.modalSv.showAlertModal(this.tSv.instant('verifyEmail.success'),
          this.tSv.instant('verifyEmail.successMessage')).subscribe((response) => {
          if (CultureModel.getHomepageCulture()) {
            this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
          } else {
            this.router.navigate(['home', CultureModel.enGB, 'landing']);
          }
        });

        const currentUser = UserModel.getCurrent();
        if (currentUser !== null && currentUser !== undefined) {
          currentUser.isEmailVerified = true;
          UserModel.setCurrent( currentUser );
        }

      }, (error: ErrorModel) => {
        this.message = error.message;
        this.disabled = false;
      });

    });

  }

  onHomeClick() {

    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'landing']);
    }

  }

}
