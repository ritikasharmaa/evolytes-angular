import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class SizeComparisonNumbersModel extends QuestionModel {

  model = {
    firstRange: new RangeModel(),
    symbol: QuestionModel.SizeComparisonTypes.greater,
    possibleAnswers: new RangeModel(),
    leftSideUnknown: true,
    numAnswers: 4,
    imageTypeOne: null
  };

  static generateModel(json: any): SizeComparisonNumbersModel {

    const q = new SizeComparisonNumbersModel();

    const model = json.model;

    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.possibleAnswers) {
        q.model.possibleAnswers = RangeModel.generateModel(model.possibleAnswers);
      }

      q.model.numAnswers = model.numAnswers;
      q.model.imageTypeOne = model.imageTypeOne;

    }

    return q;

  }


}
