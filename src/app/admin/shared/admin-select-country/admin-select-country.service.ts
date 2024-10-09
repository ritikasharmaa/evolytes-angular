import { Injectable } from '@angular/core';
import {CountryModel} from '../../../models/localization/country.model';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminSelectCountryService {

  isVisible = false;
  currentCountry: string;
  countries = CountryModel.privateDropdownList();

  observer: Subscriber<string> = null;

  constructor() { }

  show(country: string) {

    this.currentCountry = country;
    this.isVisible = true;

    const observable = new Observable((observer: Subscriber<string>) => {
      this.observer = observer;
    });

    return observable;

  }

  selected(country: string) {
    this.isVisible = false;
    if (this.observer !== null) {
      this.observer.next(country);
      this.observer.complete();
    }
  }

}
