import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  isMobileOrTablet = false;

  constructor(public breakpointObserver: BreakpointObserver) {
  }

  onInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobileOrTablet = true;
        } else {
          this.isMobileOrTablet = false;
        }
      });
  }
}
