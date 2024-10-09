export class SessionModel {

  public _id: string;
  public studentId: string;
  /**
   * The length of the session in seconds.
   */
  public duration: number;
  /**
   * The date at which the session ended.
   */
  public date: Date;

  static generateModel(json: any): SessionModel {

    const session = new SessionModel();
    session._id = json._id;
    session.studentId = json.studentId;
    session.duration = json.duration;

    if (json.date) {
      const date = new Date(json.date);
      session.date = date;
    }

    return session;

  }

  static generateModels(jsonList: any[]): SessionModel[] {

    const list = [];

    for (const json of jsonList) {
      const session = this.generateModel(json);
      list.push(session);
    }

    return list;

  }

}

export class SessionActivityModel {

  public static SessionIntervals = {
    Day: 'day',
    Week: 'week',
    Month: 'month'
  };

  _id: {
    year: number,
    month: number,
    week: number,
    dayOfWeek: number,
    dayOfMonth: number,
    dayOfYear: number
  } = null;

  average: number;
  sum: number;

  /**
   * A date created based on the _id components. Can represent a year, month, week and days of month.
   */
  date: Date;

  static generateModel(json: any): SessionActivityModel {

    const sessionActivity = new SessionActivityModel();

    sessionActivity._id = {
      year: json._id.year,
      month: json._id.month,
      week: json._id.week,
      dayOfWeek: json._id.dayOfWeek,
      dayOfMonth: json._id.dayOfMonth,
      dayOfYear: json._id.dayOfYear,
    };

    sessionActivity.average = json.average;
    sessionActivity.sum = json.sum;

    sessionActivity.date = new Date(json._id.year, json._id.month - 1, json._id.dayOfMonth);

    return sessionActivity;

  }

  static generateModels(jsonList: any[]): SessionActivityModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(SessionActivityModel.generateModel(json));
    }

    return list;

  }


}
