import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionModel} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-evo-admin-sidebar-filter-question',
  templateUrl: './evo-admin-sidebar-filter-question.component.html',
  styleUrls: ['./evo-admin-sidebar-filter-question.component.css']
})
export class EvoAdminSidebarFilterQuestionComponent implements OnInit {

  listSubject = QuestionModel.SubjectTypes.dropdownList().sort((a, b) => a.value.localeCompare(b.value));
  listCategory = QuestionModel.CategoryTypes.dropdownList().sort((a, b) => a.value.localeCompare(b.value));
  listSubCategory = QuestionModel.SubCategoryTypes.dropdownList().sort((a, b) => a.value.localeCompare(b.value));
  listTopic = QuestionModel.TopicTypes.dropdownList().sort((a, b) => a.value.localeCompare(b.value));
  listRepresentation = QuestionModel.RepresentationTypes.dropdownList().sort((a, b) => a.value.localeCompare(b.value));
  listAnswerType = QuestionModel.AnswerTypes.dropdownList().sort((a, b) => a.value.localeCompare(b.value));
  listIsPublished: {key: string, value: string, iconURL: string}[] = [
    {key: 'true', value: 'published', iconURL: null},
    {key: null, value: 'not matter', iconURL: null},
    {key: 'false', value: 'not published', iconURL: null}
  ];

  subjectSelected: string;
  categorySelected: string;
  subCategorySelected: string;
  topicSelected: string;
  representationSelected: string[] = [];
  answerTypesSelected: string[] = [];
  isPublishedSelected: string = null;

  @Output() onClickFilter = new EventEmitter<QuestionModel[]>();
  @Output() onChangeDisplay = new EventEmitter<string>();
  @Input() nameSelected: string = null;

  constructor(private questionSv: QuestionService) {
  }

  ngOnInit() {
  }

  onCancelClicked() {
    this.subjectSelected = null;
    this.categorySelected = null;
    this.subCategorySelected = null;
    this.topicSelected = null;
    this.representationSelected = [];
    this.answerTypesSelected = [];
    this.isPublishedSelected = null;
  }

  onFilterClicked() {

    let url: String = '/filtered-questions';
    const sizeWithoutQuery: number = url.length;

    if (this.subjectSelected) {
      url = url + '?subject=' + this.subjectSelected;
    }

    if (this.categorySelected) {
      if (url.length === sizeWithoutQuery) {
        url = url + '?category=' + this.categorySelected;
      } else {
        url = url + '&category=' + this.categorySelected;
      }
    }

    if (this.subCategorySelected) {
      if (url.length === sizeWithoutQuery) {
        url = url + '?subCategory=' + this.subCategorySelected;
      } else {
        url = url + '&subCategory=' + this.subCategorySelected;
      }
    }

    if (this.topicSelected) {
      if (url.length === sizeWithoutQuery) {
        url = url + '?topic=' + this.topicSelected;
      } else {
        url = url + '&topic=' + this.topicSelected;
      }
    }

    if (this.representationSelected.length !== 0) {
      if (url.length === sizeWithoutQuery) {
        url = url + '?representations=';
      } else {
        url = url + '&representations=';
      }
      url = url + this.representationSelected.join(',');
    }

    if (this.answerTypesSelected.length !== 0) {
      if (url.length === sizeWithoutQuery) {
        url = url + '?answerTypes=';
      } else {
        url = url + '&answerTypes=';
      }
      url = url + this.answerTypesSelected.join(',');
    }

    if (this.isPublishedSelected !== null) {
      if (url.length === sizeWithoutQuery) {
        url = url + '?isPublished=' + this.isPublishedSelected.toString();
      } else {
        url = url + '&isPublished=' + this.isPublishedSelected.toString();
      }
    }

    if (this.nameSelected && this.nameSelected !== '') {
      if (url.length === sizeWithoutQuery) {
        url = url + '?name=' + this.nameSelected;
      } else {
        url = url + '&name=' + this.nameSelected;
      }
    }

    this.onChangeDisplay.emit('filtered');
    this.questionSv.fetchFilteredQuestion(url.toString()).subscribe((questions) => {
      this.onClickFilter.emit(questions);
      this.onChangeDisplay.emit('filtered');
    });

  }

}
