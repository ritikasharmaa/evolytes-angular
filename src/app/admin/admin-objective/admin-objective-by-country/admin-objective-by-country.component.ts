import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ObjectiveModel} from '../../../models/objective.model';
import {DescriptionModel} from '../../../models/shared/description.model';
import {UserModel} from '../../../models/authentication/user.model';

@Component({
  selector: 'app-admin-objective-by-country',
  templateUrl: './admin-objective-by-country.component.html',
  styleUrls: ['./admin-objective-by-country.component.css']
})
export class AdminObjectiveByCountryComponent implements OnInit {

  constructor() { }

  @Input() treeObjective: [string, {objs: ObjectiveModel[], isVisible: boolean}] []
    = new Array<[string, {objs: ObjectiveModel[], isVisible: boolean}]>();
  @Output() outputObjective = new EventEmitter<ObjectiveModel>();

  ngOnInit() {
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

  cultureLevel(level: DescriptionModel) {
    return level[UserModel.getCurrent().culture];
  }

  onObjectiveClicked(obj: ObjectiveModel) {
    this.outputObjective.emit(obj);
  }
}
