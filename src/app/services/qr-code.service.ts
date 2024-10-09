import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StudentModel } from '../models/authentication/student.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private authSv: AuthService) {
  }

  fetchqrCode(studentId: string = StudentModel.getCurrent()._id): Observable<StudentModel> {

    return this.authSv.patch('/students/createQRCode/' + studentId, {}).pipe(map((response) => {

      const qrcodeStudent = StudentModel.generateModel(response.data);
      return qrcodeStudent;

    }));
  }
}
