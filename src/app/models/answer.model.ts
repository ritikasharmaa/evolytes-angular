import {QuestionModel} from './question.model';
import {TranslateService} from '@ngx-translate/core';
import {UserModel} from './authentication/user.model';
import {first} from 'rxjs/operators';

export class AnswerModel {

  public _id: string;

  public answer: any;
  public questionModel: object;

  public subject: string;
  public topic: string;
  public category: string;
  public subCategory: string;
  public answerType: string;
  public representation: string;

  /**
   * @description Whether the answer to the question is correct or not.
   */
  public isCorrect: boolean;

  /**
   * @description The time it took for the user to answer the question.
   */
  public answerTime: number;

  /**
   * @description The date at which the answer was done.
   */
  public answeredAt: Date;

  /**
   * @description The country of the answer.
   */
  public country: string;
  public mastery: number;
  public context: string;


  public studentId: string;
  public questionId: string;
  public integrationId: string;
  public bookExamId: string;
  public sessionId: string;

  static generateModel(json: any): AnswerModel {

    const answer = new AnswerModel();

    answer._id = json._id;

    answer.answer = json.answer;
    answer.questionModel = json.questionModel;

    answer.subject = json.subject;
    answer.topic = json.topic;
    answer.category = json.category;
    answer.subCategory = json.subCategory;
    answer.answerType = json.answerType;
    answer.representation = json.representation;

    answer.isCorrect = json.isCorrect;
    answer.answerTime = json.answerTime;

    if (json.answeredAt) {
      answer.answeredAt = new Date(json.answeredAt);
    }

    answer.country = json.country;
    answer.mastery = json.mastery;
    answer.context = json.context;

    answer.studentId = json.studentId;
    answer.questionId = json.questionId;
    answer.integrationId = json.integrationId;
    answer.bookExamId = json.bookExamId;
    answer.sessionId = json.sessionId;

    return answer;

  }

  static generateModels(jsonList: any[]): AnswerModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(AnswerModel.generateModel(json));
    }

    return list;
  }

  questionString(): string {

    if (this.subCategory === QuestionModel.SubCategoryTypes.countNumbers) {

      return this.questionModel['questionString'];
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.countMultipleNumbers) {

      return this.questionModel['answerModel']['one'] + ' & ' + this.questionModel['answerModel']['two'];
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.countDiscrimination) {

    } else if (this.subCategory === QuestionModel.SubCategoryTypes.singleAddition) {

      return this.questionModel['questionString'] + ' ' + this.answer;
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.doubleAddition) {

      return this.questionModel['questionString'] + ' ' + this.answer;
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.singleAdditionNeededAmount) {

      return this.questionModel['questionString'];
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.singleSubtraction) {

      return this.questionModel['questionString'] + ' ' + this.answer;
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.doubleSubtraction) {

      return this.questionModel['questionString'] + ' ' + this.answer;
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.singleSubtractionNeededAmount) {

      return this.questionModel['questionString'];
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.singleMultiplication) {

      const questionString = this.questionModel['questionString'];

      return questionString + this.answer.toString();

    } else if (this.subCategory === QuestionModel.SubCategoryTypes.repeatedAddition) {

      const multiplier = this.questionModel['parameters']['firstParam'];
      const multipliedValue = this.questionModel['parameters']['secondParam'];

      const answer = this.answer;

      let answerString = multipliedValue;

      for (let i = 1; i < multiplier; i++) {
        answerString += ' + ' + multipliedValue.toString();
      }
      answerString += ' = ' + answer.toString();

      return answerString;

    } else if (this.subCategory === QuestionModel.SubCategoryTypes.sizeComparisonSymbols) {

      const firstNumber = this.questionModel['parameters']['firstParam'];
      const secondNumber = this.questionModel['parameters']['secondParam'];

      const symbolString = <string>(this.answer);
      let symbol = '';
      if (symbolString === QuestionModel.SizeComparisonTypes.equal) {
        symbol = ' = ';
      } else if (symbolString === QuestionModel.SizeComparisonTypes.greater) {
        symbol = ' > ';
      } else if (symbolString === QuestionModel.SizeComparisonTypes.less) {
        symbol = ' < ';
      }

      return firstNumber + symbol + secondNumber;

    } else if (this.subCategory === QuestionModel.SubCategoryTypes.sizeComparisonWords) {

      const firstNumber = this.questionModel['parameters']['firstParam'];
      const secondNumber = this.questionModel['parameters']['secondParam'];

      const symbolString = this.answer;
      let symbol = '';
      if (symbolString === QuestionModel.SizeComparisonTypes.equal) {
        symbol = ' = ';
      } else if (symbolString === QuestionModel.SizeComparisonTypes.greater) {
        symbol = ' > ';
      } else if (symbolString === QuestionModel.SizeComparisonTypes.less) {
        symbol = ' < ';
      }

      return firstNumber.toString() + symbol + secondNumber;

    } else if (this.subCategory === QuestionModel.SubCategoryTypes.sizeComparisonNumbers) {

      const firstNumber = this.questionModel['parameters']['secondParam'];
      const secondNumber = this.questionModel['parameters']['firstParam'];
      const symbolString = this.questionModel['parameters']['symbol'];

      let symbol = '';
      if (symbolString === QuestionModel.SizeComparisonTypes.equal) {
        symbol = ' = ';
      } else if (symbolString === QuestionModel.SizeComparisonTypes.greater) {
        symbol = ' > ';
      } else if (symbolString === QuestionModel.SizeComparisonTypes.less) {
        symbol = ' < ';
      }

      if (firstNumber === null) {

        return this.answer.toString() + symbol + secondNumber.toString();
      } else if (secondNumber === null) {
        return firstNumber.toString() + symbol + this.answer.toString();
      }

    } else if (this.subCategory === QuestionModel.SubCategoryTypes.shapeNameFromImage) {

      const userAnswer = this.answer;
      const expectedAnswer = this.questionModel['answerModel'];

      return AnswerTranslations.shapeTranslation(userAnswer) + ' = ' + AnswerTranslations.shapeTranslation(expectedAnswer);

    } else if (this.subCategory === QuestionModel.SubCategoryTypes.shapeSingleDiscriminationCount) {

      const userAnswer = this.answer;
      const expectedAnswer = this.questionModel['answerModel'];

      return userAnswer + ' = ' + expectedAnswer;

    } else if (this.subCategory === QuestionModel.SubCategoryTypes.countShapes) {

      return this.questionModel['answerModel'] + ' = ' + this.answer;
    } else if (this.subCategory === QuestionModel.SubCategoryTypes.unitHouse) {

      const userAnswer = this.answer;
      const firstParam = this.questionModel['parameters']['firstParam'];
      const secondParam = this.questionModel['parameters']['secondParam'];

      return secondParam.toString() + firstParam.toString() + ' = ' + userAnswer;

    }

    return '';
  }

  answerTypeIconURL(): string {
    const baseUrl = './assets/skill-icons/';

    switch (this.category) {

      case QuestionModel.CategoryTypes.imagePatterns || QuestionModel.CategoryTypes.numberPatterns:
        return baseUrl + 'patterns.png';
      case QuestionModel.CategoryTypes.shapes:
        return baseUrl + 'form.png';
      case QuestionModel.CategoryTypes.count :
        return baseUrl + 'count.png';
      case QuestionModel.CategoryTypes.placeValue:
        return baseUrl + 'placeValue.png';
      case QuestionModel.CategoryTypes.addition :
        return baseUrl + 'addition.png';
      case QuestionModel.CategoryTypes.subtraction:
        return baseUrl + 'subtraction.png';
      case QuestionModel.CategoryTypes.multiplication:
        return baseUrl + 'multiplication.png';
      case QuestionModel.CategoryTypes.division:
        return baseUrl + 'division.png';

      default:
        return './assets/sidebar/questions-circular-gray.svg';
    }

  }

  isCorrectIconURL(): any {

    if (this.isCorrect === true) {

      return {url: './assets/icons/white-checkmark-icon.svg', bgColor: 'greenLightBg', className: 'bigCheckmarkIcon'};

    } else if (this.isCorrect === false) {

      return {url: './assets/icons/close-icon.svg', bgColor: 'redBgIcon', className: 'bigCloseIcon'};

    }

    return null;
  }


}

export class AnswersGroupedModel {

  public _id: {
    year: number,
    month: number,
    week: number,
    dayOfMonth: number
  };

  answers: AnswerModel[] = [];

  static generateModel(json: any): AnswersGroupedModel {

    const group = new AnswersGroupedModel();
    group._id = {
      year: json._id.year,
      month: json._id.month,
      week: json._id.week,
      dayOfMonth: json._id.dayOfMonth
    };

    group.answers = AnswerModel.generateModels(json.answers);

    return group;

  }

  static generateModels(jsonList: any[]): AnswersGroupedModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }


}

export class AnswerTranslations {

  private static Shapes = {
    circle: {
      'en-GB': 'Circle',
      'en-US': 'Circle',
      'fr-FR': 'Cercle',
      'is-IS': 'Hringur',
      'pt-BR': 'Círculo'
    },
    square: {
      'en-GB': 'Qquare',
      'en-US': 'Square',
      'fr-FR': 'Carré',
      'is-IS': 'Ferningur',
      'pt-BR': 'Quadrado'
    },
    rectangle: {
      'en-GB': 'Rectangle',
      'en-US': 'Rectangle',
      'fr-FR': 'Rectangle',
      'is-IS': 'Ferhyrningur',
      'pt-BR': 'Retângulo'
    },
    triangle: {
      'en-GB': 'Triangle',
      'en-IS': 'Triangle',
      'fr-FR': 'Triangle',
      'is-IS': 'Þríhyrningur',
      'pt-BR': 'Triângulo'
    },
    pentagon: {
      'en-GB': 'Pentagon',
      'en-IS': 'Pentagon',
      'fr-FR': 'Pentagone',
      'is-IS': 'Fimmhyrningur',
      'pt-BR': 'Ðentágono'
    },
    hexagon: {
      'en-GB': 'Hexagon',
      'en-IS': 'Hexagon',
      'fr-FR': 'Hexagone',
      'is-IS': 'Sexhyrningur',
      'pt-BR': 'Hexágono'
    },
    octagon: {
      'en-GB': 'Octagon',
      'en-IS': 'Octagon',
      'fr-FR': 'Octagone',
      'is-IS': 'Átthyrningur',
      'pt-BR': 'Octagóno'
    }
  };

  static shapeTranslation(shape: string): string {

    return this.Shapes[shape][UserModel.getCurrent().culture];

  }

}

export class AnswerQueryModel {

  public subject: string = null;
  public topic: string = null;
  public category: string = null;
  public subCategory: string = null;
  public answerType: string = null;
  public isCorrect: boolean = null;
  public context: string = null;

  public integrationId: string = null;
  public bookExamId: string = null;
  public sessionId: string = null;

  public fromDate: Date = null;
  public toDate: Date = null;
  public skip = 0;
  public limit = 100;

  /**
   * @description Only used for the grouped answer endpoint. Groups by day, week, month, year.
   */
  public groupBy: string = null;
  /**
   * @description Only used for the grouped endpoint. 1 for ascending sort by the answeredAt date
   * and -1 descending sort by the answered At date.
   */
  public sortOrder: number = null;


}
