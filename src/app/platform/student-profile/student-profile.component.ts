import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentModel} from '../../models/authentication/student.model';
import {StudentService} from '../../services/student.service';
import {SessionsService} from '../../services/sessions.service';
import {AnswerService} from '../../services/answer.service';
import {NumberExtensionModel} from '../../models/extensions/number-extension.model';
import {CultureModel} from '../../models/localization/culture.model';
import {UserModel} from '../../models/authentication/user.model';
import {TranslateService} from '@ngx-translate/core';
import {ErrorModel} from '../../models/shared/error.model';
import {ModalService} from '../../root/modal.service';
import {QrCodeService} from '../../services/qr-code.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  @ViewChild('qrimage') parent;

  playTime = 0;
  numAnswers = 0;
  loading = false;

  ProfileStates = {
    profile: 'profile',
    qrcode: 'qrcode'
  };

  constructor(private sessionsSv: SessionsService,
              private answerSv: AnswerService,
              private studentSv: StudentService,
              private qrCodeSv: QrCodeService,
              private modalSv: ModalService,
              private tSv: TranslateService) {
  }

  // To know whether we show QR Code or values are profile or qrcode
  state = this.ProfileStates.profile;

  ngOnInit() {

    this.sessionsSv.fetchSessionDuration(null, null).subscribe((time) => {
      this.playTime = time;
    });

    this.answerSv.fetchNumAnswers(null, null).subscribe((answers) => {
      this.numAnswers = answers;
    });

  }

  getTimeSpentString(): string {

    if (this.playTime < 60) {
      return '0';
    }

    const hours = Math.floor(this.playTime / 3600);
    const minutes = Math.floor(this.playTime / 60) % 60;

    let timeString = '';
    if (hours >= 1) {
      timeString += hours.toString(10) + this.tSv.instant('dashboard.hourDelimeter') + ' ';
    }

    timeString += minutes.toString(10) + this.tSv.instant('dashboard.minuteDelimeter');

    return timeString;

  }

  getNumAnswersString(): string {

    return NumberExtensionModel.delimiterSeparatedNumber(this.numAnswers, CultureModel.numberDelimiterForCulture(UserModel.getCurrent().culture));

  }

  currentStudent(): StudentModel {

    return StudentModel.getCurrent();
  }

  fullYear() {
    return this.currentStudent().birthDate.getFullYear();
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
    console.log('qrcode data: ' + jsonString);
    return jsonString;

  }

  isQRCodeEnabled() {

    return StudentModel.getCurrent().isQRCodeAuthEnabled;
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

}
