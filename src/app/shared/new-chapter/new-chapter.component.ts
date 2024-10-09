import {Component, Input, OnInit} from '@angular/core';
import {BookVersionIntegrationModel} from '../../models/book-version.model';
import {UserModel} from '../../models/authentication/user.model';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css']
})
export class NewChapterComponent implements OnInit {
  @Input() integration: BookVersionIntegrationModel = null;
  @Input() currentIntegration: BookVersionIntegrationModel = null;

  constructor() {
  }

  ngOnInit() {
  }

  integrationName(integration: BookVersionIntegrationModel): string {

    if (UserModel.getCurrent()) {

      return integration.monitorNames.stringForCulture(UserModel.getCurrent().culture);
    }

    return null;
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

}
