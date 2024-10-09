import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/authentication/user.model';
import {CountryModel} from '../../models/localization/country.model';
import {AdminSelectCountryService} from '../shared/admin-select-country/admin-select-country.service';
import {Router} from '@angular/router';
import {MobileMenuService} from '../../mobile/mobile-menu.service';

@Component({
  selector: 'app-evo-admin-header',
  templateUrl: './evo-admin-header.component.html',
  styleUrls: ['./evo-admin-header.component.css']
})
export class EvoAdminHeaderComponent implements OnInit {

  hideHamburgerIcon = false;
  CountryModel = CountryModel;

  constructor(public mobileMenuSv: MobileMenuService,
              public selectCountrySv: AdminSelectCountryService,
              private router: Router) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.routeReuseStrategy.shouldReuseRoute = function() {

      return false;
    };
  }

  onMobileMenuClicked() {

    if (this.mobileMenuSv.isVisible === true) {
      this.mobileMenuSv.isVisible = false;
    } else {
      this.mobileMenuSv.isVisible = true;
    }

  }

  navigateHome() {

  }

  getCountryFlag(): string {

    return CountryModel.iconURL(UserModel.getAdminCountry());
  }

  getCurrentCountryTitle(): string {

    return CountryModel.title(UserModel.getAdminCountry());

  }

  onSelectCountry() {

    this.selectCountrySv.show(UserModel.getAdminCountry()).subscribe((country) => {
      UserModel.setAdminCountry(country);
      this.router.navigate([this.router.url]);
    });

  }

}
