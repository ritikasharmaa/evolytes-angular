import { Component, OnInit, ViewChild } from '@angular/core';
import { QrCodeService } from 'src/app/services/qr-code.service';
import { StudentModel } from '../../../models/authentication/student.model';
import {StudentService} from '../../../services/student.service';
import {map} from 'rxjs/operators';
import {ErrorModel} from '../../../models/shared/error.model';
import {ModalService} from '../../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-auth-settings',
  templateUrl: './auth-settings.component.html',
  styleUrls: ['./auth-settings.component.css']
})
export class AuthSettingsComponent implements OnInit {

  @ViewChild('qrimage') parent;
  student: StudentModel = StudentModel.getCurrent();
  currentPin = '';
  newPassword = '';
  confirmNewPassword = '';
  email = '';
  pinChecked = false;
  loading;

  constructor(private qrCodeSv: QrCodeService,
              private modalSv: ModalService,
              private tSv: TranslateService,
              private studentSv: StudentService) {
  }

  ngOnInit() {
  }

  onQRCodeEnable() {

    const qrCodeStatus = StudentModel.getCurrent().isQRCodeAuthEnabled;
    StudentModel.getCurrent().isQRCodeAuthEnabled = !qrCodeStatus;

    this.studentSv.updateStudent(StudentModel.getCurrent()).subscribe((student) => {
      StudentModel.setCurrent(student);
    }, (err: ErrorModel) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'), this.tSv.instant(''));
    });

  }

  hasQRCode() {

    if (!StudentModel.getCurrent().qrCodePassword) {

      return false;
    }

    return true;

  }

  QRCodeData() {

    const qrCodeJson = {
      studentId: StudentModel.getCurrent()._id,
      qrCodePassword: StudentModel.getCurrent().qrCodePassword
    };

    const jsonString = JSON.stringify(qrCodeJson);

    return jsonString;

  }

  isQRCodeEnabled() {

    return StudentModel.getCurrent().isQRCodeAuthEnabled;
  }

  newCode() {

    if (StudentModel.getCurrent()) {
      this.loading = true;
      this.qrCodeSv.fetchqrCode().subscribe((student) => {
        StudentModel.setCurrent(student);
        this.loading = false;
      });
    }
  }

  saveAsImage(parent: any) {

    const parentElement = parent.el.nativeElement.querySelector('img').src;
    const blobData = this.convertBase64ToBlob(parentElement);
    const nav = (window.navigator as any);

    const fileName = 'QRCode ' + StudentModel.getCurrent().fullName() + '.png';

    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blobData, fileName);
    } else {
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: any) {
    const parts = Base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

  isSavePinDisabled(): boolean {
    return !(this.currentPin.length === 4 && !isNaN(Number(this.currentPin)));
  }

  isSaveEmailDisabled(): boolean {
    // check email format
    const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !(this.newPassword !== '' && this.confirmNewPassword !== '' && this.newPassword === this.confirmNewPassword && emailFormat.test(this.email));
  }

}
