export class StringExtensionModel {

  /**
   * @description Creates a random string of a given length.
   *
   * @param length The length of the random string in number of characters.
   */
  static randomString(length: number): string {

    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEGFHIJKLMNOPQRSTUVWXYZ1234567890';
    let randString = '';

    for (let i = 0; i < length; i++) {
      const randIndex = Math.random() * alphabet.length;
      randString += alphabet.substring(randIndex, randIndex + 1);
    }

    return randString;

  }

  /**
   * @description Creates a string on the form HH delimeter mm delimeter ss for a duration in seconds.
   * @param duration The duration to change to a string
   * @param delimeter The delimeter between HH mm ss
   */
  static hoursMinutesSeconds(duration: number, delimeter: string): string {

    const hours = this.hours(duration);
    const minutes = Math.floor(this.minutes(duration) - hours * 60);
    const seconds = Math.floor(duration - hours * 60 * 60 - minutes * 60);

    return this.addZero(hours) + delimeter + this.addZero(minutes) + delimeter + this.addZero(seconds);
  }

  static days(duration: number): number {

    const days = Math.floor(duration / (24 * 60 * 60));

    return days;
  }

  static hours(duration: number): number {

    const hours = Math.floor(duration / (60 * 60));

    return hours;
  }

  static minutes(duration: number): number {

    const minutes = Math.floor( duration / 60);

    return minutes;

  }

  static addZero(duration: number): string {

    if (duration < 10 && duration > -1) {
      return '0' + duration.toString(10);
    }

    return duration.toString(10);

  }



  static queryString(obj: object): string {

    let query = '';

    for (const key of Object.keys(obj)) {

      const value = obj[key];

      if (value !== null && value !== undefined) {

        let valueString = null;
        if (typeof value === 'boolean') {

          if (value === false) {
            valueString = '0';
          } else {
            valueString = '1';
          }

        } else if (typeof value === 'number') {
          valueString = value.toString(10);
        } else if (typeof value === 'string') {
          valueString = value;
        } else if (value instanceof Date) {
          valueString = value.toISOString();
        }

        if (valueString !== null && valueString !== undefined) {

          if (query.indexOf('?') < 0) {
            query += '?' + key;
            query += '=' + valueString;
          } else {
            query += '&' + key;
            query += '=' + valueString;
          }

        }

      }

    }

    return query;

  }

}
