import {AfterViewInit, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CountryModel} from '../../../../models/localization/country.model';
import {CultureModel} from '../../../../models/localization/culture.model';
import {BookModel} from '../../../../models/book.model';
import {BookService} from '../../../../services/book.service';
import Player from '@vimeo/player';
import {BookVersionModel} from '../../../../models/book-version.model';
import {NavigationEnd, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit {

  videoStep = 0;

  books: BookModel[];
  errorMessage: string;
  box: Element;
  player: Player;

  urlVimeo: SafeResourceUrl;

  presentationTab: { title: string, description: string }[] = [
    {
      title: 'lp2.features.books.skills',
      description: 'lp2.features.books.skillsSubtitle'
    },
    {
      title: 'lp2.features.books.integration',
      description: 'lp2.features.books.integrationSubtitle'
    },
    {
      title: 'lp2.features.books.rewards',
      description: 'lp2.features.books.rewardsSubtitle'
    }
  ];

  gameIntegrationTab: { title: string, description: string }[] = [
    {
      title: 'lp2.features.books.integrationGame.step1',
      description: 'lp2.features.books.integrationGame.step1Description'
    },
    {
      title: 'lp2.features.books.integrationGame.step2',
      description: 'lp2.features.books.integrationGame.step2Description'
    },
    {
      title: 'lp2.features.books.integrationGame.step3',
      description: 'lp2.features.books.integrationGame.step3Description'
    },
    {
      title: 'lp2.features.books.integrationGame.step4',
      description: 'lp2.features.books.integrationGame.step4Description'
    }
  ];

  featureTab:
    {
      image: string,
      translatedImages: object,
      title: string,
      description: string[],
      benef: { icon: string, text: string }[],
      band: { icon: string, title: string, subtitle: string }
    }[] = [
    {
      image: '../../../../assets/newWebsite/insideBook/BookPurple.png',
      translatedImages: {
        'en-GB': './assets/books/spreads/bookOne/enGB/Chapter1.png',
        'is-IS': './assets/books/spreads/bookOne/isIS/Chapter1.png',
        'sv-SE': './assets/books/spreads/bookOne/svSE/Chapter1.png'
      },
      title: 'lp2.features.books.features.feature1.title',
      description: [
        'lp2.features.books.features.feature1.description1', 'lp2.features.books.features.feature1.description2'
      ],
      benef: [{
        icon: '../../../../assets/icons/SchoolPositiveFeelingsBlue.png',
        text: 'lp2.features.books.features.feature1.benef1'
      }, {
        icon: '../../../../assets/icons/SchoolFunAndEngagingYellow.svg',
        text: 'lp2.features.books.features.feature1.benef2'
      }],
      band: null
    },
    {
      image: '../../../../assets/newWebsite/insideBook/BookGreen.png',
      translatedImages: {
        'en-GB': './assets/books/spreads/bookTwo/enGB/Chapter6.png',
        'is-IS': './assets/books/spreads/bookTwo/isIS/Chapter6.png',
        'sv-SE': './assets/books/spreads/bookOne/svSE/Chapter6.png'
      },
      title: 'lp2.features.books.features.feature2.title',
      description: [
        'lp2.features.books.features.feature2.description1', 'lp2.features.books.features.feature2.description2'
      ],
      benef: [{
        icon: '../../../../assets/icons/SchoolWritingSkillsRed.svg',
        text: 'lp2.features.books.features.feature2.benef1'
      }, {
        icon: '../../../../assets/icons/SchoolReadingSkillsGreen.svg',
        text: 'lp2.features.books.features.feature2.benef2'
      }],
      band: null
    },
    {
      image: '../../../../assets/newWebsite/insideBook/BookBlue.png',
      translatedImages: {
        'en-GB': './assets/books/spreads/bookOne/enGB/Chapter7.2.png',
        'is-IS': './assets/books/spreads/bookOne/isIS/Chapter7.2.png',
        'sv-SE': './assets/books/spreads/bookOne/svSE/Chapter7.2.png'
      },
      title: 'lp2.features.books.features.feature3.title',
      description: [
        'lp2.features.books.features.feature3.description1', 'lp2.features.books.features.feature3.description2'
      ],
      benef: [{
        icon: '../../../../assets/icons/game.svg',
        text: 'lp2.features.books.features.feature3.benef1'
      }, {
        icon: '../../../../assets/icons/RewardsOrange.svg',
        text: 'lp2.features.books.features.feature3.benef2'
      }],
      band: null
    }];

  constructor(private bookSrv: BookService,
              private titleSv: Title,
              private router: Router,
              public sanitizer: DomSanitizer) {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleSv.setTitle('Evolytes bækurnar kenna stærðfræði á nýjan hátt');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleSv.setTitle('The Evolytes books teach maths in a unique way');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleSv.setTitle('Les livres Evolytes enseignent les mathématiques d\'une manière unique');
    }

  }

  ngOnInit() {

    this.loadVideoUrls();

    this.bookSrv.fetchPublicBooks(CountryModel.getHomepageCountry()).subscribe(res => {

      const list = [];
      for (const book of res) {
        if (book.isPublished === true) {
          list.push(book);
        }
      }

      this.books = list;

    }, () => {
      this.errorMessage = 'lp2.features.books.features.errorFetchBook';
    });

  }

  ngAfterViewInit() {

    // Logic to reload the videos
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        this.loadVideoUrls();
      }

    });

    this.box = document.querySelector('.box');
    const content = document.querySelector('.content');

    const iframeComputer = document.getElementById('needTimer');
    this.player = new Player(iframeComputer);

    this.player.on('timeupdate', ({seconds}) => {
      this.timer(seconds);
    });

    content.addEventListener('scroll', () => {
      this.dealWithGif();
    }, {
      passive: true
    });
    this.dealWithGif();
  }

  loadVideoUrls() {
    this.urlVimeo = this.sanitizer.bypassSecurityTrustResourceUrl(this.getGifURL());
  }

  cultureDescription(description: any): string {
    return description[CultureModel.getHomepageCulture()];
  }

  getVersionGradeString(book: BookModel) {

    const version = this.getVersion(book);

    if (!version.grade) {
      version.grade = 1;
    }

    if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      if (version.grade === 1) {
        return version.grade.toString(10) + 'st';
      } else if (version.grade === 2) {
        return version.grade.toString(10) + 'nd';
      } else if (version.grade === 3) {
        return version.grade.toString(10) + 'rd';
      } else if (version.grade > 3) {
        return version.grade.toString(10) + 'th';
      }
    }


    return version.grade + '.';

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

        id = '664210571';
        break;

      case CultureModel.frFR:

        id = '724569367';
        break;

      case CultureModel.isIS:

        id = '584876988';
        break;

      default: // english
        id = '664210571';
        break;
    }

    return 'https://player.vimeo.com/video/' + id + '?badge=0&amp;muted=1&loop=1&autopause=0&amp;player_id=0&amp;app_id=58479';

  }


  timer(seconds) {
    if (seconds < 7) {
      this.videoStep = 0;
    } else if (seconds < 17) {
      this.videoStep = 1;
    } else if (seconds < 27) {
      this.videoStep = 2;
    } else {
      this.videoStep = 3;
    }
  }

  dealWithGif() {

    if (this.isInViewport(this.box)) {
      this.player.play();
    } else {
      this.player.pause();
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


  getVersion(book: BookModel): BookVersionModel {
    let maxVersion = book.versions[0];
    for (let i = 0; i < book.versions.length; i++) {
      if (maxVersion.editionNumber < book.versions[i].editionNumber) {
        maxVersion = book.versions[i];
      }
    }
    return maxVersion;
  }

  getCountryPicture(book: BookModel): string {

    switch (book.country) {
      case CountryModel.GBR :
        return 'uk.png';
      case CountryModel.FRA :
        return 'france.png';
      case CountryModel.ISL :
        return 'iceland.png';
      case CountryModel.USA :
        return 'usa.png';
      case CountryModel.BRA :
        return 'brazil.png';
      default :
        return 'iceland.png';
    }

  }

  goToGame() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'game']);
  }

  goToMonitor() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'monitor']);
  }

  goToSignup() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'signup']);
  }
}
