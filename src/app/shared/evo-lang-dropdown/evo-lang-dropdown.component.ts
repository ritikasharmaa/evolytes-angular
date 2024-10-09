import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CultureModel} from '../../models/localization/culture.model';
import {CountryModel} from '../../models/localization/country.model';

@Component({
  selector: 'app-evo-lang-dropdown',
  templateUrl: './evo-lang-dropdown.component.html',
  styleUrls: ['./evo-lang-dropdown.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoLangDropdownComponent),
    multi: true
  }]
})
export class EvoLangDropdownComponent implements OnInit, ControlValueAccessor {

  public static Types = {
    country: 'country',
    culture: 'culture'
  };

  @Input() cultureDropdownList = CultureModel.dropdownList();
  @Input() countryDropdownList = CountryModel.dropdownList();

  @Input() showTitle = true;
  /**
   * The other type of dropdown is country.
   */
  @Input() type: string = EvoLangDropdownComponent.Types.country;
  @Input() autoselect = false;
  @Input() isDisabled = false;
  @Input('currentValue')
  set currentValue(value: any) {
    this.writeValue(value);
  }

  @Output() valueChangedEvent = new EventEmitter<string>();

  _currentValue: { key: string, value: string, iconURL: string } = null;

  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {

  }

  getCurrentValue(): string {

    if (this._currentValue) {
      return this._currentValue.value;
    }

    return '';
  }

  getAutoSelectValue(): { key: string, value: string, iconURL: string } {

    if (this._currentValue === null && this.autoselect === true) {

      if (this.type === EvoLangDropdownComponent.Types.country) {

        this._currentValue = CountryModel.dropdownList()[0];
        this.propagateChange(this._currentValue.key);

      } else if (this.type === EvoLangDropdownComponent.Types.culture) {

        this._currentValue = CultureModel.dropdownList()[0];
        this.propagateChange(this._currentValue.key);

      }

    }

    if (this._currentValue !== null && this._currentValue !== undefined) {

      return this._currentValue;
    }

    return null;
  }

  getDropdownList(): { key: string, value: string, iconURL: string }[] {

    if (this.type === EvoLangDropdownComponent.Types.culture) {
      return this.cultureDropdownList;
    } else if (this.type === EvoLangDropdownComponent.Types.country) {
      return this.countryDropdownList;
    }

    return [];
  }

  getTitle(): string {

    if (this.type === EvoLangDropdownComponent.Types.culture) {
      return 'reusable.cultureTitle';
    } else if (this.type === EvoLangDropdownComponent.Types.country) {
      return 'reusable.countryTitle';
    }

    return '';
  }

  getPlaceholder(): string {

    if (this.type === EvoLangDropdownComponent.Types.culture) {
      return 'reusable.selectCulture';
    } else if (this.type === EvoLangDropdownComponent.Types.country) {
      return 'reusable.selectCountry';
    }

    return '';
  }

  onValueChanged(value: string) {

    if (this.valueChangedEvent) {

      this.valueChangedEvent.emit(value);
      this.propagateChange(value);

    }

  }

  /**
   * @description Value Accessor Methods
   *
   */
  writeValue(obj: any): void {

    if (obj !== null && obj !== undefined) {

      if (typeof (obj) === 'number') {

        const index = <number>obj;

        if (index < this.getDropdownList().length) {
          this._currentValue = this.getDropdownList()[index];
          this.propagateChange(this._currentValue.key);
        } else {
          this.propagateChange(null);
        }

      } else if (typeof (obj) === 'string') {

        const key = <string>obj;

        let index = -1;
        let counter = 0;
        for (const el of this.getDropdownList()) {

          if (el.key === key) {
            index = counter;
            break;
          }
          counter += 1;
        }

        if (index !== -1) {
          this._currentValue = this.getDropdownList()[index];
          this.propagateChange(this._currentValue.key);
        } else {
          this.propagateChange(null);
        }

      } else if (typeof (obj) === 'object') {

        let index = -1;

        let counter = 0;
        for (const el of this.getDropdownList()) {

          if (el.key === obj.key) {
            index = counter;
          }

          counter += 1;
        }

        if (index !== -1) {
          this._currentValue = this.getDropdownList()[index];
          this.propagateChange(this._currentValue.key);
        } else {
          this.propagateChange(null);
        }

      }

    } else {
      this._currentValue = null;
    }
  }

  registerOnChange(fn: any): void {

    this.propagateChange = fn;
    if (this._currentValue) {
      this.propagateChange(this._currentValue.key);
    }

  }

  registerOnTouched(fn: any): void {
  }

}
