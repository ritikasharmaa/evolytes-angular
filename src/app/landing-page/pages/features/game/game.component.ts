import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import Player from '@vimeo/player';
import {NavigationEnd, Router} from '@angular/router';
import {CultureModel} from '../../../../models/localization/culture.model';
import {CountryModel} from '../../../../models/localization/country.model';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import {UserModel} from '../../../../models/authentication/user.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  CultureModel = CultureModel;

  gif1Step = 0;
  gif1: HTMLElement;
  playerGif1: Player;

  gif1IntegrationTab: { title: string, description: string }[] = [
    {
      title: 'lp2.features.game.math.explanations.title1',
      description: 'lp2.features.game.math.explanations.subtitle1'
    },
    {
      title: 'lp2.features.game.math.explanations.title2',
      description: 'lp2.features.game.math.explanations.subtitle2'
    },
    {
      title: 'lp2.features.game.math.explanations.title3',
      description: 'lp2.features.game.math.explanations.subtitle3'
    },
    {
      title: 'lp2.features.game.math.explanations.title4',
      description: 'lp2.features.game.math.explanations.subtitle4'
    }
  ];

  gif2Step = 0;
  gif2: HTMLElement;
  playerGif2: Player;

  gif2IntegrationTab: { title: string, description: string }[] = [
    {
      title: 'lp2.features.game.evolve.subtitle1',
      description: 'lp2.features.game.evolve.explanation1'
    },
    {
      title: 'lp2.features.game.evolve.subtitle2',
      description: 'lp2.features.game.evolve.explanation2'
    }
  ];

  videoIntro1: HTMLElement;
  playerVideoIntro1: Player;

  videoIntro2: HTMLElement;
  playerVideoIntro2: Player;

  videoStory: HTMLElement;
  playerVideoStory: Player;

  trailer: SafeResourceUrl;
  trailerUrl: string;
  makingMathFunGif: SafeResourceUrl;
  makingMathFunGifUrl: string;
  storyTrailer: SafeResourceUrl;
  storyTrailerUrl: string;

  constructor(private router: Router,
              private titleSv: Title,
              private sanitizer: DomSanitizer) {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleSv.setTitle('Evolytes násleikurinn gerir stærðfræði skemmtilega');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleSv.setTitle('The Evolytes game makes learning math fun and engaging');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleSv.setTitle('Le jeu Evolytes rend l\'apprentissage des mathématiques amusant et attrayant');
    }

  }

  ngOnInit() {

    this.loadVideoUrls();

  }

  ngAfterViewInit(): void {

    // Logic to reload the videos
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        this.loadVideoUrls();
      }

    });

    const content = document.querySelector('.content');

    content.addEventListener('scroll', () => {

      this.dealWithGif1();
      this.dealWithGif2();
      this.dealWithVideoIntro1();
      this.dealWithVideoIntro2();
      this.dealWithVideoStory();

    }, {
      passive: true
    });

    this.gif1 = document.getElementById('needTimerGif1');
    this.playerGif1 = new Player(this.gif1);

    this.playerGif1.on('timeupdate', ({seconds}) => {
      this.timerGif1(seconds);
    });

    this.gif2 = document.getElementById('needTimerGif2');
    this.playerGif2 = new Player(this.gif2);

    this.playerGif2.on('timeupdate', ({seconds}) => {
      this.timerGif2(seconds);
    });

    this.videoIntro1 = document.getElementById('needTimerVideoIntro1');
    this.playerVideoIntro1 = new Player(this.videoIntro1);

    this.videoIntro2 = document.getElementById('needTimerVideoIntro2');
    this.playerVideoIntro2 = new Player(this.videoIntro2);

    this.videoStory = document.getElementById('needTimerVideoStory');
    this.playerVideoStory = new Player(this.videoStory);

  }

  private loadVideoUrls() {

    this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.getEvolytesTrailerURL());
    this.trailerUrl = this.getEvolytesTrailerURL();

    this.makingMathFunGif = this.sanitizer.bypassSecurityTrustResourceUrl(this.getMakingMathFunGif());
    this.makingMathFunGifUrl = this.getMakingMathFunGif();

    this.storyTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.getStoryTrailerUrl());
    this.storyTrailerUrl = this.getStoryTrailerUrl();

  }

  getStartPrice(): string {

    return CountryModel.priceStartingAt(CountryModel.getHomepageCountry());
  }

  private getEvolytesTrailerURL(): string {

    let id = '';
    switch (CultureModel.getHomepageCulture()) {

      case CultureModel.enUS:
      case CultureModel.enGB:

        id = '479590933';
        break;

      case CultureModel.frFR:

        id = '724466111';
        break;

      case CultureModel.isIS:
        id = '478259532';
        break;

      default:
        id = '479590933';
        break;

    }

    const url = 'https://player.vimeo.com/video/' + id + '?badge=0&amp;muted=1&loop=1&autopause=0&amp;player_id=0&amp;app_id=58479';

    return url;

  }

  getMakingMathFunGif(): string {

    const culture = CultureModel.getHomepageCulture();
    let id = '';

    switch (culture) {

      case CultureModel.enGB:
      case CultureModel.enUS:

        id = '584877040';
        break;

      case CultureModel.frFR:
        id = '724558915';
        break;

      case CultureModel.isIS:

        id = '664254556';
        break;

      default: // english
        id = '584877040';
        break;
    }

    return 'https://player.vimeo.com/video/' + id + '?badge=0&amp;muted=1&loop=1&autopause=0&amp;player_id=0&amp;app_id=58479';

  }

  getStoryTrailerUrl(): string {

    const culture = CultureModel.getHomepageCulture();
    let id = '';

    switch (culture) {

      case CultureModel.enGB:
      case CultureModel.enUS:

        id = '585328346';
        break;

      case CultureModel.frFR:
        id = '724530984';
        break;

      case CultureModel.isIS:

        id = '663760664';
        break;

      default: // english
        id = '585328346';
        break;
    }

    return 'https://player.vimeo.com/video/' + id + '?badge=0&amp;muted=1&loop=1&autopause=0&amp;player_id=0&amp;app_id=58479';

  }


  timerGif1(seconds) {
    if (seconds < 12) {
      this.gif1Step = 0;
    } else if (seconds < 21) {
      this.gif1Step = 1;
    } else if (seconds < 24) {
      this.gif1Step = 2;
    } else {
      this.gif1Step = 3;
    }
  }

  timerGif2(seconds) {
    if (seconds < 16.5) {
      this.gif2Step = 0;
    } else {
      this.gif2Step = 1;
    }
  }

  dealWithGif1() {

    this.playOrPauseVideo(this.gif1, this.playerGif1);

  }

  dealWithGif2() {

    this.playOrPauseVideo(this.gif2, this.playerGif2);

  }

  dealWithVideoIntro1() {

    this.playOrPauseVideo(this.videoIntro1, this.playerVideoIntro1);

  }

  dealWithVideoIntro2() {

    this.playOrPauseVideo(this.videoIntro2, this.playerVideoIntro2);

  }

  dealWithVideoStory() {

    this.playOrPauseVideo(this.videoStory, this.playerVideoStory);

  }

  playOrPauseVideo(viewport: Element, player: Player) {

    if (this.isInViewport(viewport) === true) {

      player.getPaused().then((paused) => {
        if (paused === true) {
          player.play();
        }
      });

    } else {

      player.getPaused().then((paused) => {
        if (paused === false) {
          player.pause();
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

  goToSignup() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup']);
  }

  goToResearch() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'research']);
  }

  goToBooks() {
    window.scrollTo(0, 0);
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'books', { replaceUrl: true, skipLocationChange: false }]);
  }

  goToMonitor() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'monitor']);
  }

}
