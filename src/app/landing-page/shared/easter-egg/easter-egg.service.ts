import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EasterEggService {

  isVisible = false;
  observer : Subscriber<{}>;

  text = {
    'en-US': "Website designed by the entire Evolytes team and implemented by the two interns: Marine TEROITIN and Mathilde TRIBOT",
    'en-GB': "Website designed by the entire Evolytes team and implemented by the two interns: Marine TEROITIN and Mathilde TRIBOT",
    'is-IS': "Website designed by the entire Evolytes team and implemented by the two interns: Marine TEROITIN and Mathilde TRIBOT",
    'pt-BR': "Website designed by the entire Evolytes team and implemented by the two interns: Marine TEROITIN and Mathilde TRIBOT",
    'fr-FR': "Site internet pensé par toute l'équipe d'Evolytes et implémenté par les deux stagiaires : Marine TEROITIN et Mathilde TRIBOT",
  }

  constructor() { }

  showEgg(): Observable<{}> {

    this.isVisible = true;

    return new Observable<{}>((observer) => {
      this.observer = observer;
    });

  }

  close() {
    this.isVisible = false;
    if (this.observer) {
      this.observer.complete();
    }
  }
}
