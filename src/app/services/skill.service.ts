import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {SkillHistoryModel, SkillModel, SkillQueryModel} from '../models/skill.model';
import {Observable} from 'rxjs';
import {StudentModel} from '../models/authentication/student.model';
import {map} from 'rxjs/operators';
import {StringExtensionModel} from '../models/extensions/string-extension.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private authSv: AuthService) { }

  fetchSkills(query: SkillQueryModel): Observable<SkillModel[]> {

    let url = '/students/' + StudentModel.getCurrent()._id + '/skills';

    if (query) {
      url += StringExtensionModel.queryString(query);
    }

    return this.authSv.get(url).pipe(map((response) => {

      const skills = SkillModel.generateModels(response.data);

      return skills;

    }));

  }

  fetchSkillHistories(): Observable<SkillHistoryModel[]> {

    const url = '/students/' + StudentModel.getCurrent()._id + '/skillHistories';

    return this.authSv.get(url).pipe(map((response) => {

      const histories = SkillHistoryModel.generateModels(response.data);

      return histories;

    }));

  }

}
