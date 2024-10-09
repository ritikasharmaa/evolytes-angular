import { Injectable } from '@angular/core';
import {ObjectiveModel, ObjectiveFilter} from '../../models/objective.model';
import {AuthService} from '../auth.service';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {ErrorModel} from '../../models/shared/error.model';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  constructor(private authSv: AuthService) { }

  fetchObjectives(filter: ObjectiveFilter): Observable<ObjectiveModel[]> {

    let url = '/objective';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((objectivesReceived) => {
      return ObjectiveModel.generateModels(objectivesReceived.data);
    }));
  }

  fetchOneObjectivesWithDetails(objectiveId: string): Observable<ObjectiveModel> {
    return this.authSv.get('/objective/' + objectiveId + '?skillGroups=true').pipe(map(objectiveReceived => {
      const objective = ObjectiveModel.generateModel(objectiveReceived.data);
      return objective;
    }));
  }

  updateObjective(objective: ObjectiveModel): Observable<any> {
    return this.authSv.patch('/objective', objective).pipe(map(
      objectiveUpdated => {
        return objectiveUpdated;
      }));
  }

  deleteObjective(_id: string) {
    return this.authSv.delete('/objective/' + _id).pipe(map(objectiveDeleted => {
      return !!objectiveDeleted.data;
    }));
  }

  createObjective(objective: ObjectiveModel) {
    if (objective.level['en-GB'] && objective.level['en-US'] && objective.level['fr-FR'] && objective.level['is-IS']) {
      return this.authSv.post('/objective', objective).pipe(map(objectiveAdded => {
        return objectiveAdded;
      }));
    } else {
      return throwError(ErrorModel.generate({name: 'missing parameters', message: 'At least one translation is missing'}));
    }
  }
}
