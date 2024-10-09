import { Injectable } from '@angular/core';
import {AuthService} from '../auth.service';
import {PricingModel} from '../../models/pricing.model';
import {count, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPricingService {

  constructor(private authSv: AuthService) { }

  fetchPricing(country: string): Observable<PricingModel> {

    return this.authSv.get('/pricing/' + country, null, false).pipe(map((response) => {

      if (response.data) {

        const pricing = PricingModel.generate(response.data);

        return pricing;
      }

      return null;

    }));

  }

  updatePricing(pricing: PricingModel, country: string): Observable<PricingModel> {

    return this.authSv.patch('/pricing/' + country, pricing).pipe(map((response) => {

      const updatedPricing = PricingModel.generate(response.data);

      return updatedPricing;

    }));

  }

}
