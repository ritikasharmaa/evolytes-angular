export class DateExtensionModel {

  private static monthNames = ['January', 'February',
    'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  /**
   * @description Creates a date object from a string that is ISO-8601 compliant. If you pass null or undefined
   * The method will return a null value.
   *
   * @param string The string to change to a date.
   */
  static date(string: string): Date {

    if (string !== undefined && string !== null) {

      return new Date(string);
    }

    return null;
  }

  static monthName(monthNumber: number): string {

    return this.monthNames[monthNumber];
  }

}
