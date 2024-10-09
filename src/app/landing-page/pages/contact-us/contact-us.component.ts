import {Component, OnInit} from '@angular/core';
import {ContactUsService} from "./contact-us.service";
import {ModalService} from "../../../root/modal.service";
import {ActivatedRoute} from '@angular/router';
import {CountryModel} from '../../../models/localization/country.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  hidden = true;

  messageInfo: { name: string, email: string, phone: string, subject: string, message: string, country: string, culture: string };
  messageError: { name: boolean, email: boolean, subject: boolean, message: boolean };
  isSendingContactRequest = false;

  constructor(
    private contactUsSv: ContactUsService,
    private titleSv: Title,
    private modalSv: ModalService,
    private route: ActivatedRoute,
    private tSv: TranslateService
  ) {
  }

  ngOnInit() {

    this.messageInfo = {name: null, email: null, phone: null, subject: null, message: null, country: CountryModel.getHomepageCountry(), culture: CultureModel.getHomepageCulture()};
    this.messageError = {name: false, email: false, subject: false, message: false};

    this.route.queryParams.subscribe((params) => {
      const subject = params['subject'];
      if (subject) {
        this.messageInfo.subject = subject;
      }
    });

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleSv.setTitle('Hafðu samband');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleSv.setTitle('Contact us');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleSv.setTitle('Nous contacter');
    }

  }

  setHidden() {
    this.hidden = !this.hidden;
  }

  sendMessage() {

    this.messageError = {
      name: this.messageInfo.name === '' || this.messageInfo.name === null,
      email: this.messageInfo.email === '' || this.messageInfo.email === null,
      subject: this.messageInfo.subject === '' || this.messageInfo.subject === null,
      message: this.messageInfo.message === '' || this.messageInfo.message === null
    };

    // tslint:disable-next-line:max-line-length
    // TODO: Error for invalid email translated
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.messageInfo.email) {
      if (this.messageInfo.email.match(regex) === null) {
        this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), this.tSv.instant('lp2.newsletter.emailInvalid'));
        return ;
      }
    }

    if (!this.messageInfo.name) {

      this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), this.tSv.instant('lp2.contactUs.popUpMissingNameField'));
      return ;

    } else if (!this.messageInfo.email) {

      this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), this.tSv.instant('lp2.contactUs.popUpMissingEmailField'));
      return ;

    } else if (!this.messageInfo.subject) {

      this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), this.tSv.instant('lp2.contactUs.popUpMissingSubjectField'));
      return ;

    } else if (!this.messageInfo.message) {

      this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), this.tSv.instant('lp2.contactUs.popUoMissingMessageField'));
      return ;

    }

    this.isSendingContactRequest = true;

    this.contactUsSv.sendRequestEmail(this.messageInfo).subscribe((response) => {
      this.isSendingContactRequest = false;
      if (response) {
        this.modalSv.showAlertModal(this.tSv.instant('reusable.success'), this.tSv.instant('lp2.contactUs.popUpSuccessMessage'));
      } else {
        this.modalSv.showErrorModal(this.tSv.instant('reusable.error'), this.tSv.instant('lp2.contactUs.popUpErrorMessage'));
      }
    });

  }

  inputChanged(event: KeyboardEvent) {
    this.messageInfo.message = (<HTMLInputElement>event.target).value;
  }
}
