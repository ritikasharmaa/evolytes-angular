import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MobileMenuService } from '../mobile-menu.service';

@Component({
  selector: 'app-admin-mobile-menu',
  templateUrl: './admin-mobile-menu.component.html',
  styleUrls: ['./admin-mobile-menu.component.css']
})
export class AdminMobileMenuComponent implements OnInit {

  constructor(public mobileSv: MobileMenuService, private router: Router) { }

  ngOnInit() {
  }

  onShowUserViewClicked() {

    this.router.navigate(['platform', 'dash']);

  }

  onLinkClicked() {
    this.mobileSv.isVisible = false;
  }

}
