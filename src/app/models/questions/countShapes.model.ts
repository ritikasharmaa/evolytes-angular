import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class CountShapesModel extends QuestionModel {

  model: {
    firstRange: RangeModel,
    shape: string,
    possibleAnswers: RangeModel,
    numAnswers: number
  } = {
    firstRange: new RangeModel(),
    shape: QuestionModel.ShapeTypes.circle,
    possibleAnswers: new RangeModel(),
    numAnswers: 3
  };

  static generateModel(json: any): CountShapesModel {

    const q = new CountShapesModel();

    const model = json.model;

    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.possibleAnswers) {
        q.model.possibleAnswers = RangeModel.generateModel(model.possibleAnswers);
      }

      q.model.shape = model.shape;
      q.model.numAnswers = model.numAnswers;

    }

    return q;

  }

}
