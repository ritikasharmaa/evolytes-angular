import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ChangeLangCountryService} from '../change-lang-country/change-lang-country.service';
import {UserModel} from '../../../models/authentication/user.model';
import {CountryModel} from '../../../models/localization/country.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  cultureFlag: string;

  gbInstagram = 'https://www.instagram.com/evolytes_uk/?hl=fr';
  frInstagram = 'https://www.instagram.com/evolytesfr/?hl=fr';
  iceInstagram = 'https://www.instagram.com/evolytesisland/?hl=fr';

  gbFacebook = 'https://www.facebook.com/evolytesUK';
  frFacebook = 'https://www.facebook.com/evolytesfr';
  iceFacebook = 'https://www.facebook.com/evolytesisland/';

  appStoreUs = 'https://apps.apple.com/us/app/evolytes/id1469773602';
  appStoreFr = 'https://apps.apple.com/fr/app/evolytes/id1469773602';

  youtube = 'https://www.youtube.com/channel/UC0Y5ZwrEk0-Dwtl2FJXqMqQ';

  linkedin = 'https://www.linkedin.com/company/evolytes/';

  @Output() countryChanged = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tSv: TranslateService,
              private changeLangCountrySv: ChangeLangCountryService) {
  }

  ngOnInit() {

    this.cultureFlag = 'iceland.svg';
    const culture = CultureModel.getHomepageCulture();

    switch (culture) {
      case (CultureModel.enGB):
        this.cultureFlag = 'uk.svg';
        break;
      case (CultureModel.enUS):
        this.cultureFlag = 'usa.svg';
        break;
      case (CultureModel.frFR):
        this.cultureFlag = 'france.svg';
        break;
      case (CultureModel.isIS):
        this.cultureFlag = 'iceland.svg';
        break;
      case (CultureModel.ptBR):
        this.cultureFlag = 'brazil.svg';
        break;
      default:
        this.cultureFlag = 'iceland.svg';
        break;
    }
  }

  onEvolytesClick() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
  }

  onGameClick() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'game']);
  }

  onReasearchClick() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'research']);
  }

  onSchoolsClicked() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'schools']);
  }


  onAboutUsClick() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'aboutUs']);
  }

  getCountryString(): string {

    if (UserModel.getCurrent() && UserModel.getCurrent().country) {

      return CountryModel.title(UserModel.getCurrent().country);
    }

    return CountryModel.title(CountryModel.getHomepageCountry());
  }

  getCountryFlagImage(): string {

    return CountryModel.iconURL(CountryModel.getHomepageCountry());
  }

  getCultureString(): string {

    return CultureModel.title(CultureModel.getHomepageCulture());
  }


  onCultureClick() {
    this.changeLangCountrySv.showLangCountrySelection().subscribe(payload => {

      if (payload.country) {
        const isSuccessful = CountryModel.setHomepageCountry(payload.country);
        if (isSuccessful && this.countryChanged) {
          this.countryChanged.emit(payload.country);
        }
      }

      if (payload.culture) {

        const pastCulture = CultureModel.getHomepageCulture();
        const isSuccessful = CultureModel.setHomepageCulture(payload.culture);
        const newSplitUrl = this.router.url.split('/');

        for (let i = 0; i < newSplitUrl.length; i++) {
          const url = newSplitUrl[i];
          if (url === pastCulture) {
            newSplitUrl[i] = payload.culture;
          }
        }

        let newUrl = '';
        for (const string of newSplitUrl) {
          if (string !== '') {
            newUrl += string;
            newUrl += '/';
          }
        }

        if (isSuccessful) {
          this.tSv.use(payload.culture);
          this.router.navigate([newUrl]).then(() => {
            this.countryChanged.emit();
          });
        }
      }

    });
  }

  onFaqClicked() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'faq']);
  }

  isUserLoggedIn(): boolean {
    return !!UserModel.getCurrent();
  }

  onContactUsClick() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs']);
  }

  goToTerms() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'tc']);
  }

  goToPolicy() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'privacy']);
  }

  goToInstagram() {
    switch (CultureModel.getHomepageCulture()) {
      case 'fr-FR' : return window.open(this.frInstagram);
      case 'is-IS' : return window.open(this.iceInstagram);
      default : return window.open(this.gbInstagram);
    }
  }

  goToFacebook() {
    switch (CultureModel.getHomepageCulture()) {
      case 'fr-FR' : return window.open(this.frFacebook);
      case 'is-IS' : return window.open(this.iceFacebook);
      default : return window.open(this.gbFacebook);
    }
  }

  goToLinkedin() {
    window.open(this.linkedin);
  }

  goToYoutube() {
    window.open(this.youtube);
  }

  goToAppStore() {
    switch (CultureModel.getHomepageCulture()) {
      case 'fr-FR' : return window.open(this.appStoreFr);
      default : return window.open(this.gbInstagram);
    }
  }
}
