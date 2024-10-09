import {SkillGroupModel} from './skillGroup.model';
import {DescriptionModel} from './shared/description.model';

export class ObjectiveModel {

  public _id: string;

  public country: string;
  public level: DescriptionModel = new DescriptionModel();
  public skillGroups: string [] | SkillGroupModel[] = [];

  public createdAt: Date;
  public updatedAt: Date;

  static generateModel(json: any): ObjectiveModel {

    const objective = new ObjectiveModel();
    objective._id = json._id;

    objective.country = json.country;
    objective.level = DescriptionModel.generateModel(json.level);

    if (typeof json.skillGroups[0] === 'object') {
      objective.skillGroups = SkillGroupModel.generateModels(json.skillGroups);
    } else {
      objective.skillGroups = json.skillGroups;
    }

    if (json.createdAt) {
      objective.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      objective.updatedAt = new Date(json.updatedAt);
    }

    return objective;

  }

  static generateModels(jsonList: any[]): ObjectiveModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

}

export class ObjectiveFilter {

  skip = 0;
  limit: number = undefined;
  culture: string = undefined;
  country: string = undefined;
  level: string = undefined;
}
