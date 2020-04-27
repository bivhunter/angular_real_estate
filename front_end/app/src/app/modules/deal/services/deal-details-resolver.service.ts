import { Injectable } from '@angular/core';
import { DealsService } from './deals.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Deal } from '../model/deal';

@Injectable({
  providedIn: 'root'
})
export class DealDetailsResolverService {

  constructor(
    private dealsService: DealsService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Deal> {
    const id = route.paramMap.get('id');
    return this.dealsService.getDeal(id);
  }
}
