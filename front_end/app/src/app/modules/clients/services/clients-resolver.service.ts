import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Client } from '../model/client';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';

@Injectable({
  providedIn: 'root'
})
export class ClientsResolverService implements Resolve<Client[]> {

  constructor(
    private store: Store
  ) { }

  resolve(): Observable<Client[]> {
    return this.store.select(clientsSelector.getClients).pipe(
      filter(clients => !!clients),
      take(1)
    );
  }
}
