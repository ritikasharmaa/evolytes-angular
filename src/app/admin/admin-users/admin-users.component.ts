import {Component, OnInit} from '@angular/core';
import {UserFilter, UserModel} from '../../models/authentication/user.model';
import {Router} from '@angular/router';
import {AdminUserService} from '../../services/admin/admin-user.service';
import {CountryModel} from '../../models/localization/country.model';

@Component({
  selector: 'app-school-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: UserModel[] = [];
  userFilter = new UserFilter();
  hasMoreData = true;
  countryDropdownList = CountryModel.privateDropdownList();

  constructor(private router: Router, private adminUserSrv: AdminUserService) {
  }

  ngOnInit() {
    this.countryDropdownList.splice(0, 0, {key: null, value: 'World', iconURL: './assets/school/world-gray-icon.png'});
    this.userFilter.limit = 20;
    this.adminUserSrv.fetchUsers(this.userFilter)
      .subscribe((users) => {
        this.users = users;
      });
  }

  searchFilteredUsers(searchString: string, country: string) {
    this.userFilter.skip = 0;
    this.userFilter.name = searchString;
    this.userFilter.email = searchString;
    this.userFilter.country = country;
    this.hasMoreData = true;
    this.adminUserSrv.fetchUsers(this.userFilter).subscribe((filteredUsers) => {

      if (filteredUsers.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.users = filteredUsers;
    });
  }

  onFetchMoreUsers() {
    this.userFilter.skip = this.users.length;
    this.adminUserSrv.fetchUsers(this.userFilter).subscribe((users) => {
      if (users.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.users = this.users.concat(users);
    });

  }

  onUserClicked(user: UserModel) {
    this.router.navigate(['admin', 'users', user._id, 'edit']);
  }
}
