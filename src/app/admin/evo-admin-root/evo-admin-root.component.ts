import { Component, OnInit } from '@angular/core';
import {MobileMenuService} from '../../mobile/mobile-menu.service';
import {AdminSelectCountryService} from '../shared/admin-select-country/admin-select-country.service';

@Component({
  selector: 'app-evo-school-root',
  templateUrl: './evo-admin-root.component.html',
  styleUrls: ['./evo-admin-root.component.css']
})
export class EvoAdminRootComponent implements OnInit {

  constructor(public mobileMenuSv: MobileMenuService,
              private selectCountry: AdminSelectCountryService) { }

  ngOnInit() {
  }

}
