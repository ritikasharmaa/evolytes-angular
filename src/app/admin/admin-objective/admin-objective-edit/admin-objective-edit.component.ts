import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ObjectiveService} from '../../../services/admin/objective.service';
import {ObjectiveModel} from '../../../models/objective.model';
import {EvoLangDropdownComponent} from '../../../shared/evo-lang-dropdown/evo-lang-dropdown.component';
import {SkillGroupModel} from '../../../models/skillGroup.model';
import {SkillGroupService} from '../../../services/admin/skillGroup.service';
import {DescriptionModel} from '../../../models/shared/description.model';
import {UserModel} from '../../../models/authentication/user.model';
import {CultureModel} from '../../../models/localization/culture.model';
import {ModalService} from '../../../root/modal.service';

@Component({
  selector: 'app-admin-objective-edit',
  templateUrl: './admin-objective-edit.component.html',
  styleUrls: ['./admin-objective-edit.component.css']
})
export class AdminObjectiveEditComponent implements OnInit {

  objective: ObjectiveModel = new ObjectiveModel();
  oldObjective: ObjectiveModel = new ObjectiveModel();
  filteredSkillGroup: SkillGroupModel[] = [];

  allSkillGroups: SkillGroupModel[] = [];
  skillGroupsToAdd: SkillGroupModel[] = [];
  filteredSkillGroupToAdd: SkillGroupModel[] = [];
  list: string |SkillGroupModel[]=[];
  // true if update, false if create
  editMode: Boolean = false;
  errorMessage: String = '';
  addOpen: Boolean = false;

  searchFirstTermSkillGroup: String = '';
  searchSecondTermSkillGroup: String = '';

  CultureTypes = EvoLangDropdownComponent.Types;
  adminCulture = UserModel.getCurrent().culture;

  // TODO : ask if you can use the dropdown list
  cultures: { key: string, value: string, iconURL: string }[] = [
    CultureModel.enUSDropdown,
    CultureModel.enGBDropdown,
    CultureModel.isISDropdown,
    CultureModel.frFRDropdown
  ];

  constructor(
    private objectiveSrv: ObjectiveService,
    private skillGroupSrv: SkillGroupService,
    private modalSrv: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {
      if (params.displayType === 'edit') {
        this.editMode = true;
      }
    });

    if (this.editMode) {
      const objectiveId: string = String(this.route.snapshot.paramMap.get('objectiveId'));
      this.objectiveSrv.fetchOneObjectivesWithDetails(objectiveId).subscribe(response => {
        this.objective = response;
        this.oldObjective = JSON.parse(JSON.stringify(response));
        this.editMode = true;
        this.filteredSkillGroup = (this.objective.skillGroups as SkillGroupModel[]);
      });
    } else {
      this.skillGroupSrv.fetchSkillGroups(null).subscribe(skillGroups => {
          this.allSkillGroups = skillGroups;
          this.skillGroupsToAdd = skillGroups;
          this.onSecondSearchClick();
        }
      );
    }
  }

  onSaveClicked() {
    if (this.editMode) {
      this.updateObjective();
    } else {
      this.createObjective();
    }
  }

  updateObjective() {
    this.objectiveSrv.updateObjective(this.objective).subscribe(response => {
      if (response.data) {
        this.modalSrv.showAlertModal('successful update', 'Everything is good');
        this.oldObjective = JSON.parse(JSON.stringify(this.objective));
      }
    },
      error => {
        this.modalSrv.showErrorModal('updated failed', error.message);
      });
  }

  createObjective() {
    this.objectiveSrv.createObjective(this.objective).subscribe(response => {
      if (response.data) {
        this.modalSrv.showAlertModal('successful create', 'Everything is good');
      }
    },
      error => {
      this.modalSrv.showErrorModal('creation failed', error.message);
      });
  }

  onCancelClick() {
    this.objective = JSON.parse(JSON.stringify(this.oldObjective));
    const list = (this.oldObjective.skillGroups as SkillGroupModel[]).map(item => {
      if ('_id' in item) {
        return item._id;
      } else {
        return item;
      }
    });
    this.skillGroupsToAdd = this.allSkillGroups.filter(item => !list.includes(item._id));
    this.onFirstSearchClick();
    this.onSecondSearchClick();
  }

  onSkillGroupClick(skillGroup: SkillGroupModel) {
    this.router.navigate(['admin', 'skillGroups', skillGroup._id , 'edit']);
  }

  onAddClick(comeFromCancel: Boolean = false) {
    if (!comeFromCancel) {
      this.addOpen = !this.addOpen;
    }
    this.skillGroupSrv.fetchSkillGroups(null).subscribe(skillGroups => {
        this.allSkillGroups = skillGroups;
        const list= (this.objective.skillGroups as SkillGroupModel[]).map(item => {
          if ('_id' in item) {
            return item._id;
          } else {
            return item;
          }
        });
        this.skillGroupsToAdd = this.allSkillGroups.filter(item => !list.includes(item._id));
        this.onSecondSearchClick();
      }
    );
  }

  onSuppressSkillGroupClick(skillGroup: SkillGroupModel) {
    if ('_id' in skillGroup) {
      this.objective.skillGroups = (this.objective.skillGroups as SkillGroupModel[]).filter(item => item._id !== skillGroup._id);
      if (this.addOpen) {
        this.skillGroupsToAdd.push(skillGroup);
      }
    }
    this.onFirstSearchClick();
    this.onSecondSearchClick();
  }

  onAddSkillGroupClick(skillGroup: SkillGroupModel) {
    if ('_id' in skillGroup) {
      (this.objective.skillGroups as SkillGroupModel[]).push(skillGroup);
      this.skillGroupsToAdd = this.skillGroupsToAdd.filter(item => item._id !== skillGroup._id);
    }
    this.onFirstSearchClick();
    this.onSecondSearchClick();
  }

  cultureSkillGroupName(name: DescriptionModel): string {
    return name[UserModel.getCurrent().culture];
  }

  onDeleteClick() {
    this.modalSrv.showChoiceModal(
      'Delete', 'Are you sure you want to delete the objective ?', 'yes', 'no'
    ).subscribe(res => {
      if (res) {
        this.objectiveSrv.deleteObjective(this.objective._id).subscribe(resultSuppression => {
          if (resultSuppression) {
            this.modalSrv.showAlertModal('Success', 'The objective was successfully deleted').subscribe(() => {
              this.router.navigate(['admin', 'objectives']);
            });
          } else {
            this.modalSrv.showErrorModal('suppression failed', 'Something goes wrong during the deletion');
          }
        });
      }
    });
  }

  onFirstSearchClick() {
    this.filteredSkillGroup =
      (this.objective.skillGroups as SkillGroupModel[]).filter(item =>
        item.name[UserModel.getCurrent().culture].includes(this.searchFirstTermSkillGroup)
      );
  }

  onSecondSearchClick() {
    this.filteredSkillGroupToAdd =
      this.skillGroupsToAdd.filter(item =>
        item.name[UserModel.getCurrent().culture].includes(this.searchSecondTermSkillGroup)
      );
  }
}
