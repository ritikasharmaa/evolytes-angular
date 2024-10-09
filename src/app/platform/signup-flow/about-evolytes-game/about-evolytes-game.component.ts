import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GaService} from '../../../services/ga.service';
import {TranslateService} from '@ngx-translate/core';
import {UserModel} from '../../../models/authentication/user.model';
import {CultureModel} from '../../../models/localization/culture.model';

@Component({
  selector: 'app-about-evolytes-game',
  templateUrl: './about-evolytes-game.component.html',
  styleUrls: ['./about-evolytes-game.component.css']
})
export class AboutEvolytesGameComponent implements OnInit {

  // The subscription length 1M, 3M, 6M or 12M which are passed as query parameters
  subscription: string;
  CultureModel = CultureModel;
  UserModel = UserModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tSv: TranslateService,
              private ga: GaService) { }

  ngOnInit() {

    if (UserModel.getCurrent()) {
      if (this.tSv.currentLang !== UserModel.getCurrent().culture) {
        this.tSv.use(UserModel.getCurrent().culture);
      }
    }

    this.route.queryParams.subscribe((params) => {
      this.subscription = params.subscription;
    });

  }

  onNextClicked() {
    this.ga.logEvent('game_intro_next_clicked', GaService.Categories.onboarding);
    this.router.navigate(['monitorintro'], { queryParams: { subscription: this.subscription } });
  }

}
