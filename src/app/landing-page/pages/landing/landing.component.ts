import {AfterViewInit, Component, OnInit} from '@angular/core';
import Player from '@vimeo/player';
import {CultureModel} from '../../../models/localization/culture.model';
import {NavigationEnd, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import {CountryModel} from '../../../models/localization/country.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {

  theoriesTab: {title: string, description: string, icon: string}[] = [
    {
      title: 'lp2.landing.researchPart.theory.reinforcementTitle',
      description: 'lp2.landing.researchPart.theory.reinforcementDescription',
      icon: 'assets/newWebsite/ReinforcementIcon.svg'
    }, {
      title: 'lp2.landing.researchPart.theory.flowTitle',
      description: 'lp2.landing.researchPart.theory.flowDescription',
      icon: 'assets/newWebsite/FlowIcon.svg'
    }, {
      title: 'lp2.landing.researchPart.theory.spacingTitle',
      description: 'lp2.landing.researchPart.theory.spacingDescription',
      icon: 'assets/newWebsite/SpacingEffectIcon.svg'
    }
  ];

  CultureModel = CultureModel;

  hidden: boolean;
  videoStep = 'first';
  universeUrl: SafeResourceUrl;
  howItWorksUrl: SafeResourceUrl;

  message: string;

  universeComputerDiv: HTMLElement;
  playerUniverseComputer: Player;

  universeMobileDiv: HTMLElement;
  playerUniverseMobile: Player;

  hiwComputerDiv: HTMLElement;
  playerHiwComputer: Player;

  hiwMobileDiv: HTMLElement;
  playerHiwMobile: Player;

  constructor(private router: Router,
              private titleService: Title,
              public sanitizer: DomSanitizer) {
    this.hidden = true;

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleService.setTitle('Skemmtileg og árangursrík leið til að læra stærðfræði! | Evolytes');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleService.setTitle('Learn maths in a fun and engaging way! | Evolytes');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleService.setTitle('Apprenez les mathématiques de manière amusante et stimulante! | Evolytes');
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

    this.universeComputerDiv = document.getElementById('universeComputer');
    this.playerUniverseComputer = new Player(this.universeComputerDiv);

    this.universeMobileDiv = document.getElementById('universeMobile');
    this.playerUniverseMobile = new Player(this.universeMobileDiv);

    this.hiwComputerDiv = document.getElementById('needTimerComputer');
    this.playerHiwComputer = new Player(this.hiwComputerDiv);

    this.hiwMobileDiv = document.getElementById('needTimerMobile');
    this.playerHiwMobile = new Player(this.hiwMobileDiv);

    this.playerHiwComputer.on('timeupdate', ({seconds}) => {
      this.timer(seconds);
    });

    this.playerHiwMobile.on('timeupdate', ({seconds}) => {
      this.timer(seconds);
    });

    const content = document.querySelector('.landcontent');

    content.addEventListener('scroll', () => {

      if (window.innerWidth > 960 || document.documentElement.clientWidth > 960) {

        this.playUniverseComputerVideo();
        this.playHiwComputerVideo();


      } else {

        this.playUniverseMobileVideo();
        this.playHiwMobileVideo();

      }
    }, {
      passive: true
    });

  }

  loadVideoUrls() {
    this.universeUrl = this.getEvolytesUniverseVideoSafeURL();
    this.howItWorksUrl = this.getHowItWorksSafeURL();
  }

  playUniverseComputerVideo() {

    // universe video handling for computer
    if (this.isInViewport(this.universeComputerDiv) === true) {

      this.playerUniverseComputer.getPaused().then((paused) => {
        if (paused === true) {
          this.playerUniverseComputer.play();
        }
      });

      this.playerUniverseMobile.getPaused().then((paused) => {
        if (paused === false) {
          this.playerUniverseMobile.pause();
        }
      });

    } else {

      this.playerUniverseComputer.getPaused().then((paused) => {
        if (paused === false) {
          this.playerUniverseComputer.pause();
        }
      });

    }

  }

  playUniverseMobileVideo() {

    // Universe video handling for mobile
    if (this.isInViewport(this.universeMobileDiv) === true) {

      this.playerUniverseMobile.getPaused().then((paused) => {
        if (paused === true) {
          this.playerUniverseMobile.play();
        }
      });

      this.playerUniverseComputer.getPaused().then((paused) => {
        if (paused === false) {
          this.playerUniverseComputer.pause();
        }
      });

    } else {

      this.playerUniverseMobile.getPaused().then((paused) => {
        if (paused === false) {
          this.playerUniverseMobile.pause();
        }
      });

    }

  }

  playHiwComputerVideo() {

    // How it works video handling for computer
    if (this.isInViewport(this.hiwComputerDiv) === true) {

      this.playerHiwComputer.getPaused().then((paused) => {
        if (paused === true) {
          this.playerHiwComputer.play();
        }
      });

      this.playerHiwMobile.getPaused().then((paused) => {
        if (paused === false) {
          this.playerHiwMobile.pause();
        }
      });

    } else {

      this.playerHiwComputer.getPaused().then((paused) => {
        if (paused === false) {
          this.playerHiwComputer.pause();
        }
      });

    }

  }

  playHiwMobileVideo() {

    if (this.isInViewport(this.hiwMobileDiv) === true) {

      this.playerHiwMobile.getPaused().then((paused) => {
        if (paused === true) {
          this.playerHiwMobile.play();
        }
      });

      this.playerHiwComputer.getPaused().then((paused) => {
        if (paused === false) {
          this.playerHiwComputer.pause();
        }
      });

    } else {

      this.playerHiwMobile.getPaused().then((paused) => {
        if (paused === false) {
          this.playerHiwMobile.pause();
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

  timer(seconds) {
    if (seconds < 6) {
      this.videoStep = 'first';
    } else if (seconds < 11) {
      this.videoStep = 'second';
    } else if (seconds < 30) {
      this.videoStep = 'third';
    } else {
      this.videoStep = 'fourth';
    }
  }

  getEvolytesUniverseVideoSafeURL(): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getEvolytesUniverseVideoURL());
  }

  private getEvolytesUniverseVideoURL(): string {

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

  getHowItWorksSafeURL(): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getHowItWorksVideoURL());
  }

  getHowItWorksVideoURL(): string {

    let id = '';
    switch (CultureModel.getHomepageCulture()) {

      case CultureModel.enUS:
      case CultureModel.enGB:

        id = '664651914';
        break;

      case CultureModel.frFR:
        id = '724514707';
        break;

      case CultureModel.isIS:
      default:
        id = '584880863';
        break;

    }

    const url = 'https://player.vimeo.com/video/' + id + '?badge=0&amp;muted=1&loop=1&autopause=0&amp;player_id=0&amp;app_id=58479';

    return url;

  }

  getStartPrice(): string {
    return CountryModel.priceStartingAt(CountryModel.getHomepageCountry());
  }


  setHidden() {
    this.hidden = !this.hidden;
  }

  goToSignup() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup']);
  }

  goToSignin() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signin']);
  }

  goToFeature() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'game']);
  }

  goToResearch() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'research']);
  }
}
