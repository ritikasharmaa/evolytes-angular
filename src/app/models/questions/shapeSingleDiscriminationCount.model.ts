import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class ShapeSingleDiscriminationCountModel extends QuestionModel {

  model: {
    firstRange: RangeModel,
    shape: string,
    otherShapes: string[],
    possibleAnswers: RangeModel,
    numAnswers: number
  } = {
    firstRange: new RangeModel(),
    shape: QuestionModel.ShapeTypes.circle,
    otherShapes: [],
    possibleAnswers: new RangeModel(),
    numAnswers: 4
  };

  static generateModel(json: any): ShapeSingleDiscriminationCountModel {

    const q = new ShapeSingleDiscriminationCountModel();

    const model = json.model;
    if (model) {

      if (model.firstRange) {
        q.model.firstRange = RangeModel.generateModel(model.firstRange);
      }

      if (model.possibleAnswers) {
        q.model.possibleAnswers = RangeModel.generateModel(model.possibleAnswers);
      }

      if (model.otherShapes instanceof Array) {
        q.model.otherShapes = model.otherShapes;
      }

      q.model.shape = model.shape;
      q.model.numAnswers = model.numAnswers;

    }

    return q;

  }

}
