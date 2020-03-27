import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientsComponent } from './clients.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientsSortPipe } from './pipes/clients-sort.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientService } from './client.service';




@NgModule({
  declarations: [
    ClientCardComponent,
    ClientProfileComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsTableComponent,
    ClientsSortPipe,
    PhonePipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientsRoutingModule
  ],
  providers: [
    ClientService
  ]
})
export class ClientsModule { }
