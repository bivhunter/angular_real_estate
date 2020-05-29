import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as homesAction from '../actions/homes.action';
import * as clientsAction from '../actions/clients.action';
import * as homesApiAction from '../actions/homes-api.actions';
import * as clientsApiAction from '../actions/clients-api.actions';
import { switchMap, map, mergeMap, tap } from 'rxjs/operators';
import { HomesService } from 'src/app/modules/homes/services/homes.service';
import { ClientService } from 'src/app/modules/clients/services/clients.service';
import { ProgressBarService } from 'src/app/modules/shared/services/progress-bar.service';
import { Store } from '@ngrx/store';

@Injectable()
export class HomesEffects {

  loadHomes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.loadHomes),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(() => this.homesService.getHomes()),
      map(
        homes => {
          this.progressBarService.closeProgressBar();
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
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({home}) => {
        return this.homesService.addHome(home);
      }),
      map(home => {
        this.progressBarService.closeProgressBar();
        return homesApiAction.addHomeSuccess({home});
      })
    );
  });

  updateHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.updateHome),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({home}) => {
        return this.homesService.updateHome(home);
      }),
      map(home => {
        this.progressBarService.closeProgressBar();
        return homesApiAction.updateHomeSuccess({home});
      })
    );
  });

  deleteHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.deleteHome),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({id}) => {
        return this.homesService.deleteHome(id);
      }),
      map(home => {
        this.progressBarService.closeProgressBar();
        this.store.dispatch(clientsAction.loadClients());
        return homesApiAction.deleteHomeSuccess({id: home.id});
      })
    );
  });

  addClientToHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.addClientToHome),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({homeId, clientId}) => {
        return this.clientsService.addHomeToClient(homeId, clientId);
      }),
      switchMap(client => this.clientsService.getClient(client.id)),
      map(client => {
        this.progressBarService.closeProgressBar();
        return clientsApiAction.updateClientSuccess({client});
      })
    );
  });

  constructor(
    private actions$: Actions,
    private homesService: HomesService,
    private clientsService: ClientService,
    private progressBarService: ProgressBarService,
    private store: Store
  ) {}
}
