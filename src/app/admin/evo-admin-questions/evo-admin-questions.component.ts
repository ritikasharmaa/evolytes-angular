import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {QuestionModel} from '../../models/question.model';
import {UserModel} from '../../models/authentication/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MobileService} from 'src/app/mobile/mobile.service';

@Component({
  selector: 'app-evo-school-questions',
  templateUrl: './evo-admin-questions.component.html',
  styleUrls: ['./evo-admin-questions.component.css']
})
export class EvoAdminQuestionsComponent implements OnInit {

  /**
   * Possible values: grouped, difficulty
   */
  displayType = 'grouped';
  UserModel = UserModel;

  searchTerm: string;
  showSidebar: Boolean = false;

  categories: { isVisible: boolean, category: string }[] = [];
  questions: QuestionModel[] = [];
  questionsByDifficulty: QuestionModel[] = [];
  questionsFiltered: QuestionModel[] = [];
  subCategoryQuestions: {
    subCategory: string,
    category: string,
    isVisible: boolean,
    questions: QuestionModel[]
  }[] = [];

  // The question id we just created, updated or viewed
  // used to scroll the question into view and/or open categories / subcategories
  questionId: string = null;
  question: QuestionModel = null;

  urlFromFilter: string = null;


  constructor(private questionSv: QuestionService,
              private route: ActivatedRoute,
              private router: Router,
              public mbSv: MobileService) {
  }

  ngOnInit() {
    this.mbSv.onInit();
    this.route.queryParams.subscribe((params: Params) => {

      if (params.displayType) {
        this.displayType = params.displayType;
      }

      if (params.questionId) {
        this.questionId = params.questionId;
      } else {
        this.questionId = null;
      }

    });

    if (UserModel.getAdminCountry()) {
      this.questionSv.fetchAdminQuestions(null).subscribe((questions) => {

        this.questions = questions;
        if (this.questionId) {
          const qs = questions.filter((q) => q._id === this.questionId);
          if (qs.length > 0) {
            this.question = qs[0];
          }
        }
        this.setupQuestions(this.questions.slice(0));

      });
    }

    this.questionSv.fetchQuestionCategories().subscribe((cats) => {

      cats.sort((a, b) => {

        if (a > b) {
          return 1;
        }

        return -1;

      });

      this.categories = [];
      for (const cat of cats) {

        const newCat = {category: cat, isVisible: false};
        this.categories.push(newCat);

      }

    });

  }

  onSearchClicked(searchTerm: string) {
    let url: String = '/filtered-questions';
    if (searchTerm) {
      url = url + '?name=' + searchTerm;
    }

    this.questionSv.fetchFilteredQuestion(url.toString())
      .subscribe((questions) => {
        this.questionsFiltered = questions;
      });
    this.displayType = 'filtered';
  }

  setupQuestions(questions: QuestionModel[]) {

    const qList = questions;
    const filteredQuestions = [];

    if (this.question) {
      for (const cat of this.categories) {

        if (cat.category === this.question.category) {
          cat.isVisible = true;
        }

      }
    }

    // Go through every question left which has a unique
    // category and subcategory
    for (let i = 0; i < qList.length; i = 0) {

      const q = qList[i];

      const subCategoryList = [q];
      const subcategories = {
        category: q.category,
        subCategory: q.subCategory,
        isVisible: false,
        questions: null
      };

      if (this.question) {
        if (q.topic === this.question.topic &&
          q.category === this.question.category &&
          q.subCategory === this.question.subCategory) {
          subcategories.isVisible = true;
        }
      }

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

    this.questionsByDifficulty = this.questions.sort((a, b) => {

      return a.decidedRank - b.decidedRank;
    });

    setTimeout(() => {

      if (this.questionId && this.question) {
        const el = document.getElementById(this.displayType + this.questionId);
        if (el) {
          (<HTMLElement>el).scrollIntoView({
            behavior: 'smooth',
            inline: 'center'
          });
        }
      }

    }, 100);

  }

  subcategories(category: string): {
    subCategory: string,
    category: string,
    isVisible: boolean,
    questions: QuestionModel[]
  }[] {

    const list = [];

    for (const subCat of this.subCategoryQuestions) {

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

    if (q === null) {
      this.router.navigate(['admin', 'questions', 'create'], {queryParams: {displayType: this.displayType}});
    } else {
      this.router.navigate(['admin', 'questions', q._id, 'edit'], {queryParams: {displayType: this.displayType}});
    }

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
