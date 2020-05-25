import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsControlPanelComponent } from './components/clients-control-panel/clients-control-panel.component';




@NgModule({
  declarations: [
    ClientCardComponent,
    ClientProfileComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsTableComponent,
    ClientsControlPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientsRoutingModule,
  ],
  providers: [
  ]
})
export class ClientsModule { }
