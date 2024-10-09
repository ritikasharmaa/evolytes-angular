import { Component, OnInit } from '@angular/core';
import {EvoCountryChangeService} from './evo-country-change.service';
import {CountryModel} from '../../models/localization/country.model';

@Component({
  selector: 'app-evo-country-change',
  templateUrl: './evo-country-change.component.html',
  styleUrls: ['./evo-country-change.component.css']
})
export class EvoCountryChangeComponent implements OnInit {

  countries = CountryModel.dropdownList();

  constructor(public countryChangeSv: EvoCountryChangeService) { }

  ngOnInit() {
  }

  onCountryChanged(country: string) {
    this.countryChangeSv.countryChanged(country);
  }

}
