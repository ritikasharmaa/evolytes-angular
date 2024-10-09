import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CultureModel} from '../../../models/localization/culture.model';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  hidden: boolean; // To adapt with the burger menu of the navbarre

  featureTab:
    {
      image: string,
      title: string,
      translatedImages: object,
      description: string[],
      benef: { icon: string, text: string }[],
      band: { icon: string, title: string, subtitle: string }
    }[] = [
    {
      image: '../../../assets/newWebsite/HomeChangeSectionMonitor.png',
      title: 'lp2.schools.engaging.individualizedTitle',
      translatedImages: {
        'en-GB': './assets/newWebsite/monitor/dashboardTop-enGB.jpg',
        'en-US': './assets/newWebsite/monitor/dashboardTop-enUS.jpg',
        'fr-FR': './assets/newWebsite/monitor/dashboardTop-frFR.jpg',
        'is-IS': './assets/newWebsite/monitor/dashboardTop-isIS.jpg'
      },
      description: [
        'lp2.schools.engaging.individualizedSubtitle1', 'lp2.schools.engaging.individualizedSubtitle2'
      ],
      benef: [{
        icon: './assets/icons/clock-fast-green-icon.svg',
        text: 'lp2.schools.engaging.savesTime'
      }, {
        icon: './assets/icons/individualized.svg',
        text: 'lp2.schools.engaging.LearningInsights'
      }],
      band: {
        icon: 'assets/newWebsite/monitor.svg',
        title: 'lp2.schools.engaging.dashboardTitle',
        subtitle: 'lp2.schools.engaging.dashboardSubtitle'
      }
    },
    {
      image: '../../../assets/newWebsite/SchoolGameAdventure.png',
      title: 'lp2.schools.keeping.title',
      translatedImages: {

      },
      description: [
        'lp2.schools.keeping.description1', 'lp2.schools.keeping.description2'
      ],
      benef: [{
        icon: './assets/icons/SchoolFunAndEngagingYellow.svg',
        text: 'lp2.schools.keeping.fun'
      }, {
        icon: './assets/icons/SchoolPositiveFeelingsBlue.png',
        text: 'lp2.schools.keeping.positiveFeeling'
      }],
      band: {
        icon: 'assets/map-green-icon.svg',
        title: 'lp2.schools.keeping.pictureTitle',
        subtitle: 'lp2.schools.keeping.pictureSubtitle'
      }
    },
    {
      image: '../../../assets/newWebsite/SchoolBookSection.png',
      title: 'lp2.schools.books.title',
      translatedImages: {
        'en-GB': './assets/books/spreads/bookOne/enGB/Chapter7.2.png',
        'is-IS': './assets/books/spreads/bookOne/isIS/Chapter7.2.png',
        'sv-SE': './assets/books/spreads/bookOne/svSE/Chapter7.2.png'
      },
      description: [
        'lp2.schools.books.description1', 'lp2.schools.books.description2'
      ],
      benef: [{
        icon: './assets/icons/SchoolWritingSkillsRed.svg',
        text: 'lp2.schools.books.writingSkills'
      }, {
        icon: './assets/icons/SchoolReadingSkillsGreen.svg',
        text: 'lp2.schools.books.readingSkills'
      }],
      band: {
        icon: 'assets/newWebsite/book.svg',
        title: 'lp2.schools.books.pictureTitle',
        subtitle: 'lp2.schools.books.pictureSubtitle'
      }
    }];


  constructor(private router: Router,
              private titleService: Title,
              private tSv: TranslateService) {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleService.setTitle('Lærðu hvernig Skólar nota Evolytes stærðfræði námskerfið');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleService.setTitle('Find out how schools use Evolytes math learning platform');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleService.setTitle('Découvrez comment les écoles utilisent la plateforme d\'apprentissage mathématique Evolytes');
    }

  }

  ngOnInit() {
    this.hidden = true;
  }

  setHidden() {
    this.hidden = !this.hidden;
  }

  getTranslatedBookImg() {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {

      return './assets/books/spreads/bookOne/isIS/Chapter1.png';
    }

    return './assets/books/spreads/bookOne/enGB/Chapter1.png';

  }

  getTranslatedMonitorImg() {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {

      return './assets/newWebsite/monitor/dashboardTop-isIS.jpg';
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {

      return './assets/newWebsite/monitor/dashboardTop-frFR.jpg';
    }

    return './assets/newWebsite/monitor/dashboardTop-enGB.jpg';

  }

  getTranslatedGameImg() {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {

      return './assets/newWebsite/game/GameQuestionView-isIS.jpg';
    }

    return './assets/newWebsite/game/GameQuestionView-enGB.jpg';

  }

  goToResearch() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'research']);
  }

  goToContact(subject?: string) {
    if (subject) {
      let translatedSubject;
      this.tSv.get(subject).subscribe((result) => {
        translatedSubject = result;
      });
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs'], {queryParams: {subject: translatedSubject}});
    } else {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs']);
    }
  }
}
