import { Injectable } from '@angular/core';
import * as DealsActions from 'src/app/store/actions/deals.action';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/store/reducers/index';

@Injectable({
  providedIn: 'root'
})
export class InitDataService {

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  initData(): void {
    this.store.dispatch(DealsActions.loadDeals());
  }
}
