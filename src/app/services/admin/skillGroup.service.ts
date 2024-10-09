import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {SkillGroupFilter, SkillGroupModel} from '../../models/skillGroup.model';
import {QuestionModel} from '../../models/question.model';
import {generateQuestionList} from '../../models/questions/question-generator';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StringExtensionModel} from '../../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})

export class SkillGroupService {

  constructor(private authSv: AuthService) {
  }

  fetchSkillGroups(filter: SkillGroupFilter): Observable<SkillGroupModel[]> {

    let url = '/skillGroups';

    if (filter) {
      url += StringExtensionModel.queryString(filter);
    }

    return this.authSv.get(url).pipe(map((response) => {

      return SkillGroupModel.generateModels(response.data);

    }));
  }

  fetchSkillGroupById(skillGroupId: string): Observable<SkillGroupModel> {
    return this.authSv.get('/skillGroup/' + skillGroupId).pipe(map((response) => {
      return SkillGroupModel.generateModel(response.data);
    }));
  }


  createSkillGroup(skillGroup: SkillGroupModel): Observable<SkillGroupModel> {
    return this.authSv.post('/skillGroup', skillGroup).pipe(map((response) => {
      return SkillGroupModel.generateModel(response.data.skillGroup);
    }));
  }

  fetchOtherQuestions(skillGroupId: string): Observable<QuestionModel[]> {
    return this.authSv.get('/skillGroup/' + skillGroupId + '/otherQuestions').pipe(map((response) => {
      return generateQuestionList(response.data);
    }));
  }

  updateSkillGroup(skillGroup: SkillGroupModel): Observable<SkillGroupModel> {
    return this.authSv.patch('/skillGroup/' + skillGroup._id, skillGroup).pipe(map((response) => {
      return SkillGroupModel.generateModel(response.data);
    }));
  }

  deleteSkillGroup(skillGroupId: string): Observable<SkillGroupModel> {
    return this.authSv.delete('/skillGroup/' + skillGroupId).pipe(map((response) => {
      return SkillGroupModel.generateModel(response.data);
    }));
  }

  fetchSkillGroupsNotInList(list: string[]): Observable<SkillGroupModel[]> {
    return this.authSv.get('/skillGroups').pipe(map(skillGroupsReceived => {
      const skillGroups: SkillGroupModel[] = SkillGroupModel.generateModels(skillGroupsReceived.data);
      return skillGroups.filter(item => !list.includes(item._id));
    }));
  }
}
