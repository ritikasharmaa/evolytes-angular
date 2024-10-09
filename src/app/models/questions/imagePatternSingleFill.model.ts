import {QuestionModel} from '../question.model';

export class ImagePatternSingleFillModel extends QuestionModel {

  model: {
    pattern: string[],
    numPatternValues: number,
    missingPatternIndex: number,
    possiblePatternImages: string[],
    numAnswers: number
  } = {
    pattern: [],
    numPatternValues: 2,
    missingPatternIndex: 0,
    possiblePatternImages: [],
    numAnswers: 4
  };

  static generateModel(json: any): ImagePatternSingleFillModel {

    const q = new ImagePatternSingleFillModel();

    const model = json.model;

    if (model) {

      if (model.pattern instanceof Array) {
        q.model.pattern = model.pattern;
      }

      if (model.possiblePatternImages instanceof Array) {
        q.model.possiblePatternImages = model.possiblePatternImages;
      }

      q.model.numPatternValues = model.numPatternValues;
      q.model.missingPatternIndex = model.missingPatternIndex;
      q.model.numAnswers = model.numAnswers;

    }

    return q;

  }

}
