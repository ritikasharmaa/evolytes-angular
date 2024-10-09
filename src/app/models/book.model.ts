import {BookVersionModel} from './book-version.model';
import {DescriptionModel} from './shared/description.model';

export class BookModel {

  _id: string;
  name: string;
  country: string;
  culture: string;
  subject: string;
  description: string;
  translatedDescription = new DescriptionModel();
  grade: string;
  ageRange: string;
  imgURL: string;
  number: number;
  isPublished: boolean;

  createdAt: Date;
  updatedAt: Date;

  /**
   * @versions is only populated on some endpoints. The array may be ampty
   * depending on which endpoint was used to fetch the book.
   */
  versions: BookVersionModel[] = [];

  static generateModel(json: any): BookModel {

    const book = new BookModel();
    book._id = json._id;
    book.name = json.name;
    book.country = json.country;
    book.culture = json.culture;
    book.description = json.description;
    book.grade = json.grade;
    book.ageRange = json.ageRange;
    book.imgURL = json.imgURL;
    book.number = json.number;
    book.isPublished = json.isPublished;

    if (json.createdAt) {
      book.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      book.updatedAt = new Date(json.updatedAt);
    }

    if (json.translatedDescription) {
      book.translatedDescription = DescriptionModel.generateModel(json.translatedDescription);
    }

    if (json.versions) {
      book.versions = BookVersionModel.generateModels(json.versions);
    }

    return book;

  }

  static generateModels(jsonList: any[]): BookModel[] {

    const list = [];

    for (const json of jsonList) {
      const book = this.generateModel(json);
      list.push(book);
    }

    return list;

  }

  findVersion(versionId: string): BookVersionModel {

    for (const version of this.versions) {

      if (version._id === versionId) {
        return version;
      }

    }

      return null;
  }

  latestVersion(): BookVersionModel {

    if (this.versions.length > 0) {

      let version = this.versions[0];
      for (let i = 0; i < this.versions.length; i++) {
        // Should fetch the public books
        if (version.editionNumber < this.versions[i].editionNumber && this.versions[i].isPublished === true) {
          version = this.versions[i];
        }
      }

      return version;

    }

    return null;
  }

}
