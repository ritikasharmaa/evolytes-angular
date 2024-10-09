import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountryModel} from '../../../models/localization/country.model';

@Component({
  selector: 'app-school-users-sidebar-filter',
  templateUrl: './admin-users-sidebar-filter.component.html',
  styleUrls: ['./admin-users-sidebar-filter.component.css']
})
export class AdminUsersSidebarFilterComponent implements OnInit {

  country = CountryModel.dropdownList();

  filter
    : { searchFirstName: String, searchLastName: String, searchCountry: String, searchEmail: String, _max: number }
    = {searchFirstName: null, searchLastName: null, searchCountry: null, searchEmail: null, _max: 20};

  @Output() onClickFilter = new EventEmitter<{ searchFirstName: String, searchLastName: String, searchCountry: String, searchEmail: String, _max: number }>();

  constructor() { }

  ngOnInit() {
  }

  onCancelClicked() {
    const temp = this.filter._max;
    this.filter = {searchFirstName: null, searchLastName: null, searchCountry: null, searchEmail: null, _max: temp};
  }

  onFilterClicked() {
    this.onClickFilter.emit(this.filter);
  }
}
