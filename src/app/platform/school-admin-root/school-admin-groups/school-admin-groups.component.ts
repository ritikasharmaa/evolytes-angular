import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GroupModel, GroupQueryModel} from '../../../models/school/group.model';
import {SchoolGroupAdministrationService} from '../../../services/school/school-group-administration.service';

@Component({
  selector: 'app-school-school-groups',
  templateUrl: './school-admin-groups.component.html',
  styleUrls: ['./school-admin-groups.component.css']
})
export class SchoolAdminGroupsComponent implements OnInit {

  showCreateGroup = false;
  groups: GroupModel[] = [];

  hasMoreGroups = true;
  filter = new GroupQueryModel();

  group = new GroupModel();


  constructor(private router: Router,
              private groupSv: SchoolGroupAdministrationService) {
  }

  ngOnInit() {
    this.filter.limit = 20;
    this.refreshGroups();
  }

  refreshGroups() {
    this.groupSv.fetchGroups(this.filter).subscribe((groups) => {

      if (groups.length === this.filter.limit) {
        this.hasMoreGroups = true;
      } else {
        this.hasMoreGroups = false;
      }
      this.groups = groups;
    });
  }

  searchFilteredGroups(searchString: string) {

    this.filter.skip = 0;
    this.filter.name = searchString;
    this.hasMoreGroups = true;

    if (searchString !== null && searchString.length > 0) {
      this.filter.name = searchString;
    } else {
      this.filter.name = undefined;
    }

    this.filter.skip = 0;
    this.refreshGroups();
  }

  onGroupClicked(group: GroupModel) {
    this.router.navigate(['schooladmin', 'groups', group._id]);
  }

  closeCreateGroupClicked() {
    this.showCreateGroup = false;
  }

  createGroupClicked() {
    this.showCreateGroup = false;
    this.groupSv.createGroup(this.group).subscribe((newGroup) => {
      this.refreshGroups();
      this.group = new GroupModel();
    });
  }

  fetchMoreGroups() {
    this.filter.skip = this.groups.length;
    this.groupSv.fetchGroups(this.filter).subscribe((groups) => {

      if (groups.length === this.filter.limit) {
        this.hasMoreGroups = true;
      } else {
        this.hasMoreGroups = false;
      }
      this.groups = this.groups.concat(groups);
    });
  }
}
