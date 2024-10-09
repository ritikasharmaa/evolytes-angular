import {Component, OnInit} from '@angular/core';
import {CultureModel} from '../../../models/localization/culture.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  hidden: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.hidden = true;
  }

  onTcClicked() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'tc']);
  }

  setHidden() {
    this.hidden = !this.hidden;
  }
}
