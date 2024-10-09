import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { BookVersionIntegrationModel, BookVersionModel } from '../models/book-version.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookVersionService {

  constructor(private authSv: AuthService) { }

  fetchBookVersions(bookId: string): Observable<BookVersionModel[]> {

    return this.authSv.get('/books/' + bookId + '/versions').pipe(map((response) => {

      const bookVersions = BookVersionModel.generateModels(response.data);
      return bookVersions;

    }));

  }

  fetchBookVersionById(bookId: string, versionId: string): Observable<BookVersionModel> {

    return this.authSv.get('/books/' + bookId + '/versions/' + versionId).pipe(map((response) => {

      const bookVersion = BookVersionModel.generateModel(response.data);
      return bookVersion;

    }));

  }
  copyBookVersion(version: BookVersionModel, bookId: string) {

    const url = '/books/' + bookId + '/versions/' + version._id + '/copy';

    return this.authSv.get(url).pipe(map((response) => {
      const bookVersion = BookVersionModel.generateModel(response.data);

      return bookVersion;

    }));

  }
  createBookVersion(version: BookVersionModel, bookId: string): Observable<BookVersionModel> {

    return this.authSv.post('/books/' + bookId + '/versions', version).pipe(map((response) => {

      const bookVersion = BookVersionModel.generateModel(response.data);
      return bookVersion;

    }));

  }

  updateBookVersion(version: BookVersionModel, bookId: string): Observable<BookVersionModel> {

    return this.authSv.patch('/books/' + bookId + '/versions/' + version._id, version).pipe(map((response) => {

      const bookVersion = BookVersionModel.generateModel(response.data);
      return bookVersion;

    }));
  }

  deleteBookVersion(bookId: string, versionId: string): Observable<BookVersionModel> {

    return this.authSv.delete('/books/' + bookId + '/versions/' + versionId).pipe(map((response) => {

      const bookVersion = BookVersionModel.generateModel(response.data);
      return bookVersion;

    }));

  }

  fetchIntegration(integrationId: string): Observable<BookVersionIntegrationModel> {

    return this.authSv.get('/integrations/' + integrationId).pipe(map((response) => {

      const integration = BookVersionIntegrationModel.generateModel(response.data);
      return integration;

    }));

  }

}
