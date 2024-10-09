import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Newsletter} from '../models/newsletter.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  baseUrl = 'https://flw-api-test.herokuapp.com';

  constructor(private authSv: AuthService) { }

  newsletterClient(email: string): Observable<Newsletter> {

    const body = {
      email: email
    };

    return this.authSv.post('/newsletterClient',
      body,
      { 'secret': 'TheDarkKnight' },
      false
      ).pipe(map((response) => {

        const newsletter = Newsletter.generateModel(response.data);

        return newsletter;

    }));
  }

}
