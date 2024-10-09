export class DropdownModel {

  key: string;
  value: string;
  iconURL: string;
  bgColor: string;

  constructor(key: string, value: string, iconURL = null) {
    this.key = key;
    this.value = value;
    this.iconURL = iconURL;
  }

}
