import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class SingleSubtractionNeededAmountModel extends QuestionModel {

  model = {
    firstRange: new RangeModel(),
    total: new RangeModel(),
    possibleAnswers: new RangeModel(),
    minOutcome: null,
    maxOutcome: null,
    numAnswers: 4,
    imageTypeOne: QuestionModel.ImageTypes.Apple
  };

  static generateModel(json: any): SingleSubtractionNeededAmountModel {

    const q = new SingleSubtractionNeededAmountModel();

    const model = json.model;

    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.total) {
        q.model.total = RangeModel.generateModel(model.total);
      }

      if (model.possibleAnswers) {
        q.model.possibleAnswers = RangeModel.generateModel(model.possibleAnswers);
      }

      q.model.minOutcome = model.minOutcome;
      q.model.maxOutcome = model.maxOutcome;
      q.model.numAnswers = model.numAnswers;
      q.model.imageTypeOne = model.imageTypeOne;

    }

    return q;

  }

}
