import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ModalService} from '../../../root/modal.service';
import {BookService} from '../../../services/book.service';
import {BookModel} from '../../../models/book.model';
import {BookVersionModel} from '../../../models/book-version.model';
import {BookOrderModel} from '../../../models/book-order.model';
import {GaService} from '../../../services/ga.service';
import {UserModel} from '../../../models/authentication/user.model';
import {TranslateService} from '@ngx-translate/core';
import {ChargebeeService} from '../../../services/chargebee.service';

@Component({
  selector: 'app-billing-confirmation',
  templateUrl: './billing-confirmation.component.html',
  styleUrls: ['./billing-confirmation.component.css']
})
export class BillingConfirmationComponent implements OnInit {

  orderId: string = null;

  subscription: string;
  bookOrder: BookOrderModel;

  book: BookModel;
  bookVersion: BookVersionModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cbSv: ChargebeeService,
              private bookSv: BookService,
              private modalSv: ModalService,
              private tSv: TranslateService,
              private ga: GaService) { }

  ngOnInit() {

    if (UserModel.getCurrent()) {
      if (this.tSv.currentLang !== UserModel.getCurrent().culture) {
        this.tSv.use(UserModel.getCurrent().culture);
      }
    }


    this.route.queryParams.subscribe((params) => {

      this.subscription = params.subscription;

      this.cbSv.updateStudentSubscriptionStatus().subscribe((student) => {

      });

    });

  }


  onNextClicked() {
    this.ga.logEvent('start_after_sales_onboarding', GaService.Categories.onboarding);
    this.router.navigate(['gameintro'], { queryParams: { subscription: this.subscription } });
  }

}
