import {Directive, HostBinding, HostListener} from '@angular/core';
import {EasterEggService} from './easter-egg/easter-egg.service';

@Directive({
  selector: '[appEgg]'
})

export class EggDirective {

  keysPressed = {};

  constructor(private easterEggSv: EasterEggService) {
  }

  @HostBinding('attr.role') role = 'div';

  @HostListener('window:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {

    if (event.shiftKey && event.altKey && (event.key.toLowerCase() === 'm' || event.key.toLowerCase() === 'a')) {
      this.keysPressed[event.key.toLowerCase()] = true;
      if (this.keysPressed['m'] && this.keysPressed['a']) {
        this.easterEggSv.showEgg().subscribe(() => {
          this.keysPressed = {};
        });
      }
    }


  }

  @HostListener('window:keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
    delete this.keysPressed[event.key.toLowerCase()];
  }

}
