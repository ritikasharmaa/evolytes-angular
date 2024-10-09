import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class SizeComparisonWordsModel extends QuestionModel {

  model = {
    firstRange: new RangeModel(),
    possibleAnswers: QuestionModel.SizeComparisonTypes.list(),
    numAnswers: 3,
    imageTypeOne: null
  };

  static generateModel(json: any): SizeComparisonWordsModel {

    const q = new SizeComparisonWordsModel();

    const model = json.model;

    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      q.model.possibleAnswers = model.possibleAnswers;
      q.model.numAnswers = model.numAnswers;
      q.model.imageTypeOne = model.imageTypeOne;

    }

    return q;

  }

}
