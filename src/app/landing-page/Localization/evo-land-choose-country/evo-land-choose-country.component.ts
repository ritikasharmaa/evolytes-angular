import { Component, OnInit } from '@angular/core';
import {CountryModel} from '../../../models/localization/country.model';
import {Router} from '@angular/router';
import {CultureModel} from '../../../models/localization/culture.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-evo-land-choose-country',
  templateUrl: './evo-land-choose-country.component.html',
  styleUrls: ['./evo-land-choose-country.component.css']
})
export class EvoLandChooseCountryComponent implements OnInit {

  list = CountryModel.dropdownList();

  constructor(private router: Router,
              private titleSv: Title) {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleSv.setTitle('Veldu land');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleSv.setTitle('Select a country');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleSv.setTitle('Sélectionner un pays');
    }

  }

  ngOnInit() {
    if (CountryModel.getHomepageCountry()) {
      if (!CultureModel.getHomepageCulture()) {
        CultureModel.setHomepageCulture(CountryModel.cultureForCountry(CountryModel.getHomepageCountry()));
      }

      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);

    }
  }

  onCountrySelected(country: string) {

    CountryModel.setHomepageCountry(country);
    CultureModel.setHomepageCulture(CountryModel.cultureForCountry(CountryModel.getHomepageCountry()));

    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);


  }

}
