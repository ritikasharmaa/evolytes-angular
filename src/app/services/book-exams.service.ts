import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {BookVersionModel} from '../models/book-version.model';
import {Observable} from 'rxjs';
import {StudentModel} from '../models/authentication/student.model';
import {map} from 'rxjs/operators';
import {BookExamAttemptModel} from '../models/book-exam-attempt.model';

@Injectable({
  providedIn: 'root'
})
export class BookExamsService {

  constructor(private authSv: AuthService) { }

  fetchBookExamsGrouped(): Observable<BookVersionModel[]> {

    return this.authSv.get('/students/' + StudentModel.getCurrent()._id + '/bookExamsGrouped').pipe(map((response) => {

      const list = [];

      const groupedAttempts = response.data;
      for (const versionGroup of groupedAttempts) {

        const bookVersion = BookVersionModel.generateModel(versionGroup.bookVersion);
        const attempts = BookExamAttemptModel.generateList(versionGroup.attempts);
        bookVersion.addAttempts(attempts);
        list.push(bookVersion);

      }

      return list;

    }));


  }

}
