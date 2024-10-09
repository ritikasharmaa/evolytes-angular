export class BookExamModel {

  public _id: string;
  public integrationId: string;
  public completedSessionId: string;
  public completed: boolean;
  public completedAt: Date;

  static generateModel(json: any): BookExamModel {

    const exam = new BookExamModel();
    exam._id = json._id;
    exam.integrationId = json.integrationId;
    exam.completedSessionId = json.completedSessionId;
    exam.completed = json.completed;
    exam.completedAt = json.completedAt;

    return exam;

  }

  static generateModels(jsonList: any[]): BookExamModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push( this.generateModel(json) );
    }

    return list;

  }

}
