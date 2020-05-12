import { Injectable } from '@angular/core';
import * as dealsActions from 'src/app/store/actions/deals.action';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/store/reducers/index';
import * as homesActions from 'src/app/store/actions/homes.action';
import * as clientsActions from 'src/app/store/actions/clients.action';
import * as userActions from 'src/app/store/actions/user.actions';


@Injectable({
  providedIn: 'root'
})
export class InitDataService {

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  initData(): void {
    this.store.dispatch(homesActions.loadHomes());
    this.store.dispatch(dealsActions.loadDeals());
    this.store.dispatch(clientsActions.loadClients());
    this.store.dispatch(userActions.getUser());
  }
}
