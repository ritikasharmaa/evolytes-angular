import { Component, OnInit } from '@angular/core';
import {AdminPricingService} from '../../services/admin/admin-pricing.service';
import {PricingModel} from '../../models/pricing.model';
import {UserModel} from '../../models/authentication/user.model';
import {ErrorModel} from '../../models/shared/error.model';
import {CountryModel} from '../../models/localization/country.model';
import {CultureModel} from '../../models/localization/culture.model';
import {ModalService} from '../../root/modal.service';

@Component({
  selector: 'app-school-pricing',
  templateUrl: './admin-pricing.component.html',
  styleUrls: ['./admin-pricing.component.css']
})
export class AdminPricingComponent implements OnInit {

  CultureModel = CultureModel;
  pricing: PricingModel;
  canCreatePricing = false;

  constructor(private adminPricingSv: AdminPricingService,
              private modalSv: ModalService) { }

  ngOnInit() {
    this.adminPricingSv.fetchPricing(UserModel.getAdminCountry()).subscribe((pricing) => {

      this.canCreatePricing = false;
      console.log('pricing: ' + JSON.stringify(pricing, null, 4));
      this.pricing = pricing;
      this.pricing['3M'].repeatInterval = '3';
      this.pricing['6M'].repeatInterval = '6';
      this.pricing['12M'].repeatInterval = '12';

    }, (error: ErrorModel) => {

      if (error.name === 'PricingNotFound') {
        this.canCreatePricing = true;
      } else {
        this.canCreatePricing = false;
      }
    });
  }

  createPricing() {
    // Only create the pricing if we successfully fetched a pricing model
    if (this.canCreatePricing === true && !this.pricing) {
      this.pricing = new PricingModel();
      this.pricing['1M'].repeatInterval = '1';
      this.pricing['3M'].repeatInterval = '3';
      this.pricing['6M'].repeatInterval = '6';
      this.pricing['12M'].repeatInterval = '12';

      this.adminPricingSv.updatePricing(this.pricing, UserModel.getAdminCountry()).subscribe((pricing) => {
        this.pricing = pricing;
      });
    }
  }

  getTrial() {

    if (this.pricing) {

      return this.pricing.trial;
    }

    return null;
  }

  getAvailability() {

    return this.getTrial().isAvailable;
  }

  onAvailabilityClicked() {

    this.getTrial().isAvailable = !this.getTrial().isAvailable;

  }

  getAvailabilityText() {

    if (this.getAvailability()) {
      return 'Available';
    }

    return 'Unavailable';

  }

  getTrialDuration(): number {

    return this.getTrial().trialLength;

  }

  getPricing1M() {

    if (this.pricing) {

      return this.pricing['1M'];
    }

    return null;
  }

  getPricing3M() {

    if (this.pricing) {

      return this.pricing['3M'];
    }

    return null;
  }

  getPricing6M() {

    if (this.pricing) {

      return this.pricing['6M'];
    }

    return null;
  }

  getPricing12M() {

    if (this.pricing) {

      return this.pricing['12M'];
    }

    return null;
  }

  onSave() {

    this.adminPricingSv.updatePricing(this.pricing, UserModel.getAdminCountry()).subscribe((updatedPricing) => {
      this.pricing = updatedPricing;
      this.modalSv.showAlertModal('Aðgerð tókst', 'Verðskrá hefur verið uppfærð.');
    });

  }

}
