import {Component, OnInit} from '@angular/core';
import {ObjectiveService} from '../../services/admin/objective.service';
import {ObjectiveFilter, ObjectiveModel} from '../../models/objective.model';
import {Router} from '@angular/router';
import {UserModel} from '../../models/authentication/user.model';
import {CountryModel} from '../../models/localization/country.model';

@Component({
  selector: 'app-admin-objective',
  templateUrl: './admin-objective.component.html',
  styleUrls: ['./admin-objective.component.css']
})
export class AdminObjectiveComponent implements OnInit {

  objectives: ObjectiveModel[] = [];
  objectiveFilter = new ObjectiveFilter();
  hasMoreData = true;

  countryDropdownList = CountryModel.privateDropdownList();

  treeObjective: [string, { objs: ObjectiveModel[], isVisible: boolean }] []
    = new Array<[string, { objs: ObjectiveModel[], isVisible: boolean }]>();

  displayType = 'list';

  constructor(private router: Router, private objectiveSrv: ObjectiveService) {
  }

  ngOnInit() {
    this.countryDropdownList.splice(0, 0, {key: null, value: 'World', iconURL: './assets/school/world-gray-icon.png'});
    this.objectiveFilter.limit = 20;
    this.objectiveFilter.culture = UserModel.getCurrent().culture;
    this.objectiveSrv.fetchObjectives(this.objectiveFilter).subscribe(response => {
      this.objectives = response;
      this.createTab();
    });
  }

  searchFilteredObjectives(searchString: string, country: string) {
    this.objectiveFilter.skip = 0;
    this.objectiveFilter.level = searchString;
    this.objectiveFilter.country = country;
    this.hasMoreData = true;
    this.objectiveSrv.fetchObjectives(this.objectiveFilter).subscribe((filteredObjectives) => {

      if (filteredObjectives.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.objectives = filteredObjectives;
      this.createTab();
    });
  }

  onFetchMoreObjectives() {
    this.objectiveFilter.skip = this.objectives.length;
    this.objectiveSrv.fetchObjectives(this.objectiveFilter).subscribe((objectives) => {
      if (objectives.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.objectives = this.objectives.concat(objectives);
      this.createTab();
    });
  }

  onObjectiveClicked(obj: ObjectiveModel) {
    if (obj) {
      this.router.navigate(['admin', 'objectives', obj._id]);
    }
  }

  onCreateClicked() {
    this.router.navigate(['admin', 'objectives', 'create']);
  }

  cultureLevel(level: any): string {
    return level[UserModel.getCurrent().culture];
  }

  createTab() {
    this.treeObjective = new Array<[string, { objs: ObjectiveModel[], isVisible: boolean }]>();
    this.objectives.forEach(obj => {
      const index: number = this.treeObjective.findIndex(item => item[0] === obj.country);
      if (index === -1) {
        this.treeObjective.push([obj.country, {objs: [obj], isVisible: false}]);
      } else {
        this.treeObjective[index][1].objs.push(obj);
      }
    });
  }
}
