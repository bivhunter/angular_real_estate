import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { PhonePipe } from './pipes/phone.pipe';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsControlPanelComponent } from './components/clients-control-panel/clients-control-panel.component';
import { ClientsViewService } from './services/clients-view.service';
import { ClientsSortingService } from './services/clients-sorting.service';
import { ClientsPopupDeletingComponent } from './components/clients-popup-deleting/clients-popup-deleting.component';




@NgModule({
  declarations: [
    ClientCardComponent,
    ClientProfileComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsTableComponent,
    PhonePipe,
    ClientsControlPanelComponent,
    ClientsPopupDeletingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientsRoutingModule,
  ],
  providers: [
    ClientsViewService,
    ClientsSortingService,
  ]
})
export class ClientsModule { }
