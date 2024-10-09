import { Component, OnInit } from '@angular/core';
import {
  BookVersionIntegrationModel,
  BookVersionIntegrationQuestionModel,
  BookVersionIntegrationRewardModel,
  BookVersionModel
} from '../../../models/book-version.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BookVersionService} from '../../../services/book-version.service';
import {CultureModel} from '../../../models/localization/culture.model';
import {ModalService} from '../../../root/modal.service';
import {ErrorModel} from '../../../models/shared/error.model';
import {AdminSelectQuestionService} from '../../shared/admin-select-question/admin-select-question.service';
import {QuestionModel} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';
import {UserModel} from '../../../models/authentication/user.model';

@Component({
  selector: 'app-school-book-integration-edit',
  templateUrl: './admin-book-integration-edit.component.html',
  styleUrls: ['./admin-book-integration-edit.component.css']
})
export class AdminBookIntegrationEditComponent implements OnInit {

  isEditMode = false;

  bookId: string;
  versionId: string;
  bookVersion: BookVersionModel;
  questions: QuestionModel[] = [];
  integration: BookVersionIntegrationModel = new BookVersionIntegrationModel();
  IntegrationModel = BookVersionIntegrationModel;
  CultureModel = CultureModel;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private selectQSv: AdminSelectQuestionService,
              private modalSv: ModalService,
              private bookVersionSv: BookVersionService,
              private questionSv: QuestionService) { }

  ngOnInit() {

    this.integration.type = BookVersionIntegrationModel.IntegrationTypes.Exam;
    this.integration.passphraseType = BookVersionIntegrationModel.PassphraseTypes.none;

    this.route.params.subscribe((params) => {

      this.bookId = params.bookId;
      this.versionId = params.versionId;

      const integrationId = params.integrationId;
      if (integrationId) {
        this.isEditMode = true;
      } else {
        this.isEditMode = false;
      }

      this.bookVersionSv.fetchBookVersionById(this.bookId, this.versionId).subscribe((bookVersion) => {
        this.bookVersion = bookVersion;
        if (this.isEditMode) {
          this.integration = this.bookVersion.integrations.filter((integration) => integration._id === integrationId)[0];
        }
      });

      this.questionSv.fetchAdminQuestions(UserModel.getAdminCountry()).subscribe((questions) => {
        this.questions = questions;
      });

    });
  }

  getTitle() {

    if (this.isEditMode) {
      return 'Save';
    }

    return 'Create';
  }

  onSave() {
    if (this.isEditMode) {
      this.bookVersionSv.updateBookVersion(this.bookVersion, this.bookVersion.bookId).subscribe((updatedBookVersion) => {
        this.integration._id = this.findCreatedQRCode(updatedBookVersion);
        this.bookVersion = updatedBookVersion;
        this.modalSv.showAlertModal('Success', 'Book has been successfully updated').subscribe(() => {
          this.router.navigate(['admin', 'books', this.bookVersion.bookId, 'versions', this.bookVersion._id, 'edit']);
        });
      }, (error: ErrorModel) => {
        this.modalSv.showErrorModal('Error', error.message);
      });
    } else {
      this.bookVersion.integrations.push(this.integration);
      this.bookVersionSv.updateBookVersion(this.bookVersion, this.bookVersion.bookId).subscribe((updatedBookVersion) => {
        this.integration._id = this.findCreatedQRCode(updatedBookVersion);
        this.bookVersion = updatedBookVersion;
        this.modalSv.showAlertModal('Success', 'Integration was successfully created').subscribe(() => {
          this.router.navigate(['admin', 'books', this.bookVersion.bookId, 'versions', this.bookVersion._id, 'integrations', this.integration._id, 'edit']);
        });
      }, (error: ErrorModel) => {
        this.modalSv.showErrorModal('Error', error.message);
      });
    }
  }

  onDelete() {

  }

  /**
   *
   * Since we do not get the id of the QR code from the updated book version
   * we get all the data back so I made this method to find it easily.
   *
   * @param updatedBookVersion the new book version which has to be sent
   * before we set the current one.
   */
  findCreatedQRCode(updatedBookVersion: BookVersionModel): string {

    const currentIntegrationIds = [];
    for (const integration of this.bookVersion.integrations) {
      currentIntegrationIds.push(integration._id);
    }

    for (const integration of updatedBookVersion.integrations) {
      if (currentIntegrationIds.indexOf(integration._id) === -1) {
        return integration._id;
      }
    }

    return null;

  }

  onAddQuestionClicked() {
    this.selectQSv.show().subscribe((question) => {

      if (question) {
        const bookQuestion = new BookVersionIntegrationQuestionModel();
        bookQuestion.questionId = question._id;
        bookQuestion.numQuestions = 1;
        this.integration.questions.push(bookQuestion);
      }
    });
  }

  onDeleteQuestion(q: BookVersionIntegrationQuestionModel) {

    const index = this.integration.questions.indexOf(q);
    if (index > -1) {
      this.integration.questions.splice(index, 1);
    }

  }

  getQuestionName(qId: string): string {

    const q = this.getQuestionForId(qId);
    if (q) {
      return q.name;
    }

    return null;
  }

  getQuestionSubCategory(qId: string): string {

    const q = this.getQuestionForId(qId);
    if (q) {
      return q.subCategory;
    }

    return null;
  }

  getQuestionAnswerType(qId: string): string {

    const q = this.getQuestionForId(qId);
    if (q) {
      return q.answerType;
    }

    return null;
  }

  getQuestionRepresentation(qId: string): string {

    const q = this.getQuestionForId(qId);
    if (q) {
      return q.representation;
    }

    return null;
  }

  getQuestionForId(qId: string): QuestionModel {

    for (const q of this.questions) {
      if (q._id === qId) {
        return q;
      }
    }

    return null;
  }

  onAddRewardClicked() {
    const reward = new BookVersionIntegrationRewardModel();
    reward.uniqueId = '';
    reward.numItems = 0;
    this.integration.rewards.push(reward);
  }

  onDeleteReward(reward: BookVersionIntegrationRewardModel) {
    const index = this.integration.rewards.indexOf(reward);
    if (index !== -1) {
      this.integration.rewards.splice(index, 1);
    }
  }

}
