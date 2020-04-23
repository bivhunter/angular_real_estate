import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealCreatorComponent } from './components/deal-creator/deal-creator.component';
import { DealsComponent } from './components/deals/deals.component';
import { DealsDetailsComponent } from './components/deals-details/deals-details.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
import { PopupDeactivateComponent } from '../../components/popup-deactivate/popup-deactivate.component';


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
      component: DealsComponent
    },
    {
      path: 'details/:id',
      component: DealsDetailsComponent,
      data: {
        mode: 'Editing'
      },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealRoutingModule { }
