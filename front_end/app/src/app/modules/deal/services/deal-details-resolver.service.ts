import { Injectable } from '@angular/core';
import { DealsService } from './deals.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Deal } from '../model/deal';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/store/reducers/index';
import * as dealsSelectors from 'src/app/store/selectors/deals.selector';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealDetailsResolverService {

  constructor(
    private dealsService: DealsService,
    private store: Store<fromRoot.State>
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Deal> {
    const id = route.paramMap.get('id');
    return this.store.select(dealsSelectors.getDeal, id).pipe(
      take(1),
      tap((deal) => console.log(deal))
      );
  }
}
