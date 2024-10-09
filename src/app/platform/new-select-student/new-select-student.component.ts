import {Component, OnInit} from '@angular/core';
import {StudentModel} from '../../models/authentication/student.model';
import {Router} from '@angular/router';
import {StudentService} from '../../services/student.service';
import {ModalService} from '../../root/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {GaService} from '../../services/ga.service';
import {UserModel} from '../../models/authentication/user.model';
import {ErrorModel} from '../../models/shared/error.model';
import * as moment from 'moment';
import {SchoolGroupFilter, SchoolGroupsService} from '../../services/school/school-groups.service';
import {GroupModel} from '../../models/school/group.model';

@Component({
  selector: 'app-new-select-student',
  templateUrl: './new-select-student.component.html',
  styleUrls: ['./new-select-student.component.css']
})
export class NewSelectStudentComponent implements OnInit {
  public students: StudentModel[] = [];
  public groups: GroupModel[];
  showList = [];
  filter = new SchoolGroupFilter();
  categorySelected = 'students';
  public SubscriptionStatus = StudentModel.SubscriptionStatusTypes;

  constructor(private router: Router,
              private studentSv: StudentService,
              private modalSv: ModalService,
              private tSv: TranslateService,
              private ga: GaService, private groupSv: SchoolGroupsService) {
  }

  ngOnInit() {
    if (UserModel.getCurrent()) {
      if (this.tSv.currentLang !== UserModel.getCurrent().culture &&
        UserModel.getCurrent().culture !== null &&
        UserModel.getCurrent().culture !== undefined) {
        this.tSv.use(UserModel.getCurrent().culture);
      }

    }

    this.studentSv.fetchStudents().subscribe((students) => {

      this.students = students.sort((a, b) => {

        if (a.fullName() > b.fullName()) {
          return 1;
        }

        if (a.fullName() < b.fullName()) {
          return -1;
        }

        return 0;
      });
    }, (error: ErrorModel) => {

      this.modalSv.showErrorModal(this.tSv.instant('reusable.error'),
        this.tSv.instant('reusable.unknownError'));

    });

    if (this.isTeacher()) {
      this.groupSv.fetchTeacherGroups(this.filter).subscribe((groups) => {
        this.groups = groups.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }

          if (a.name < b.name) {
            return -1;
          }

          return 0;
        });
        if (this.groups.length > 0) {
          this.groups.forEach((groupe) => {
            this.showList.push(false);
            this.groupSv.fetchStudentForGroup(groupe._id).subscribe((students) => {
              groupe.students = students;
            });
          });
        }
      });
    }
  }

  isTeacher(): boolean {

    if (UserModel.getCurrent()) {

      return UserModel.getCurrent().schoolId !== null && UserModel.getCurrent().schoolId !== undefined;
    }

    return false;
  }

  onAddStudentClicked() {

    this.ga.logEvent('create_student_clicked', GaService.Categories.platform_engagement);
    this.ga.logEvent('subscription_process_started', GaService.Categories.sales_process, '/selectstudent');
    this.router.navigate(['createstudent']);

  }

  onStudentClicked(s: StudentModel) {

    this.ga.logEvent('select_student_clicked', GaService.Categories.platform_engagement);
    StudentModel.setCurrent(s);

    this.router.navigate(['platform', 'dash']);

  }

  showGroups() {
    this.categorySelected = 'groups';
  }

  showStudents() {
    this.categorySelected = 'students';
  }

  showStudentsOfGroup(index: number) {
    this.showList[index] = !this.showList[index];
  }

  convertBirthDate(birthDate: Date): string {
    return moment(birthDate).format('DD / MM / YYYY');
  }

}
