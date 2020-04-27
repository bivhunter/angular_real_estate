import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Deal } from '../model/deal';
import { DealsService } from './deals.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealsResolverService implements Resolve<Deal[]> {

  constructor(
    private dealsService: DealsService
  ) { }

  resolve(): Observable<Deal[]> {
    return this.dealsService.getDeals();
  }
}
