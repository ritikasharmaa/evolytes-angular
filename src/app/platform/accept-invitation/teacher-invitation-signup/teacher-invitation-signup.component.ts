import {Component, OnInit} from '@angular/core';
import {StudentModel} from '../../../models/authentication/student.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../../models/authentication/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../../../services/auth.service';
import {TokenModel} from '../../../models/authentication/token.model';
import {SchoolModel} from '../../../models/school/school.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {SchoolTeacherAdministrationService} from '../../../services/school/school-teacher-administration.service';
import {ModalService} from '../../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {ErrorModel} from '../../../models/shared/error.model';
import {TeacherInvitationModel} from '../../../models/authentication/teacher-invitation';
import {SchoolTeacherInvitationAdministrationService} from '../../../services/school/school-teacher-invitation-administration.service';

@Component({
  selector: 'app-teacher-invitation-signup',
  templateUrl: './teacher-invitation-signup.component.html',
  styleUrls: ['./teacher-invitation-signup.component.css']
})
export class TeacherInvitationSignupComponent implements OnInit {

  public States = {
    CreateAccount: 'CreateAccount',
    WrongTokenType: 'WrongTokenType',
    Logout: 'Logout',
    Expired: 'Expired',
    AlreadyLoggedIn: 'AlreadyLoggedIn',
    ExistButLoggedOut: 'ExistButLoggedOut'
  };

  state = undefined;

  token = null;
  payload: {
    _id: string,
    schoolId: string,
    schoolCulture: string,
    schoolCountry: string,
    iat: number,
    exp: number
  } = null;

  user = new UserModel();
  teacherInvitation: TeacherInvitationModel;
  password = '';
  confirmPassword = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authSv: AuthService,
              private schoolSv: SchoolTeacherAdministrationService,
              private teacherInvitationSv: SchoolTeacherInvitationAdministrationService,
              private modalSv: ModalService,
              private tSv: TranslateService) {
  }

  ngOnInit() {
    this.checkTokenAndUserState();
  }

  checkTokenAndUserState() {
    this.route.params.subscribe((params) => {

      const helper = new JwtHelperService();

      this.token = params.token;

      if (!this.token) {
        // how an error as we are lacking a token
      } else {

        this.payload = <{
          _id: string,
          schoolId: string,
          schoolCulture: string,
          schoolCountry: string,
          iat: number,
          exp: number
        }>helper.decodeToken(this.token);

        if (TokenModel.isExpired(this.token)) {
          this.state = this.States.Expired;
        } else {
          if (!CultureModel.getHomepageCulture()) {
            CultureModel.setHomepageCulture(this.payload.schoolCulture);
            this.tSv.use(CultureModel.getHomepageCulture());
          }

          this.teacherInvitationSv.fetchInvitationTeacher(this.payload.schoolId, this.token).subscribe((teacherInvitation) => {
            this.teacherInvitation = teacherInvitation;
            this.user.email = this.teacherInvitation.email;
            this.user.firstName = this.teacherInvitation.firstName;
            this.user.lastName = this.teacherInvitation.lastName;

            this.schoolSv.findTeacher(this.user.email).subscribe((userExist) => {

              if (UserModel.getCurrent()) {
                if (UserModel.getCurrent().email === this.user.email) {
                  this.user = UserModel.getCurrent();
                  this.state = this.States.AlreadyLoggedIn;
                } else {
                  this.state = this.States.Logout;
                }
              } else if (userExist) {
                this.state = this.States.ExistButLoggedOut;
              } else {
                this.state = this.States.CreateAccount;
              }
            });

          }, (err: ErrorModel) => {
            this.state = this.States.WrongTokenType;
            console.log(err.name + ': ' + err.message);
          });
        }
      }
    });
  }

  navigateHome() {

    if (StudentModel.getCurrent()) {
      this.router.navigate(['platform', 'dash']);
    } else {
      this.router.navigate(['selectstudent']);
    }
  }

  getSchoolName(): string {

    if (this.teacherInvitation) {
      return this.teacherInvitation.schoolName;
    }

    return null;
  }

  getSchoolInitial(): string {

    if (this.getSchoolName()) {

      return this.getSchoolName().substring(0, 1).toUpperCase();
    }

    return null;
  }

  getAccessType(): string {

    if (this.teacherInvitation) {
      return 'schoolAccessTypes.' + this.teacherInvitation.schoolAccessType;
    }

    return 'schoolAccessTypes.teacher';
  }

  onLogoutButtonClicked() {

    this.authSv.signOut().subscribe(() => {

    });

    UserModel.setCurrent(null);
    TokenModel.setCurrent(null);
    SchoolModel.setCurrent(null);
    StudentModel.setCurrent(null);

    this.checkTokenAndUserState();

  }

  onTokenExpiredClicked() {

    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
    } else {
      this.router.navigate(['selectcountry']);
    }

  }

  onWrongTokenTypeClicked() {

    if (CultureModel.getHomepageCulture()) {
      this.router.navigate(['home', CultureModel.getHomepageCulture(), 'landing']);
    } else {
      this.router.navigate(['selectcountry']);
    }

  }

  onCreateAccountAndAcceptInvitation() {

    if (!this.user.firstName || this.user.firstName.length < 2) {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('schoolInvitation.firstNameRequiredError'));
      return;
    }

    if (!this.user.lastName || this.user.lastName.length < 2) {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('schoolInvitation.lastNameRequiredError'));
      return;
    }

    if (this.state !== this.States.AlreadyLoggedIn) {
      if (this.password !== this.confirmPassword) {
        this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
          this.tSv.instant('resetPassword.passwordsDoNotMatch'));
        return;
      }
    }

    // tslint:disable-next-line:max-line-length
    this.teacherInvitationSv.acceptTeacherInvitation(this.teacherInvitation.schoolId, this.token, this.password, this.user.firstName, this.user.lastName).subscribe((response) => {
      UserModel.setCurrent(response.user);
      TokenModel.setCurrent(response.tokens);
      SchoolModel.setCurrent(response.school);
      this.router.navigate(['selectstudent']);
    }, (err: ErrorModel) => {
      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'), err.message);
    });
  }
}
