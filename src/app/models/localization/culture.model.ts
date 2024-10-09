export class CultureModel {

  public static daDK = 'da-DK';
  public static daDKDropdown = CultureModel.dropdownItem(CultureModel.daDK);
  public static deDE = 'de-DE';
  public static deDEDropdown = CultureModel.dropdownItem(CultureModel.deDE);
  public static enGB = 'en-GB';
  public static enGBDropdown = CultureModel.dropdownItem(CultureModel.enGB);
  public static enUS = 'en-US';
  public static enUSDropdown = CultureModel.dropdownItem(CultureModel.enUS);
  public static esES = 'es-ES';
  public static esESDropdown = CultureModel.dropdownItem(CultureModel.esES);
  public static frFR = 'fr-FR';
  public static frFRDropdown = CultureModel.dropdownItem(CultureModel.frFR);
  public static isIS = 'is-IS';
  public static isISDropdown = CultureModel.dropdownItem(CultureModel.isIS);
  public static ltLT = 'lt-LT';
  public static ltLTDropdown = CultureModel.dropdownItem(CultureModel.ltLT);
  public static nbNO = 'nb-NO';
  public static nbNODropdown = CultureModel.dropdownItem(CultureModel.nbNO);
  public static ptBR = 'pt-BR';
  public static ptBRDropdown = CultureModel.dropdownItem(CultureModel.ptBR);
  public static ptPT = 'pt-PT';
  public static ptPTDropdown = CultureModel.dropdownItem(CultureModel.ptPT);
  public static svSE = 'sv-SE';
  public static svSEDropdown = CultureModel.dropdownItem(CultureModel.svSE);

  private static homepageKey = 'homepageCultureKey';

  public static list(): string[] {

    return [this.enGB, this.frFR, this.ltLT, this.isIS, this.nbNO, this.svSE];

  }

  public static privateList(): string[] {

    return [this.daDK, this.deDE, this.enGB, this.enUS, this.esES, this.frFR, this.ltLT, this.isIS, this.nbNO, this.ptBR, this.ptPT, this.svSE];
  }

  public static title(culture: string): string {

    if (culture === this.daDK) {
      return 'Dansk (Denmark)';
    } else if (culture === this.deDE) {
      return 'Deutsch (Germany)';
    } else if (culture === this.enGB) {
      return 'English (United Kingdom)';
    } else if (culture === this.enUS) {
      return 'English (United States)';
    } else if (culture === this.esES) {
      return 'Español (Spain)';
    } else if (culture === this.frFR) {
      return 'Français (France)';
    } else if (culture === this.isIS) {
      return 'Íslenska (Iceland)';
    } else if (culture === this.ptBR) {
      return 'Português (Brazil)';
    } else if (culture === this.ptPT) {
      return 'Português (Portugal)';
    } else if (culture === this.svSE) {
      return 'Svenska (Sweden)';
    } else if (culture === this.nbNO) {
      return 'Norsk bokmål (Norwegian)';
    } else if (culture === this.ltLT) {
      return 'Lietuvių (Lithuanian)';
    }

    return null;

  }

  public static iconURL(culture: string) {

    if (culture === this.daDK) {
      return './assets/country/rounded/denmark.png';
    } else if (culture === this.enGB) {
      return './assets/country/rounded/uk.png';
    } else if (culture === this.enUS) {
      return './assets/country/rounded/us.png';
    } else if (culture === this.frFR) {
      return './assets/country/rounded/france.png';
    } else if (culture === this.isIS) {
      return './assets/country/rounded/iceland.png';
    } else if (culture === this.ptPT) {
      return './assets/country/rounded/portugal.png';
    } else if (culture === this.ptBR) {
      return './assets/country/rounded/brazil.png';
    } else if (culture === this.esES) {
      return './assets/country/rounded/spain.png';
    } else if (culture === this.svSE) {
      return './assets/country/rounded/sweden.png';
    } else if (culture === this.nbNO) {
      return './assets/country/rounded/norway.png';
    } else if (culture === this.ltLT) {
      return './assets/country/rounded/lithuania.png';
    } else if (culture === this.deDE) {
      return './assets/country/rounded/germany.png';
    } else if (culture === this.daDK) {

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

  public static getHomepageCulture(): string {

    const culture = localStorage.getItem(this.homepageKey);
    if (culture !== null && culture !== undefined) {
      return culture;
    }

    return null;

  }

  public static setHomepageCulture(country: string): boolean {

    if (this.list().includes(country)) {
      localStorage.setItem(this.homepageKey, country);
      return true;
    }

    return false;

  }

  public static dropdownItem(cultureKey: string): { key: string, value: string, iconURL: string } {

    const dp = { key: cultureKey, value: this.title(cultureKey), iconURL: this.iconURL(cultureKey) };

    return dp;
  }

  public static numberDelimiterForCulture(culture: string): string {

    if (culture === CultureModel.enUS) {
      return ',';
    }

    return '.';
  }

  public static getLocalizedAppStoreBadge(culture: string): string {

    if (culture === CultureModel.deDE) {

      return './assets/newWebsite/appStoreIcon/appStoreDE.svg';
    } else if (culture === CultureModel.frFR) {

      return './assets/newWebsite/appStoreIcon/appStoreFR.svg';
    } else if (culture === CultureModel.ltLT) {

      return './assets/newWebsite/appStoreIcon/appStoreLT.svg';
    } else if (culture === CultureModel.nbNO) {

      return './assets/newWebsite/appStoreIcon/appStoreNO.svg';
    } else if (culture === CultureModel.ptBR) {

      return './assets/newWebsite/appStoreIcon/appStoreBR.svg';
    } else if (culture === CultureModel.svSE) {

      return './assets/newWebsite/appstoreIcon/appStoreSE.svg';
    }

    return './assets/newWebsite/appStoreIcon/appStoreGB.svg';
  }

  public static getLocalizedPlayStoreBadge(culture: string): string {

    if (culture === CultureModel.deDE) {

      return './assets/newWebsite/googlePlayIcon/googlePlayDE.png';
    } else if (culture === CultureModel.frFR) {

      return './assets/newWebsite/googlePlayIcon/googlePlayFR.png';

    } else if (culture === CultureModel.isIS) {

      return './assets/newWebsite/googlePlayIcon/googlePlayIS.png';
    } else if (culture === CultureModel.ltLT) {

      return './assets/newWebsite/googlePlayIcon/googlePlayLT.png';
    } else if (culture === CultureModel.nbNO) {

      return './assets/newWebsite/googlePlayIcon/googlePlayNO.png';
    } else if (culture === CultureModel.ptBR) {

      return './assets/newWebsite/googlePlayIcon/googlePlayBR.png';
    } else if (culture === CultureModel.svSE) {

      return './assets/newWebsite/googlePlayIcon/googlePlaySE.png';
    }

    return './assets/newWebsite/googlePlayIcon/googlePlayGB.png';
  }

  public static openAppStore() {
    window.open('https://apps.apple.com/tt/app/evolytes/id1469773602', '_blank');
  }

  public static openPlayStore() {
    window.open('https://play.google.com/store/apps/details?id=com.Evolytes.Evolytes', '_blank');
  }

}
