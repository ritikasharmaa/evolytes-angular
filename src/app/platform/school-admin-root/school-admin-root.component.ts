import { Component, OnInit } from '@angular/core';
import {MobileMenuService} from '../../mobile/mobile-menu.service';

@Component({
  selector: 'app-school-school-root',
  templateUrl: './school-admin-root.component.html',
  styleUrls: ['./school-admin-root.component.css']
})
export class SchoolAdminRootComponent implements OnInit {

  constructor(public mobileMenuSv: MobileMenuService) { }

  ngOnInit() {
  }

}
