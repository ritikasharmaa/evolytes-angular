import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {QuestionModel} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';
import {UserModel} from '../../../models/authentication/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminSelectQuestionService {

  isVisible = false;

  subscriber: Subscriber<QuestionModel>;

  questions: QuestionModel[] = [];
  categories: { isVisible: boolean, category: string }[] = [];
  subCategoryQuestions: {
    subCategory: string,
    category: string,
    isVisible: boolean,
    questions: QuestionModel[]
  }[] = [];

  constructor(private qSv: QuestionService) { }

  show(): Observable<QuestionModel> {

    // We do not want to call this heavy endpoint repeatedly.
    if (this.questions.length === 0) {
      if (UserModel.getAdminCountry() !== null || UserModel.getAdminCountry() !== undefined) {
        this.qSv.fetchAdminQuestions(UserModel.getAdminCountry()).subscribe((questions) => {
          this.questions = questions;
          this.setupQuestions(this.questions);
        });
      }
    }

    this.isVisible = true;
    return new Observable((subscriber: Subscriber<QuestionModel>) => {
      this.subscriber = subscriber;
    });
  }

  onQuestionSelected(q: QuestionModel) {
    this.isVisible = false;
    if (this.subscriber) {
      this.subscriber.next(q);
    }
  }

  setupQuestions(questions: QuestionModel[]) {

    const qList = questions;
    const filteredQuestions = [];

    // Go through every question left which has a unique
    // category and subcategory
    for (let i = 0; i < qList.length; i = 0) {

      const q = qList[i];

      // If we do not have the question category included we should add it to the list.
      if (this.categories.filter((cat) => cat.category === q.category).length === 0) {
        this.categories.push({ isVisible: false, category: q.category });
      }

      const subCategoryList = [q];
      const subcategories = {
        category: q.category,
        subCategory: q.subCategory,
        isVisible: false,
        questions: null
      };

      // Find all questions with the same category and subcategory
      // add them to the subcategory list and remove them from
      // overall list with all the questions
      for (let j = 1; j < qList.length; j++) {

        const nextQ = qList[j];
        if (nextQ.category === q.category &&
          nextQ.subCategory === q.subCategory) {
          subCategoryList.push(nextQ);
          qList.splice(j, 1);
          j -= 1;
        }

      }

      qList.splice(0, 1);

      subcategories.questions = subCategoryList;
      filteredQuestions.push(subcategories);

    }

    this.subCategoryQuestions = filteredQuestions;
    this.categories = this.categories.sort((catOne, catTwo) => {

      if (catOne.category < catTwo.category) {
        return -1;
      } else if (catOne.category > catTwo.category) {
        return 1;
      }

      return 0;
    });

  }


}
