import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class NumberPatternSingleFillModel extends QuestionModel {

  model: {
    firstRange: RangeModel,
    patternOpType: string,
    patternValue: RangeModel,
    missingValueIndex: number,
    numPatternValues: number,
    possibleAnswers: RangeModel,
    numAnswers: number
  } = {
    firstRange: new RangeModel(),
    patternOpType: QuestionModel.OperationTypes.addition,
    patternValue: new RangeModel(),
    missingValueIndex: 0,
    numPatternValues: 3,
    possibleAnswers: new RangeModel(),
    numAnswers: 4
  };

  static generateModel(json: any): NumberPatternSingleFillModel {

    const q  = new NumberPatternSingleFillModel();

    const model = json.model;
    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.patternValue) {
        q.model.patternValue = RangeModel.generateModel(model.patternValue);
      }

      if (model.possibleAnswers) {
        q.model.possibleAnswers = RangeModel.generateModel(model.possibleAnswers);
      }

      q.model.patternOpType = model.patternOpType;
      q.model.missingValueIndex = model.missingValueIndex;
      q.model.numPatternValues = model.numPatternValues;
      q.model.numAnswers = model.numAnswers;

    }

    return q;

  }

}
