import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class DoubleAdditionModel extends QuestionModel {

  model: {
    firstRange: RangeModel,
    secondRange: RangeModel,
    thirdRange: RangeModel,
    possibleAnswers: RangeModel,
    numAnswers: number,
    imageTypeOne: string,
    firstMinOutcome: number,
    firstMaxOutcome: number,
    secondMinOutcome: number,
    secondMaxOutcome: number
  } = {
    firstRange: new RangeModel(),
    secondRange: new RangeModel(),
    thirdRange: new RangeModel(),
    possibleAnswers: new RangeModel(),
    numAnswers: 4,
    imageTypeOne: QuestionModel.ImageTypes.Apple,
    firstMinOutcome: null,
    firstMaxOutcome: null,
    secondMinOutcome: null,
    secondMaxOutcome: null
  };

  static generateModel(json: any): DoubleAdditionModel {

    const q = new DoubleAdditionModel();

    const model = json.model;
    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.secondRange) {
        q.model.secondRange = RangeModel.generateModel(model.secondRange);
      }

      if (model.thirdRange) {
        q.model.thirdRange = RangeModel.generateModel(model.thirdRange);
      }

      if (model.possibleAnswers) {
        q.model.possibleAnswers = RangeModel.generateModel(model.possibleAnswers);
      }

      q.model.firstMinOutcome = model.firstMinOutcome;
      q.model.firstMaxOutcome = model.firstMaxOutcome;
      q.model.secondMinOutcome = model.secondMinOutcome;
      q.model.secondMaxOutcome = model.secondMaxOutcome;

      q.model.numAnswers = model.numAnswers;
      q.model.imageTypeOne = model.imageTypeOne;

    }

    return q;

  }

}
