import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Client } from '../model/client';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileResolverService implements Resolve<Client> {

  constructor(
    private store: Store
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    const id = route.paramMap.get('id');
    return this.store.select(clientsSelector.getClient, id);
  }
}
