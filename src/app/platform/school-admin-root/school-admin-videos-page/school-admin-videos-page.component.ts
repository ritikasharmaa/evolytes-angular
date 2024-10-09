import {Component, OnInit} from '@angular/core';
import {IVideo} from '../../../shared/video-detail/video-detail.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-school-school-videos-page',
  templateUrl: './school-admin-videos-page.component.html',
  styleUrls: ['./school-admin-videos-page.component.css']
})
export class SchoolAdminVideosPageComponent implements OnInit {

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
    this.tsv.get('adminVideos').subscribe((data) => {
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
