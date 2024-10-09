import { Component, OnInit } from '@angular/core';
import {EasterEggService} from "./easter-egg.service";
import {CultureModel} from "../../../models/localization/culture.model";

@Component({
  selector: 'app-easter-egg',
  templateUrl: './easter-egg.component.html',
  styleUrls: ['./easter-egg.component.css']
})
export class EasterEggComponent implements OnInit {

  text = {
    'en-US': "Website designed by the entire Evolytes team and implemented by the two interns: Marine TEROITIN and Mathilde TRIBOT",
    'en-GB': "Website designed by the entire Evolytes team and implemented by the two interns: Marine TEROITIN and Mathilde TRIBOT",
    'is-IS': "Website designed by the entire Evolytes team and implemented by the two interns: Marine TEROITIN and Mathilde TRIBOT",
    'pt-BR': "Website designed by the entire Evolytes team and implemented by the two interns: Marine TEROITIN and Mathilde TRIBOT",
    'fr-FR': "Site internet pensé par toute l'équipe d'Evolytes et implémenté par les deux stagiaires : Marine TEROITIN et Mathilde TRIBOT",
  }

  validation = {
    'en-US': "Close",
    'en-GB': "Close",
    'is-IS': "Close",
    'pt-BR': "Close",
    'fr-FR': "Fermer",
  }

  constructor(public easterEggSv: EasterEggService) { }

  ngOnInit() {
  }

  onValidateClicked() {
    this.easterEggSv.close();
  }

  getText() {
    return this.text[CultureModel.getHomepageCulture()];
  }

  getValidation() {
    return this.validation[CultureModel.getHomepageCulture()];
  }
}
