import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../../models/authentication/user.model';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {ModalService} from '../../root/modal.service';
import {BookModel} from '../../models/book.model';
import {BookVersionModel} from '../../models/book-version.model';
import {CountryModel} from '../../models/localization/country.model';
import {SubscriptionModel} from '../../models/subscription.model';
import {BookOrderModel} from '../../models/book-order.model';
import {StudentModel} from '../../models/authentication/student.model';
import {GaService} from '../../services/ga.service';
import {TranslateService} from '@ngx-translate/core';
import {CultureModel} from '../../models/localization/culture.model';
import {PricingModel, SubscriptionPricingModel} from '../../models/pricing.model';
import {AdminPricingService} from '../../services/admin/admin-pricing.service';
import {ChargebeeService} from '../../services/chargebee.service';

@Component({
  selector: 'app-billing-information',
  templateUrl: './billing-information.component.html',
  styleUrls: ['./billing-information.component.css']
})
export class BillingInformationComponent implements OnInit {

  @ViewChild('kortaform') kortaform: ElementRef;

  /**
   * Whether the shipping address is the same as billing address.
   */
  sameAsBilling = true;
  acceptTCs = false;

  bookId: string;
  bookVersionId: string;
  subscriptionType: string;

  book: BookModel;
  bookVersion: BookVersionModel;

  subscription: SubscriptionModel;
  bookOrder: BookOrderModel;

  pricing: PricingModel;
  subPricing: SubscriptionPricingModel;

  cbInstance: any;
  chargebeeBillingInfo = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  };

  chargebeeShippingInfo = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  };


  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookSv: BookService,
              private pricingAdminSv: AdminPricingService,
              private modalSv: ModalService,
              private cbSv: ChargebeeService,
              private tSv: TranslateService,
              private ngZone: NgZone) { }



  ngOnInit() {

    this.cbInstance = window['Chargebee'].getInstance();

    this.route.queryParams.subscribe((params) => {

      this.subscriptionType = params['subscription'];
      this.bookId = params['bookId'];
      this.bookVersionId = params['bookVersionId'];

      if (this.subscriptionType === null || this.subscriptionType === undefined) {

        if (CultureModel.getHomepageCulture()) {
          this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
        } else {
          this.router.navigate(['home', CultureModel.enGB, 'landing']);
        }

      }

      if (this.bookId && this.bookVersionId) {

        this.bookSv.fetchPublicBook(this.bookId).subscribe((book) => {

          this.book = book;
          this.bookVersion = book.findVersion(this.bookVersionId);

        });

      }

      this.pricingAdminSv.fetchPricing(UserModel.getCurrent().country).subscribe((pricing) => {

        this.pricing = pricing;
        this.subPricing = pricing[this.subscriptionType];
        this.setupBillingInformation();

      });


    });

  }

  showFreeTrial(): boolean {

    if (this.pricing && this.pricing.trial) {
      return this.pricing.trial.isAvailable;
    }

    return false;
  }

  getTrialDuration(): string {

    if (this.pricing) {
      return this.pricing.trial.trialLength.toString(10);
    }

    return '0';
  }

  getTrialCost(): string {

    if (!this.pricing) {
      return '0';
    }

    return '0 ' + this.pricing['1M'].currencySymbol;
  }

  openCheckout() {

    const body: object = {
      subType: this.subscriptionType,
      bookVersionId: this.bookVersionId,
      billing: this.chargebeeBillingInfo,
      shipping: null
    };

    if (this.sameAsBilling) {
      body['shipping'] = this.chargebeeBillingInfo;
    } else {
      body['shipping'] = this.chargebeeShippingInfo;
    }

    this.cbInstance.openCheckout({
      hostedPage: () => {
        return this.cbSv.newSubscriptionCheckout(body);
      },
      loaded: () => {

      },
      error: (err) => {

        this.ngZone.run(() => {

          if (err.name === 'resource_already_exists') {
            this.modalSv.showAlertModal(this.tSv.instant('reusable.error'), this.tSv.instant('billingInformation.subscriptionExistsMessage')).subscribe((response) => {
              this.router.navigate(['platform', 'dash']);
            });
            this.cbSv.updateStudentSubscriptionStatus().subscribe((student) => {

              if (student) {
                StudentModel.setCurrent(student);
              }
            });
          }
        });

      },
      close: () => {
        console.log('closed');
      },
      success: (hostedPageId) => {
        this.ngZone.run(() => {

          // Navigate to success page.
          this.cbSv.updateStudentSubscriptionStatus().subscribe((student) => {
            if (student) {
              StudentModel.setCurrent(student);
            }
          });
          this.router.navigate(['thankpurchase'], { queryParams: { subscription: this.subscriptionType } });
        });
      },
      step: (value) => {

      }
    });

  }

  onStartTrialClicked() {

    this.cbSv.startFreeTrial().subscribe((student) => {
      StudentModel.setCurrent(student);
      this.router.navigate(['thankpurchase'], { queryParams: { subscription: this.subscriptionType } });
    }, (e) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'), e.message);
    });

  }

  setupBillingInformation() {

    this.chargebeeBillingInfo.country = UserModel.getCurrent().country;
    this.chargebeeBillingInfo.firstName = UserModel.getCurrent().firstName;
    this.chargebeeBillingInfo.lastName = UserModel.getCurrent().lastName;

    const subPricing = <SubscriptionPricingModel>this.pricing[this.subscriptionType];

  }

  getSubscriptionTitle(): string {

    if (this.subscriptionType === 'trial') {
      return 'lp2.pricing.Subscriptions.freeTrial.title';
    } else if (this.subscriptionType === SubscriptionModel.SubscriptionType['6M']) {
      return 'lp2.pricing.Subscriptions.6m.title';
    } else if (this.subscriptionType === SubscriptionModel.SubscriptionType['3M']) {
      return 'lp2.pricing.Subscriptions.3m.title';
    } else if (this.subscriptionType === SubscriptionModel.SubscriptionType['1M']) {
      return 'lp2.pricing.Subscriptions.1m.title';
    }

    return 'lp2.pricing.Subscriptions.12m.title';
  }

  bookVersionName(): string {

    if (this.bookVersion) {

      return this.bookVersion.name;
    }

    return '';
  }

  bookVersionDescription(): string {

    if (this.bookVersion) {

      return this.bookVersion.description;
    }

    return '';
  }

  bookVersionImgURL(): string {

    if (this.bookVersion) {

      return this.bookVersion.bookVersionImgURL();
    }

    return null;
  }

  bookVersionCountryTitle(): string {

    if (this.bookVersion && this.book) {

      return CountryModel.cultureTitle(this.book.country);
    }

    return null;
  }

  bookVersionCountryIconURL(): string {

    if (this.bookVersion && this.book) {

      return CountryModel.iconURL(this.book.country);
    }

    return null;
  }

  shippingLastName(): string {

    if (this.sameAsBilling) {

      return this.chargebeeBillingInfo.lastName;
    }

    return this.chargebeeShippingInfo.lastName;
  }

  shippingAddress(): string {

    if (this.sameAsBilling) {

      return this.chargebeeBillingInfo.address;
    }

    return this.chargebeeShippingInfo.address;
  }

  shippingState(): string {

    if (this.sameAsBilling) {

      return this.chargebeeBillingInfo.state;
    }

    return this.chargebeeShippingInfo.state;
  }

  orderId(): string {

    if (this.subscription) {

      return this.subscription.orderId;
    }

    return null;
  }

  onTCsClicked() {
    this.router.navigate([UserModel.getCurrent().culture, 'tc']);
  }

}
