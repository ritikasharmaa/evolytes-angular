import {QuestionModel} from '../question.model';

export class ShapeNameFromImageModel extends QuestionModel {

  model: {
    shape: string,
    possibleAnswers: string[],
    numAnswers: number
  } = {
    shape: QuestionModel.ShapeTypes.circle,
    possibleAnswers: [],
    numAnswers: 4
  };

  static generateModel(json: any): QuestionModel {

    const q = new ShapeNameFromImageModel();

    const model = json.model;

    if (model) {

      if (model.possibleAnswers instanceof Array) {
        q.model.possibleAnswers = model.possibleAnswers;
      }

      q.model.shape = model.shape;
      q.model.numAnswers = model.numAnswers;

    }

    return q;

  }

}
