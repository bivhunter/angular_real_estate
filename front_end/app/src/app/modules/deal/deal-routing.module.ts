import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealCreatorComponent } from './components/deal-creator/deal-creator.component';
import { DealsComponent } from './components/deals/deals.component';
import { DealsDetailsComponent } from './components/deals-details/deals-details.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { DealsResolverService } from './services/deals-resolver.service';
import { DealDetailsResolverService } from './services/deal-details-resolver.service';


const routes: Routes = [
  {
      path: 'adding',
      canDeactivate: [CanDeactivateGuard],
      data: {
        mode: 'Adding'
      },
      component: DealCreatorComponent
    },
    {
      path: '',
      component: DealsComponent,
      resolve: {
        deals: DealsResolverService
      }
    },
    {
      path: 'details/:id',
      component: DealsDetailsComponent,
      data: {
        mode: 'Editing'
      },
      resolve: {
        deal: DealDetailsResolverService
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealRoutingModule { }
