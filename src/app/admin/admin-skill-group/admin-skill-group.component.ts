import {Component, OnInit} from '@angular/core';
import {SkillGroupFilter, SkillGroupModel} from '../../models/skillGroup.model';
import {Router} from '@angular/router';
import {SkillGroupService} from '../../services/admin/skillGroup.service';
import {DescriptionModel} from '../../models/shared/description.model';
import {UserModel} from '../../models/authentication/user.model';


@Component({
  selector: 'app-school-skill-group',
  templateUrl: './admin-skill-group.component.html',
  styleUrls: ['./admin-skill-group.component.css']
})
export class AdminSkillGroupComponent implements OnInit {

  skillGroups: SkillGroupModel[] = [];
  skillGroupFilter = new SkillGroupFilter();
  hasMoreData = true;

  constructor(
    private skillGroupSv: SkillGroupService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.skillGroupFilter.limit = 20;
    this.skillGroupFilter.culture = UserModel.getCurrent().culture;
    this.skillGroupSv.fetchSkillGroups(this.skillGroupFilter).subscribe((data) => {
      this.skillGroups = data;
    });
  }

  searchFilteredSkillGroups(searchString: string) {

    this.skillGroupFilter.skip = 0;
    this.skillGroupFilter.name = searchString;
    this.hasMoreData = true;
    this.skillGroupSv.fetchSkillGroups(this.skillGroupFilter).subscribe((filteredSkillGroups) => {

      if (filteredSkillGroups.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.skillGroups = filteredSkillGroups;

    });
  }

  onFetchMoreSkillGroups() {

    this.skillGroupFilter.skip = this.skillGroups.length;
    this.skillGroupSv.fetchSkillGroups(this.skillGroupFilter).subscribe((skillGroups) => {
      if (skillGroups.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.skillGroups = this.skillGroups.concat(skillGroups);
    });
  }

  onSkillGroupClicked(skillGroup: SkillGroupModel) {
    this.router.navigate(['admin', 'skillGroups', skillGroup._id, 'edit']);
  }

  onCreateClicked() {
    this.router.navigate(['admin', 'skillGroups', 'create']);
  }

  cultureName(name: DescriptionModel): string {
    return name[UserModel.getCurrent().culture];
  }
}
