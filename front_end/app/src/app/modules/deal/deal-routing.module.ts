import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealCreatorComponent } from './components/deal-creator/deal-creator.component';
import { DealsComponent } from './components/deals/deals.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { DealsResolverService } from './services/deals-resolver.service';

const routes: Routes = [
  {
      path: 'adding',
      canDeactivate: [CanDeactivateGuard],
      data: {
        mode: 'Adding',
        animation: 'Slide'
      },
      component: DealCreatorComponent
    },
    {
      path: '',
      component: DealsComponent,
      resolve: {
        deals: DealsResolverService
      },
      data: {
        animation: 'Deals'
      }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealRoutingModule { }
