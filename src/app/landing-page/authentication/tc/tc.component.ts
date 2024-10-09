import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CultureModel} from '../../../models/localization/culture.model';

@Component({
  selector: 'app-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./tc.component.css']
})
export class TcComponent implements OnInit {

  hidden: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.hidden = true;
  }

  onPrivacyClicked() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'privacy']);
  }

  onHomePageClicked() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
  }

  setHidden() {
    this.hidden = !this.hidden;
  }

}
