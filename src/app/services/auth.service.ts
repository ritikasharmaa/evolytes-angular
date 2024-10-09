import { Injectable } from '@angular/core';
import {Observable, Subscriber, throwError} from 'rxjs';
import {TokenModel} from '../models/authentication/token.model';
import {UserModel} from '../models/authentication/user.model';
import {ErrorModel} from '../models/shared/error.model';
import {HttpClient} from '@angular/common/http';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.evoApi;
  isRefreshingTokens = false;
  subscribers: Subscriber<TokenModel>[] = [];

  constructor(private http: HttpClient) { }

  signUp(user: UserModel, password: string): Observable<{ user: UserModel, token: TokenModel }> {

    const body = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: password,
        culture: user.culture,
        country: user.country
      },
      clientInfo: {
        client: 'web',
        clientId: UserModel.getClientId()
      }
    };

    return this.post('/users', body, {}, false).pipe(map((response) => {

      const cResponse = <{ data: { user: UserModel, tokens: TokenModel } }>response;

      const newUser = UserModel.generate(cResponse.data.user);
      const token = TokenModel.generate(cResponse.data.tokens);

      UserModel.setCurrent( newUser );
      TokenModel.setCurrent( token );

      return { user, token };

    }));

  }

  signIn(email: string, password: string): Observable<{ user: UserModel, token: TokenModel }> {

    const body = {
      email,
      password,
      client: 'web',
      clientId: UserModel.getClientId()
    };

    return this.post('/users/login', body, {}, false).pipe(map((response) => {

      const cResponse = <{ data: { currentUser: UserModel, tokens: TokenModel }, errors: [ErrorModel] }>response;

      const newUser = UserModel.generate(cResponse.data.currentUser);
      const token = TokenModel.generate(cResponse.data.tokens);

      UserModel.setCurrent( newUser );
      TokenModel.setCurrent( token );

      return { user: newUser, token };

    }));

  }

  signOut(): Observable<{}> {

    return this.delete('/users/me/tokens').pipe(map((response) => {

      return {};

    }));

  }

  /**
   * @description GET, PATCH, POST, DELETE Reusable Methods
   */

  post(url: string, body: any, extraHeaders: any = {}, privateRoute = true, hasCustomUrl = false): Observable<{ data: any }> {

    return this.checkRefresh(privateRoute).pipe(mergeMap(() => {

      const headers = this.routeHeaders(privateRoute, extraHeaders);

      let completeUrl = this.baseUrl + url;
      // If we pass in that we are sending a custom url do not add the base url to it
      if (hasCustomUrl) {
        completeUrl = url;
      }

      return this.http.post(completeUrl,
        body,
        {
          observe: 'body',
          headers: headers
        }).pipe(map((response) => {

          const cResponse = <{ data: any }>response;

          return { data: cResponse.data };

      }), catchError( err => {

        return throwError( ErrorModel.catchError(err) );

      }));

    }));

  }

  patch(url: string, body: any, extraHeaders: any = {}, privateRoute = true, hasCustomUrl = false): Observable<{ data: any }> {

    return this.checkRefresh(privateRoute).pipe(mergeMap(() => {

      const newHeaders = this.routeHeaders(privateRoute, extraHeaders);

      let completeUrl = this.baseUrl + url;
      // If we pass in that we are sending a custom url do not add the base url to it
      if (hasCustomUrl) {
        completeUrl = url;
      }

      return this.http.patch(completeUrl,
        body,
        {
          observe: 'body',
          headers: newHeaders
        }).pipe(map((response) => {

          const cResponse = <{ data: any }>response;

          return { data: cResponse.data };

      }), catchError( err => {

        return throwError( ErrorModel.catchError(err) );

      }));

    }));

  }

  get(url: string, extraHeaders: any = {}, privateRoute = true, hasCustomUrl = false): Observable<{ data: any }> {

    return this.checkRefresh(privateRoute).pipe(mergeMap(() => {

      const newHeaders = this.routeHeaders(privateRoute, extraHeaders);
      let completeUrl = this.baseUrl + url;
      // If we pass in that we are sending a custom url do not add the base url to it
      if (hasCustomUrl) {
        completeUrl = url;
      }

      return this.http.get(completeUrl,
        {
          observe: 'body',
          headers: newHeaders
        }).pipe(map((response) => {

          const cResponse = <{ data: any }>response;

          return { data: cResponse.data };

      }), catchError( err => {

        return throwError( ErrorModel.catchError(err) );

      }));

    }));

  }

  delete(url: string, extraHeaders: any = {}, privateRoute = true, hasCustomUrl = false): Observable<{ data: any }> {

    return this.checkRefresh(privateRoute).pipe(mergeMap(() => {

      const newHeaders = this.routeHeaders(privateRoute, extraHeaders);
      let completeUrl = this.baseUrl + url;
      // If we pass in that we are sending a custom url do not add the base url to it
      if (hasCustomUrl) {
        completeUrl = url;
      }

      return this.http.delete(completeUrl,
        {
          observe: 'body',
          headers: newHeaders
        }).pipe(map((response) => {

          const cResponse = <{ data: any }>response;

          return { data: cResponse.data };

      }), catchError( err => {

        return throwError( ErrorModel.catchError(err) );

      }));

    }));

  }


  /**
   * @description Refreshing Tokens when needed.
   * @param token The refresh token to use.
   */

  refreshTokens(token: string): Observable<{ token: TokenModel }> {

    const body = {
      refreshToken: token,
      client: 'web',
      clientId: UserModel.getClientId()
    };

    return this.http.post(this.baseUrl + '/users/me/tokens',
      body,
      { observe: 'body', headers: this.getHeaders()
      }).pipe(map((response) => {

      const cResponse = <{ data: TokenModel}>response;

      const newToken = TokenModel.generate(cResponse.data);
      TokenModel.setCurrent( newToken );

      for (const subscriber of this.subscribers) {
        subscriber.next( newToken );
        subscriber.complete();
      }

      return { token: newToken };

    }));

  }

  /**
   * Method to refresh tokens
   */
  checkRefresh(privateRoute = true): Observable<{ token: TokenModel }> {

    if (privateRoute === true) {

      if (TokenModel.getCurrent() && UserModel.getCurrent() &&
        TokenModel.getCurrent().isAccessTokenExpired() === true &&
        TokenModel.getCurrent().isRefreshTokenExpired() === false) {

        if (this.isRefreshingTokens === false) {

          this.isRefreshingTokens = true;
          this.subscribers = [];

          return this.refreshTokens(TokenModel.getCurrent().refreshToken).pipe(map((response) => {

            for (const subscribe of this.subscribers) {
              subscribe.next(response.token);
              subscribe.complete();
            }

            return response;

          }));

        } else {

          return Observable.create((subscriber) => {

            this.subscribers.push(subscriber);
          });

        }
      }
    }

    return Observable.create((observer) => {
      observer.next({ tokens: TokenModel.getCurrent(), errors: null });
      observer.complete();
    });
  }

  /**
   * @description Getters for headers.
   */

  getHeaders() {
    return { 'Content-Type': 'application/json' };
  }

  getHeadersAccessToken() {

    const headers = this.getHeaders();
    const accessToken = TokenModel.getCurrent().accessToken;
    if (accessToken) {
      headers['x-auth'] = accessToken;
    }

    return headers;
  }

  routeHeaders(privateRoute = true, extraHeaders = {}) {

    let headers = this.getHeaders();
    if (privateRoute) {
      headers = this.getHeadersAccessToken();
    }

    if (extraHeaders) {
      for (const key of Object.keys(extraHeaders)) {
        if (extraHeaders[key]) {
          headers[key] = extraHeaders[key];
        }
      }
    }

    return headers;
  }

}
