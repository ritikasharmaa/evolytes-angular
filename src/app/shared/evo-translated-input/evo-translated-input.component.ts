import {Component, Input, OnInit} from '@angular/core';
import {DescriptionModel} from '../../models/shared/description.model';
import {EvoLangDropdownComponent} from '../evo-lang-dropdown/evo-lang-dropdown.component';
import {CultureModel} from '../../models/localization/culture.model';

@Component({
  selector: 'app-evo-translated-input',
  templateUrl: './evo-translated-input.component.html',
  styleUrls: ['./evo-translated-input.component.css']
})
export class EvoTranslatedInputComponent implements OnInit {

  culture = CultureModel.enGB;
  @Input() descr = new DescriptionModel();
  @Input() inputTitle = 'Translations';
  @Input() cultures: { key: string, value: string, iconURL: string }[] = [];

  constructor() { }

  ngOnInit() {
  }

  getCurrentValue(): string {

    return this.descr[this.culture];
  }

  setCurrentValue(value: string) {
    this.descr[this.culture] = value;
  }

  getCultures(): { key: string, value: string, iconURL: string }[] {

    if (this.cultures.length > 0) {

      return this.cultures;
    }

    return CultureModel.dropdownList();
  }

}
