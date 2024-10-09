import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionActivityModel, SessionModel } from '../models/session.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { StudentModel } from '../models/authentication/student.model';
import { StringExtensionModel } from '../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private authSv: AuthService) {
  }

  fetchSessions(): Observable<SessionModel[]> {

    const url = '/students/' + StudentModel.getCurrent()._id + '/sessions';

    return this.authSv.get(url).pipe(map((response) => {

      const sessions = SessionModel.generateModels(response.data);
      return sessions;

    }));

  }

  fetchSessionInformation(interval: string, fromDate: Date, toDate: Date, sort: number = -1): Observable<SessionActivityModel[]> {

    let url = '/students/' + StudentModel.getCurrent()._id + '/sessionsActivity';

    const queryObject = {};
    if (fromDate) {
      queryObject['fromDate'] = fromDate;
    }

    if (toDate) {
      queryObject['toDate'] = toDate;
    }

    queryObject['interval'] = interval;
    queryObject['sort'] = sort;


    if (Object.keys(queryObject).length > 0) {
      url += StringExtensionModel.queryString(queryObject);
    }
    return this.authSv.get(url).pipe(map((response) => {

      const sessionInfos = SessionActivityModel.generateModels(response.data);
      return sessionInfos;

    }));

  }

  fetchSessionDuration(fromDate: Date, toDate: Date): Observable<number> {

    let url = '/students/' + StudentModel.getCurrent()._id + '/sessionsDuration';

    const queryObject = {};
    if (fromDate) {
      queryObject['fromDate'] = fromDate;
    }

    if (toDate) {
      queryObject['toDate'] = toDate;
    }

    if (Object.keys(queryObject).length > 0) {
      url += StringExtensionModel.queryString(queryObject);
    }

    return this.authSv.get(url).pipe(map((response) => {
      if (response.data !== null) {
        const duration = response.data.duration;
        return duration;
      } else {
        return 0;
      }

    }));

  }
}
