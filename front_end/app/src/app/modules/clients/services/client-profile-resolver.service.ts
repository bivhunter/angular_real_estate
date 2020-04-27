import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Client } from '../model/client';
import { Observable } from 'rxjs';
import { ClientService } from './clients.service';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileResolverService implements Resolve<Client> {

  constructor(
    private clientService: ClientService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    const id = route.paramMap.get('id');
    return this.clientService.getClient(id);
  }
}
