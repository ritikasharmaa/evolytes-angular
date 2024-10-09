import {Component, Input, OnInit} from '@angular/core';
import {PricingModel, SubscriptionPricingModel} from '../../../models/pricing.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {DescriptionModel} from '../../../models/shared/description.model';

@Component({
  selector: 'app-admin-monthly-pricing',
  templateUrl: './admin-monthly-pricing.component.html',
  styleUrls: ['./admin-monthly-pricing.component.css']
})
export class AdminMonthlyPricingComponent implements OnInit {

  CultureModel = CultureModel;


  @Input() title: string;

  _pricing: SubscriptionPricingModel;

  @Input('pricing')
  set pricing(pricing: SubscriptionPricingModel) {
    this._pricing = pricing;

  }

  get pricing(): SubscriptionPricingModel {

    return this._pricing;
  }

  currencies = PricingModel.currenciesDropdown();

  images = [
    { key: 'AllProducts', value: 'AllProducts', iconURL: null },
    { key: 'ProductsWithoutBook', value: 'ProductsWithoutBook', iconURL: null }
  ];

  constructor() { }

  ngOnInit() {
  }

  getAvailability(): boolean {

    if (this._pricing) {

      return this._pricing.isAvailable;
    }

    return false;
  }

  getAvailabilityText(): string {

    if (this._pricing) {

      if (this._pricing.isAvailable) {
        return 'Available';
      }
    }

    return 'Unavailable';
  }

  onAvailabilityClicked() {

    if (this._pricing) {
      this._pricing.isAvailable = !this._pricing.isAvailable;
    }

  }

  getDescription(): DescriptionModel {

    return null;
  }

  getSubscriptionPlanId(): string {

    if (this._pricing) {

      return this._pricing.subPlanId;
    }

    return null;
  }

  // Currently not being used
  getShippingPlanId(): string {

    if (this._pricing) {

      return this._pricing.shippingPlanId;
    }

    return null;
  }

  getUserVisiblePrice(): string {

    if (this._pricing) {

      return this._pricing.userVisiblePrice;
    }

    return null;
  }

  getUserVisibleFirstPrice(): string {

    if (this._pricing) {

      return this._pricing.userVisibleFirstPrice;

    }

    return null;
  }

  getCurrency(): string {

    if (this._pricing) {

      return this._pricing.currency;
    }

    return null;
  }

  setCurrency(currency: string) {

    this._pricing.currency = currency;
    this._pricing.currencySymbol = PricingModel.symbolFromCurrency(currency);

  }

  getCurrencySymbol(): string {

    if (this._pricing) {

      return this._pricing.currencySymbol;
    }

    return null;
  }

  getIsAvailable(): boolean {

    if (this._pricing) {

      return this._pricing.isAvailable;
    }

    return null;
  }

  getImage(): string {

    if (this._pricing) {

      return this._pricing.image;
    }

    return null;
  }

  getUserVisibleShippingPrice(): string {

    if (this._pricing) {

      return this._pricing.userVisibleShippingPrice;
    }

    return null;
  }

  getMonthlyPrice(): string {

    if (this._pricing) {

      return this._pricing.monthlyPrice;
    }

    return null;
  }

  getIncludesBook(): boolean {

    if (this._pricing) {

      return this._pricing.includesBook;
    }

    return null;
  }

  getRepeatInterval(): string {

    if (this._pricing) {

      return this._pricing.repeatInterval;
    }

    return null;
  }

}
