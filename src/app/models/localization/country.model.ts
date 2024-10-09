import {CultureModel} from './culture.model';

export class CountryModel {

  public static BRA = 'BRA';
  public static BRADropdown = CountryModel.dropdownItem(CountryModel.BRA);
  public static DEU = 'DEU';
  public static DEUDropdown = CountryModel.dropdownItem(CountryModel.DEU);
  public static DNK = 'DNK';
  public static DNKDropdown = CountryModel.dropdownItem(CountryModel.DNK);
  public static ESP = 'ESP';
  public static ESPDropdown = CountryModel.dropdownItem(CountryModel.ESP);
  public static FRA = 'FRA';
  public static FRADropdown = CountryModel.dropdownItem(CountryModel.FRA);
  public static GBR = 'GBR';
  public static GBRDropdown = CountryModel.dropdownItem(CountryModel.GBR);
  public static ISL = 'ISL';
  public static ISLDropdown = CountryModel.dropdownItem(CountryModel.ISL);
  public static LTU = 'LTU';
  public static LTUDropdown = CountryModel.dropdownItem(CountryModel.LTU);
  public static NOR = 'NOR';
  public static NORDropdown = CountryModel.dropdownItem(CountryModel.NOR);
  public static PRT = 'PRT';
  public static PRTDropdown = CountryModel.dropdownItem(CountryModel.PRT);
  public static SWE = 'SWE';
  public static SWEDropdown = CountryModel.dropdownItem(CountryModel.SWE);
  public static USA = 'USA';
  public static USADropdown = CountryModel.dropdownItem(CountryModel.USA);

  private static homepageCountryKey = 'homepageCountryKey';

  public static list(): string[] {

    return [this.FRA, this.GBR, this.ISL, this.LTU, this.NOR, this.SWE];
  }

  public static privateList(): string[] {

    return [this.BRA, this.DNK, this.DEU, this.ESP, this.FRA, this.GBR, this.ISL, this.LTU, this.NOR, this.PRT, this.SWE, this.USA];
  }

  public static title(country: string) {

    switch (country) {

      case this.BRA:
        return 'Brazil';

      case this.DNK:
        return 'Danmark';

      case this.DEU:
        return 'Deutschland';

      case this.ESP:
        return 'España';

      case this.FRA:
        return 'France';

      case this.ISL:
        return 'Ísland';

      case this.LTU:
        return 'Lietuva';

      case this.NOR:
        return 'Norge';

      case this.PRT:
        return 'Portugal';

      case this.SWE:
        return 'Sverige';

      case this.USA:
        return 'United States of America';

        // Default is GBR
      default:
        return 'Great Britain';

    }

  }

  public static iconURL(country: string) {

    switch (country) {

      case this.BRA:
        return './assets/country/rounded/brazil.png';

      case this.DNK:
        return './assets/country/rounded/denmark.png';

      case this.DEU:
        return './assets/country/rounded/germany.png';

      case this.ESP:
        return './assets/country/rounded/spain.png';

      case this.FRA:
        return './assets/country/rounded/france.png';

      case this.ISL:
        return './assets/country/rounded/iceland.png';

      case this.LTU:
        return './assets/country/rounded/lithuania.png';

      case this.NOR:
        return './assets/country/rounded/norway.png';

      case this.PRT:
        return './assets/country/rounded/portugal.png';

      case this.SWE:
        return './assets/country/rounded/sweden.png';

      case this.USA:
        return './assets/country/rounded/us.png';

      default:
        return './assets/country/rounded/uk.png';

    }

  }

  public static countryForCulture(culture: string): string {

    switch (culture) {

      case CultureModel.daDK:
        return this.DNK;

      case CultureModel.deDE:
        return this.DEU;

      case CultureModel.enUS:
        return this.USA;

      case CultureModel.esES:
        return this.ESP;

      case CultureModel.frFR:
        return this.FRA;

      case CultureModel.isIS:
        return this.ISL;

      case CultureModel.ltLT:
        return this.LTU;

      case CultureModel.nbNO:
        return this.NOR;

      case CultureModel.ptBR:
        return this.BRA;

      case CultureModel.ptPT:
        return this.PRT;

      case CultureModel.svSE:
        return this.SWE;

      default:
        return this.GBR;

    }
  }

  public static cultureForCountry(country: string): string {

    switch (country) {

      case this.BRA:
        return CultureModel.ptBR;

      case this.DNK:
        return CultureModel.daDK;

      case this.DEU:
        return CultureModel.deDE;

      case this.ESP:
        return CultureModel.esES;

      case this.GBR:
        return CultureModel.enGB;

      case this.FRA:
        return CultureModel.frFR;

      case this.ISL:
        return CultureModel.isIS;

      case this.LTU:
        return CultureModel.ltLT;

      case this.NOR:
        return CultureModel.nbNO;

      case this.PRT:
        return CultureModel.ptPT;

      case this.SWE:
        return CultureModel.svSE;

      default:
        return CultureModel.enGB;

    }

  }

  public static cultureTitle(country: string): string {

    const culture = this.cultureForCountry(country);
    return CultureModel.title(culture);

  }

  public static priceStartingAt(country: string): string {

    switch (country) {

      case this.GBR:

        return '£5';

      case this.ISL:

        return '1.125 kr.';

      default:
        return '6€';

    }

  }

  public static dropdownList(): { key: string, value: string, iconURL: string }[] {

    const list = [];
    for (const key of this.list()) {
      list.push({ key: key, value: this.title(key), iconURL: this.iconURL(key) });
    }

    return list;

  }

  public static privateDropdownList(): { key: string, value: string, iconURL: string }[] {

    const list = [];
    for (const key of this.privateList()) {
      list.push({ key: key, value: this.title(key), iconURL: this.iconURL(key) });
    }

    return list;

  }

  public static dropdownItem(countryKey: string): { key: string, value: string, iconURL: string } {

    const dp = { key: countryKey, value: this.title(countryKey), iconURL: this.iconURL(countryKey) };

    return dp;

  }

  public static getHomepageCountry(): string {

    const country = localStorage.getItem(this.homepageCountryKey);
    if (country !== null && country !== undefined) {
      return country;
    }

    return null;
  }

  public static setHomepageCountry(country: string) {

    if (this.list().includes(country)) {
      localStorage.setItem(this.homepageCountryKey, country);
      return true;
    }

    return false;

  }

}
