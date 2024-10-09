import {RangeModel} from '../range.model';
import {QuestionModel} from '../question.model';

export class SingleMultiplicationModel extends QuestionModel {

  model = {
    firstRange: new RangeModel(),
    secondRange: new RangeModel(),
    possibleAnswers: new RangeModel(),
    numAnswers: 4
  };

  static generateModel(json: any): SingleMultiplicationModel {

    const q = new SingleMultiplicationModel();

    const model = json.model;
    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.secondRange) {
        q.model.secondRange = RangeModel.generateModel(model.secondRange);
      }

      if (model.possibleAnswers) {
        q.model.possibleAnswers = RangeModel.generateModel(model.possibleAnswers);
      }

      q.model.numAnswers = model.numAnswers;

    }

    return q;

  }

}
