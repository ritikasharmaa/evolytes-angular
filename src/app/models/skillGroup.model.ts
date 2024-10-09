import {QuestionModel} from './question.model';
import {generateQuestionList} from './questions/question-generator';
import {DescriptionModel} from './shared/description.model';

export class SkillGroupModel {

  public _id: string;

  public name = new DescriptionModel();
  public questions: string[] | QuestionModel[] = [];

  public createdAt: Date;
  public updatedAt: Date;

  static generateModel(json: any): SkillGroupModel {

    const skillGroup = new SkillGroupModel();
    skillGroup._id = json._id;

    skillGroup.name = json.name;

    if (json.questions) {
      if (typeof json.questions === 'object') {
        skillGroup.questions = generateQuestionList(json.questions);
      } else {
        skillGroup.questions = json.questions;
      }
    } else {
      skillGroup.questions = [];
    }

    if (json.createdAt) {
      skillGroup.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      skillGroup.updatedAt = new Date(json.updatedAt);
    }

    return skillGroup;

  }

  static generateModels(jsonList: any[]): SkillGroupModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

}

export class SkillGroupFilter {

  skip = 0;
  limit: number = undefined;
  culture: string = undefined;
  name: string = undefined;
}
