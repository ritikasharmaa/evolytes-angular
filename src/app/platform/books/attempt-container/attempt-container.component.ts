import {Component, Input, OnInit} from '@angular/core';
import {BookVersionIntegrationModel} from '../../../models/book-version.model';
import {BookExamAttemptModel} from '../../../models/book-exam-attempt.model';
import {DateTime} from 'luxon';
import {DateExtensionModel} from '../../../models/extensions/date-extension.model';
import {TranslateService} from '@ngx-translate/core';
import {UserModel} from '../../../models/authentication/user.model';

@Component({
  selector: 'app-attempt-container',
  templateUrl: './attempt-container.component.html',
  styleUrls: ['./attempt-container.component.css']
})
export class AttemptContainerComponent implements OnInit {
  @Input() containerWith = '90%';
  @Input() isList = true;
  @Input() integration: BookVersionIntegrationModel = null;
  @Input() attempt: BookExamAttemptModel = null;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
  }

  integrationName(integration: BookVersionIntegrationModel): string {

    if (UserModel.getCurrent()) {

      return integration.monitorNames.stringForCulture(UserModel.getCurrent().culture);
    }

    return null;
  }

  integrationCorrectAnswers(integration: BookVersionIntegrationModel, attempt: BookExamAttemptModel): any {

    const scoreBase = ' / ' + integration.numQuestions();
    if (integration.successfulAttempt && (attempt._id === integration.successfulAttempt._id)) {
        return integration.successfulAttempt.numCorrect + scoreBase;
    } else if (integration.attempts.length > 0) {

      return attempt.numCorrect + scoreBase;
    }

    return this.translate.instant('reusable.none');

  }

  integrationExamNumAttempts(integration: BookVersionIntegrationModel, attempt: BookExamAttemptModel) {
    for ( const id in integration.attempts ) {
      if (integration.attempts[id]._id === attempt._id){
        return String(Number(id) + 1);
      }
    }
    return null;
  }

  integrationExamStatus(integration: BookVersionIntegrationModel, attempt: BookExamAttemptModel): any {

    if (integration.successfulAttempt && attempt._id === integration.successfulAttempt._id) {
      return {url: './assets/icons/white-checkmark-icon.svg', bgColor: 'greenLightBg', className: 'bigCheckmarkIcon'};
    } else if (integration.attempts.length > 0 ) {
      return {url: './assets/icons/close-icon.svg', bgColor: 'redBgIcon', className: 'bigCloseIcon'};
    } else if (integration.attempts.length === 0) {
      return {url: './assets/icons/attachment-icon-gray.svg', bgColor: 'lightGrayBg', className: 'bigAttachmentIcon'};
    }
    return null;

  }

  integrationLastAttempt(integration: BookVersionIntegrationModel, attempt: BookExamAttemptModel): string {
    if (integration.attempts.length > 0) {
      if (attempt.finishedAt) {

        const date = DateTime.fromJSDate(attempt.finishedAt);

        const day = date.day;
        // Starts 1 need to adjust for our translations
        const month = date.month - 1;
        const year = date.year;

        return `${day}. ` + this.translate.instant('months.' + DateExtensionModel.monthName(month)) + ` ${year}`;
      }
    }
    return null;
  }

}
