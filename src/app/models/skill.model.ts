export class SkillModel {

  public _id: string;

  public studentId: string;
  public questionId: string;

  public numWrong: number;
  public numCorrect: number;
  public mastery: number;

  public progressPoints: SkillHistoryModel[] = [];

  public createdAt: Date;
  public updatedAt: Date;

  /**
   * Variables taken from the question associated with the model
   *
   */
  public subject: string;
  public topic: string;
  public category: string;
  public subCategory: string;
  public representation: string;
  public answerType: string;

  static generateModel(json: any): SkillModel {
    
    const skill = new SkillModel();
    skill._id = json._id;

    skill.studentId = json.studentId;
    skill.questionId = json.questionId;

    skill.numWrong = json.numWrong;
    skill.numCorrect = json.numCorrect;
    skill.mastery = json.mastery;

    // Only applies to some endpoints which fetches all of the correct data
    skill.subject = json.subject;
    skill.topic = json.topic;
    skill.category = json.category;
    skill.subCategory = json.subCategory;
    skill.representation = json.representation;
    skill.answerType = json.answerType;

    if (json.createdAt) {
      skill.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      skill.updatedAt = new Date(json.updatedAt);
    }

    if (json.progressPoints) {
      skill.progressPoints = SkillHistoryModel.generateModels(json.progressPoints);
    }

    if (json.question) {
      console.log('question: ' + JSON.stringify(json.question, null, 4));
    }

    return skill;

  }

  static generateModels(jsonList: any[]): SkillModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push( this.generateModel(json) );
    }

    return list;

  }

  answerRatio(): number {

    if (this.numWrong > 0) {

      return this.numCorrect / this.numWrong;

    }

    return 0;
  }

  closestPoint(date: Date, bigger: boolean = true): SkillHistoryModel {

    if (date && this.progressPoints) {

      if (this.progressPoints.length > 0) {

        let currentPoint = null;

        for (const point of this.progressPoints) {

          if (bigger === true) {
            if (point.date.getTime() < date.getTime()) {
              currentPoint = point;
            }
          } else if (bigger === false) {
            if (point.date.getTime() > date.getTime()) {
              currentPoint = point;
            }
          }

        }

        return currentPoint;

      }

    }

    return null;
  }

}

export class SkillQueryModel {

  public includeHistory: boolean;
  public startDate: Date;
  public endDate: Date;
  public historyOrder: number;

}

export class SkillHistoryModel {

  public _id: string;
  public studentId: string;
  public questionId: string;
  public answerIds: string[];

  public numWrong: number;
  public numCorrect: number;

  public rank: number;
  public mastery: number;

  public date: Date;

  static generateModel(json: any): SkillHistoryModel {

    const skillHistory = new SkillHistoryModel();
    skillHistory._id = json._id;
    skillHistory.studentId = json.studentId;
    skillHistory.questionId = json.questionId;
    skillHistory.answerIds = json.answerIds;

    skillHistory.numWrong = json.numWrong;
    skillHistory.numCorrect = json.numCorrect;

    skillHistory.mastery = json.mastery;

    if (json.date) {
      skillHistory.date = new Date(json.date);
    }

    return skillHistory;

  }

  static generateModels(jsonList: any[]): SkillHistoryModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push( this.generateModel(json) );
    }

    return list;

  }

  answerRatio(): number {

    if (this.numWrong > 0) {

      return this.numCorrect / this.numWrong;

    }

    return 0;
  }

}
