import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CultureModel} from '../../../models/localization/culture.model';
import {Element} from '@angular/compiler';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit, AfterViewInit {

  hidden: boolean; // To adapt with the burger menu of the navbarre
  currentFeature: string;

  selectionDropdown: { key: string, value: any, iconURL: string }[] = [
    {
      key: 'game',
      value: 'lp2.footer.game',
      iconURL: './assets/land-images/battle-monster-ipad.png'
    },
    {
      key: 'books',
      value: 'lp2.features.books.titleMenu',
      iconURL: './assets/land-images/Books.png'
    },
    {
      key: 'monitor',
      value: 'lp2.landing.evolytesPart.monitorTitle',
      iconURL: './assets/land-images/MonitorAllDevices.png'
    }
  ];

  scrollingDiv: HTMLDivElement;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.hidden = true;
    this.currentFeature = 'game';
    if (this.router.url.includes('features/') === false) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'game']);
    }

    if (this.router.url.includes('features/books')) {
      this.currentFeature = 'books';
    } else if (this.router.url.includes('features/game')) {
      this.currentFeature = 'game';
    } else if (this.router.url.includes('features/monitor')) {
      this.currentFeature = 'monitor';
    }

    this.scrollingDiv = document.getElementById('scroller') as HTMLDivElement;

  }

  ngAfterViewInit() {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        if (this.router.url.includes('features/books')) {
          this.currentFeature = 'books';
        } else if (this.router.url.includes('features/game')) {
          this.currentFeature = 'game';
        } else if (this.router.url.includes('features/monitor')) {
          this.currentFeature = 'monitor';
        }

        this.scrollingDiv.scrollTop = 0;

      }

    });

  }

  setHidden() {
    this.hidden = !this.hidden;
  }

  setCurrentFeature(feature) {

    this.currentFeature = feature;

    switch (feature) {
      case 'game':
        this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'game']);
        break;

      case 'books':
        this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'books']);
        break;

      case 'monitor':
        this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'monitor']);
        break;

      default:
        this.router.navigate(['home', CultureModel.getHomepageCulture(), 'features', 'game']);
    }

  }

}
