import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();


export class TokenModel {

  private static currentToken: TokenModel;
  private static storageKey = 'token';

  public accessToken: string;
  public refreshToken: string;

  static generate(json: any): TokenModel {

    const token = new TokenModel();
    token.accessToken = json.accessToken;
    token.refreshToken = json.refreshToken;

    return token;
  }

  static getCurrent(): TokenModel {

    if (this.currentToken) {
      return this.currentToken;
    }

    const tokenJson = localStorage.getItem(this.storageKey);

    if (tokenJson) {
      this.currentToken = TokenModel.generate( JSON.parse(tokenJson) );
      return this.currentToken;
    }

    return null;
  }

  static setCurrent(token: TokenModel) {

    this.currentToken = token;
    if (token) {
      localStorage.setItem(this.storageKey, JSON.stringify(token));
    } else {
      this.removeCurrent();
    }

  }

  static removeCurrent() {
    this.currentToken = null;
    localStorage.removeItem(this.storageKey);
  }

  static isExpired(token: string): boolean {

    if (token) {
      try {

        const payload = (<{ exp: number, iat: number, _id: string, email: string}>helper.decodeToken(token));

        // exp is in seconds and date.now is in milliseconds
        const expired = payload.exp * 1000 < Date.now();

        return expired;

      } catch (e) {
        // If there is an error it is expired
        return true;
      }

    }

    return true;
  }

  isAccessTokenExpired(): boolean {
    return TokenModel.isExpired( this.accessToken );
  }

  isRefreshTokenExpired(): boolean {
    return TokenModel.isExpired( this.refreshToken );
  }

}
