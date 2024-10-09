import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ErrorModel} from '../models/shared/error.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisisble = false;

  title: string = null;
  /** Types are 'error', 'alert', 'choice' and 'destruct' **/
  type: string = null;
  message: string = null;
  firstButtonTitle: string = null;
  secondButtonTitle: string = null;
  classColor: string = 'greenBg';
  buttonColor: string = 'greenButton';

  observer: Subscriber<boolean>;

  constructor(private tSv: TranslateService) { }

  showAlertModal(title: string, message: string, acceptTitle?: string,  classColor?: string, buttonColor?: string) {

    this.type = 'alert';
    this.title = title;
    this.message = message;
    this.firstButtonTitle = acceptTitle || this.tSv.instant('reusable.done');
    this.isVisisble = true;
    this.classColor = classColor || 'greenBg';
    this.buttonColor = buttonColor || 'greenButton';

    const observable = new Observable((observer: Subscriber<boolean>) => {
      this.observer = observer;
    });

    return observable;

  }

  showChoiceModal(title: string, message: string, acceptTitle?: string, dismissTitle?: string) {

    this.type = 'choice';
    this.title = title;
    this.message = message;
    this.firstButtonTitle = acceptTitle || this.tSv.instant('reusable.accept');
    this.secondButtonTitle = dismissTitle || this.tSv.instant('reusable.cancel');
    this.isVisisble = true;

    const observable = new Observable((observer: Subscriber<boolean>) => {
      this.observer = observer;
    });

    return observable;

  }

  showErrorModal(title: string, message: string, acceptTitle?: string, dismissTitle?: string) {

    this.type = 'error';
    this.title = title;
    this.message = message;
    this.firstButtonTitle = acceptTitle || this.tSv.instant('reusable.done');
    this.secondButtonTitle = dismissTitle || this.tSv.instant('reusable.cancel');
    this.isVisisble = true;

    const observable = new Observable((observer: Subscriber<boolean>) => {
      this.observer = observer;
    });

    return observable;

  }

  showTranslatedErrorModal(e: ErrorModel, acceptTitle?: string) {

    this.type = 'error';
    this.title = this.tSv.instant('reusable.error');
    this.message = e.message;
    this.firstButtonTitle = acceptTitle || this.tSv.instant('reusable.done');
    this.isVisisble = true;

    const observable = new Observable((observer: Subscriber<boolean>) => {
      this.observer = observer;
    })

    return observable;

  }

  acceptClicked() {
    if (this.observer) {
      this.observer.next(true);
      this.observer.complete();
    }
    this.isVisisble = false;
  }

  cancelClicked() {
    if (this.observer) {
      this.observer.next(false);
      this.observer.complete();
    }
    this.isVisisble = false;
  }

}
