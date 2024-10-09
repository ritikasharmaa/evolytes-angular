import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export interface IVideo {
  urlId: string;
  videoTitle: string;
  videoDescription: string;
}

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  @Input() videoNumber = 0;
  @Input() video: IVideo;
  @Input() urlId = '479310723';
  @Input() videoTitle = 'Undefined title';
  @Input() videoDescription = 'Undefined description';

  url: SafeResourceUrl;
  freezeUrl: SafeResourceUrl;
  showVideoModal = false;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.freezeUrl = this.getEvolytesUniverseVideoSafeURL(this.getFreezeVideoUrl());
    this.url = this.getEvolytesUniverseVideoSafeURL(this.getNormalVideoUrl());
  }

  getEvolytesUniverseVideoSafeURL(fct: any): SafeResourceUrl {
    // tslint:disable-next-line:max-line-length
    return this.sanitizer.bypassSecurityTrustResourceUrl(fct);
  }

  getFreezeVideoUrl() {
    return 'https://player.vimeo.com/video/' + this.urlId + '?autoplay=0&api=1&background=1&mute=0;app_id=58479';
  }

  getNormalVideoUrl() {
    // tslint:disable-next-line:max-line-length
    return 'https://player.vimeo.com/video/' + this.urlId + '?badge=0&autoplay=1&&amp;loop=1&autopause=0&amp;app_id=58479';
  }

  openVideo() {
    this.showVideoModal = true;
  }

  closeVideoModal() {
    this.showVideoModal = false;
  }
}
