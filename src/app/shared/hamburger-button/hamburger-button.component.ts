import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.css']
})
export class HamburgerButtonComponent implements OnInit {

  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    if (this.clicked) {
      this.clicked.emit();
    }
  }

}
