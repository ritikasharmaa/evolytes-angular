import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../../models/authentication/user.model';
import {CultureModel} from '../../models/localization/culture.model';

@Component({
  selector: 'app-land-nav-header',
  templateUrl: './land-nav-header.component.html',
  styleUrls: ['./land-nav-header.component.css']
})
export class LandNavHeaderComponent implements OnInit {

  @Input() onlyIcon: Boolean = false;
  @Output() startedClicked = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  buttonTitle(): string {

    if (UserModel.isLoggedIn()) {

      return 'header.dashboard';
    }

    return 'header.getStarted';
  }

  navigateHome() {

    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'landing']);
    }

  }

  getStartedClicked() {
    this.startedClicked.emit();
  }

}
