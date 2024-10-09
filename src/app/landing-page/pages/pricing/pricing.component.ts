import { Component, OnInit } from '@angular/core';
import {PricingModel, SubscriptionPricingModel} from '../../../models/pricing.model';
import {AdminPricingService} from '../../../services/admin/admin-pricing.service';
import {CountryModel} from '../../../models/localization/country.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {UserModel} from '../../../models/authentication/user.model';
import {StudentModel} from '../../../models/authentication/student.model';
import {SubscriptionModel} from '../../../models/subscription.model';
import {count} from 'rxjs/operators';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  pricing: PricingModel;
  CultureModel = CultureModel;
  hidden: boolean; // To adapt with the burger menu of the navbarre

  constructor(
    private adminPricingSv: AdminPricingService,
    private titleService: Title,
    private router: Router,
    private tSv: TranslateService
  ) { }

  ngOnInit() {

    this.hidden = true;

    this.adminPricingSv.fetchPricing(CountryModel.getHomepageCountry()).subscribe((pricing) => {
      this.pricing = pricing;
    });

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleService.setTitle('Evolytes Pricing | Subscriptions | Subscriptions for schools');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleService.setTitle('Evolytes Pricing | Subscriptions | Subscriptions for schools');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleService.setTitle('Prix Evolytes | Abonnements | Abonnements pour les écoles');
    }

  }

  setHidden() {
    this.hidden = !this.hidden;
  }

  landingPageMonthlyPricing(length: string): string {
    return this.getMonthlyPricing(CountryModel.getHomepageCountry(), length);
  }

  getMonthlyPricing(country: string, length: string): string {

    if (country === CountryModel.GBR) {

      return this.pricing[length].currencySymbol + this.pricing[length].monthlyPrice;
    } else if (country === CountryModel.FRA) {
      return this.pricing[length].monthlyPrice + this.pricing[length].currencySymbol;
    } else if (country === CountryModel.ISL ||
      country === CountryModel.SWE ||
      country === CountryModel.DNK ||
      country === CountryModel.NOR) {
      return this.pricing[length].monthlyPrice + ' ' + this.pricing[length].currencySymbol;
    }

    return this.pricing[length].monthlyPrice + this.pricing[length].currencySymbol;

  }

  landingPageTotalPrice(length: string): string {

    return this.getTotalPrice(CountryModel.getHomepageCountry(), length);
  }

  getTotalPrice(country: string, length: string): string {

    if (country === CountryModel.GBR) {
      return this.pricing[length].currencySymbol + this.pricing[length].userVisiblePrice;
    } else if (country === CountryModel.FRA) {
      return this.pricing[length].userVisiblePrice + this.pricing[length].currencySymbol;
    } else if (country === CountryModel.ISL ||
      country === CountryModel.SWE ||
      country === CountryModel.DNK ||
      country === CountryModel.NOR) {
      return this.pricing[length].userVisiblePrice + ' ' + this.pricing[length].currencySymbol;
    }

    return this.pricing[length].userVisiblePrice + this.pricing[length].currencySymbol;

  }

  showFreeTrial(): boolean {

    if (this.pricing) {
      return this.pricing.trial.isAvailable;
    }

    return false;
  }

  show1MSubscription(): boolean {

    if (this.pricing) {

      return this.pricing['1M'].isAvailable;
    }

    return false;
  }

  show3MSubscription(): boolean {

    if (this.pricing) {

      return this.pricing['3M'].isAvailable;
    }

    return false;
  }

  show6MSubscription(): boolean {

    if (this.pricing) {

      return this.pricing['6M'].isAvailable;
    }

    return false;
  }

  show1MBook(): boolean {

    if (this.pricing) {

      return this.pricing['1M'].includesBook;
    }

    return false;
  }

  show3MBook(): boolean {

    if (this.pricing) {

      return this.pricing['3M'].includesBook;
    }

    return false;
  }

  show6MBook(): boolean {

    if (this.pricing) {
      return this.pricing['6M'].includesBook;
    }

    return false;
  }

  buyNowClicked(sub: SubscriptionPricingModel) {

    const queryParams = { queryParams: { subscription: sub.repeatInterval.toString() + 'M' } };

    if (UserModel.getCurrent() && StudentModel.getCurrent() && sub.includesBook) {
      this.router.navigate(['selectbook'], queryParams);
    } else if (UserModel.getCurrent() && StudentModel.getCurrent()) {
      this.router.navigate(['confirmpurch'], queryParams);
    } else if (UserModel.getCurrent()) {
      this.router.navigate(['createstudent'], queryParams);
    } else {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup'], queryParams);
    }

  }

  tryNowClicked() {

    const queryParams = { queryParams: { subscription: 'trial' } };

    if (UserModel.getCurrent() && StudentModel.getCurrent()) {
      this.router.navigate(['confirmpurch'], queryParams);
    } else if (UserModel.getCurrent()) {
      this.router.navigate(['createStudent'], queryParams);
    } else {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup'], queryParams);
    }
  }

  goToContact(subject?: string) {
    if (subject) {
      let translatedSubject;
      this.tSv.get(subject).subscribe((result) => {
        translatedSubject = result;
      });
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs'], {queryParams: {subject: translatedSubject}});
    } else {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs']);
    }
  }

  goToSchool() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'schools']);
  }

  goToSignup() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup']);
  }

}
