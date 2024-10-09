import { Injectable } from '@angular/core';
import {Observable, Subscribable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvoListSelectorService {

  list: string[] = [];
  included: string[] = [];
  isVisible = false;

  subscriber: Subscriber<string>;

  constructor() { }

  showList(list: string[], included: string[] = []): Observable<string> {
    this.isVisible = true;
    this.list = list;
    this.included = included;

    return Observable.create((subscriber) => {
      this.subscriber = subscriber;
    });

  }

  getList(): string[] {

    const list = this.list.slice(0);

    for (const value of this.included) {
      const index = list.indexOf(value);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }

    return list;
  }

  selectedItem(item: string) {
    this.isVisible = false;
    if (this.subscriber) {
      this.subscriber.next(item);
      this.subscriber.complete();
    }
  }

}
