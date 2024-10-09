import {Component, Input, OnInit} from '@angular/core';
import {BookVersionIntegrationModel, BookVersionModel} from '../../models/book-version.model';
import {BookExamsService} from '../../services/book-exams.service';
import {UserModel} from '../../models/authentication/user.model';
import {TranslateService} from '@ngx-translate/core';
import {DateTime} from 'luxon';
import {DateExtensionModel} from '../../models/extensions/date-extension.model';
import {BookExamAttemptModel} from '../../models/book-exam-attempt.model';

@Component({
  selector: 'app-chapter-container',
  templateUrl: './chapter-container.component.html',
  styleUrls: ['./chapter-container.component.css']
})
export class ChapterContainerComponent implements OnInit {

  @Input() containerWith = '90%';
  @Input() isList = true;
  @Input() integration: BookVersionIntegrationModel = null;
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

  integrationCorrectAnswers(integration: BookVersionIntegrationModel): any {

    const scoreBase = ' / ' + integration.numQuestions();
    if (integration.successfulAttempt) {

      return integration.successfulAttempt.numCorrect + scoreBase;
    } else if (integration.attempts.length > 0) {

      return integration.attempts[0].numCorrect + scoreBase;
    }

    return this.translate.instant('reusable.none');

  }

  integrationExamNumAttempts(integration: BookVersionIntegrationModel) {

    return integration.attempts.length.toString(10);
  }

  integrationExamStatus(integration: BookVersionIntegrationModel): any {

    if (integration.successfulAttempt) {
      return {url: './assets/icons/white-checkmark-icon.svg', bgColor: 'greenLightBg', className: 'bigCheckmarkIcon'};
    } else if (integration.attempts.length > 0 && !integration.successfulAttempt) {
      return {url: './assets/icons/close-icon.svg', bgColor: 'redBgIcon', className: 'bigCloseIcon'};
    } else if (integration.attempts.length === 0) {
      return {url: './assets/icons/attachment-icon-gray.svg', bgColor: 'lightGrayBg', className: 'bigAttachmentIcon'};
    }
    return null;

  }

  integrationLastAttempt(integration: BookVersionIntegrationModel): string {

    if (integration.successfulAttempt) {

      if (integration.successfulAttempt.finishedAt) {

        const date = DateTime.fromJSDate(integration.successfulAttempt.finishedAt);

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
