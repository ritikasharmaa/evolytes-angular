import {Component, Input, OnInit} from '@angular/core';
import {CultureModel} from '../../../../models/localization/culture.model';

@Component({
  selector: 'app-feature-tab',
  templateUrl: './feature-tab.component.html',
  styleUrls: ['./feature-tab.component.css']
})
export class FeatureTabComponent implements OnInit {

  @Input() featureTab:
    {
      image: string,
      translatedImages: {
        'en-US': string,
        'en-GB': string,
        'fr-FR': string,
        'is-IS': string,
        'pt-BR': string
      }
      title: string,
      description: string[],
      benef: { icon: string, text: string }[],
      band: { icon: string, title: string, subtitle: string }
    }[] = [];

  @Input() beginByWhite = 0;

  constructor() {
  }

  ngOnInit() {
  }

  getFeatureImage(feature: any) {

    if (feature.translatedImages) {
      if (feature.translatedImages[CultureModel.getHomepageCulture()]) {

        return feature.translatedImages[CultureModel.getHomepageCulture()];
      }
    }

    return feature.image;

  }

}
