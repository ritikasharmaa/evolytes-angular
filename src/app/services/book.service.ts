import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {BookModel} from '../models/book.model';
import {map} from 'rxjs/operators';
import {StringExtensionModel} from '../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private authSv: AuthService) { }

  fetchPublicBooks(country: string): Observable<BookModel[]> {

    let url = '/booksPublic';
    if (country) {
      url += '?country=' + country;
    }

    return this.authSv.get(url, {}, false).pipe(map((response) => {

      const books = BookModel.generateModels(response.data);

      return books;

    }));

  }

  fetchPublicBook(bookId: string): Observable<BookModel> {

    return this.authSv.get('/books/' + bookId + '/public').pipe(map((response) => {

      const book = BookModel.generateModel(response.data);

      return book;

    }));

  }

  fetchAdminBooks(): Observable<BookModel[]> {

    return this.authSv.get('/books').pipe(map((response) => {

      const books = BookModel.generateModels(response.data);
      return books;

    }));

  }

  fetchAdminBookById(id: string): Observable<BookModel> {

    return this.authSv.get('/books/' + id).pipe(map((response) => {

      const book = BookModel.generateModel(response.data);
      return book;

    }));

  }


  createAdminBook(book: BookModel): Observable<BookModel> {

    return this.authSv.post('/books', book).pipe(map((response) => {

      const nBook = BookModel.generateModel(response.data);
      return nBook;

    }));

  }

  updateAdminBook(book: BookModel): Observable<BookModel> {

    return this.authSv.patch('/books/' + book._id, book).pipe(map((response) => {

      const uBook = BookModel.generateModel(response.data);
      return uBook;

    }));

  }

  deleteAdminBook(book: BookModel): Observable<BookModel> {

    return this.authSv.delete('/books/' + book._id).pipe(map((response) => {

      const dBook = BookModel.generateModel(response.data);
      return dBook;

    }));

  }

}
