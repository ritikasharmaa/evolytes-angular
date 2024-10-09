import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../models/authentication/user.model';
import {UserService} from '../../../services/user.service';
import {ErrorModel} from '../../../models/shared/error.model';
import {ModalService} from '../../../root/modal.service';
import {Router} from '@angular/router';
import {GaService} from '../../../services/ga.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-email-not-verified',
  templateUrl: './email-not-verified.component.html',
  styleUrls: ['./email-not-verified.component.css']
})
export class EmailNotVerifiedComponent implements OnInit {

  constructor(private userSv: UserService,
              private modalSv: ModalService,
              private router: Router,
              private tSv: TranslateService,
              private ga: GaService) { }

  ngOnInit() {
  }

  userEmail(): string {

    return UserModel.getCurrent().email;
  }

  onSkipClicked() {
    this.ga.logEvent('skip_verify_email_clicked', GaService.Categories.engagement);
    // We need to handle if the user has not got any students and has not bought or gone through adequate setup.
    this.router.navigate(['selectstudent']);
  }

  resendVerificationEmail() {

    this.ga.logEvent('send_verify_email_clicked', GaService.Categories.engagement);
    this.userSv.resendVerificationEmail(UserModel.getCurrent().email).subscribe((response) => {
      this.modalSv.showAlertModal(this.tSv.instant('reusable.success'),
        this.tSv.instant('verifyEmail.emailSentPartOne') + UserModel.getCurrent().email + this.tSv.instant('verifyEmail.emailSentPartTwo'));
    }, (error: ErrorModel) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('reusable.unknownError'));
    });

  }

}
