import { Component, OnInit } from '@angular/core';
import {EvoListSelectorService} from './evo-list-selector.service';

@Component({
  selector: 'app-evo-list-selector',
  templateUrl: './evo-list-selector.component.html',
  styleUrls: ['./evo-list-selector.component.css']
})
export class EvoListSelectorComponent implements OnInit {

  item: string;

  constructor(public sv: EvoListSelectorService) {
  }

  ngOnInit() {
  }

  selectedItem(item: string) {

    if (this.item === item) {
      this.item = null;
    } else {
      this.item = item;
    }

  }

  isCurrentItem(item: string): boolean {

    if (this.item === item) {
      return true;
    }

    return false;
  }

  hasItem(): boolean {

    if (this.item) {

      return true;
    }

    return false;
  }

  onSelectClicked() {

    this.sv.selectedItem(this.item);
    this.item = null;

  }

  onCancelClicked() {

    this.sv.selectedItem(null);

  }

}


