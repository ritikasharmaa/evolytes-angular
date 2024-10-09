import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})

export class GaService {

  static Categories = {
    engagement: 'engagement',
    sales_process: 'sales_process',
    platform_engagement: 'platform_engagement',
    onboarding: 'onboarding'
  };

  constructor(private authSv: AuthService) { }

  logEvent(eventAction: string,
           eventCategory: string,
           eventLabel: string = null,
           eventValue: number = null) {

    /*
    if (this.authSv.baseUrl === 'https://evolytes-api.herokuapp.com') {
      gtag('event', eventAction, {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventValue: eventValue
      });
    }*/

  }

}
