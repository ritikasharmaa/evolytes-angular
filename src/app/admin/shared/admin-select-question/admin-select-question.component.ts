import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdminSelectQuestionService} from './admin-select-question.service';
import {QuestionService} from '../../../services/question.service';
import {QuestionModel} from '../../../models/question.model';
import {CountryModel} from '../../../models/localization/country.model';
import {UserModel} from '../../../models/authentication/user.model';

@Component({
  selector: 'app-admin-select-question',
  templateUrl: './admin-select-question.component.html',
  styleUrls: ['./admin-select-question.component.css']
})
export class AdminSelectQuestionComponent implements OnInit {

  UserModel = UserModel;

  constructor(public selectQSv: AdminSelectQuestionService) { }

  ngOnInit() {

  }


  subcategories(category: string): {
    subCategory: string,
    category: string,
    isVisible: boolean,
    questions: QuestionModel[] }[] {

    const list = [];

    for (const subCat of this.selectQSv.subCategoryQuestions) {

      if (subCat.category === category) {
        list.push(subCat);
      }

    }

    return list;
  }

  questionPublishedState(q: QuestionModel): string {

    if (q.isPublished === true) {

      return 'Active';
    }

    return 'Inactive';

  }

  onQuestionClicked(q: QuestionModel) {
    this.selectQSv.onQuestionSelected(q);
  }

  getColor(index: number): string {

    if (index % 5 === 0) {

      return '#009CCC';

    } else if (index % 5 === 1) {

      return '#28A745';

    } else if (index % 5 === 2) {

      return '#FFCB05';

    } else if (index % 5 === 3) {

      return '#9B59B6';

    } else if (index % 5 === 4) {

      return '#F26522';

    }

  }


}
