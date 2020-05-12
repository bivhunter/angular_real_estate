import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as clientsAction from '../actions/clients.action';
import * as clientsApiAction from '../actions/clients-api.actions';
import { switchMap, map } from 'rxjs/operators';
import { ClientService } from 'src/app/modules/clients/services/clients.service';

@Injectable()
export class ClientsEffects {

  loadClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.loadClients),
      switchMap(() => this.clientsService.getClients()),
      map(
        clients => {
          console.log(clients);
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
      switchMap(({client}) => {
        console.log(client);
        return this.clientsService.addClient(client);
      }),
      map(client => {
        console.log(client);
        return clientsApiAction.addClientSuccess({client});
      })
    );
  });

  updateClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.updateClient),
      switchMap(({client}) => {
        console.log(client);
        return this.clientsService.updateClient(client);
      }),
      map(client => {
        console.log(client);
        return clientsApiAction.updateClientSuccess({client});
      })
    );
  });

  deleteClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientsAction.deleteClient),
      switchMap(({id}) => {
        return this.clientsService.deleteClient(id);
      }),
      map(client => {
        return clientsApiAction.deleteClientSuccess({id: client.id});
      })
    );
  });

  constructor(
    private actions$: Actions,
    private clientsService: ClientService
  ) {}
}
