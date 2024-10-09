import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {UserModel} from '../../../models/authentication/user.model';
import {QuestionModel} from '../../../models/question.model';
import {forkJoin} from 'rxjs';
import {ErrorModel} from '../../../models/shared/error.model';
import {ModalService} from '../../../root/modal.service';
import {questionFromSubcategory} from '../../../models/questions/question-generator';
import {CultureModel} from '../../../models/localization/culture.model';
import {CountryModel} from '../../../models/localization/country.model';

@Component({
  selector: 'app-evo-school-q-edit',
  templateUrl: './evo-admin-q-edit.component.html',
  styleUrls: ['./evo-admin-q-edit.component.css']
})
export class EvoAdminQEditComponent implements OnInit {

  UserModel = UserModel;
  QuestionModel = QuestionModel;
  question = new QuestionModel();
  isEditMode = false;
  catTree: object = null;
  representationTree: object = null;
  answerTypes = [{ key: 'input', value: 'input', iconURL: null },
    { key: 'multipleChoice', value: 'multipleChoice', iconURL: null },
    { key: 'interaction', value: 'interaction', iconURL: null }];
  starterQuestionTypes = [{ key: 'false', value: 'false', iconURL: null }, { key: 'true', value: 'true', iconURL: null }];

  topic: string = null;
  category: string = null;
  subCategory: string = null;

  cultures = CultureModel.privateDropdownList();
  countries = CountryModel.privateDropdownList();

  displayType: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private questionSv: QuestionService,
              private modalSv: ModalService) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {

      this.displayType = params.displayType;

    });

    this.route.params.subscribe((params) => {

      const fetchQCategories = this.questionSv.fetchQuestionCategoryTree();
      const fetchQRepresentations = this.questionSv.fetchQuestionRepresentationTree();

      const endpoints = [fetchQCategories, fetchQRepresentations];

      const qId = params['questionId'];
      if (qId !== null && qId !== undefined) {
        this.isEditMode = true;
        const fetchQ = this.questionSv.fetchQuestion(qId);
        endpoints.push(fetchQ);
      } else {
        this.isEditMode = false;
      }

      forkJoin(endpoints).subscribe((data) => {

        this.catTree = data[0];
        this.representationTree = data[1];

        if (data[2]) {
          this.question = <QuestionModel>data[2];
          this.topic = this.question.topic;
          this.category = this.question.category;
          this.subCategory = this.question.subCategory;
        }

      });

    });

  }

  getTopics(): { key: string, value: string, iconURL: string }[] {

    if (this.catTree) {

      const list = [];
      for (const key of Object.keys(this.catTree)) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;
    }

    return [];

  }

  setTopic(topic: string) {

    if (this.isEditMode === false) {
      this.topic = topic;
      this.category = null;
      this.subCategory = null;
    }

  }

  getCategories(): { key: string, value: string, iconURL: string }[] {

    if (this.catTree && this.topic) {

      const categories = this.catTree[this.topic];

      const list = [];
      for (const key of Object.keys(categories)) {
        list.push({ key: key, value: key, iconURL: null });
      }

      return list;

    }

    return [];
  }

  setCategory(category: string) {

    if (this.isEditMode === false) {
      this.category = category;
      this.subCategory = null;
    }


  }

  getSubcategories(): { key: string, value: string, iconURL: string }[] {

    if (this.catTree && this.topic && this.category) {

      const categories = this.catTree[this.topic];
      if (categories) {

        const list = [];
        const subcategories = categories[this.category];
        for (const key of Object.keys(subcategories)) {
          list.push({ key: key, value: key, iconURL: null });
        }

        return list;

      }

    }

    return [];
  }

  setSubcategory(subcat: string) {

    if (this.isEditMode === false) {

      this.subCategory = subcat;
      const q = questionFromSubcategory(this.topic, this.category, this.subCategory);
      q.representation = this.question.representation;
      q.answerType = this.question.answerType;
      q.name = this.question.name;
      q.descriptions = this.question.descriptions;
      q.audioHelp = this.question.audioHelp;
      q.videoHelp = this.question.videoHelp;
      this.question = q;

    }

  }

  getRepresentations(): { key: string, value: string, iconURL: string }[] {

    if (this.representationTree &&
      this.topic &&
      this.category &&
      this.subCategory) {

      if (this.representationTree[this.topic]) {

        if (this.representationTree[this.topic][this.category]) {

          const list = [];
          const repTree = this.representationTree[this.topic][this.category][this.subCategory];
          if (repTree) {
            for (const key of repTree) {
              list.push({ key: key, value: key, iconURL: null });
            }
          }

          return list;

        }

      }

    }

    return [];

  }

  getPublishButtonTitle(): string {

    if (this.question.isPublished) {

      return 'Unpublish';
    }

    return 'Publish';
  }

  getAdminCountry(): string {

    if (this.isEditMode && this.question) {

      return this.question.country;
    }

    return UserModel.getAdminCountry();
  }

  getIsStarterQuestionString(): string {

    if (this.question) {
      if (this.question.isStarterQuestion) {
        return 'true';
      }
    }

    return 'false';
  }

  saveButtonTitle() {

    if (this.isEditMode === true) {

      return 'Save';
    }

    return 'Create';
  }

  setStarterQuestion(value: string) {
    if (value === 'false') {
      this.question.isStarterQuestion = false;
    } else if (value === 'true') {
      this.question.isStarterQuestion = true;
    }
  }

  onBackClicked() {

    this.router.navigate(['admin', 'questions'], { queryParams: { displayType: this.displayType, questionId: this.question._id } });

  }

  onPublishClicked() {

    this.modalSv.showChoiceModal('Publishing',
      'Are you sure you want to publish this question?',
      'Yes',
      'No').subscribe((response) => {

      if (response === true) {
        const publishedState = !this.question.isPublished;
        this.questionSv.publishQuestion(this.question._id, publishedState)
          .subscribe((q) => {

            this.modalSv.showAlertModal('Success',
              'Question publish status changed successfully');
            this.question = q;

          });
      }

    });

  }

  onSaveClicked() {

    this.question.country = UserModel.getAdminCountry();

    if (this.isEditMode) {
      this.questionSv.updateQuestion(this.question).subscribe((q) => {
        this.question = q;
        this.modalSv.showAlertModal('Success', 'The question was successfully saved').subscribe(() => {
          this.router.navigate(['admin', 'questions'], { queryParams: { displayType: this.displayType, questionId: this.question._id } });
        });
      }, (err: ErrorModel) => {
        this.modalSv.showErrorModal('Error', err.message);
      });
    } else {
      this.questionSv.createQuestion(this.question).subscribe((q) => {
        this.question = q;
        this.modalSv.showAlertModal('Success', 'The question was successfully created').subscribe((r) => {
          this.router.navigate(['admin', 'questions'], { queryParams: { displayType: this.displayType, questionId: this.question._id } });
        });
      }, (err: ErrorModel) => {
        this.modalSv.showErrorModal('Error', err.message);
      });
    }

  }

  onDeleteClicked() {

    this.modalSv.showErrorModal('Warning',
      'You are about to permanently delete a question, are you sure you want to proceed?', 'No', 'Yes')
      .subscribe((response) => {

        if (response === false) {
          this.questionSv.deleteQuestion(this.question._id).subscribe((q) => {
            this.modalSv.showAlertModal('Success', 'The question was successfull deleted').subscribe((r) => {
              this.router.navigate(['admin', 'questions']);
            });
          });
        }

      });

  }

}
