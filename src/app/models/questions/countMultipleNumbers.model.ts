import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class CountMultipleNumbersModel extends QuestionModel {

  model = {
    firstRange: new RangeModel(),
    secondRange: new RangeModel(),
    possibleAnswersOneRange: new RangeModel(),
    possibleAnswersTwoRange: new RangeModel(),
    maxCount: 1,
    numAnswers: 4,
    imageTypeOne: QuestionModel.ImageTypes.Apple,
    imageTypeTwo: QuestionModel.ImageTypes.Mango
  };

  static generateModel(json: any): CountMultipleNumbersModel {

    const q = new CountMultipleNumbersModel();

    const model = json.model;

    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.secondRange) {
        q.model.secondRange = RangeModel.generateModel(model.secondRange);
      }

      if (model.possibleAnswersOneRange) {
        q.model.possibleAnswersOneRange = RangeModel.generateModel(model.possibleAnswersOneRange);
      }

      if (model.possibleAnswersTwoRange) {
        q.model.possibleAnswersTwoRange = RangeModel.generateModel(model.possibleAnswersTwoRange);
      }

      q.model.maxCount = model.maxCount;
      q.model.numAnswers = model.numAnswers;
      q.model.imageTypeOne = model.imageTypeOne;
      q.model.imageTypeTwo = model.imageTypeTwo;

    }

    return q;

  }

}
