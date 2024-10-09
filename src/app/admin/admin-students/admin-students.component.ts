import {Component, OnInit} from '@angular/core';
import {StudentModel, StudentQueryModel} from '../../models/authentication/student.model';
import {Router} from '@angular/router';
import {AdminStudentService} from '../../services/admin/admin-student.service';
import {CountryModel} from '../../models/localization/country.model';


@Component({
  selector: 'app-school-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {

  students: StudentModel[] = [];
  studentFilter = new StudentQueryModel();
  hasMoreData = true;
  countryDropdownList = CountryModel.privateDropdownList();

  constructor(private adminStudentSv: AdminStudentService, private router: Router) {
  }

  ngOnInit() {
    this.countryDropdownList.splice(0, 0, {key: null, value: 'World', iconURL: './assets/school/world-gray-icon.png'});
    this.studentFilter.limit = 20;
    this.adminStudentSv.fetchStudents(this.studentFilter)
      .subscribe((students) => {
        this.students = students;
      });
  }

  searchFilteredStudents(searchString: string, country: string) {
    this.studentFilter.skip = 0;
    this.studentFilter.name = searchString;
    this.studentFilter.country = country;
    this.hasMoreData = true;
    this.adminStudentSv.fetchStudents(this.studentFilter).subscribe((filteredStudents) => {

      if (filteredStudents.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.students = filteredStudents;
    });
  }

  onFetchMoreStudents() {
    this.studentFilter.skip = this.students.length;
    this.adminStudentSv.fetchStudents(this.studentFilter).subscribe((students) => {
      if (students.length === 0) {
        this.hasMoreData = false;
      } else {
        this.hasMoreData = true;
      }
      this.students = this.students.concat(students);
    });
  }

  onStudentClicked(student: StudentModel) {
    this.router.navigate(['admin', 'students', student._id, 'edit']);
  }
}
