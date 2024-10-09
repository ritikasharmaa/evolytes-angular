import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {UserModel} from './models/authentication/user.model';
import {CultureModel} from './models/localization/culture.model';
import {environment} from '../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'evolytes-platform';

  constructor(public router: Router,
              private authSv: AuthService,
              private tSv: TranslateService,
              private route: ActivatedRoute) {

    this.tSv.addLangs(CultureModel.list());

    if (UserModel.getCurrent()) {
      this.tSv.setDefaultLang(UserModel.getCurrent().culture);
    } else if (CultureModel.getHomepageCulture()) {
      this.tSv.setDefaultLang(CultureModel.getHomepageCulture());
    } else {
      this.tSv.setDefaultLang(CultureModel.enGB);
    }

    window['Chargebee'].init({
      site: environment.cbSite
    });
    /*
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-LDW7ZV8GM9', {
          'page_path': event.urlAfterRedirects
        });
      }
    });*/

  }

}

