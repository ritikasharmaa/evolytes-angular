import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CultureModel} from '../../../models/localization/culture.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  hidden: boolean;

  tabTeam: { profil: string, name: string, job: string }[] = [
    {
      profil: 'MathieuPortrait.png',
      name: 'Mathieu Grettir Skúlason',
      job: 'ceo',
    },
    {
      profil: 'IrisPortrait.png',
      name: 'Íris Eva Gísladóttir',
      job: 'cmo',
    },
    {
      profil: 'NellPortrait.png',
      name: 'Nell Fallcard',
      job: 'design',
    },
    {
      profil: 'GudbjorgPortrait.png',
      name: 'Guðbjörg Aðalsteinsdóttir',
      job: 'pedagogy',
    },
    {
      profil: 'SiggiPortrait.png',
      name: 'Sigurður Gunnar Magnússson',
      job: 'game',
    },
    {
      profil: 'AriellePortrait.png',
      name: 'Arielle Mabilat',
      job: 'cfo',
    },
    {
      profil: 'AdrienPortrait.png',
      name: 'Adrien Eiríkur Skúlason',
      job: 'sales',
    }
  ];

  tabText: { year: number, title: string, descr: string }[] = [
    {
      year: 2014,
      title: 'lp2.aboutUs.ourStory.y2014.title',
      descr: 'lp2.aboutUs.ourStory.y2014.description'
    },
    {
      year: 2016,
      title: 'lp2.aboutUs.ourStory.y2016.title',
      descr: 'lp2.aboutUs.ourStory.y2016.description'
    },
    {
      year: 2017,
      title: 'lp2.aboutUs.ourStory.y2017.title',
      descr: 'lp2.aboutUs.ourStory.y2017.description'
    },
    {
      year: 2017,
      title: 'lp2.aboutUs.ourStory.y2017bis.title',
      descr: 'lp2.aboutUs.ourStory.y2017bis.description'
    },
    {
      year: 2018,
      title: 'lp2.aboutUs.ourStory.y2018.title',
      descr: 'lp2.aboutUs.ourStory.y2018.description'
    },
    {
      year: 2020,
      title: 'lp2.aboutUs.ourStory.y2020.title',
      descr: 'lp2.aboutUs.ourStory.y2020.description'
    },
    {
      year: 2021,
      title: 'lp2.aboutUs.ourStory.y2021.title',
      descr: 'lp2.aboutUs.ourStory.y2021.description'
    }
  ];

  constructor(private titleSv: Title) {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleSv.setTitle('Breytum því hvernig börn læra stærðfræði | Um okkur');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleSv.setTitle('Changing the way children learn math | About us');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleSv.setTitle('Changer la façon dont les enfants apprennent les mathématiques | A propos de nous');
    }

  }

  ngOnInit() {
    this.hidden = true;
  }

  setHidden() {
    this.hidden = !this.hidden;
  }

  colorIndex(i: number) {
    switch (i % 6) {
      case (0): return '#009CCC';
      case (1): return '#FFCB05';
      case (2): return '#1e7e34';
      case (3): return '#D0021B';
      case (4): return '#9B59B6';
      case (5): return '#F26522';
    }
  }

  sideIndex(i: number) {
    switch (i % 2) {
      case (0): return 'start center';
      case (1): return 'end center';
    }
  }
}
