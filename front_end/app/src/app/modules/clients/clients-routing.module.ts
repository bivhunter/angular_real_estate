import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';

const routes: Routes = [
    {
        path: 'adding',
        canDeactivate: [ CanDeactivateGuard ],
        data: {
          mode: 'Adding'
        },
        component: ClientProfileComponent
      },
      {
        path: '',
        component: ClientsComponent
      },
      {
        path: 'profile/:id',
        canDeactivate: [ CanDeactivateGuard ],
        component: ClientProfileComponent,
        data: {
          mode: 'Editing'
        },
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
