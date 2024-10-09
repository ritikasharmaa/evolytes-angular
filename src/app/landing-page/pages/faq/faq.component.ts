import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CultureModel} from "../../../models/localization/culture.model";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, AfterViewInit {
  hidden: boolean; // To adapt with the burger menu of the navbarre

  accordions = document.getElementsByClassName('accordion');

  data = [
    {
      question: 'lp2.faq.q1',
      answer: 'lp2.faq.a1',
    },
    {
      question: 'lp2.faq.q2',
      answer: 'lp2.faq.a2',
    },
    {
      question: 'lp2.faq.q3',
      answer: 'lp2.faq.a3',
    },
    {
      question: 'lp2.faq.q4',
      answer: 'lp2.faq.a4',
    },
    {
      question: 'lp2.faq.q5',
      answer: 'lp2.faq.a5',
    },
    {
      question: 'lp2.faq.q6',
      answer: 'lp2.faq.a6',
    },
    {
      question: 'lp2.faq.q7',
      answer: 'lp2.faq.a7',
    },
    {
      question: 'lp2.faq.q8',
      answer: 'lp2.faq.a8',
    },
    {
      question: 'lp2.faq.q9',
      answer: 'lp2.faq.a9',
    },
    {
      question: 'lp2.faq.q10',
      answer: 'lp2.faq.a10',
    },
    {
      question: 'lp2.faq.q11',
      answer: 'lp2.faq.a11'
    },
    {
      question: 'lp2.faq.q12',
      answer: 'lp2.faq.a12'
    }
  ];

  constructor(private router: Router,
              private titleService: Title) {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleService.setTitle('Finndu svör við algengum spurningum um Evolytes námskerfið');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleService.setTitle('Find answers to your questions about the Evolytes math platform');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleService.setTitle('Trouvez les réponses à vos questions sur la plateforme mathématique Evolytes');
    }

  }

  ngOnInit() {
    this.hidden = true;
  }

  ngAfterViewInit(): void {
    this.accordions = document.getElementsByClassName('accordion');
    for (let i = 0; i < this.accordions.length; i++) {
      this.accordions[i].addEventListener('click', function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle('active');

        /* Toggle between hiding and showing the active panel */
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  }

  setHidden() {
    this.hidden = !this.hidden;
  }


  goContactUs() {
    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs']);
  }
}
