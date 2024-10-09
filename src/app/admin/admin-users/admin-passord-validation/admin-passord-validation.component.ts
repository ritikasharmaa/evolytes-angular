import { Component, OnInit } from '@angular/core';
import {AdminPasswordValidationService} from './admin-password-validation.service';

@Component({
  selector: 'app-admin-passord-validation',
  templateUrl: './admin-passord-validation.component.html',
  styleUrls: ['./admin-passord-validation.component.css']
})
export class AdminPassordValidationComponent implements OnInit {

  constructor(public adminPasswordValidationSrv: AdminPasswordValidationService) { }

  ngOnInit() {
  }

}
