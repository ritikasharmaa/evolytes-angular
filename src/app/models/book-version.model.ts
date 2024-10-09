import { BookExamAttemptModel } from './book-exam-attempt.model';
import { DescriptionModel } from './shared/description.model';
export class BookVersionModel {

  static BookImgTypes = {
    bookOneEnGB: 'Book-One-en-GB.png',
    bookOneFrFR: 'Book-One-fr-FR.png',
    bookOneIsIS: 'Book-One-is-IS.png',
    bookOneNbNO: 'Book-One-nb-NO.png',
    bookOnePtBr: 'Book-One-pt-BR.png',
    bookOneSvSE: 'Book-One-sv-SE.png',
    bookTwoEnGB: 'Book-Two-en-GB.png',
    bookTwoFrFR: 'Book-Two-fr-FR.png',
    bookTwoIsIS: 'Book-Two-is-IS.png',
    bookTwoNbNO: 'Book-Two-nb-NO.png',
    bookTwoSvSE: 'Book-Two-sv-SE.png',
    bookThreeEnGB: 'Book-Three-en-GB.png',
    bookThreeIsIs: 'Book-Three-is-IS.png',
    bookThreeNbNO: 'Book-Three-nb-NO.png',
    bookThreeSvSE: 'Book-Three-sv-SE.png',
    list: function (): string[] {
      return [this.bookOneEnGB,
      this.bookOneFrFR,
      this.bookOneIsIS,
      this.bookOneNbNO,
      this.bookOnePtBr,
      this.bookOneSvSE,
      this.bookTwoEnGB,
      this.bookTwoFrFR,
      this.bookTwoIsIS,
      this.bookTwoNbNO,
      this.bookTwoSvSE,
      this.bookThreeEnGB,
      this.bookThreeIsIs,
      this.bookThreeNbNO,
      this.bookThreeSvSE];
    },
    dropdownList: function (): { key: string, value: string, iconURL: string }[] {
      const array = [];
      for (const key of this.list()) {
        array.push({ key: key, value: key, iconURL: null });
      }

      return array;
    }
  };


  _id: string;
  bookId: string;
  /**
   * The addon id for Chargebee pricing so we can map
   * This version of the book to a product in chargebee
   */
  addOnId: string;
  /**
   * The addon id for Chargebee shipping pricing so we can map
   * This version of the book to a shipping pricing. Maybe should
   * just be related to the country code of the user who is buying?
   */
  shippingAddOnId: string;
  name: string;
  edition: string;
  editionNumber: number;
  age: string;
  grade: number;
  bookNumber: number;
  publisher: string;
  imgType: string;
  numPages: number;
  description: string;
  translatedDescription = new DescriptionModel();
  isPublished: boolean;
  isCopied: boolean;
  integrations: BookVersionIntegrationModel[] = [];

  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  static generateModel(json: any): BookVersionModel {

    const version = new BookVersionModel();
    version._id = json._id;
    version.bookId = json.bookId;
    version.addOnId = json.addOnId;
    version.name = json.name;
    version.edition = json.edition;
    version.editionNumber = json.editionNumber;
    version.age = json.age;
    version.grade = json.grade;
    version.bookNumber = json.bookNumber;
    version.publisher = json.publisher;
    version.imgType = json.imgType;
    version.numPages = json.numPages;
    version.description = json.description;
    version.isPublished = json.isPublished;
    version.isCopied = json.isCopied

    if (json.translatedDescription) {
      version.translatedDescription = DescriptionModel.generateModel(json.translatedDescription);
    }

    if (json.integrations) {
      version.integrations = BookVersionIntegrationModel.generateModels(json.integrations);
    }

    if (json.publishedAt) {
      version.publishedAt = new Date(json.publishedAt);
    }

    if (json.createdAt) {
      version.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      version.updatedAt = new Date(json.updatedAt);
    }

    return version;

  }

  static generateModels(jsonList: any[]): BookVersionModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

  bookVersionImgURL(): string {

    return './assets/books/' + this.imgType;
  }

  addAttempts(attempts: BookExamAttemptModel[]) {
    for (const attempt of attempts) {
      for (const integration of this.integrations) {
        integration.addAttempt(attempt);
      }
    }
  }

  numChaptersFinished(): number {

    let numFinished = 0;

    for (const integration of this.integrations) {
      if (integration.successfulAttempt) {
        numFinished++;
      }
    }

    return numFinished;

  }

  numChapters(): number {

    if (this.integrations.length > 0) {
      return this.integrations.length;
    }

    return 1;
  }

  chaptersFinishedFraction(): number {

    return this.numChaptersFinished() / this.numChapters();

  }

}

export class BookVersionIntegrationModel {

  static IntegrationTypes = {
    Exam: 'Exam',
    ExamDropdown: { key: 'Exam', value: 'Exam', iconURL: null },
    Passcode: 'Passcode',
    PasscodeDropdown: { key: 'Passcode', value: 'Passcode', iconURL: null },
    VideoHelp: 'VideoHelp',
    VideoHelpDropdown: { key: 'VideoHelp', value: 'VideoHelp', iconURL: null },
    dropdownList: function (): { key: string, value: string, iconURL: string }[] {
      return [this.ExamDropdown, this.PasscodeDropdown, this.VideoHelpDropdown];
    }
  };

  static PassphraseTypes = {
    none: 'none',
    noneDropdown: { key: 'none', value: 'none', iconURL: null },
    number: 'number',
    numberDropdown: { key: 'number', value: 'number', iconURL: null },
    string: 'string',
    stringDropdown: { key: 'string', value: 'string', iconURL: null },
    code: 'code',
    codeDropdown: { key: 'code', value: 'code', iconURL: null },
    dropdownList: function (): { key: string, value: string, iconURL: string }[] {
      return [this.noneDropdown, this.numberDropdown, this.stringDropdown, this.codeDropdown];
    }
  };

  static Icons = {
    count: 'count',
    countDropdown: { key: 'count', value: 'count', iconURL: null },
    addition: 'addition',
    additionDropdown: { key: 'addition', value: 'addition', iconURL: null },
    subtraction: 'subtraction',
    subtractionDropdown: { key: 'subtraction', value: 'subtraction', iconURL: null },
    multiplication: 'multiplication',
    multiplicationDropdown: { key: 'multiplication', value: 'multiplication', iconURL: null },
    forms: 'forms',
    formsDropdown: { key: 'forms', value: 'forms', iconURL: null },
    algebra: 'algebra',
    algebraDropdown: { key: 'algebra', value: 'algebra', iconURL: null },
    placeValue: 'placeValue',
    placeValueDropdown: { key: 'placeValue', value: 'placeValue', iconURL: null },
    patterns: 'patterns',
    patternsDropdown: { key: 'patterns', value: 'patterns', iconURL: null },
    dropdownList: function (): { key: string, value: string, iconURL: string }[] {
      return [this.countDropdown, this.additionDropdown, this.subtractionDropdown,
      this.multiplicationDropdown,
      this.formsDropdown,
      this.algebraDropdown,
      this.placeValueDropdown,
      this.patternsDropdown];
    }
  };

  _id: string;
  name: string;
  names = new DescriptionModel();
  monitorNames = new DescriptionModel();
  type: string;
  iconName: string;
  passphraseType: string;
  passphraseLength: number;
  passphrase: string;
  page: number;
  chapter: number;
  numCorrect: number;
  videoURL: string;
  coinReward: string;

  rewards: BookVersionIntegrationRewardModel[] = [];
  questions: BookVersionIntegrationQuestionModel[] = [];

  successfulAttempt: BookExamAttemptModel = null;
  attempts: BookExamAttemptModel[] = [];

  createdAt: Date;
  updatedAt: Date;

  static generateModel(json: any): BookVersionIntegrationModel {

    const integration = new BookVersionIntegrationModel();
    integration._id = json._id;
    integration.name = json.name;
    integration.type = json.type;
    integration.iconName = json.iconName;
    integration.passphraseType = json.passphraseType;
    integration.passphraseLength = json.passphraseLength;
    integration.passphrase = json.passphrase;
    integration.page = json.page;
    integration.chapter = json.chapter;
    integration.numCorrect = json.numCorrect;
    integration.videoURL = json.videoURL;
    integration.coinReward = json.coinReward;

    if (json.names) {
      integration.names = DescriptionModel.generateModel(json.names);
    }

    if (json.monitorNames) {
      integration.monitorNames = DescriptionModel.generateModel(json.monitorNames);
    }

    if (json.rewards) {
      integration.rewards = BookVersionIntegrationRewardModel.generateModels(json.rewards);
    }

    if (json.questions) {
      integration.questions = BookVersionIntegrationQuestionModel.generateModels(json.questions);
    }

    if (json.createdAt) {
      integration.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      integration.updatedAt = new Date(json.updatedAt);
    }

    return integration;

  }

  static generateModels(jsonList: any[]): BookVersionIntegrationModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

  iconURL(): string {

    if (this.iconName) {

      return './assets/skill-icons/' + this.iconName + '.png';
    }

    return null;
  }

  numQuestions(): number {

    let numQ = 0;

    for (const q of this.questions) {
      numQ += q.numQuestions;
    }

    return numQ;
  }


  numAttempts(): number {

    let attempts = 0;

    if (this.attempts.length) {
      attempts += this.attempts.length;
    }

    if (this.successfulAttempt) {
      attempts += 1;
    }

    return attempts;

  }

  addAttempt(attempt: BookExamAttemptModel) {
    if (this._id === attempt.integrationId) {
      if (attempt.success) {
        this.successfulAttempt = attempt;
        this.attempts.push(attempt);
      } else {
        this.attempts.push(attempt);
      }
    }
  }

}

export class BookVersionIntegrationRewardModel {

  _id: string;
  uniqueId: string;
  numItems: number;

  static generateModel(json: any): BookVersionIntegrationRewardModel {

    const r = new BookVersionIntegrationRewardModel();
    r._id = json._id;
    r.uniqueId = json.uniqueId;
    r.numItems = json.numItems;

    return r;

  }

  static generateModels(jsonList: any[]): BookVersionIntegrationRewardModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

}

export class BookVersionIntegrationQuestionModel {

  questionId: string;
  numQuestions: number;

  static generateModel(json: any): BookVersionIntegrationQuestionModel {

    const q = new BookVersionIntegrationQuestionModel();
    q.questionId = json.questionId;
    q.numQuestions = json.numQuestions;

    return q;

  }

  static generateModels(jsonList: any[]): BookVersionIntegrationQuestionModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

}
