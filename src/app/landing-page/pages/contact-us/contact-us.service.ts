import { Injectable } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private authSv: AuthService) { }

  sendRequestEmail(messageInfo: {name: string, email: string, phone: string, subject: string, message: string}): Observable<any>{

    return this.authSv.post('/contactUs', messageInfo, {}, false).pipe(map((response) => {
      return response;
    }));
  }
}
