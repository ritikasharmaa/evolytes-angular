import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CultureModel} from '../../../../models/localization/culture.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  selected: Element = document.getElementsByClassName('selected')[0];
  prev: Element = document.getElementsByClassName('prev')[0];
  next: Element = document.getElementsByClassName('next')[0];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.selected = document.getElementsByClassName('selected')[0];
    this.prev = document.getElementsByClassName('prev')[0];
    this.next = document.getElementsByClassName('next')[0];
  }

  monitorCultureCasedImgUrl(): string {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {

      return './assets/newWebsite/monitor/dashboardTop-isIS.jpg';
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {

      return './assets/newWebsite/monitor/dashboardTop-frFR.jpg';
    }

    return './assets/newWebsite/monitor/dashboardTop-enGB.jpg';
  }

  bookCultureBasedImgUrl(): string {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {

      return './assets/books/spreads/bookOne/isIS/Chapter1.png';
    }

    return './assets/books/spreads/bookOne/enGB/Chapter1.png';
  }

  moveTo(el: MouseEvent) {

    // @ts-ignore
    if (el.composedPath()[2]['className'] === 'next') {
      this.moveToRight();
    } else {
      // @ts-ignore
      if (el.composedPath()[2]['className'] === 'prev') {
        this.moveToLeft();
      }
    }
  }

  moveToRight() {

    this.selected.classList.remove('selected');
    this.next.classList.remove('next');
    this.prev.classList.remove('prev');

    this.selected.classList.add('prev');
    this.next.classList.add('selected');
    this.prev.classList.add('next');

    this.selected = document.getElementsByClassName('selected')[0];
    this.prev = document.getElementsByClassName('prev')[0];
    this.next = document.getElementsByClassName('next')[0];

  }

  moveToLeft() {

    this.selected.classList.remove('selected');
    this.next.classList.remove('next');
    this.prev.classList.remove('prev');

    this.selected.classList.add('next');
    this.next.classList.add('prev');
    this.prev.classList.add('selected');

    this.selected = document.getElementsByClassName('selected')[0];
    this.prev = document.getElementsByClassName('prev')[0];
    this.next = document.getElementsByClassName('next')[0];

  }

}
