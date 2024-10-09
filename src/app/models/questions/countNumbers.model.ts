import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class CountNumbersModel extends QuestionModel {

  model = {
    firstRange: new RangeModel(),
    possibleAnswers: new RangeModel(),
    maxCount: 2,
    numAnswers: 3,
    imageTypeOne: QuestionModel.ImageTypes.Apple
  };

  static generateModel(json: any): CountNumbersModel {

    const q = new CountNumbersModel();

    const model = json.model;

    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.possibleAnswers) {
        q.model.possibleAnswers = RangeModel.generateModel(model.possibleAnswers);
      }

      q.model.maxCount = model.maxCount;
      q.model.numAnswers = model.numAnswers;
      q.model.imageTypeOne = model.imageTypeOne;

    }

    return q;

  }

}
