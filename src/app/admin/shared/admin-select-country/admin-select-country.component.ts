import { Component, OnInit } from '@angular/core';
import {AdminSelectCountryService} from './admin-select-country.service';

@Component({
  selector: 'app-admin-select-country',
  templateUrl: './admin-select-country.component.html',
  styleUrls: ['./admin-select-country.component.css']
})
export class AdminSelectCountryComponent implements OnInit {

  constructor(public countrySv: AdminSelectCountryService) { }

  ngOnInit() {

  }

}
