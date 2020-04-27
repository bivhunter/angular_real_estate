import { Injectable } from '@angular/core';
import { Client } from '../clients/model/client';
import { Deal } from '../deal/model/deal';
import { Home } from '../homes/model/home';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

type TDashboardData= {
  clients: Client[];
  deals: Deal[];
  homes: Home[];
}

export class DashboardResolverService implements Resolve<TDashboardData>{

  constructor() { }

  resolve(): Observable<TDashboardData> {
    const dashboardData: TDashboardData;
  }
}
