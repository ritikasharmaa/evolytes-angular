import {Component, OnInit} from '@angular/core';
import {SchoolAdminService} from '../../services/admin/school-admin.service';
import {SchoolFilter, SchoolModel} from '../../models/school/school.model';
import {Router} from '@angular/router';
import {CountryModel} from '../../models/localization/country.model';

@Component({
  selector: 'app-evo-school-schools',
  templateUrl: './evo-admin-schools.component.html',
  styleUrls: ['./evo-admin-schools.component.css']
})
export class EvoAdminSchoolsComponent implements OnInit {

  schools: SchoolModel[] = [];
  schoolFilter = new SchoolFilter();
  hasMoreData = true;

  countryDropdownList = CountryModel.privateDropdownList();

  constructor(private schoolSv: SchoolAdminService, private router: Router) {
  }

  ngOnInit() {
    this.countryDropdownList.splice(0, 0, {key: null, value: 'World', iconURL: './assets/school/world-gray-icon.png'});
    this.schoolFilter.limit = 20;
    this.schoolSv.fetchSchools(this.schoolFilter).subscribe((data) => {
      this.schools = data;
    });
  }

  searchFilteredSchools(searchString: string, country: string) {

    this.schoolFilter.skip = 0;
    this.schoolFilter.search = searchString;
    this.schoolFilter.country = country;
    this.hasMoreData = true;
    this.schoolSv.fetchSchools(this.schoolFilter).subscribe((filteredSchools) => {

      if (filteredSchools.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.schools = filteredSchools;

    });
  }

  onFetchMoreSchools() {

    this.schoolFilter.skip = this.schools.length;
    this.schoolSv.fetchSchools(this.schoolFilter).subscribe((schools) => {
      if (schools.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.schools = this.schools.concat(schools);
    });
  }

  onSchoolClicked(school: SchoolModel) {
    this.router.navigate(['admin', 'schools', school._id, 'edit']);
  }

  onCreateClicked() {
    this.router.navigate(['admin', 'schools', 'create']);
  }
}
