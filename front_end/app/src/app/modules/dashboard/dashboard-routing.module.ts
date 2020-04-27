import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsResolverService } from '../clients/services/clients-resolver.service';
import { DealsResolverService } from '../deal/services/deals-resolver.service';
import { HomesResolverService } from '../homes/services/homes-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        resolve: {
          clients: ClientsResolverService,
          deals: DealsResolverService,
          homes: HomesResolverService
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
