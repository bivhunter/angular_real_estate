import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientsSortPipe } from './pipes/clients-sort.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientService } from './clients.service';
import { ClientsFilterPipe } from './pipes/clients-filter.pipe';
import { ClientsControlPanelComponent } from './components/clients-control-panel/clients-control-panel.component';
import { ClientsViewService } from './services/clients-view.service';
import { ClientsSortingService } from './services/clients-sorting.service';
import { ClientsFilteringService } from './services/clients-filtering.service';




@NgModule({
  declarations: [
    ClientCardComponent,
    ClientProfileComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsTableComponent,
    ClientsSortPipe,
    PhonePipe,
    ClientsFilterPipe,
    ClientsControlPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientsRoutingModule
  ],
  providers: [
    ClientService,
    ClientsViewService,
    ClientsSortingService,
    ClientsFilteringService
  ]
})
export class ClientsModule { }
