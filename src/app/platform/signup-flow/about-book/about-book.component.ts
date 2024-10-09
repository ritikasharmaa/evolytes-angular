import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GaService} from '../../../services/ga.service';
import {UserModel} from '../../../models/authentication/user.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-about-book',
  templateUrl: './about-book.component.html',
  styleUrls: ['./about-book.component.css']
})
export class AboutBookComponent implements OnInit {

  constructor(private router: Router,
              private tSv: TranslateService,
              private ga: GaService) { }

  ngOnInit() {

    if (UserModel.getCurrent()) {
      if (this.tSv.currentLang !== UserModel.getCurrent().culture) {
        this.tSv.use(UserModel.getCurrent().culture);
      }
    }

  }

  onNextClicked() {
    this.ga.logEvent('book_intro_next_clicked', GaService.Categories.onboarding)
    this.router.navigate(['platform', 'dash']);
  }

}
