export class RangeModel {

  static OperationTypes = {
    '*': '*',
    '/': '/',
    '+': '+',
    '-': '-',
    'none': 'none' // Has to be null for the server but this is done for display
  };

  static OperationTypesDropdown = [
    { key: RangeModel.OperationTypes['*'], value: RangeModel.OperationTypes['*'], iconURL: null },
    { key: RangeModel.OperationTypes['/'], value: RangeModel.OperationTypes['/'], iconURL: null },
    { key: RangeModel.OperationTypes['+'], value: RangeModel.OperationTypes['+'], iconURL: null },
    { key: RangeModel.OperationTypes['-'], value: RangeModel.OperationTypes['-'], iconURL: null },
    { key: RangeModel.OperationTypes.none, value: RangeModel.OperationTypes.none, iconURL: null }
  ];

  min = 0;
  max = 5;

  operationOneType = RangeModel.OperationTypes.none;
  operationOneValue = 0;

  operationTwoType = RangeModel.OperationTypes.none;
  operationTwoValue = 0;

  static applyOperation(opType: string, opValue: number, value: number): number {

    if (opType === RangeModel.OperationTypes['*']) {
      value = value * opValue;
    } else if (opType === RangeModel.OperationTypes['/']) {
      value = value / opValue;
    } else if (opType === RangeModel.OperationTypes['+']) {
      value = value + opValue;
    } else if (opType === RangeModel.OperationTypes['-']) {
      value = value - opValue;
    }

    return value;

  }

  static generateModel(json: any): RangeModel {

    const r = new RangeModel();

    r.min = json.min;
    r.max = json.max;

    r.operationOneType = json.operationOneType;
    r.operationOneValue = json.operationOneValue;

    r.operationTwoType = json.operationTwoType;
    r.operationTwoValue = json.operationTwoValue;

    return r;

  }

  getRange(): string {

    let rangeString = '';

    rangeString += this.minValue();
    if (this.min + 1 < this.max) {
      rangeString += ', ' + this.calcOpValue(this.min + 1);
    }

    rangeString += ' ... ';

    if (this.min + 1 < this.max - 1) {
      rangeString += this.calcOpValue(this.max - 1) + ', ';
    }

    rangeString += this.maxValue();

    return rangeString;

  }

  minValue(): number {

    return this.calcOpValue(this.min);
  }

  maxValue(): number {

    return this.calcOpValue(this.max);
  }

  calcOpValue(amount: number): number {

    let value = amount;

    if (this.operationOneType &&
      this.operationOneValue !== null &&
      this.operationOneValue !== undefined) {
      value = RangeModel.applyOperation(this.operationOneType, this.operationOneValue, value);
    }

    if (this.operationTwoType &&
      this.operationTwoValue !== null &&
      this.operationTwoValue !== undefined) {
      value = RangeModel.applyOperation(this.operationTwoType, this.operationTwoValue, value);
    }

    return value;
  }

}
