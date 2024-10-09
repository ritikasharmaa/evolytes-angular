import { Component, OnInit } from '@angular/core';
import {CountryModel} from '../../../models/localization/country.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {ChangeLangCountryService} from './change-lang-country.service';

@Component({
  selector: 'app-change-lang-country',
  templateUrl: './change-lang-country.component.html',
  styleUrls: ['./change-lang-country.component.css']
})
export class ChangeLangCountryComponent implements OnInit {

  currentCountry: string;
  currentLang: string;

  constructor(public changeLangCountrySV: ChangeLangCountryService) { }

  ngOnInit() {

    this.currentCountry = CountryModel.getHomepageCountry();
    this.currentLang = CultureModel.getHomepageCulture();

  }

  onValidateClicked() {
    this.changeLangCountrySV.cultureCountryChanged({culture: this.currentLang, country: this.currentCountry});
  }

  onCancelClicked() {
    this.changeLangCountrySV.close();
  }
}
