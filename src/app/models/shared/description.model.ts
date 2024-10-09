import {CultureModel} from '../localization/culture.model';

export class DescriptionModel {
  _id: string;
  'da-DK': string;
  'de-DE': string;
  'en-GB': string;
  'en-US': string;
  'es-ES': string;
  'fr-FR': string;
  'is-IS': string;
  'lt-LT': string;
  'nb-NO': string;
  'pt-BR': string;
  'pt-PT': string;
  'sv-SE': string;


  static generateModel(json: any): DescriptionModel {

    const descr = new DescriptionModel();
    descr._id = json._id;
    descr['da-DK'] = json['da-DK'];
    descr['de-DE'] = json['de-DE'];
    descr['en-GB'] = json['en-GB'];
    descr['en-US'] = json['en-US'];
    descr['es-ES'] = json['es-ES'];
    descr['fr-FR'] = json['fr-FR'];
    descr['is-IS'] = json['is-IS'];
    descr['fr-FR'] = json['fr-FR'];
    descr['lt-LT'] = json['lt-LT'];
    descr['nb-NO'] = json['nb-NO'];
    descr['pt-BR'] = json['pt-BR'];
    descr['pt-PT'] = json['pt-PT'];
    descr['sv-SE'] = json['sv-SE'];

    return descr;

  }

  static generateModels(jsonList: any[]): DescriptionModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

  stringForCulture(culture: string) {

    return this[culture];
  }

}
