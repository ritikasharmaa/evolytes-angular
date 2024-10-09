import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SubscriptionModel } from '../../models/subscription.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentModel } from '../../models/authentication/student.model';
import { GaService } from '../../services/ga.service';
import { UserModel } from '../../models/authentication/user.model';
import { TranslateService } from '@ngx-translate/core';
import { CountryModel } from '../../models/localization/country.model';
import { PricingModel, SubscriptionPricingModel } from '../../models/pricing.model';
import { AdminPricingService } from '../../services/admin/admin-pricing.service';
import { CultureModel } from '../../models/localization/culture.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-select-subscription',
  templateUrl: './select-subscription.component.html',
  styleUrls: ['./select-subscription.component.css']
})
export class SelectSubscriptionComponent implements OnInit {

  @ViewChild('sub1M') sub1M: ElementRef;
  @ViewChild('sub3M') sub3M: ElementRef;
  @ViewChild('sub6M') sub6M: ElementRef;
  selectedSubscription = '1M';

  pricing: PricingModel = null;

  userCulture = CultureModel.getHomepageCulture();
  CultureModel = CultureModel;
  CountryModel = CountryModel;
  student: StudentModel;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private tSv: TranslateService,
    private pricingSv: AdminPricingService,
    private ga: GaService,
    private studentSv: StudentService) {
  }

  ngOnInit() {

    if (UserModel.getCurrent()) {
      this.userCulture = UserModel.getCurrent().culture;
      if (this.tSv.currentLang !== UserModel.getCurrent().culture) {
        this.tSv.use(UserModel.getCurrent().culture);
      }

      this.pricingSv.fetchPricing(UserModel.getCurrent().country).subscribe((pricing) => {
        this.pricing = pricing;
      });

    }

    this.route.queryParams.subscribe((params: Params) => {

      const subscription = params['subscription'];
      if (subscription != null) {
        this.selectedSubscription = subscription;
        this.updateSubscriptions();
      }
      const studentId = params.student;
      this.studentSv.fetchStudent(studentId).subscribe((student) => {
        this.student = student;
      });

    });

  }

  updateSubscriptions() {

    if (this.selectedSubscription === '1M' && this.sub1M) {
      this.sub1M.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    } else if (this.selectedSubscription === '3M' && this.sub3M) {
      this.sub3M.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    } else if (this.selectedSubscription === '6M' && this.sub6M) {
      this.sub6M.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }

  }

  landingPageMonthlyPricing(length: string): string {
    return this.getMonthlyPricing(CountryModel.getHomepageCountry(), length);
  }

  getMonthlyPricing(country: string, length: string): string {

    if (country === CountryModel.GBR) {

      return this.pricing[length].currencySymbol + this.pricing[length].monthlyPrice;
    } else if (country === CountryModel.FRA) {
      return this.pricing[length].monthlyPrice + this.pricing[length].currencySymbol;
    } else if (country === CountryModel.ISL) {
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
    } else if (country === CountryModel.ISL) {
      return this.pricing[length].userVisiblePrice + ' ' + this.pricing[length].currencySymbol;
    }

    return this.pricing[length].userVisiblePrice + this.pricing[length].currencySymbol;

  }

  isDisabled(): boolean {

    if (this.selectedSubscription) {
      return false;
    }

    return true;
  }

  showFreeTrial(): boolean {

    if (!this.pricing) {
      return false;
    }

    if (this.student) {
      return this.student.billingStatus !== 'in_trial';
    }

    return true;
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

  selectSub(subType: string) {

    if (subType === 'trial') {
      this.router.navigate(['confirmpurch'], { queryParams: { subscription: subType } });
    }

    const selectedPricing = <SubscriptionPricingModel>this.pricing[subType];
    if (selectedPricing.includesBook) {

      this.ga.logEvent('select_sub_next_clicked', GaService.Categories.sales_process);
      this.router.navigate(['selectbook'], { queryParams: { subscription: subType } });

    } else {

      this.ga.logEvent('select_sub_next_clicked', GaService.Categories.sales_process);
      this.router.navigate(['confirmpurch'], { queryParams: { subscription: subType } });

    }

  }

}
