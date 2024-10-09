import {TranslateService} from '@ngx-translate/core';

export class ErrorModel {

  public name: string;
  public message: string;

  static generate(json: any): ErrorModel {

    const error = new ErrorModel();
    error.name = json.name;
    error.message = json.message;

    return error;
  }

  static generatList(jsonList: any[]) {

    const list = [];
    if (jsonList !== null && jsonList !== undefined) {
      for (const json of jsonList) {
        const error = this.generate(json);
        list.push(error);
      }
    }

    return list;
  }

  static genericError(): ErrorModel {

    const error = new ErrorModel();
    error.name = 'Unknown Error';
    error.message = 'An unknown error occurred. Try again later.';

    return error;

  }

  /**
   * @description A method to handle errors when catching errors.
   *
   * @param err The error which needs to be caught.
   */
  static catchError(err: any) {

    if (err) {
      if (err.error) {
        if (err.error.errors) {

          const genErrors = ErrorModel.generatList(err.error.errors);
          if (genErrors.length > 0) {

            return genErrors[0];
          }
        }
      }
    }

    return ErrorModel.genericError();

  }

  static GetError(name: string, tSv: TranslateService): ErrorModel {

    const error = new ErrorModel();
    error.name = name;
    error.message = this.GetErrorMessage(name, tSv);

    return error;

  }

  static GetErrorMessage(name: string, tSv: TranslateService): string {

    const errorMessage = tSv.instant('errors.' + name);
    if (errorMessage === 'errors.' + name) {
      return tSv.instant('reusable.unknownError');
    }

    return errorMessage;
  }

}
