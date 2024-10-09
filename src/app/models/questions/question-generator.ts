import {CountryBasedNumberModel, QuestionModel} from '../question.model';
import {CountNumbersModel} from './countNumbers.model';
import {CountMultipleNumbersModel} from './countMultipleNumbers.model';
import {SingleAdditionModel} from './singleAddition.model';
import {SingleAdditionNeededAmountModel} from './singleAdditionNeededAmount.model';
import {DoubleAdditionModel} from './doubleAddition.model';
import {SingleSubtractionModel} from './singleSubtraction.model';
import {SingleSubtractionNeededAmountModel} from './singleSubtractionNeededAmount.model';
import {DoubleSubtractionModel} from './doubleSubtraction.model';
import {DescriptionModel} from '../shared/description.model';
import {SizeComparisonNumbersModel} from './sizeComparisonNumbers.model';
import {SizeComparisonSymbolsModel} from './sizeComparisonSymbols.model';
import {SizeComparisonWordsModel} from './sizeComparisonWords.model';
import {CountShapesModel} from './countShapes.model';
import {ShapeNameFromImageModel} from './shapeNameFromImage.model';
import {ShapeSingleDiscriminationCountModel} from './shapeSingleDiscriminationCount.model';
import {ImagePatternSingleFillModel} from './imagePatternSingleFill.model';
import {NumberPatternSingleFillModel} from './numberPatternSingleFill.model';
import {RepeatedAdditionModel} from './repeatedAddition.model';
import {UnitHouseModel} from './unitHouse.model';
import {SingleMultiplicationModel} from './singleMultiplication.model';

export function generateQuestion(json: any): QuestionModel {

  let q = null;
  const subCat = json.subCategory;
  if (subCat === QuestionModel.SubCategoryTypes.countNumbers) {
    q = CountNumbersModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.countMultipleNumbers) {
    q = CountMultipleNumbersModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.singleAddition) {
    q = SingleAdditionModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.singleAdditionNeededAmount) {
    q = SingleAdditionNeededAmountModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.doubleAddition) {
    q = DoubleAdditionModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.singleSubtraction) {
    q = SingleSubtractionModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.singleSubtractionNeededAmount) {
    q = SingleSubtractionNeededAmountModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.doubleSubtraction) {
    q = DoubleSubtractionModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.sizeComparisonNumbers) {
    q = SizeComparisonNumbersModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.sizeComparisonSymbols) {
    q = SizeComparisonSymbolsModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.sizeComparisonWords) {
    q = SizeComparisonWordsModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.countShapes) {
    q = CountShapesModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.shapeNameFromImage) {
    q = ShapeNameFromImageModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.shapeSingleDiscriminationCount) {
    q = ShapeSingleDiscriminationCountModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.imagePatternSingleFill) {
    q = ImagePatternSingleFillModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.numberPatternSingleFill) {
    q = NumberPatternSingleFillModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.repeatedAddition) {
    q = RepeatedAdditionModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.singleMultiplication) {
    q = SingleMultiplicationModel.generateModel(json);
  } else if (subCat === QuestionModel.SubCategoryTypes.unitHouse) {
    q = UnitHouseModel.generateModel(json);
  } else {
    q = new QuestionModel();
  }

  q._id = json._id;

  q.name = json.name;
  q.subject = json.subject;
  q.topic = json.topic;
  q.category = json.category;
  q.subCategory = json.subCategory;
  q.country = json.country;
  q.isStarterQuestion = json.isStarterQuestion;

  q.answerType = json.answerType;
  q.representation = json.representation;

  q.isPublished = json.isPublished;

  q.decidedRank = json.decidedRank;
  q.rank = json.rank;
  q.numCorrect = json.numCorrect;
  q.numWrong = json.numWrong;

  if (json.descriptions) {
    q.descriptions = DescriptionModel.generateModel(json.descriptions);
  }

  if (json.videoHelp) {
    q.videoHelp = DescriptionModel.generateModel(json.videoHelp);
  }

  if (json.audioHelp) {
    q.audioHelp = DescriptionModel.generateModel(json.audioHelp);
  }

  if (json.rankCountry) {
    q.rankCountry = CountryBasedNumberModel.generate(json.rankCountry);
  }

  if (json.decidedRankCountry) {
    q.decidedRankCountry = CountryBasedNumberModel.generate(json.decidedRankCountry);
  }

  if (json.numCorrectCountry) {
    q.numCorrectCountry = CountryBasedNumberModel.generate(json.numCorrectCountry);
  }

  if (json.numWrongCountry) {
    q.numWrongCountry = CountryBasedNumberModel.generate(json.numWrongCountry);
  }


  return q;
}

export function generateQuestionList(jsonList: any[]): QuestionModel[] {

  const list = [];

  for (const json of jsonList) {
    const q = generateQuestion(json);
    list.push(q);
  }

  return list;

}

export function questionFromSubcategory(topic: string, category: string, subCat: string): QuestionModel {

  let q = new QuestionModel();

  if (subCat === QuestionModel.SubCategoryTypes.countNumbers) {
    q = new CountNumbersModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.countMultipleNumbers) {
    q = new CountMultipleNumbersModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.singleAddition) {
    q = new SingleAdditionModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.singleAdditionNeededAmount) {
    q = new SingleAdditionNeededAmountModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.doubleAddition) {
    q = new DoubleAdditionModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.singleSubtraction) {
    q = new SingleSubtractionModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.singleSubtractionNeededAmount) {
    q = new SingleSubtractionNeededAmountModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.doubleSubtraction) {
    q = new DoubleSubtractionModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.sizeComparisonNumbers) {
    q = new SizeComparisonNumbersModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.sizeComparisonSymbols) {
    q = new SizeComparisonSymbolsModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.sizeComparisonWords) {
    q = new SizeComparisonWordsModel();
  }  else if (subCat === QuestionModel.SubCategoryTypes.countShapes) {
    q = new CountShapesModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.shapeNameFromImage) {
    q = new ShapeNameFromImageModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.shapeSingleDiscriminationCount) {
    q = new ShapeSingleDiscriminationCountModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.imagePatternSingleFill) {
    q = new ImagePatternSingleFillModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.numberPatternSingleFill) {
    q = new NumberPatternSingleFillModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.repeatedAddition) {
    q = new RepeatedAdditionModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.singleMultiplication) {
    q = new SingleMultiplicationModel();
  } else if (subCat === QuestionModel.SubCategoryTypes.unitHouse) {
    q = new UnitHouseModel();
  }

  q.topic = topic;
  q.category = category;
  q.subCategory = subCat;

  return q;

}
