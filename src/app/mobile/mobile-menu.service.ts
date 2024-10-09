import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {

  isVisible = false;

  constructor(public mobileMenuSv: MobileMenuService) { }



}
