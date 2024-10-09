export class BookExamAttemptModel {

  _id: string;
  studentId: string;
  integrationId: string;
  bookId: string;
  bookVersionId: string;
  bookExamId: string;
  sessionId: string;
  finishedAt: Date;
  success: boolean;
  numCorrect: number;
  numAnswers: number;

  static generate(json: any): BookExamAttemptModel {

    const attempt = new BookExamAttemptModel();
    attempt._id = json._id;
    attempt.studentId = json.studentId;
    attempt.integrationId = json.integrationId;
    attempt.bookId = json.bookId;
    attempt.bookVersionId = json.bookVersionId;
    attempt.bookExamId = json.bookExamId;
    attempt.sessionId = json.sessionId;
    attempt.success = json.success;
    attempt.numCorrect = json.numCorrect;
    attempt.numAnswers = json.numAnswers;

    if (json.finishedAt) {
      attempt.finishedAt = new Date(json.finishedAt);
    }

    return attempt;

  }

  static generateList(jsonList: any[]): BookExamAttemptModel[] {

    const list = [];
    for (const json of jsonList) {
      const attempt = this.generate(json);
      list.push(attempt);
    }

    return list;

  }

}
