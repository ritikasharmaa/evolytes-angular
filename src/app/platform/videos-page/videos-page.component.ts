import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IVideo} from '../../shared/video-detail/video-detail.component';

@Component({
  selector: 'app-videos-page',
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.css']
})
export class VideosPageComponent implements OnInit {

  videoSections = {};
  categories:
    {
      name: string,
      title: string,
      iconLink: string,
      subCategories:
        {
          subCatTitle: string,
          videos: IVideo[]
        }[]
    }[] = [];
  video: IVideo;
  url: any;

  constructor(private tsv: TranslateService) {
  }

  ngOnInit() {
    this.tsv.get('platformVideos').subscribe((data) => {
      data.forEach((category) => {
        this.categories.push(category);
        this.videoSections[category.name] = false;
      });
    });
  }

  onSectionClick(section: string) {

    this.videoSections[section] = !this.videoSections[section];

  }

  imageType(section: string): string {

    if (this.videoSections[section]) {

      return './assets/icons/up-arrow.svg';
    }

    return './assets/icons/down-arrow.svg';
  }
}
