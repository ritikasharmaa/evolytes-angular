import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvoCountryChangeService {

  isVisible = false;
  observer: Subscriber<string>;

  constructor() { }

  showCountrySelection(): Observable<string> {

    this.isVisible = true;

    const observable = new Observable<string>((observer) => {
      this.observer = observer;
    });

    return observable;

  }

  countryChanged(country: string) {

    this.isVisible = false;

    if (this.observer) {
      this.observer.next(country);
      this.observer.complete();
    }

  }

}
