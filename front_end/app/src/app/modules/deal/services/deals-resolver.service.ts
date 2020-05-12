import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Deal } from '../model/deal';
import { DealsService } from './deals.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as dealsSelectors from 'src/app/store/selectors/deals.selector';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealsResolverService implements Resolve<Deal[]> {

  constructor(
    private dealsService: DealsService,
    private store: Store
  ) { }

  resolve(): Observable<Deal[]> {
    return this.store.select(dealsSelectors.getDeals).pipe(take(1));
  }
}
