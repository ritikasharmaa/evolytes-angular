import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {QuestionModel} from '../models/question.model';
import {StudentModel} from '../models/authentication/student.model';
import {map} from 'rxjs/operators';
import {generateQuestion, generateQuestionList} from '../models/questions/question-generator';
import {StringExtensionModel} from '../models/extensions/string-extension.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private authSv: AuthService) { }

  fetchStudentQuestions(): Observable<QuestionModel[]> {

    const url = '/students/' + StudentModel.getCurrent()._id + '/questions';

    return this.authSv.get(url).pipe(map((response) => {
      const questions = generateQuestionList(response.data);

      return questions;

    }));

  }

  createQuestion(q: QuestionModel): Observable<QuestionModel> {

    return this.authSv.post('/question-types', q).pipe(map((response) => {

      const question = generateQuestion(response.data);

      return question;

    }));

  }

  updateQuestion(q: QuestionModel): Observable<QuestionModel> {

    return this.authSv.patch('/question-types/' + q._id, q).pipe(map((response) => {

      const question = generateQuestion(response.data);

      return question;

    }));

  }

  publishQuestion(qId: string, isPublished: boolean): Observable<QuestionModel> {

    return this.authSv.patch('/question-types/' + qId,
      { isPublished: isPublished }).pipe(map((response) => {

        const question = generateQuestion(response.data);

        return question;

    }));

  }

  deleteQuestion(qId: string): Observable<QuestionModel> {

    return this.authSv.delete('/question-types/' + qId).pipe(map((response) => {

      const question = generateQuestion(response.data);

      return question;

    }));

  }

  fetchQuestion(qId: string): Observable<QuestionModel> {

    return this.authSv.get('/question-types/' + qId).pipe(map((response) => {

      const question = generateQuestion(response.data);

      return question;

    }));

  }

  /**
   * Only to be used by administrators
   * @param country the country of the questions to fetch as they are country specific
   */
  fetchAdminQuestions(country: string = null): Observable<QuestionModel[]> {

    let url = environment.evoAdminApi + '/question-types';
    if (country) {
      url += StringExtensionModel.queryString({ country });
    }

    return this.authSv.get(url, null, true, true).pipe(map((response) => {

      const questions = generateQuestionList(response.data);

      return questions;

    }));

  }

  fetchQuestionCategories(): Observable<string[]> {

    return this.authSv.get('/question-types-categories').pipe(map((response) => {

      const categories = response.data;

      return categories;

    }));

  }

  fetchQuestionCategoryTree(): Observable<object> {

    return this.authSv.get('/question-types-tree').pipe(map((response) => {

      const tree = response.data;

      return tree;

    }));

  }

  fetchQuestionRepresentationTree(): Observable<object> {

    return this.authSv.get('/question-representation-tree').pipe(map((response) => {

      const representationTree = response.data;

      return representationTree;

    }));

  }

  fetchFilteredQuestion(url: string): Observable<QuestionModel[]> {
    return this.authSv.get(url).pipe(map((response) => {

      const questions = generateQuestionList(response.data);

      return questions;
    }));
  }

}
