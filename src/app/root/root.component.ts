import { Component, OnInit } from '@angular/core';
import {ModalService} from './modal.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CultureModel} from '../models/localization/culture.model';
import {UserModel} from '../models/authentication/user.model';
import {CountryModel} from '../models/localization/country.model';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {


  constructor(public modalSv: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private tSv: TranslateService) {}

  ngOnInit() {

    if (this.route.firstChild) {

      this.route.firstChild.params.subscribe((params: Params) => {

        const culture = params.culture;

        if (CultureModel.list().includes(culture)) {

          this.tSv.use(culture);
          CultureModel.setHomepageCulture(culture);

          if (!CountryModel.getHomepageCountry()) {
            CountryModel.setHomepageCountry(CountryModel.countryForCulture(culture));
          }

        } else {

          if (!CountryModel.getHomepageCountry()) {
            CountryModel.setHomepageCountry(CountryModel.GBR);
          }

          this.router.navigate(['home', CultureModel.enGB, 'landing']);

        }


      });
    }

  }



}
