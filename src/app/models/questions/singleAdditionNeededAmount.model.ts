import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class SingleAdditionNeededAmountModel extends QuestionModel {

  model = {
    firstRange: new RangeModel(),
    total: new RangeModel(),
    possibleAnswers: new RangeModel(),
    maxOutcome: null,
    minOutcome: null,
    numAnswers: 4,
    imageTypeOne: QuestionModel.ImageTypes.Apple
  };

  static generateModel(json: any): SingleAdditionNeededAmountModel {

    const q = new SingleAdditionNeededAmountModel();

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
