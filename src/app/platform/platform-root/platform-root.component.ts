import { Component, OnInit } from '@angular/core';
import {MobileMenuService} from '../../mobile/mobile-menu.service';
import {TranslateService} from '@ngx-translate/core';
import {UserModel} from '../../models/authentication/user.model';
import {StudentModel} from '../../models/authentication/student.model';
import {ChargebeeService} from '../../services/chargebee.service';
import {Router} from '@angular/router';
import {SchoolModel} from '../../models/school/school.model';
import {CultureModel} from '../../models/localization/culture.model';

@Component({
  selector: 'app-platform-root',
  templateUrl: './platform-root.component.html',
  styleUrls: ['./platform-root.component.css']
})
export class PlatformRootComponent implements OnInit {

  ChargebeeBillingStatuses = StudentModel.ChargebeeSubscriptionsStatusTypes;
  cbInstance: any;

  constructor(public mobileMenuSv: MobileMenuService,
              private cbSv: ChargebeeService,
              private router: Router,
              private tSv: TranslateService) { }

  ngOnInit() {

    this.cbInstance = window['Chargebee'].getInstance();

    if (UserModel.getCurrent()) {
      if (this.tSv.currentLang !== UserModel.getCurrent().culture) {
        this.tSv.use(UserModel.getCurrent().culture);
      }
    }

  }

  isPaymentNeeded() {

    if (StudentModel.getCurrent() && !StudentModel.getCurrent().schoolId) {

      const billingStatus = StudentModel.getCurrent().billingStatus;

      if (billingStatus !== this.ChargebeeBillingStatuses.active &&
        billingStatus !== this.ChargebeeBillingStatuses.inTrial &&
        billingStatus !== this.ChargebeeBillingStatuses.nonRenewing) {
        return true;
      }

    } else {

      const licenseExpiresAt = StudentModel.getCurrent().schoolLicenseExpiresAt;
      if (!licenseExpiresAt || licenseExpiresAt.getTime() < Date.now()) {
        return true;
      }

    }

    return false;
  }

  getPaymentTitle() {


    if (StudentModel.getCurrent().schoolId) {

      if (StudentModel.getCurrent().schoolLicenseExpiresAt && StudentModel.getCurrent().schoolLicenseExpiresAt.getTime() < Date.now()) {
        return this.tSv.instant('selectStudent.licenseExpired');
      }

    } else {

      const billingStatus = StudentModel.getCurrent().billingStatus;
      if (billingStatus === this.ChargebeeBillingStatuses.cancelled) {
        return this.tSv.instant('dashboard.paymentError.cancelled');
      } else if (StudentModel.getCurrent().isTrialExpired()) {
        return this.tSv.instant('dashboard.paymentError.trialExpired');
      }

    }

    return this.tSv.instant('dashboard.paymentError.notSubscribed');
  }

  getPaymentButtonTitle()  {

    if (StudentModel.getCurrent().schoolId) {
      return this.tSv.instant('lp2.footer.contactUs');
    }

    const billingStatus = StudentModel.getCurrent().billingStatus;
    if (billingStatus === this.ChargebeeBillingStatuses.cancelled) {
      return this.tSv.instant('reusable.renewNow');
    }

    return this.tSv.instant('reusable.buyNow');
  }

  onPaymentButtonClicked() {

    if (StudentModel.getCurrent().schoolId) {
      return this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs']);
    }

    const billingStatus = StudentModel.getCurrent().billingStatus;
    if (billingStatus === this.ChargebeeBillingStatuses.cancelled) {

      // Implementation for portal sessions: https://www.chargebee.com/checkout-portal-docs/api-portal.html#integration-steps
      this.cbInstance.setPortalSession(() => {
        return this.cbSv.manageSubscriptionCheckout();
      });


      const cbPortal = this.cbInstance.createChargebeePortal();
      cbPortal.open({
        close: () => {
          // close callbacks
          // Update the student status if the user has changed their subscription.
          this.cbSv.updateStudentSubscriptionStatus().subscribe((student) => {
            StudentModel.setCurrent(student);
          });
        }
      });

    } else {

      this.router.navigate(['selectsub']);

    }



  }

  getRouterHeight() {

    if (this.isPaymentNeeded()) {
      return 'calc(100% - 70px)';
    }

    return '100%';
  }

}
