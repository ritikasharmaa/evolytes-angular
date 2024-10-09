import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GaService} from '../../../services/ga.service';
import {UserModel} from '../../../models/authentication/user.model';
import {TranslateService} from '@ngx-translate/core';
import {AdminPricingService} from '../../../services/admin/admin-pricing.service';

@Component({
  selector: 'app-about-monitor',
  templateUrl: './about-monitor.component.html',
  styleUrls: ['./about-monitor.component.css']
})
export class AboutMonitorComponent implements OnInit {

  // The subscription length 1M, 3M, 6M or 1Y which are passed as query parameters
  subscription: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pricingSv: AdminPricingService,
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
    });

  }

  onFinishClicked() {
    this.ga.logEvent('monitor_intro_next_clicked', GaService.Categories.onboarding);
    this.router.navigate(['bookintro'], { queryParams: { subscription: this.subscription } });
  }

}
