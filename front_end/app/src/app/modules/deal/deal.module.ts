import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealRoutingModule } from './deal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DealsComponent } from './components/deals/deals.component';
import { DealCardComponent } from './components/deal-card/deal-card.component';
import { DealCreatorComponent } from './components/deal-creator/deal-creator.component';
import { DealsControlPanelComponent } from './components/deals-control-panel/deals-control-panel.component';
import { DealsListComponent } from './components/deals-list/deals-list.component';
import { DealsTableComponent } from './components/deals-table/deals-table.component';
import { DealsViewService } from './services/deals-view.service';


@NgModule({
  declarations: [
    DealsComponent,
    DealCardComponent,
    DealCreatorComponent,
    DealsControlPanelComponent,
    DealsListComponent,
    DealsTableComponent],
  imports: [
    CommonModule,
    DealRoutingModule,
    SharedModule
  ],
  providers: [
    DealsViewService
  ]

})
export class DealModule { }
