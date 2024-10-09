import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StudentModel} from '../../../models/authentication/student.model';
import {CountryModel} from '../../../models/localization/country.model';
import {AdminStudentService} from '../../../services/admin/admin-student.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-school-students-sidebar-filter',
  templateUrl: './admin-students-sidebar-filter.component.html',
  styleUrls: ['./admin-students-sidebar-filter.component.css']
})
export class AdminStudentsSidebarFilterComponent implements OnInit {

  country = CountryModel.dropdownList();

  filter
    : { searchFirstName: String, searchLastName: String, searchCountry: String, _max: number }
    = {searchFirstName: null, searchLastName: null, searchCountry: null, _max: 20};

  @Output() onClickFilter = new EventEmitter<{ searchFirstName: String, searchLastName: String, searchCountry: String, _max: number }>();

  constructor(private adminStudentSv: AdminStudentService) { }

  ngOnInit() {
    this.country.push({key: undefined, value: 'all countries', iconURL: null});
  }

  onCancelClicked() {
    this.filter = {searchFirstName: null, searchLastName: null, searchCountry: null, _max: 20};
  }

  onFilterClicked() {
    this.onClickFilter.emit(this.filter);
  }
}
