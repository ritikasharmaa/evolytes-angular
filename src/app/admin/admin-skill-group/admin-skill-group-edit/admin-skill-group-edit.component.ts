import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SkillGroupModel} from '../../../models/skillGroup.model';
import {SkillGroupService} from '../../../services/admin/skillGroup.service';
import {QuestionService} from '../../../services/question.service';
import {CultureModel} from '../../../models/localization/culture.model';
import {QuestionModel} from '../../../models/question.model';
import {ModalService} from '../../../root/modal.service';

@Component({
  selector: 'app-school-skill-group-edit',
  templateUrl: './admin-skill-group-edit.component.html',
  styleUrls: ['./admin-skill-group-edit.component.css']
})
export class AdminSkillGroupEditComponent implements OnInit {
  isEditMode = false;
  oldSkillGroup: SkillGroupModel = new SkillGroupModel();
  skillGroup: SkillGroupModel = new SkillGroupModel();
  searchFirstTermQuestion: String = '';
  filteredQuestions: QuestionModel[] = [];

  searchSecondTermQuestion: String = '';
  otherQuestions: QuestionModel[] = [];
  filteredOtherQuestions: QuestionModel[] = [];
  addOpen: Boolean = false;

  cultures = CultureModel.privateDropdownList();


  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalSrv: ModalService,
              private skillGroupSv: SkillGroupService,
              private questionSv: QuestionService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {

      if (params.skillGroupId) {
        this.isEditMode = true;

       this.skillGroupSv.fetchSkillGroupById(params.skillGroupId).subscribe((skillGroup) => {
         this.oldSkillGroup = skillGroup;
         this.skillGroup  = JSON.parse(JSON.stringify(this.oldSkillGroup));
          this.filteredQuestions = (this.skillGroup.questions as QuestionModel[]);
        });

      }
    });
  }

  onBackClicked() {
    this.router.navigate(['admin', 'skillGroups']);
  }

  onCreateClicked() {

    this.skillGroupSv.createSkillGroup(this.skillGroup).subscribe((skillGroup) => {
      this.router.navigate(['admin', 'skillGroups', skillGroup._id, 'edit']);
    });
  }

  onSaveClicked() {
    this.skillGroupSv.updateSkillGroup(this.skillGroup).subscribe((skillGroup) => {
      if (skillGroup) {
        this.modalSrv.showAlertModal('successful update', 'Everything is good');
        this.oldSkillGroup = skillGroup;
      }
    });

  }

  onRemovedClicked(index) {
    this.skillGroup.questions.splice(index, 1 );
    this.otherQuestions.push(this.otherQuestions[index]);
}

  onAddClick() {
    this.addOpen = !this.addOpen;

    if (this.addOpen && this.otherQuestions.length === 0 && this.isEditMode) {
    this.skillGroupSv.fetchOtherQuestions(this.skillGroup._id).subscribe((questions) => {
      this.otherQuestions = questions;
      this.filteredOtherQuestions = (this.otherQuestions as QuestionModel[]);


    });
    } else {
      if (this.addOpen && this.otherQuestions.length === 0 && !this.isEditMode) {
        const url: String = '/filtered-questions';
        this.questionSv.fetchFilteredQuestion( url.toString() ).subscribe((questions) => {
          this.otherQuestions = questions;
          this.filteredOtherQuestions = (this.otherQuestions as QuestionModel[]);
        });
      }
    }
  }

  onAddQuestionClick(index) {
    // @ts-ignore
    this.skillGroup.questions.push(this.otherQuestions[index]);
    this.otherQuestions.splice(index, 1);
  }


  onCancelClick() {
   this.skillGroup = JSON.parse(JSON.stringify(this.oldSkillGroup));
    this.addOpen = !this.addOpen;
  }

  onDeleteClick() {
    this.modalSrv.showChoiceModal('Delete', 'Are you shure you want to delete this skill group ?', 'Yes', 'No').subscribe( res => {
      if (res) {
        this.skillGroupSv.deleteSkillGroup(this.skillGroup._id).subscribe( (suppressedSkillGroup) => {
          if(suppressedSkillGroup){
            this.modalSrv.showAlertModal('Success', 'The skill group was successfully deleted').subscribe(() => {
              this.router.navigate(['admin', 'skillGroups']);
            });
          }
        });
      } else {
        this.modalSrv.showErrorModal('suppression failed', 'Something goes wrong during the deletion');
      }
    });
  }

  onFirstSearchClick() {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.filteredQuestions = (this.skillGroup.questions as QuestionModel[]).filter( item => item.name.includes(this.searchFirstTermQuestion));
  }

  onSecondSearchClick() {
  // @ts-ignore
    this.filteredOtherQuestions = this.otherQuestions.filter(item => item.name.includes(this.searchSecondTermQuestion));
  }

}
