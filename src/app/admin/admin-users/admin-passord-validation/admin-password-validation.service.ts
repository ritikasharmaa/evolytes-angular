import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPasswordValidationService {

  isVisible = false;
  enteredPassword = '';

  observer: Subscriber<string> = null;

  constructor() { }

  show() {

    this.isVisible = true;

    const observable = new Observable((observer: Subscriber<string>) => {
      this.observer = observer;
    });

    return observable;

  }

  validate() {
    this.isVisible = false;
    if (this.observer !== null) {
      this.observer.next(this.enteredPassword);
      this.observer.complete();
      this.enteredPassword = '';
    }
  }

  cancel() {
    this.isVisible = false;
    if (this.observer !== null) {
      this.observer.complete();
      this.enteredPassword = '';
    }
  }

}
