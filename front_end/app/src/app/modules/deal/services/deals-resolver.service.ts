import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Deal } from '../model/deal';
import { DealsService } from './deals.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/store/reducers/index';
import * as dealsSelectors from 'src/app/store/selectors/deals.selector';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealsResolverService implements Resolve<Deal[]> {

  constructor(
    private dealsService: DealsService,
    private store: Store<fromRoot.State>
  ) { }

  resolve(): Observable<Deal[]> {
    return this.store.select(dealsSelectors.getDeals).pipe(take(1));
  }
}
