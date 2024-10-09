import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CultureModel} from '../../../models/localization/culture.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  index = 0;
  /**
   * values can be school
   * feature
   */
  @Input() type = 'school';

  constructor(private router: Router,
              private tSv: TranslateService) { }

  ngOnInit() {
  }

  getGeneralTitle(): string {

    if (this.type === 'feature') {
      return this.tSv.instant('lp2.landing.featureSection.title');
    }

    return this.tSv.instant('lp2.landing.schoolSection.title');
  }

  getGeneralSubtitle(): string {

    if (this.type === 'feature') {
      return this.tSv.instant('lp2.landing.featureSection.description');
    }

    return this.tSv.instant('lp2.landing.schoolSection.description');
  }

  increment() {
    if (this.index === this.getTestimonials().length - 1) {
      this.index = 0;
    } else {
      this.index = this.index + 1;
    }

  }

  decrement() {
    if (this.index === 0) {
      this.index = this.getTestimonials().length - 1;
    } else {
      this.index = this.index - 1;
    }
  }

  getColor(i: number) {
    if (i === this.index) {
      return '#ffffff';
    } else {
      return '#009CCC';
    }
  }

  getPosition(): string {

    if (this.index < this.getTestimonials().length) {
      return this.getTestimonials()[this.index].position;
    }

    return '';
  }

  getSchool(): string {

    if (this.index < this.getTestimonials().length) {
      return this.getTestimonials()[this.index].school;
    }

    return '';

  }

  getText(): string {

    if (this.index < this.getTestimonials().length) {
      return this.getTestimonials()[this.index].text;
    }

    return null;
  }

  getTestimonials(): { position: string, school: string, text: string }[] {

    const list = [];
    for (let i = 1; i < 3; i++) {

      const position = this.tSv.instant('lp2.landing.testimonials.' + i + '.position');
      const school = this.tSv.instant('lp2.landing.testimonials.' + i + '.school');
      const text = this.tSv.instant('lp2.landing.testimonials.' + i + '.text');

      if (position && school && text) {
        const testimonial = {
          position,
          school,
          text
        };
        list.push(testimonial);
      }

    }

    return list;
  }

  goToSchool() {

    this.router.navigate(['home', CultureModel.getHomepageCulture(), 'schools']);

  }

  goToContact(subject?: string) {
    if (subject) {
      const translatedSubject = this.tSv.instant(subject);
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs'], {queryParams: {subject: translatedSubject}});
    } else {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'contactUs']);
    }
  }

}
