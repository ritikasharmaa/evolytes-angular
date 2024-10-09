import { Component, OnInit } from '@angular/core';
import {CultureModel} from '../../../models/localization/culture.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-evo-land-choose-language',
  templateUrl: './evo-land-choose-language.component.html',
  styleUrls: ['./evo-land-choose-language.component.css']
})
export class EvoLandChooseLanguageComponent implements OnInit {

  list = CultureModel.dropdownList();

  constructor(private router: Router) { }

  ngOnInit() {

    // Has previously selected a default country
    if (CultureModel.getHomepageCulture()) {

      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);

    }

  }

  onLanguageSelected(culture: string) {

    this.router.navigate(['home', culture, 'landing']);

  }

}
