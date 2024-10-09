import {Component, OnInit} from '@angular/core';
import {CultureModel} from '../../models/localization/culture.model';
import {AnswerQueryModel} from '../../models/answer.model';
import {StudentModel} from '../../models/authentication/student.model';
import {UserModel} from '../../models/authentication/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  CultureModel = CultureModel;
  UserModel = UserModel;

  filter = new AnswerQueryModel();
  isSetup = false;
  student: StudentModel;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.student = StudentModel.getCurrent();
    this.isSetup = this.student.evolytesProfile.isSetup;
  }

  startDate7Days(): Date {

    const weekAgo = new Date();

    weekAgo.setDate(weekAgo.getDate() - 7);

    return weekAgo;
  }

  goToSubscribe() {
    this.router.navigate(['selectsub'], {queryParams: {student: this.student._id}});
  }

}
