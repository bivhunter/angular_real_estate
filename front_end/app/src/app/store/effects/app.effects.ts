import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as clientsAction from '../actions/clients.action';
import * as clientsApiAction from '../actions/clients-api.actions';
import * as homesApiAction from '../actions/homes-api.actions';
import * as dealsApiAction from '../actions/deals-api.actions';
import * as userApiAction from '../actions/user-api.actions';
import * as appApiAction from '../actions/app-api.actions';
import * as dealsActions from '../actions/deals.action';
import * as appActions from '../actions/app.actions';
import { switchMap, map, tap, merge, endWith, take, zip } from 'rxjs/operators';
import { ClientService } from 'src/app/modules/clients/services/clients.service';
import { Store } from '@ngrx/store';
import { HomesService } from './../../modules/homes/services/homes.service';
import { DealsService } from 'src/app/modules/deal/services/deals.service';
import { UserService } from './../../modules/user/services/user.service';
import { of } from 'rxjs';
import { User } from 'src/app/modules/user/model/user';

@Injectable()
export class AppEffects {

  initStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.initStore),
      tap(() => console.log('initSotre')),
      switchMap(() => this.clientsService.getClients().pipe(
        tap(clients => this.store.dispatch(clientsApiAction.getClientsSuccess({clients}))),
      )),
      switchMap(() => this.homesService.getHomes().pipe(
        tap(homes => this.store.dispatch(homesApiAction.getHomesSuccess({homes}))),
      )),
      switchMap(() => this.dealsService.getDeals().pipe(
        tap(deals => this.store.dispatch(dealsApiAction.getDealsSuccess({deals})))
      )),
      switchMap(() => this.userService.getUser().pipe(
        tap(user => this.store.dispatch(userApiAction.getUserSuccess({user: new User(user)})))
      )),

      map((res) => {
         // console.log(res);
          return userApiAction.initStoreSuccess();
      }),
      // endWith(userApiAction.initStoreSuccess()),
      // tap((res) => console.log(res))
    );
  });

  constructor(
    private actions$: Actions,
    private clientsService: ClientService,
    private homesService: HomesService,
    private dealsService: DealsService,
    private userService: UserService,
    private store: Store
  ) {}
}
