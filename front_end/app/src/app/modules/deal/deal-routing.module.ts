import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealCreatorComponent } from './components/deal-creator/deal-creator.component';
import { DealsComponent } from './components/deals/deals.component';
import { DealsDetailsComponent } from './components/deals-details/deals-details.component';


const routes: Routes = [
  {
      path: 'adding',
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
