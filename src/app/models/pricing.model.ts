import {DescriptionModel} from './shared/description.model';

export class PricingModel {

  static currencies = {
    DKK: 'DKK',
    EUR: 'EUR',
    GBP: 'GBP',
    ISK: 'ISK',
    NOK: 'NOK',
    SEK: 'SEK',
    USD: 'USD'
  };

  country: string;
  trial = {
    isAvailable: false,
    trialLength: 7,
    messageOne: new DescriptionModel(),
    messageTwo:  new DescriptionModel(),
    messageThree: new DescriptionModel(),
    messageFour: new DescriptionModel()
  };
  '1M' = new SubscriptionPricingModel();
  '3M' = new SubscriptionPricingModel();
  '6M' = new SubscriptionPricingModel();
  '12M' = new SubscriptionPricingModel();

  static generate(json: any): PricingModel {

    const pricing = new PricingModel();
    pricing.country = json.country;

    if (json['trial']) {
      const trial = json.trial;
      pricing.trial.isAvailable = trial.isAvailable;

      if (trial.trialLength !== null && trial.trialLength !== undefined) {
        pricing.trial.trialLength = trial.trialLength;
      }

      if (trial.messageOne && typeof trial.messageOne === 'object') {
        pricing.trial.messageOne = DescriptionModel.generateModel(trial.messageOne);
      }

      if (trial.messageTwo && typeof trial.messageTwo === 'object') {
        pricing.trial.messageTwo = DescriptionModel.generateModel(trial.messageTwo);
      }

      if (trial.messageThree && typeof trial.messageThree === 'object') {
        pricing.trial.messageThree = DescriptionModel.generateModel(trial.messageThree);
      }

      if (trial.messageFour && typeof trial.messageFour === 'object') {
        pricing.trial.messageFour = DescriptionModel.generateModel(trial.messageFour);
      }

    }

    if (json['1M']) {
      pricing['1M'] = SubscriptionPricingModel.generate(json['1M']);
    }

    if (json['3M']) {
      pricing['3M'] = SubscriptionPricingModel.generate(json['3M']);
    }

    if (json['6M']) {
      pricing['6M'] = SubscriptionPricingModel.generate(json['6M']);
    }

    if (json['12M']) {
      pricing['12M'] = SubscriptionPricingModel.generate(json['12M']);
    }

    return pricing;

  }

  static currenciesDropdown(): { key: string, value: string, iconURL: string }[] {

    const list = [];

    for (const el of Object.keys(this.currencies)) {
      const object = { key: el, value: el, iconURL: null };
      list.push(object);
    }

    return list;

  }

  static generateList(jsonList: any[]): PricingModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(PricingModel.generate(json));
    }

    return list;
  }



  static symbolFromCurrency(currency: string) {

    const currencies = PricingModel.currencies;

    if (currency === currencies.ISK ||
      currency === currencies.DKK ||
      currency === currencies.SEK ||
      currency === currencies.NOK) {
      return 'kr';
    } else if (currency === currencies.EUR) {
      return '€';
    } else if (currency === currencies.GBP) {
      return '£';
    } else if (currency === currencies.USD) {
      return '$';
    }

    return '$';

  }

}

export class SubscriptionPricingModel {

  _id: string;
  subPlanId: string;
  shippingPlanId: string;
  isAvailable: boolean;
  description = new DescriptionModel();
  repeatInterval: string;
  image: string;
  price: string;
  firstPrice: string;
  userVisibleFirstPrice: string;
  userVisiblePrice: string;
  monthlyPrice: string;
  currency: string;
  currencySymbol: string;
  includesBook: boolean;
  shippingPrice: string;
  userVisibleShippingPrice: string;
  messageOne = new DescriptionModel();
  messageTwo =  new DescriptionModel();
  messageThree = new DescriptionModel();
  messageFour = new DescriptionModel();

  static generate(json: any): SubscriptionPricingModel {

    const subPricing = new SubscriptionPricingModel();
    subPricing._id = json._id;
    subPricing.subPlanId = json.subPlanId;
    subPricing.shippingPlanId = json.shippingPlanId;
    subPricing.isAvailable = json.isAvailable;
    subPricing.repeatInterval = json.repeatInterval;
    subPricing.image = json.image;
    subPricing.price = json.price;
    subPricing.firstPrice = json.firstPrice;
    subPricing.userVisiblePrice = json.userVisiblePrice;
    subPricing.userVisibleFirstPrice = json.userVisibleFirstPrice;
    subPricing.monthlyPrice = json.monthlyPrice;
    subPricing.currency = json.currency;
    subPricing.currencySymbol = json.currencySymbol;
    subPricing.includesBook = json.includesBook;
    subPricing.shippingPrice = json.shippingPrice;
    subPricing.userVisibleShippingPrice = json.userVisibleShippingPrice;

    if (typeof json.description === 'object' && json.description) {
      subPricing.description = DescriptionModel.generateModel(json.description);
    }

    if (typeof json.messageOne === 'object' && json.messageOne) {
      subPricing.messageOne = DescriptionModel.generateModel(json.messageOne);
    }

    if (typeof json.messageTwo === 'object' && json.messageTwo) {
      subPricing.messageTwo = DescriptionModel.generateModel(json.messageTwo);
    }

    if (typeof json.messageThree === 'object' && json.messageThree) {
      subPricing.messageThree = DescriptionModel.generateModel(json.messageThree);
    }

    if (typeof json.messageFour === 'object' && json.messageFour) {
      subPricing.messageFour = DescriptionModel.generateModel(json.messageFour);
    }

    return subPricing;

  }

  getImageURL(): string {

    if (this.image) {

      return './assets/products/' + this.image + '.png';
    }

    return null;
  }

  userVisibleFirstPriceWithCurrencySymbol(): string {

    return this.userVisibleFirstPrice + ' ' + this.currencySymbol;
  }

  userVisiblePriceWithCurrencySymbol(): string {

    return this.userVisiblePrice + ' ' + this.currencySymbol;
  }

  monthlyPriceWithCurrencySymbol(): string {

    return this.monthlyPrice + ' ' + this.currencySymbol;
  }

  getShippingWithCurrencySymbol(): string {

    return this.userVisibleShippingPrice + ' ' + this.currencySymbol;
  }

}
