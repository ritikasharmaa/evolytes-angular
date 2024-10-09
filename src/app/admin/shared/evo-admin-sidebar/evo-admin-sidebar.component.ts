import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-evo-admin-sidebar',
  templateUrl: './evo-admin-sidebar.component.html',
  styleUrls: ['./evo-admin-sidebar.component.css']
})
export class EvoAdminSidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onShowUserViewClicked() {

    this.router.navigate(['platform', 'dash']);

  }

}
