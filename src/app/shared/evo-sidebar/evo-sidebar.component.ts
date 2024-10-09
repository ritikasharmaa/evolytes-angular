import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudentModel} from '../../models/authentication/student.model';
import {UserModel} from '../../models/authentication/user.model';
import {TokenModel} from '../../models/authentication/token.model';
import {AuthService} from '../../services/auth.service';
import {GaService} from '../../services/ga.service';
import {CultureModel} from '../../models/localization/culture.model';
import {SchoolModel} from '../../models/school/school.model';

@Component({
  selector: 'app-evo-sidebar',
  templateUrl: './evo-sidebar.component.html',
  styleUrls: ['./evo-sidebar.component.css']
})
export class EvoSidebarComponent implements OnInit {

  constructor(private router: Router,
              private authSv: AuthService,
              private ga: GaService) { }

  ngOnInit() {
  }

  onDashboardClicked() {
    this.ga.logEvent('dashboard_clicked', GaService.Categories.platform_engagement);
    this.router.navigate(['platform', 'dash']);
  }


  onBooksClicked() {
    this.ga.logEvent('books_clicked', GaService.Categories.platform_engagement);
    this.router.navigate(['platform', 'books']);
  }

  onAnswersClicked() {
    this.ga.logEvent('answers_clicked', GaService.Categories.platform_engagement);
    this.router.navigate(['platform', 'answers']);
  }

  onHelpClicked() {
    this.ga.logEvent('answers_clicked', GaService.Categories.platform_engagement);
    this.router.navigate(['platform', 'videos']);
  }

  onSettingsClicked() {
    this.ga.logEvent('settings_clicked', GaService.Categories.platform_engagement);
    this.router.navigate(['platform', 'settings', 'account']);
  }

  onLogoutClicked() {

    this.ga.logEvent('signout_clicked', GaService.Categories.platform_engagement);

    // Send a signout request.
    this.authSv.signOut().subscribe();
    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
    } else {
      this.router.navigate(['home', CultureModel.enGB, 'landing']);
    }

    UserModel.setCurrent( null );
    StudentModel.setCurrent( null );
    SchoolModel.setCurrent( null );
    TokenModel.setCurrent( null );

  }

}
