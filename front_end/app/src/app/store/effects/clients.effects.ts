import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as clientsAction from '../actions/clients.action';
import * as clientsApiAction from '../actions/clients-api.actions';
import * as dealsActions from '../actions/deals.action';
import { switchMap, map, tap } from 'rxjs/operators';
import { ClientService } from 'src/app/modules/clients/services/clients.service';
import { Store } from '@ngrx/store';
import { ProgressBarService } from 'src/app/modules/shared/services/progress-bar.service';

@Injectable()
export class ClientsEffects {

  loadClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.loadClients),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(() => this.clientsService.getClients()),
      map(
        clients => {
          this.progressBarService.closeProgressBar();
          return clientsApiAction.getClientsSuccess({clients});
        }
      )
    );
  });

  viewMode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.setViewMode),
      map(
        ({viewMode}) => {
          localStorage.setItem('viewClientsMode', viewMode);
          return clientsApiAction.setViewModeSuccess({viewMode});
        }
      )
    );
  });

  addClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.addClient),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({client}) => {
        return this.clientsService.addClient(client);
      }),
      switchMap(client => {
        return this.clientsService.getClient(client.id);
      }),
      map(client => {
        this.progressBarService.closeProgressBar();
        return clientsApiAction.addClientSuccess({client});
      })
    );
  });

  updateClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.updateClient),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({client}) => {
        return this.clientsService.updateClient(client);
      }),
      switchMap(client => {
        return this.clientsService.getClient(client.id);
      }),
      map(client => {
        this.progressBarService.closeProgressBar();
        return clientsApiAction.updateClientSuccess({client});
      })
    );
  });

  deleteClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.deleteClient),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({id}) => {
        return this.clientsService.deleteClient(id);
      }),
      map(client => {
        this.store.dispatch(dealsActions.loadDeals());
        this.progressBarService.closeProgressBar();
        return clientsApiAction.deleteClientSuccess({id: client.id});
      })
    );
  });

  addHomeToClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.addHomeToClient),
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
    private clientsService: ClientService,
    private store: Store,
    private progressBarService: ProgressBarService
  ) {}
}
