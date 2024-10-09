import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsModalService {

  isVisible = false;

  constructor() { }

  onShow() {
    this.isVisible = true;
  }

  onHide() {
    this.isVisible = false;
  }

}
