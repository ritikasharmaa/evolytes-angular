import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeLangCountryService {

  isVisible = false;
  observer: Subscriber<{culture: string, country: string}>;

  constructor() { }

  showLangCountrySelection(): Observable<{culture: string, country: string}> {

    this.isVisible = true;

    const observable = new Observable<{culture: string, country: string}>((observer) => {
      this.observer = observer;
    });

    return observable;

  }

  cultureCountryChanged(payload: {culture: string, country: string}) {

    this.isVisible = false;

    if (this.observer) {
      this.observer.next(payload);
      this.observer.complete();
    }

  }

  close() {
    this.isVisible = false;
    if (this.observer) {
      this.observer.complete();
    }
  }
}
