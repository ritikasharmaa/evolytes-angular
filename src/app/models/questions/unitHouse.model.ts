import {QuestionModel} from '../question.model';
import {RangeModel} from '../range.model';

export class UnitHouseModel extends QuestionModel {

  model = {
    unitRange: new RangeModel(),
    tensRange: new RangeModel(),
    hundredsRange: new RangeModel(),
    thousandsRange: new RangeModel(),
    tenThousandsRange: new RangeModel(),
    numUnits: 2
  };

  static generateModel(json: any): UnitHouseModel {

    const q = new UnitHouseModel();
    const model = json.model;

    if (model) {

      if (model.unitRange) {
        q.model.unitRange = RangeModel.generateModel(model.unitRange);
      }

      if (model.tensRange) {
        q.model.tensRange = RangeModel.generateModel(model.tensRange);
      }

      if (model.hundredsRange) {
        q.model.hundredsRange = RangeModel.generateModel(model.hundredsRange);
      }

      if (model.thousandsRange) {
        q.model.thousandsRange = RangeModel.generateModel(model.thousandsRange);
      }

      if (model.tenThousandsRange) {
        q.model.tenThousandsRange = RangeModel.generateModel(model.tenThousandsRange);
      }

      q.model.numUnits = model.numUnits;

    }

    return q;

  }

}
