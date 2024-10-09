import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {

  constructor() { }



  importCSV(file: File, properties: string[], ignoreFirstLine: Boolean = true): Observable<Object[]> {

    const list = [];

    const reader = new FileReader();
    reader.readAsText(file);

    return new Observable((subscriber) => {

      reader.onload = (e) => {

        const fileText: string = reader.result as string;

        const regExp = new RegExp('\n');
        let rows = fileText.split(regExp);

        if (ignoreFirstLine) {
          rows = rows.slice(1);
        }

        for (let row = 0; row < rows.length; row++) {

          const newObject = {};
          // Split the text
          const currentRow = rows[row].replace('\r', '');
          const separatorRegEx = new RegExp(';|,');
          const values = currentRow.split(separatorRegEx);

          for (let i = 0; i < values.length; i++) {
            if (i < properties.length) {
              const value = values[i];
              const key = properties[i];

              newObject[key] = value;

            }

          }

          list.push(newObject);

        }

        // Finalize the observable
        subscriber.next(list);
        subscriber.complete();

      };


    });

  }

}
