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
import { DealsDetailsComponent } from './components/deals-details/deals-details.component';
import { DealsClientsSelectorComponent } from './components/deals-clients-selector/deals-clients-selector.component';
import { DealsHomesSelectorComponent } from './components/deals-homes-selector/deals-homes-selector.component';
import { DealsMakingDealComponent } from './components/deals-making-deal/deals-making-deal.component';


@NgModule({
  declarations: [
    DealsComponent,
    DealCardComponent,
    DealCreatorComponent,
    DealsControlPanelComponent,
    DealsListComponent,
    DealsTableComponent,
    DealsDetailsComponent,
    DealsClientsSelectorComponent,
    DealsHomesSelectorComponent,
    DealsMakingDealComponent],
  imports: [
    CommonModule,
    DealRoutingModule,
    SharedModule,
  ],
  providers: [
    DealsViewService,
  ],
  exports: [
  ]

})
export class DealModule { }
