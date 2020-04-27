import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Client } from '../model/client';
import { Observable } from 'rxjs';
import { ClientService } from './clients.service';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsResolverService implements Resolve<Client[]> {

  constructor(
    private clientService: ClientService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client[]> {
    return this.clientService.getClients().pipe();
  }
}
