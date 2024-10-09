import {Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import Player from '@vimeo/player';
import {NavigationEnd, Router} from '@angular/router';
import {CultureModel} from '../../../../models/localization/culture.model';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import {CountryModel} from '../../../../models/localization/country.model';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, AfterViewInit {

  urlVimeo: SafeResourceUrl;

  gifIntegrationTab: { title: string, description: string }[] = [
    {
      title: 'lp2.features.monitor.overview.explanations.title1',
      description: 'lp2.features.monitor.overview.explanations.subtitle1'
    },
    {
      title: 'lp2.features.monitor.overview.explanations.title2',
      description: 'lp2.features.monitor.overview.explanations.subtitle2'
    },
    {
      title: 'lp2.features.monitor.overview.explanations.title3',
      description: 'lp2.features.monitor.overview.explanations.subtitle3'
    },
    {
      title: 'lp2.features.monitor.overview.explanations.title4',
      description: 'lp2.features.monitor.overview.explanations.subtitle4'
    }
  ];

  gifStep = 0;
  gif: HTMLElement;
  playerGif: Player;

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
      image : '../../../../assets/newWebsite/BookProgress.png',
      title: 'lp2.features.monitor.features.explanation.title',
      translatedImages: {
        'en-GB': './assets/newWebsite/monitor/dashboardTop-enGB.jpg',
        'en-US': './assets/newWebsite/monitor/dashboardTop-enGB.jpg',
        'is-IS': './assets/newWebsite/monitor/dashboardTop-isIS.jpg',
        'fr-FR': './assets/newWebsite/monitor/dashboardTop-frFR.jpg'
      },
      description: [
        'lp2.features.monitor.features.explanation.subtitle1', 'lp2.features.monitor.features.explanation.subtitle2'
      ],
      benef: [{
        icon: '../../../../assets/icons/EyeGreen.svg',
        text: 'lp2.features.monitor.features.explanation.progress'
      }, {
        icon: '../../../../assets/icons/DashboardOrange.svg',
        text: 'lp2.features.monitor.features.explanation.realTime'
      }],
      band: null
    },
    {
      image : '../../../../assets/newWebsite/SkillEvolution.png',
      title: 'lp2.features.monitor.skills.title',
      translatedImages: {
        'en-GB': './assets/newWebsite/monitor/dashboardBottom-enGB.jpg',
        'en-US': './assets/newWebsite/monitor/dashboardBottom-enGB.jpg',
        'is-IS': './assets/newWebsite/monitor/dashboardBottom-isIS.jpg',
        'fr-FR': './assets/newWebsite/monitor/dashboardBottom-frFR.jpg'
      },
      description: [
        'lp2.features.monitor.skills.subtitle'
      ],
      benef: [{
        icon: '../../../../assets/icons/monitor.svg',
        text: 'lp2.features.monitor.skills.acquisiton'
      }, {
        icon: '../../../../assets/icons/individualized.svg',
        text: 'lp2.features.monitor.skills.analytics'
      }],
      band: null
    },
    {
      image : '../../../../assets/newWebsite/BookProgress.png',
      title: 'lp2.features.monitor.book.title',
      translatedImages: {
        'en-GB': './assets/newWebsite/monitor/dashboardTop-enGB.jpg',
        'en-US': './assets/newWebsite/monitor/dashboardTop-enGB.jpg',
        'is-IS': './assets/newWebsite/monitor/dashboardTop-isIS.jpg',
        'fr-FR': './assets/newWebsite/monitor/dashboardTop-frFR.jpg'
      },
      description: [
        'lp2.features.monitor.book.subtitle1',
        'lp2.features.monitor.book.subtitle2'
      ],
      benef: [{
        icon: '../../../../assets/icons/book.svg',
        text: 'lp2.features.monitor.book.bookProgress'
      }, {
        icon: '../../../../assets/icons/DangerRed.svg',
        text: 'lp2.features.monitor.book.problem'
      }],
      band: null
    },
    {
      image : '../../../../assets/newWebsite/AnswerFiltering.png',
      title: 'lp2.features.monitor.answers.title',
      translatedImages: {
        'en-GB': './assets/newWebsite/monitor/answers-enGB.jpg',
        'en-US': './assets/newWebsite/monitor/answers-enGB.jpg',
        'is-IS': './assets/newWebsite/monitor/answers-isIS.jpg',
        'fr-FR': './assets/newWebsite/monitor/answers-frFR.jpg'
      },
      description: [
        'lp2.features.monitor.answers.subtitle'
      ],
      benef: [{
        icon: '../../../../assets/icons/AnswersPurple.svg',
        text: 'lp2.features.monitor.answers.answerIcon'
      }, {
        icon: '../../../../assets/icons/FilterGreen.svg',
        text: 'lp2.features.monitor.answers.filtering'
      }],
      band: null
    }];


  constructor(private router: Router,
              private titleSv: Title,
              public sanitizer: DomSanitizer) {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleSv.setTitle('Rauntíma upplýsingar námsframvindu í stærðfræði');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleSv.setTitle('Real-time maths progress overview');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleSv.setTitle('Aperçu en temps réel des progrès en mathématiques');
    }

  }


  ngOnInit() {

    this.loadVideoUrls();

  }

  ngAfterViewInit() {

    // Logic to reload the videos
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        this.loadVideoUrls();
      }

    });

    this.gif = document.getElementById('needTimerGif');

    this.playerGif = new Player(this.gif);

    this.playerGif.on('timeupdate', ({seconds}) => {
      this.timerGif(seconds);
    });

    const content = document.querySelector('.content');

    content.addEventListener('scroll', () => {
      this.dealWithGif();
    }, {
      passive: true
    });

  }

  loadVideoUrls() {
    this.urlVimeo = this.sanitizer.bypassSecurityTrustResourceUrl(this.getGifURL());
  }

  /*
    dealWithVideoMonitor() {
      if (this.isInViewport(this.videoMonitor)) {
        this.playerVideoMonitor.play().then().catch(() => console.log('error playing video monitor'));
      } else {
        this.playerVideoMonitor.pause().then().catch(() => console.log('error pause video monitor'));
      }
    }
  */

  timerGif(seconds) {
    if (seconds < 4) {
      this.gifStep = 0;
    } else if (seconds < 12) {
      this.gifStep = 1;
    } else if (seconds < 21) {
      this.gifStep = 2;
    } else {
      this.gifStep = 3;
    }
  }

  dealWithGif() {
    if (this.isInViewport(this.gif)) {
      this.playerGif.getPaused().then((paused) => {
        if (paused === true) {
          this.playerGif.play();
        }
      });
    } else {
      this.playerGif.getPaused().then((paused) => {
        if (paused === false) {
          this.playerGif.pause();
        }
      });
    }
  }

  isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  getStartPrice(): string {

    return CountryModel.priceStartingAt(CountryModel.getHomepageCountry());
  }

  getGifURL() {

    const culture = CultureModel.getHomepageCulture();
    let id = '';

    switch (culture) {

      case CultureModel.enGB:
      case CultureModel.enUS:

        id = '586369944';
        break;

      case CultureModel.frFR:

        id = '585895762';
        break;

      case CultureModel.isIS:

        id = '585308111';
        break;

      default: // english
        id = '586369944';
        break;
    }

    console.log('id is: ' + id);

    return 'https://player.vimeo.com/video/' + id + '?badge=0&amp;muted=1&loop=1&autopause=0&amp;player_id=0&amp;app_id=58479';
  }

  goToBooks() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'books']);
  }

  goToGame() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'game']);
  }

  goToSignup() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup']);
  }

}
