import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerModel, AnswerQueryModel, AnswersGroupedModel } from '../models/answer.model';
import { AuthService } from './auth.service';
import { StudentModel } from '../models/authentication/student.model';
import { map } from 'rxjs/operators';
import { StringExtensionModel } from '../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private authSv: AuthService) { }

  fetchAnswers(query: AnswerQueryModel): Observable<AnswerModel[]> {

    let url = '/students/' + StudentModel.getCurrent()._id + '/answers';

    if (query) {
      url += StringExtensionModel.queryString(query);
    }

    return this.authSv.get(url).pipe(map((response) => {

      const answers = AnswerModel.generateModels(response.data);
      return answers;

    }));

  }

  fetchGroupedAnswers(query: AnswerQueryModel): Observable<AnswersGroupedModel[]> {

    let url = '/students/' + StudentModel.getCurrent()._id + '/answersGrouped';

    if (query) {
      url += StringExtensionModel.queryString(query);
    }

    return this.authSv.get(url).pipe(map((response) => {

      const groups = AnswersGroupedModel.generateModels(response.data);
      return groups;

    }));

  }

  fetchNumAnswers(fromDate: Date, toDate: Date): Observable<number> {

    let url = '/students/' + StudentModel.getCurrent()._id + '/numAnswers';

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

      const numAnswers = response.data.count;
      return numAnswers;

    }));

  }

}
