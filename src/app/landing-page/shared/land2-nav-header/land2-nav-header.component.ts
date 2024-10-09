import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CultureModel} from '../../../models/localization/culture.model';
import {Router} from '@angular/router';
import {UserModel} from '../../../models/authentication/user.model';
import {StudentModel} from '../../../models/authentication/student.model';

@Component({
  selector: 'app-land2-nav-header',
  templateUrl: './land2-nav-header.component.html',
  styleUrls: ['./land2-nav-header.component.css']
})
export class Land2NavHeaderComponent implements OnInit {

  @Input() hidden: boolean;
  @Output() onBurgerClicked = new EventEmitter();


  constructor(private router: Router) {
  }

  ngOnInit() {
  }



  // onBurgerClicked
  onClicked() {
    this.onBurgerClicked.emit();
  }

  navigateHome() {
    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'landing']);
    }
  }

  navigateFeatures() {
    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'game']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'features', 'game']);
    }
  }

  navigateSchools() {

    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'schools']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'schools']);
    }
  }

  navigatePricing() {

    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'pricing']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'pricing']);
    }
  }

  login() {

    if (UserModel.getCurrent()) {

      this.router.navigate(['platform', 'dashboard']);

    } else {

      if (CultureModel.getHomepageCulture()) {
        this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signin']);
      } else {
        this.router.navigate(['home', CultureModel.enGB, 'signin']);
      }

    }

  }

  getStartedClicked() {

    if (UserModel.getCurrent()) {

      if (StudentModel.getCurrent()) {
        this.router.navigate(['platform', 'dash']);
      } else {
        this.router.navigate(['selectstudent']);
      }


    } else {

      if (CultureModel.getHomepageCulture()) {
        this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup']);
      } else {
        this.router.navigate(['home', CultureModel.enGB, 'signup']);
      }

    }

  }

  navigateResearch() {

    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'research']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'research']);
    }

  }

  getStartedButtonTitle(): string {

    if (UserModel.getCurrent()) {
      return 'header.dashboard';
    }

    return 'header.getStarted';
  }

  isUserLoggedIn(): boolean {

    if (UserModel.getCurrent()) {
      return true;
    }

    return false;
  }
}
