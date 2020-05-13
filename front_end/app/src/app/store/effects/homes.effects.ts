import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as homesAction from '../actions/homes.action';
import * as clientsAction from '../actions/clients.action';
import * as homesApiAction from '../actions/homes-api.actions';
import * as clientsApiAction from '../actions/clients-api.actions';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { HomesService } from 'src/app/modules/homes/services/homes.service';
import { ClientService } from 'src/app/modules/clients/services/clients.service';

@Injectable()
export class HomesEffects {

  loadHomes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.loadHomes),
      switchMap(() => this.homesService.getHomes()),
      map(
        homes => {
          return homesApiAction.getHomesSuccess({homes});
        }
      )
    );
  });

  viewMode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.setViewMode),
      map(
        ({viewMode}) => {
          localStorage.setItem('viewHomesMode', viewMode);
          return homesApiAction.setViewModeSuccess({viewMode});
        }
      )
    );
  });

  addHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.addHome),
      switchMap(({home}) => {
        return this.homesService.addHome(home);
      }),
      map(home => {
        return homesApiAction.addHomeSuccess({home});
      })
    );
  });

  updateHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.updateHome),
      switchMap(({home}) => {
        return this.homesService.updateHome(home);
      }),
      map(home => {
        return homesApiAction.updateHomeSuccess({home});
      })
    );
  });

  deleteHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.deleteHome),
      switchMap(({id}) => {
        return this.homesService.deleteHome(id);
      }),
      map(home => {
        return homesApiAction.deleteHomeSuccess({id: home.id});
      })
    );
  });

  addClientToHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.addClientToHome),
      switchMap(({homeId, clientId}) => {
        return this.clientsService.addHomeToClient(homeId, clientId);
      }),
      switchMap(client => this.clientsService.getClient(client.id)),
      map(client => {
        return clientsApiAction.updateClientSuccess({client});
      })
    );
  });

  constructor(
    private actions$: Actions,
    private homesService: HomesService,
    private clientsService: ClientService
  ) {}
}
