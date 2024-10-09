import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class SingleAdditionModel extends QuestionModel {

  model: {
    firstRange: RangeModel,
    secondRange: RangeModel,
    possibleAnswers: RangeModel,
    minOutcome: number,
    maxOutcome: number,
    numAnswers: number,
    imageTypeOne: string
  } = {
    firstRange: new RangeModel(),
    secondRange: new RangeModel(),
    possibleAnswers: new RangeModel(),
    minOutcome: null,
    maxOutcome: null,
    numAnswers: 4,
    imageTypeOne: QuestionModel.ImageTypes.Apple
  };

  static generateModel(json: any): SingleAdditionModel {

    const q = new SingleAdditionModel();

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

      q.model.minOutcome = model.minOutcome;
      q.model.maxOutcome = model.maxOutcome;

      q.model.numAnswers = model.numAnswers;
      q.model.imageTypeOne = model.imageTypeOne;

    }

    return q;

  }

}
