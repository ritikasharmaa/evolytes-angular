import {DescriptionModel} from './shared/description.model';

export class QuestionModel {

  static AnswerTypes = {
    multipleChoice: 'multipleChoice',
    input: 'input',
    interaction: 'interaction',
    list : () => {
      return [QuestionModel.AnswerTypes.multipleChoice,
        QuestionModel.AnswerTypes.input,
        QuestionModel.AnswerTypes.interaction];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const list = [];
      for (const key of this.list()) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;

    }
  };

  static RepresentationTypes = {
    equation: 'equation',
    images: 'images',
    equationAndImages: 'equationAndImages',
    equationWithImages: 'equationWithImages',
    graph: 'graph',
    list: () => {
      return [QuestionModel.RepresentationTypes.equation,
        QuestionModel.RepresentationTypes.images,
        QuestionModel.RepresentationTypes.equationAndImages,
        QuestionModel.RepresentationTypes.equationWithImages,
        QuestionModel.RepresentationTypes.graph
      ];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const list = [];
      for (const key of this.list()) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;

    }
  };

  static SubjectTypes = {
    math: 'math',
    list: () => {
      return [
        QuestionModel.SubjectTypes.math
      ];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const list = [];
      for (const key of this.list()) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;

    }
  };

  static TopicTypes = {
    arithmetic: 'arithmetic',
    patterns: 'patterns',
    finance: 'finance',
    algebra: 'algebra',
    statistics: 'statistics',
    geometry: 'geometry',
    list: () => {
      return [QuestionModel.TopicTypes.arithmetic,
        QuestionModel.TopicTypes.patterns,
        QuestionModel.TopicTypes.finance,
        QuestionModel.TopicTypes.algebra,
        QuestionModel.TopicTypes.statistics,
        QuestionModel.TopicTypes.geometry
      ];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const list = [];
      for (const key of this.list()) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;

    }
  };

  static CategoryTypes = {
    count: 'count',
    addition: 'addition',
    subtraction: 'subtraction',
    multiplication: 'multiplication',
    sizeComparison: 'sizeComparison',
    numberPatterns: 'numberPatterns',
    imagePatterns: 'imagePatterns',
    placeValue: 'placeValue',
    shapes: 'shapes',
    division: 'division',
    negativeNumbers: 'negativeNumbers',
    orderingNumbers: 'orderingNumbers',
    list: () => {
      return [QuestionModel.CategoryTypes.count,
        QuestionModel.CategoryTypes.addition,
        QuestionModel.CategoryTypes.subtraction,
        QuestionModel.CategoryTypes.multiplication,
        QuestionModel.CategoryTypes.placeValue,
        QuestionModel.CategoryTypes.sizeComparison,
        QuestionModel.CategoryTypes.numberPatterns,
        QuestionModel.CategoryTypes.imagePatterns,
        QuestionModel.CategoryTypes.shapes];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const list = [];
      for (const key of this.list()) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;

    }
  };

  static SubCategoryTypes = {
    countNumbers: 'countNumbers',
    countMultipleNumbers: 'countMultipleNumbers',
    countDiscrimination: 'countDiscrimination',
    countPairs: 'countPairs',
    singleAddition: 'singleAddition',
    doubleAddition: 'doubleAddition',
    singleAdditionNeededAmount: 'singleAdditionNeededAmount',
    doubleAdditionNeededAmount: 'doubleAdditionNeededAmount',
    singleSubtraction: 'singleSubtraction',
    doubleSubtraction: 'doubleSubtraction',
    singleSubtractionNeededAmount: 'singleSubtractionNeededAmount',
    sizeComparisonNumbers: 'sizeComparisonNumbers',
    sizeComparisonSymbols: 'sizeComparisonSymbols',
    sizeComparisonWords: 'sizeComparisonWords',
    numberPatternSingleFill: 'numberPatternSingleFill',
    imagePatternSingleFill: 'imagePatternSingleFill',
    countShapes: 'countShapes',
    shapeNameFromImage: 'shapeNameFromImage',
    shapeSingleDiscriminationCount: 'shapeSingleDiscriminationCount',
    repeatedAddition: 'repeatedAddition',
    singleMultiplication: 'singleMultiplication',
    unitHouse: 'unitHouse',
    list: () => {
      return [QuestionModel.SubCategoryTypes.countNumbers,
        QuestionModel.SubCategoryTypes.countMultipleNumbers,
        QuestionModel.SubCategoryTypes.countDiscrimination,
        QuestionModel.SubCategoryTypes.countPairs,
        QuestionModel.SubCategoryTypes.singleAddition,
        QuestionModel.SubCategoryTypes.doubleAddition,
        QuestionModel.SubCategoryTypes.singleAdditionNeededAmount,
        QuestionModel.SubCategoryTypes.doubleAdditionNeededAmount,
        QuestionModel.SubCategoryTypes.singleSubtraction,
        QuestionModel.SubCategoryTypes.doubleSubtraction,
        QuestionModel.SubCategoryTypes.sizeComparisonNumbers,
        QuestionModel.SubCategoryTypes.sizeComparisonSymbols,
        QuestionModel.SubCategoryTypes.sizeComparisonWords,
        QuestionModel.SubCategoryTypes.numberPatternSingleFill,
        QuestionModel.SubCategoryTypes.imagePatternSingleFill,
        QuestionModel.SubCategoryTypes.countShapes,
        QuestionModel.SubCategoryTypes.shapeNameFromImage,
        QuestionModel.SubCategoryTypes.shapeSingleDiscriminationCount,
        QuestionModel.SubCategoryTypes.repeatedAddition,
        QuestionModel.SubCategoryTypes.singleMultiplication,
        QuestionModel.SubCategoryTypes.unitHouse
      ];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const list = [];
      for (const key of this.list()) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;

    }
  };

  static ImageTypes = {
    Apple: 'Apple',
    Aubergine: 'Aubergine',
    'Band Aid 20 Pack': 'Band Aid 20 Pack',
    'Band Aid Big': 'Band Aid Big',
    'Band Aid Small': 'Band Aid Small',
    Bolt: 'Bolt',
    Bone: 'Bone',
    Branch: 'Branch',
    Brick: 'Brick',
    'Butternut Squash': 'Butternut Squash',
    Cantalope: 'Cantalope',
    'Donut Toy': 'Donut Toy',
    'Double Wood': 'Double Wood',
    'Electroshock Cream': 'Electroshock Cream',
    'Fat Fish': 'Fat Fish',
    'Frostbite Cream': 'Frostbite Cream',
    Gauze: 'Gauze',
    Hammer: 'Hammer',
    'Health Pack Big': 'Health Pack Big',
    'Health Pack Small': 'Health Pack Small',
    'Herb Bowl': 'Herb Bowl',
    'Honey Pot': 'Honey Pot',
    Leaks: 'Leaks',
    'Light Blue Crystal': 'Light Blue Crystal',
    'Lizard Toy': 'Lizard Toy',
    Mango: 'Mango',
    Meat: 'Meat',
    'Mouse Toy': 'Mouse Toy',
    'Nail Box': 'Nail Box',
    Nail: 'Nail',
    Onions: 'Onions',
    Papaya: 'Papaya',
    Pepper: 'Pepper',
    Pineapple: 'Pineapple',
    'Poison Rash Cream': 'Poison Rash Cream',
    Potato: 'Potato',
    'Potion Blue': 'Potion Blue',
    'Potion Green': 'Potion Green',
    'Potion Red': 'Potion Red',
    'Purple Crystal': 'Purple Crystal',
    Screw: 'Screw',
    'Small Blueberry Branch': 'Small Blueberry Branch',
    Spade: 'Spade',
    Spinach: 'Spinach',
    Strawberry: 'Strawberry',
    'Sunburn Cream': 'Sunburn Cream',
    Teddy: 'Teddy',
    'Tennis Ball': 'Tennis Ball',
    Watercress: 'Watercress',
    Watermelon: 'Watermelon',
    Wood: 'Wood',
    'Yarn Ball': 'Yarn Ball',
    list: function(): string[] {
      return [this.Apple, this.Aubergine, this['Band Aid 20 Pack'],
        this['Band Aid Small'], this['Band Aid Big'], this.Bolt, this.Bone,
        this.Branch, this.Brick, this['Butternut Squash'], this.Cantalope,
        this['Donut Toy'], this['Double Wood'], this['Electroshock Cream'],
        this['Fat Fish'], this['Fat Fish'], this['Frostbite Cream'],
        this.Gauze, this.Hammer, this['Health Pack Big'], this['Health Pack Small'],
        this['Herb Bowl'], this['Honey Pot'], this.Leaks, this['Light Blue Crystal'],
        this['Lizard Toy'], this['Lizard Toy'], this.Mango, this.Meat, this['Mouse Toy'],
        this['Nail Box'], this.Nail, this.Onions, this.Papaya, this.Pineapple,
        this['Poison Rash Cream'], this.Potato, this['Potion Blue'], this['Potion Green'],
        this['Potion Red'], this['Purple Crystal'], this.Screw, this['Small Blueberry Branch'],
        this.Spade, this.Spinach, this.Strawberry, this['Sunburn Cream'], this.Teddy,
        this['Tennis Ball'], this.Watercress, this.Watermelon, this.Wood, this['Yarn Ball']];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const list = [];
      for (const key of this.list()) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;

    }
  };

  static SizeComparisonTypes = {
    equal: 'equal',
    greater: 'greater',
    less: 'less',
    list: function() {
      return [this.equal, this.greater, this.less];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const list = [];
      for (const key of this.list()) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;
    }
  };

  static ShapeTypes = {
    circle: 'circle',
    square: 'square',
    rectangle: 'rectangle',
    triangle: 'triangle',
    pentagon: 'pentagon',
    hexagon: 'hexagon',
    octagon: 'octagon',
    list: function(): string[] {
      return [this.circle,
        this.square,
        this.rectangle,
        this.triangle,
        this.pentagon,
        this.hexagon,
        this.octagon];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {

      const list = [];

      for (const key of this.list()) {
        list.push({ key, value: key, iconURL: null });
      }

      return list;

    }
  };

  static ShapeImageTypes = {
    circle: {
      yellow: 'CircleYellow',
      red: 'CircleRed',
      green: 'CircleGreen',
      blue: 'CircleBlue',
      purple: 'CirclePurple',
      orange: 'CircleOrange'
    },
    square: {
      yellow: 'SquareYellow',
      red: 'SquareRed',
      green: 'SquareGreen',
      blue: 'SquareBlue',
      purple: 'SquarePurple',
      orange: 'SquareOrange'
    },
    rectangle: {
      yellow: 'RectangleYellow',
      red: 'RectangleRed',
      green: 'RectangleGreen',
      blue: 'RectangleBlue',
      purple: 'RectanglePurple',
      orange: 'RectangleOrange'
    },
    triangle: {
      yellow: 'TriangleYellow',
      red: 'TriangleRed',
      green: 'TriangleGreen',
      blue: 'TriangleBlue',
      purple: 'TrianglePurple',
      orange: 'TriangleOrange'
    },
    pentagon: {
      yellow: 'PentagonYellow',
      red: 'PentagonRed',
      green: 'PentagonGreen',
      blue: 'PentagonBlue',
      purple: 'PentagonPurple',
      orange: 'PentagonOrange'
    },
    hexagon: {
      yellow: 'HexagonYellow',
      red: 'HexagonRed',
      green: 'HexagonGreen',
      blue: 'HexagonBlue',
      purple: 'HexagonPurple',
      orange: 'HexagonOrange'
    },
    octagon: {
      yellow: 'OctagonYellow',
      red: 'OctagonRed',
      green: 'OctagonGreen',
      blue: 'OctagonBlue',
      purple: 'OctagonPurple',
      orange: 'OctagonOrange'
    },
    list: function(): string[] {
      const array = [];
      for (const key of Object.keys(this)) {
        if (key !== 'list' && key !== 'dropdownList') {
          const value = this[key];
          for (const subKey of Object.keys(value)) {
            array.push(value[subKey]);
          }
        }
      }

      return array;
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const array = [];
      for (const key of this.list()) {
        array.push({ key: key, value: key, iconURL: null });
      }

      return array;
    }
  };

  static OperationTypes = {
    addition: '+',
    subtraction: '-',
    multiplication: '*',
    division: '-',
    list: function() {
      return [this.addition,
        this.subtraction,
        this.multiplication,
        this.division];
    },
    dropdownList: function(): { key: string, value: string, iconURL: string }[] {
      const array = [];
      for (const key of this.list()) {
        array.push({ key: key, value: key, iconURL: null });
      }

      return array;
    }
  };

  public _id: string;

  public name: string;
  public subject: string;
  public topic: string;
  public category: string;
  public subCategory: string;
  public country: string;
  public isStarterQuestion: boolean;

  /**
   * @description The answer type of the question.
   * It can be multipleChoice, input and interaction.
   */
  public answerType: string;
  public representation: string;

  public model: object;

  public isPublished = false;

  public decidedRank = 0;
  public rank = -1200;
  public rankCountry = new CountryBasedNumberModel();
  public decidedRankCountry = new CountryBasedNumberModel();
  public numCorrectCountry = new CountryBasedNumberModel();
  public numWrongCountry = new CountryBasedNumberModel();
  public numCorrect = 0;
  public numWrong = 0;

  descriptions = new DescriptionModel();
  audioHelp = new DescriptionModel();
  videoHelp = new DescriptionModel();

  constructor() {
    this.subject = 'math';
  }


  static categoryDropdownList(): { key: string, value: string, iconURL: null }[] {

    return [{
      key: 'none',
      value: 'categories.none',
      iconURL: null
    }, {
      key: this.CategoryTypes.count,
      value: 'categories.' + this.CategoryTypes.count,
      iconURL: null
    }, {
      key: this.CategoryTypes.addition,
      value: 'categories.' + this.CategoryTypes.addition,
      iconURL: null
    }, {
      key: this.CategoryTypes.subtraction,
      value: 'categories.' + this.CategoryTypes.subtraction,
      iconURL: null
    }, {
      key: this.CategoryTypes.multiplication,
      value: 'categories.' + this.CategoryTypes.multiplication,
      iconURL: null
    }];

  }

  static answerTypeDropdownList(): { key: string, value: string, iconURL: string }[] {

    return [{
      key: 'none',
      value: 'answerTypes.none',
      iconURL: null
    }, {
      key: QuestionModel.AnswerTypes.input,
      value: 'answerTypes.' + QuestionModel.AnswerTypes.input,
      iconURL: null
    }, {
      key: QuestionModel.AnswerTypes.multipleChoice,
      value: 'answerTypes.' + QuestionModel.AnswerTypes.multipleChoice,
      iconURL: null
    }];
  }

  numCorrectForCountry(country: string): number {

    if (this.numCorrectCountry) {

      return this.numCorrectCountry[country];

    } else {

      let total = 0;
      for (const key of Object.keys(this.numCorrectCountry)) {
        total += this.numCorrectCountry[key];
      }

      return total;

    }

    return 0;
  }

  numWrongForCountry(country: string): number {

    if (this.numWrongCountry) {

      return this.numWrongCountry[country];

    } else {

      let total = 0;
      for (const key of Object.keys(this.numWrongCountry)) {
        total += this.numWrongCountry[key];
      }

    }

    return 0;
  }

  numAnswers(country: string): number {

    const numCorrect = this.numCorrectForCountry(country);
    const numWrong = this.numWrongForCountry(country);

    return numCorrect + numWrong;
  }

  correctnessRatio(country: string): number {

    const total = this.numAnswers(country);
    if (total > 0) {
      return this.numCorrectForCountry(country) / total;
    }

    return 0;

  }

  correctnessRatioPercentage(country: string): number {

    return this.correctnessRatio(country) * 100;

  }

  correctnessRatioPercentageString(country: string): string {

    const ratio = this.correctnessRatioPercentage(country);

    return ratio.toFixed(2).toString() + ' %';
  }

}

export class CountryBasedNumberModel {

  public ISL = 0;
  public GBR = 0;
  public FRA = 0;
  public BRA = 0;
  public SWE = 0;
  public NOR = 0;
  public LTU = 0;
  public DEU = 0;

  static generate(json: any): CountryBasedNumberModel {

    const country = new CountryBasedNumberModel();
    country.ISL = json.ISL;
    country.GBR = json.GBR;
    country.FRA = json.FRA;
    country.BRA = json.BRA;
    country.SWE = json.SWE;
    country.NOR = json.NOR;
    country.LTU = json.LTU;
    country.DEU = json.DEU;

    return country;

  }

  valueForCountry(country: string): number {

    const value = this[country];

    if (value === null || value === undefined) {

      return 0;
    }

    return value;
  }

  setValueForCountry(country: string, value: number) {

    this[country] = value;

  }

}
