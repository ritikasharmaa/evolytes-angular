import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class RepeatedAdditionModel extends QuestionModel {

  model: {
    multiplierRange: RangeModel,
    multipliedValueRange: RangeModel,
    possibleAnswers: RangeModel,
    numAnswers: number,
    imageTypeOne: string
  } = {
    multiplierRange: new RangeModel(),
    multipliedValueRange: new RangeModel(),
    possibleAnswers: new RangeModel(),
    numAnswers: 4,
    imageTypeOne: null
  };

  static generateModel(json: any): RepeatedAdditionModel {

    const q = new RepeatedAdditionModel();

    const model = json.model;

    if (model) {

      if (model.multiplierRange) {
        q.model.multiplierRange = RangeModel.generateModel(model.multiplierRange);
      }

      if (model.multipliedValueRange) {
        q.model.multipliedValueRange = RangeModel.generateModel(model.multipliedValueRange);
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
