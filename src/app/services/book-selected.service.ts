import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Observable, Subject} from 'rxjs';
import {BookVersionIntegrationModel, BookVersionModel} from '../models/book-version.model';
import {StudentModel} from '../models/authentication/student.model';
import {map} from 'rxjs/operators';
import {BookExamAttemptModel} from '../models/book-exam-attempt.model';

@Injectable({
  providedIn: 'root'
})
export class BookSelectedService {
  constructor(private authSv: AuthService) { }

  fetchBookSelected(versionId: string): Observable<BookVersionModel> {
    return this.authSv.get('/students/' + StudentModel.getCurrent()._id + '/bookExamsGrouped').pipe(map((response) => {
      const groupedAttempts = response.data;
      for (const versionGroup of groupedAttempts) {
        const bookVersion = BookVersionModel.generateModel(versionGroup.bookVersion);
        const attempts = BookExamAttemptModel.generateList(versionGroup.attempts);
        bookVersion.addAttempts(attempts);
        if (versionId === bookVersion._id) {
          return bookVersion;
        }
      }
    }));
  }
}
