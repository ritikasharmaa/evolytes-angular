export class NumberExtensionModel {

  static delimiterSeparatedNumber(value: number, delimiter: string, fractionalDigits: number = 0): string {

    return value.toFixed(fractionalDigits).replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

  }

  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  static localeSeparatedNumber(value: number, culture: string = 'en-GB', fractionalDigits: number = 0): string {

    return value.toLocaleString(culture, { maximumFractionDigits: fractionalDigits });

  }

}
